import * as React from "react";
import { Footer, ProtectedRoute } from "app/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceType } from "app/utils";
import { CourseCreationContext } from "app/contexts";
import { CourseCreationContextFields } from "app/contexts/CourseCreationContext";
import { useLazyGetCoursePreviewWhileCreatingQuery } from "app/api/courseCreationApi";
import { USERTYPES } from "app/types";
import { useWatchSearchParams } from "app/hooks";

const CreateCourseHeader = (): JSX.Element => {
	const router = useRouter();
	const [btnText, setBtnText] = React.useState("");
	const {
		courseInfo: { isExternal },
	} = React.useContext(CourseCreationContext);

	React.useEffect(() => {
		if (deviceType() === "mobile") {
			setBtnText("Save for later");
		} else setBtnText("Save and continue later");
	}, []);

	return (
		<div className="flex px-4 md:px-14 items-center justify-between py-3 md:py-4 bg-app-stroke sticky top-0 z-10">
			<p className="text-muted hidden md:block">Draft</p>
			<p className="font-medium">Create new {isExternal ? "external" : ""} course</p>
			<Link href="/instructors/overview">
				<button className="border-2 border-app-pink px-6 py-2 rounded text-app-pink">{btnText}</button>
			</Link>
		</div>
	);
};

const CreateCourseLayout = ({ children, noPadding, title }: { children: React.ReactNode; noPadding?: boolean; title?: string }) => {
	const { pathname } = useRouter();
	let createExternalCourse = useWatchSearchParams("isExternal") as unknown as boolean;
	createExternalCourse = Boolean(createExternalCourse);

	let links = [
		{ url: "courseinfo", title: "Course Information" },
		{ url: "createcurriculum", title: "Create your curriculum" },
		{ url: "certificate_and_pricing", title: "Certificate and Pricing" },
		{ url: "uploadimages", title: "Upload Course Image" },
		{ url: "review", title: "Review and Upload" },
	];

	// initializing the values of the course context
	const [courseInfo, setCourseInfo] = React.useState<CourseCreationContextFields["courseInfo"]>({
		id: "",
		courseName: "",
		subtitle: "",
		categories: [],
		courseDescription: "",
		targetAudience: "",
		lastSavePoint: 0,
		isExternal: createExternalCourse,
	});

	const [certificateRequired, setCertificateRequired] = React.useState<CourseCreationContextFields["certificateRequired"]>(false);

	const [courseMedia, setCourseMedia] = React.useState<CourseCreationContextFields["courseMedia"]>({
		videoPreview: "",
		imagePreview: "",
	});

	if (courseInfo.isExternal) {
		links = [
			{ url: "courseinfo", title: "Course Information" },
			{ url: "uploadimages", title: "Upload Course Image" },
			{ url: "review", title: "Review and Upload" },
		];
	}

	const [courseModules, setCourseModules] = React.useState<CourseCreationContextFields["courseModules"]>([]);
	const [pricings, setPricings] = React.useState([
		{
			id: "",
			name: "",
			subscriptionType: "Standard",
			price: 0,
			offers: [""],
		},
	]);

	const [getCourseDetails, { isFetching, data }] = useLazyGetCoursePreviewWhileCreatingQuery();

	const fetchCourseDetailsAndUpdateContext = async (id: string) => {
		const courseData: any = await getCourseDetails({
			courseId: courseInfo.id,
		}).unwrap();

		setCourseInfo({
			id: courseData.id,
			courseName: courseData.name,
			subtitle: String(courseData.subTitle),
			categories: courseData.categories,
			courseDescription: courseData.description,
			targetAudience: courseData.intendedUsers,
			lastSavePoint: courseData.lastSavePoint,
			redirectUrl: courseData.redirectUrl,
			isExternal: courseData.isExternal,
		});

		setCourseMedia({
			videoPreview: courseData.previewVideoUrl,
			imagePreview: courseData.imageUrl,
		});

		setCertificateRequired(courseData.certificateRequired);

		// sort modules based on the position
		setCourseModules([...courseData.modules].sort((a, b) => a.position - b.position));

		// console.log(pricings);

		if (courseData?.pricings?.length > 0) setPricings(courseData?.pricings);
	};

	// update the course context whenever the id changes
	React.useEffect(() => {
		(async () => {
			if (courseInfo.id) fetchCourseDetailsAndUpdateContext(courseInfo.id);
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseInfo.id]);

	const [courseId, mode] = useWatchSearchParams(["courseId", "mode"]) as string[];

	React.useEffect(() => {
		if (courseId && mode === "edit") {
			setCourseInfo({ ...courseInfo, id: courseId });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseId, mode]);

	return (
		<ProtectedRoute allowedUserTypes={[USERTYPES.INSTRUCTOR]} redirectUrl="/dashboard">
			<CourseCreationContext.Provider
				value={{
					courseInfo,
					courseMedia,
					courseModules,
					certificateRequired,
					pricings,
					updateCourseInfo: (newValue) => setCourseInfo(newValue),
					updateCourseMedia: (newValue) => setCourseMedia(newValue),
					updateCertificateRequired: (newValues) => setCertificateRequired(newValues),
					updateCourseModules: (updatedCourseModules) => setCourseModules(updatedCourseModules),
					updatePricings: (updatedPricing) => setPricings(updatedPricing),
				}}>
				{isFetching ? "loading" : ""}
				<CreateCourseHeader />

				{/* sidebar and main content  */}
				<div className="grid md:grid-cols-[300px,_1fr]">
					<div className="h-full pl-14 py-8 pr-2 space-y-6 border-r hidden md:block">
						{links.map((link, index) => (
							<div key={index} className={`${pathname.split("/")[3] === link.url ? "text-app-pink font-semibold" : ""}`}>
								{index <= courseInfo.lastSavePoint ? (
									<Link href={`./${link.url}${mode === "edit" ? "?mode=edit&courseId=" + courseId : ""}`}>
										<a>{link.title}</a>
									</Link>
								) : (
									<a className="cursor-not-allowed">{link.title}</a>
								)}
							</div>
						))}
					</div>

					<div className={noPadding ? "" : "px-6 md:px-14 py-6"}>
						{title && <p className={`text-2xl md:hidden font-medium ${noPadding ? "my-6 px-6" : "mb-6"}`}>{title}</p>}

						{children}
					</div>
				</div>

				<Footer />
			</CourseCreationContext.Provider>
		</ProtectedRoute>
	);
};

export default CreateCourseLayout;
