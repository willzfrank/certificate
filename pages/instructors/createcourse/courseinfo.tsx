import * as React from "react";
import { Category, NextPageWithLayout } from "app/types";
import { Button, CreateCourseLayout } from "app/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewCourse_CourseInfoMutation, useEditCourseDetailsMutation } from "app/api/courseCreationApi";
import { useAppSelector, useNotify, useRerender } from "app/hooks";
import router from "next/router";
import { CourseCreationContext } from "app/contexts";
import { useGetCategoriesQuery } from "app/api/categoriesApi";
import { useWatchSearchParams } from "app/hooks";
import Select from "react-select";

const CreateCourse_CourseInfo: NextPageWithLayout<{}> = () => {
	type CourseInfoType = {
		courseName: string;
		categories: Category[];
		targetAudience: string;
		courseDescription: string;
		redirectUrl?: string;
		subtitle: string;
	};

	const { updateCourseInfo, courseInfo } = React.useContext(CourseCreationContext);
	console.log(courseInfo);

	const {
		register: registerField,
		handleSubmit,
		setValue,
	} = useForm<CourseInfoType>({
		defaultValues: {
			courseName: courseInfo.courseName,
			courseDescription: courseInfo.courseDescription,
			categories: courseInfo.categories,
			targetAudience: courseInfo.targetAudience,
			redirectUrl: courseInfo.redirectUrl,
		},
	});

	const [mode, editedCourseId] = useWatchSearchParams(["mode", "courseId"]) as [string, string];

	const [, rerender] = useRerender();

	React.useEffect(() => {
		setValue("categories", courseInfo.categories);
		setValue("courseDescription", courseInfo.courseDescription);
		setValue("courseName", courseInfo.courseName);
		setValue("targetAudience", courseInfo.targetAudience);
		setValue("categories", courseInfo.categories);
		setValue("redirectUrl", courseInfo.redirectUrl);
		setValue("subtitle", courseInfo.subtitle ? courseInfo.subtitle : "");

		rerender();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseInfo]);

	const autoFocusElement = useWatchSearchParams("focusOn") as string;
	const notify = useNotify();

	const [createCourse, { isLoading, error, data, isError }] = useCreateNewCourse_CourseInfoMutation();

	const [editCourse, { isLoading: isEditingCourse, error: editCourseError }] = useEditCourseDetailsMutation();

	const { id: userId } = useAppSelector((store) => store.user);
	const { data: categoriesRes, isFetching: isCategoriesFetching, isError: isGetCategoriesError } = useGetCategoriesQuery();

	const categories = React.useMemo(() => {
		if (isCategoriesFetching || isGetCategoriesError) {
			return [];
		}

		return categoriesRes?.data.map((category) => ({
			value: category.id,
			label: category.name,
		}));
	}, [categoriesRes, isCategoriesFetching, isGetCategoriesError]);

	const onSubmit: SubmitHandler<CourseInfoType> = async (values) => {
		console.log(values);
		if (mode === "edit") {
			// edit the course
			const { data } = await editCourse({
				courseId: courseInfo.id,
				name: values.courseName,
				intendedUsers: values.targetAudience,
				description: values.courseDescription,
				subTitle: values.subtitle as string,
			}).unwrap();

			if (data) {
				console.log(data);
				updateCourseInfo({
					id: data.id,
					courseName: data.name,
					courseDescription: data.description,
					targetAudience: data.intendedUsers,
					categories: data.categories,
					subtitle: data?.subTitle ? String(data.subTitle) : "",
					lastSavePoint: data.lastSavePoint,
					isExternal: data.isExternal,
				});

				if (courseInfo.isExternal) {
					router.push(`./uploadimages?mode=edit&courseId=${editedCourseId}`);
				} else {
					router.push(`./createcurriculum?mode=edit&courseId=${editedCourseId}`);
				}
			} else {
				// handle error
				notify({
					type: "error",
					title: "Error🚫",
					description: "An error occurred while editing course",
				});
			}
		} else {
			// create a new course
			const data = await createCourse({
				instructorId: userId as string,
				targetAudience: values.targetAudience,
				courseName: values.courseName,
				courseDescription: values.courseDescription,
				categoryIds: values.categories.map((cat) => cat.id),
				isExternal: courseInfo.isExternal,
				redirectURL: values.redirectUrl,
				subTitle: values.subtitle as string,
			}).unwrap();

			if (data.errors.length !== 0) {
				notify({
					type: "error",
					title: "Error🚫",
					description: "An error occurred while creating course",
				});
			} else {
				// update the course creation context
				updateCourseInfo({
					id: data.data,
					courseName: values.courseName,
					courseDescription: values.courseDescription,
					targetAudience: values.targetAudience,
					categories: values.categories,
					subtitle: "Sample Subtitle",
					lastSavePoint: 1,
					isExternal: data,
				});

				if (courseInfo.isExternal) {
					router.push(`./uploadimages?isExternal=true`);
				} else {
					router.push(`./createcurriculum?mode=edit&courseId=${data.data}`);
				}
			}
		}
	};

	return (
		<React.Fragment>
			<form className="lg:w-[65%]" onSubmit={handleSubmit(onSubmit)}>
				<CreateCourseFormField
					inputElementId="courseName"
					title="What’s the name of your course?"
					desc="You’ll be able to create, track and manage your courses on this dashboard. You can also track your payments and reviews."
					inputElement={
						<input
							{...registerField("courseName", { required: true })}
							type="text"
							name="courseName"
							autoFocus={autoFocusElement === "courseName"}
							id="courseName"
							placeholder="Course name goes here"
							className="px-4 py-3 lg:py-2 rounded border w-full lg:w-[500px] my-4 text-muted focus:border-app-dark-500"
						/>
					}
				/>

				<CreateCourseFormField
					inputElementId=""
					title="Add a subtitle for your course"
					desc="You’ll be able to create, track and manage your courses on this dashboard. You can also track your payments and reviews."
					inputElement={
						<input
							type="text"
							{...registerField("subtitle", { required: true })}
							name="subtitle"
							id="subtitle"
							placeholder="Course name goes"
							className="px-4 py-3 lg:py-2 rounded border w-full lg:w-[500px] my-4 text-muted focus:border-app-dark-500"
						/>
					}
				/>

				{courseInfo.isExternal && (
					<CreateCourseFormField
						inputElementId="redirectUrl"
						title="Redirect URL"
						desc="This is the URL your students get redirected to after paying"
						inputElement={
							<input
								{...registerField("redirectUrl", { required: true })}
								type="url"
								name="redirectUrl"
								id="redirectUrl"
								placeholder="URL your student redirects to"
								className="px-4 py-3 lg:py-2 rounded border w-full lg:w-[500px] my-4 text-muted focus:border-app-dark-500"
							/>
						}
					/>
				)}

				<CreateCourseFormField
					inputElementId="category"
					title="What category does it fall under?"
					desc="You’ll be able to create, track and manage your courses on this dashboard. You can also track your payments and reviews."
					inputElement={
						<Select
							onChange={(newValue) =>
								setValue(
									"categories",
									newValue.map((val) => ({ name: val.label, id: val.value }))
								)
							}
							options={categories}
							defaultValue={courseInfo.categories.map((cat) => ({
								value: cat.id,
								label: cat.name,
							}))}
							isMulti
							isLoading={isCategoriesFetching}
							placeholder="Select a category"
							className="lg:w-[500px] my-4"
						/>
					}
				/>
				<CreateCourseFormField
					inputElementId="courseDescription"
					title="About this course"
					desc="You’ll be able to create, track and manage your courses on this dashboard. You can also track your payments and reviews."
					inputElement={
						<textarea
							{...registerField("courseDescription", { required: true })}
							id="courseDescription"
							autoFocus={autoFocusElement === "courseDescription"}
							name="courseDescription"
							placeholder="Example: This course is an introductory course on data analysis and teaches students about..."
							className="px-4 py-3 lg:py-2 rounded border w-full lg:w-[500px] my-4 text-muted outline-none focus:border-app-dark-500 h-32"
						/>
					}
				/>
				<CreateCourseFormField
					inputElementId="targetAudience"
					title="Who is this course for?"
					desc="You’ll be able to create, track and manage your courses on this dashboard. You can also track your payments and reviews."
					inputElement={
						<textarea
							{...registerField("targetAudience", { required: true })}
							name="targetAudience"
							autoFocus={autoFocusElement === "targetAudience"}
							id="targetAudience"
							placeholder="Who you're creating the course for"
							className="px-4 py-3 lg:py-2 rounded border w-full lg:w-[500px] my-4 text-muted outline-none focus:border-app-dark-500 h-32"
						/>
					}
				/>

				<Button loading={isLoading} className="text-app-pink border-2 border-app-pink px-8 py-2 rounded" type="submit" role={"button"}>
					Next
				</Button>
			</form>
		</React.Fragment>
	);
};

const CreateCourseFormField = ({ title, desc, inputElement, inputElementId }: { title: string; desc: string; inputElement: React.ReactNode; inputElementId: string }) => {
	return (
		<div className="mb-4">
			<label htmlFor={`${inputElementId}`} className="text-lg font-medium my-1">
				{title}
			</label>
			<p id={`descriptionFor${inputElementId}`} className="text-muted text-[15px] lg:text-base leading-6 lg:leading-7 w-[95%] lg:w-full">
				{desc}
			</p>
			{inputElement}
		</div>
	);
};

export default CreateCourse_CourseInfo;

CreateCourse_CourseInfo.getLayout = function (page) {
	return <CreateCourseLayout title="Course Info">{page}</CreateCourseLayout>;
};
