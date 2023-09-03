import * as React from "react";
import { useRouter } from "next/router";
import { CourseModules, ModuleContentTypes, USERTYPES } from "app/types";
import { WatchCourseContext } from "app/contexts";
import { Accordion, Loader } from "app/components";
import { useGetCourseModuleContentQuery } from "app/api/subscriptionApi";
import { getAllModuleResources, getTime } from "app/utils";
import { useAppSelector } from "app/redux/hooks";
import * as resourceguards from "app/types/guards";

type ModuleDetailsAccordionProps = {
	courseId: string;
	module: CourseModules;
	openModuleId?: string;
	readonly moduleIndex: number;
	courseType: "free" | "paid";
	subscribed: boolean;
};

const ModuleDetailsAccordionWithRef: React.ForwardRefRenderFunction<
	{
		handleResourceClick: (resourceIndex: number, resourceType: ModuleContentTypes, moduleIndex: number) => void;
		autoClick: (resourceIndex: number) => void;
	},
	ModuleDetailsAccordionProps
> = ({ courseId, module, moduleIndex, openModuleId, courseType, subscribed }, ref) => {
	const { roleName: userRole } = useAppSelector((store) => store.user);
	const { data: moduleContent, isLoading } = useGetCourseModuleContentQuery({
		courseId,
		moduleId: module.moduleId,
	});

	const router = useRouter();

	const { setActiveResourceIndex, setActiveResourceType, setActiveModuleIndex, allResourses, activeResourceIndex } = React.useContext(WatchCourseContext);

	const courseContentRefs = React.useRef<HTMLButtonElement[]>([]);

	const handleResourceClick = (resourceIndex: number, type: ModuleContentTypes, moduleIndex: number) => {
		setActiveResourceIndex(resourceIndex);
		setActiveResourceType(type);
		setActiveModuleIndex(moduleIndex);

		const newActiveResource = allResourses[resourceIndex];

		if (resourceguards.isAssessment(newActiveResource)) {
			router.push(`${userRole?.toLowerCase() === USERTYPES.INSTRUCTOR ? "/instructors" : ""}/course/${courseId}/?page=assessment&assessmentId=${newActiveResource.id}`);
		} else if (
			resourceguards.isClickAndMatch(newActiveResource) ||
			resourceguards.isSelectAnAnswer(newActiveResource) ||
			resourceguards.isFillInTheBlank(newActiveResource) ||
			resourceguards.isAllThatApply(newActiveResource) ||
			resourceguards.isThisOrThat(newActiveResource)
		) {
			router.push(`${userRole?.toLowerCase() === USERTYPES.INSTRUCTOR ? "/instructors" : ""}/course/${courseId}/?page=interactivepreview`);
		}
	};

	const autoClick = (resourceIndex: number) => {
		const currElement = courseContentRefs.current[resourceIndex];
		currElement.click();
		console.log(currElement.tagName);
	};

	React.useImperativeHandle(ref, () => ({
		handleResourceClick,
		autoClick,
	}));

	const mergedList = React.useMemo(() => getAllModuleResources(moduleContent?.data), [moduleContent?.data]);

	const buttonRef = React.useRef(null);

	return (
		<Accordion.Item
			key={module.moduleId}
			defaultOpen={module.moduleId === openModuleId}
			head={({ isOpen }) => (
				<div className="flex items-center">
					<div className="flex-1">
						<p className="text-app-dark-400 truncate text-[15px] md:text-base w-[250px]">{module.name}</p>
						<p className="text-muted text-[15px]">{moduleContent ? getTime(moduleContent.data.totalSeconds * 1000, "MM mins", "absolute") : ""}</p>
					</div>
					{/* PADLOCK HERE */}
					<div className="flex items-center gap-1 space-x-1 pr-1">
						<div>
							{module?.paymentRequired && courseType !== "free" && !subscribed && (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							)}
							{(!module?.paymentRequired || courseType === "free" || subscribed) && (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							)}
						</div>
						<div className="pr-10">
							<svg className={`transition duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 1L8 8L1 1" stroke="#2F2D37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
					</div>
				</div>
			)}
			body={
				isLoading ? (
					<div className="flex items-center justify-center">
						<Loader className="w-20 h-20" mainColor="red" />
					</div>
				) : (
					<>
						{mergedList.map((item, index) => {
							if (resourceguards.isVideo(item)) {
								return (
									<button
										ref={(el: HTMLButtonElement) => (courseContentRefs.current[index] = el)}
										className="grid grid-cols-[1fr,auto] text-muted hover:text-[#b61046] w-full my-4 "
										key={item.id}
										onClick={() => handleResourceClick(index, ModuleContentTypes.video, moduleIndex)}>
										<div className="grid grid-cols-[2rem,auto]">
											<div className={`w-6 h-6 items-center justify-center flex rounded-full border ${item.isWatched ? "bg-green-600 border-green-600" : "border-[#898989]"}`}>
												{item.isWatched ? (
													<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M1 2.99963L3.66742 5.66592L9.33333 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												) : (
													<svg className="scale-125 translate-x-[1px]" width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
															d="M5.25 4.43301C5.58333 4.24056 5.58333 3.75944 5.25 3.56699L0.75 0.968911C0.416666 0.776461 0 1.01702 0 1.40192V6.59808C0 6.98298 0.416667 7.22354 0.75 7.03109L5.25 4.43301Z"
															fill="#898989"
														/>
													</svg>
												)}
											</div>
											<p className="truncate text-left">{item.displayName}</p>
										</div>

										<p>{getTime(item.totalSeconds * 1000, "MM mins", "absolute")}</p>
									</button>
								);
							} else if (resourceguards.isSelectAnAnswer(item)) {
								return (
									<button
										ref={(el) => el && (courseContentRefs.current[index] = el)}
										className="flex items-center justify-start gap-3 text-muted my-4 w-full hover:text-[#b61046]"
										key={item.question}
										onClick={() => {
											handleResourceClick(index, ModuleContentTypes.selectAnAnswer, moduleIndex);
										}}>
										<span className={`w-6 h-6 rounded-full border text-sm flex items-center justify-center ${item.isTaken ? "bg-green-600 text-white" : "border-[#898989]"}`}>
											IC
										</span>{" "}
										<p className="truncate">Select An Answer</p>
									</button>
								);
							} else if (resourceguards.isClickAndMatch(item)) {
								return (
									<button
										ref={(el: HTMLButtonElement) => (courseContentRefs.current[index] = el)}
										className="flex items-center justify-start gap-3 text-muted my-3 w-full hover:text-[#b61046] "
										key={item.id}
										onClick={() => {
											handleResourceClick(index, ModuleContentTypes.clickAndMatch, moduleIndex);
										}}>
										<span className={`w-6 h-6 rounded-full border text-sm flex items-center justify-center ${item.isTaken ? "bg-green-600 text-white" : "border-[#898989]"}`}>
											IC
										</span>{" "}
										<p className="truncate">Click And Match</p>
									</button>
								);
							} else if (resourceguards.isThisOrThat(item)) {
								return (
									<button
										ref={(el) => el && (courseContentRefs.current[index] = el)}
										className="flex items-center justify-start gap-3 text-muted my-3 w-full hover:text-[#b61046]"
										key={item.id}
										onClick={() => {
											handleResourceClick(index, ModuleContentTypes.thisOrThat, moduleIndex);
										}}>
										<span className={`w-6 h-6 rounded-full border text-sm flex items-center justify-center ${item.isTaken ? "bg-green-600 text-white" : "border-[#898989]"}`}>
											IC
										</span>{" "}
										<p className="truncate">This or That</p>
									</button>
								);
							} else if (resourceguards.isFillInTheBlank(item)) {
								return (
									<button
										ref={(el) => el && (courseContentRefs.current[index] = el)}
										className="flex items-center justify-start gap-3 text-muted my-3 w-full hover:text-[#b61046]"
										key={item.id}
										onClick={() => {
											handleResourceClick(index, ModuleContentTypes.fillInTheBlank, moduleIndex);
										}}>
										<span className={`w-6 h-6 rounded-full border text-sm flex items-center justify-center ${item.isTaken ? "bg-green-600 text-white" : "border-[#898989]"}`}>
											IC
										</span>{" "}
										<p className="truncate"> Fill in the blanks</p>
									</button>
								);
							} else if (resourceguards.isAllThatApply(item)) {
								return (
									<button
										ref={(el) => el && (courseContentRefs.current[index] = el)}
										className="flex items-center justify-start gap-3 text-muted my-3 w-full hover:text-[#b61046]"
										key={item.id}
										onClick={() => {
											handleResourceClick(index, ModuleContentTypes.allThatApply, moduleIndex);
										}}>
										<span className={`w-6 h-6 rounded-full border text-sm flex items-center justify-center ${item.isTaken ? "bg-green-600 text-white" : "border-[#898989]"}`}>
											IC
										</span>{" "}
										<p className="truncate"> Select all that apply</p>
									</button>
								);
							} else if (resourceguards.isDocument(item)) {
								return (
									<button
										ref={(el) => el && (courseContentRefs.current[index] = el)}
										className="flex items-center justify-between text-muted my-4 w-31 text-ellipsis  truncate hover:text-[#b61046]"
										key={item.id}
										onClick={() => handleResourceClick(index, ModuleContentTypes.document, moduleIndex)}>
										<div className="flex space-x-3 items-center">
											<div
												className={`w-6 h-6 items-center justify-center flex rounded-full border  text-[8px] ${
													item.isRead ? "bg-green-600 border-green-600" : "border-[#898989]"
												}`}>
												{item.isRead ? (
													<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M1 2.99963L3.66742 5.66592L9.33333 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												) : (
													"DOC"
												)}
											</div>
											<p className="truncate lg:w-[250px] text-left ">{item.displayName}</p>
										</div>
									</button>
								);
							} else if (resourceguards.isAssessment(item)) {
								return (
									<button
										ref={(el) => el && (courseContentRefs.current[index] = el)}
										onClick={() => handleResourceClick(index, ModuleContentTypes.assessment, moduleIndex)}
										className="flex items-center justify-between text-muted my-4 w-full hover:text-[#b61046]"
										key={item.id}>
										<div className="flex space-x-3 items-center">
											<div className={`w-6 h-6 items-center justify-center flex rounded-full border ${item.isCompleted ? "bg-green-600 border-green-600" : "border-[#898989]"}`}>
												{item.isCompleted ? (
													<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M1 2.99963L3.66742 5.66592L9.33333 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												) : (
													<svg className="scale-150" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_3459_5653)">
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M1.59961 1.33314V6.66647C1.59961 6.80792 1.6558 6.94358 1.75582 7.04359C1.85584 7.14361 1.99149 7.1998 2.13294 7.1998H6.04405C6.1855 7.1998 6.32116 7.14361 6.42118 7.04359C6.5212 6.94358 6.57739 6.80792 6.57739 6.66647V1.33314C6.57739 1.19169 6.5212 1.05603 6.42118 0.956014C6.32116 0.855995 6.1855 0.799805 6.04405 0.799805H2.13294C1.99149 0.799805 1.85584 0.855995 1.75582 0.956014C1.6558 1.05603 1.59961 1.19169 1.59961 1.33314ZM4.0885 2.3998C4.0885 2.35266 4.10723 2.30744 4.14057 2.2741C4.17391 2.24076 4.21913 2.22203 4.26628 2.22203H5.6885C5.73565 2.22203 5.78087 2.24076 5.81421 2.2741C5.84755 2.30744 5.86628 2.35266 5.86628 2.3998C5.86628 2.44695 5.84755 2.49217 5.81421 2.52551C5.78087 2.55885 5.73565 2.57758 5.6885 2.57758H4.26628C4.21913 2.57758 4.17391 2.55885 4.14057 2.52551C4.10723 2.49217 4.0885 2.44695 4.0885 2.3998ZM4.26628 2.93314C4.21913 2.93314 4.17391 2.95187 4.14057 2.98521C4.10723 3.01855 4.0885 3.06377 4.0885 3.11092C4.0885 3.15807 4.10723 3.20328 4.14057 3.23662C4.17391 3.26996 4.21913 3.28869 4.26628 3.28869H5.6885C5.73565 3.28869 5.78087 3.26996 5.81421 3.23662C5.84755 3.20328 5.86628 3.15807 5.86628 3.11092C5.86628 3.06377 5.84755 3.01855 5.81421 2.98521C5.78087 2.95187 5.73565 2.93314 5.6885 2.93314H4.26628ZM4.0885 4.71092C4.0885 4.66377 4.10723 4.61855 4.14057 4.58521C4.17391 4.55187 4.21913 4.53314 4.26628 4.53314H5.6885C5.73565 4.53314 5.78087 4.55187 5.81421 4.58521C5.84755 4.61855 5.86628 4.66377 5.86628 4.71092C5.86628 4.75807 5.84755 4.80328 5.81421 4.83662C5.78087 4.86996 5.73565 4.88869 5.6885 4.88869H4.26628C4.21913 4.88869 4.17391 4.86996 4.14057 4.83662C4.10723 4.80328 4.0885 4.75807 4.0885 4.71092ZM4.26628 5.24425C4.21913 5.24425 4.17391 5.26298 4.14057 5.29632C4.10723 5.32966 4.0885 5.37488 4.0885 5.42203C4.0885 5.46918 4.10723 5.5144 4.14057 5.54774C4.17391 5.58108 4.21913 5.59981 4.26628 5.59981H5.6885C5.73565 5.59981 5.78087 5.58108 5.81421 5.54774C5.84755 5.5144 5.86628 5.46918 5.86628 5.42203C5.86628 5.37488 5.84755 5.32966 5.81421 5.29632C5.78087 5.26298 5.73565 5.24425 5.6885 5.24425H4.26628ZM2.66628 4.71092V5.24425H3.19961V4.71092H2.66628ZM2.4885 4.35536H3.37739C3.42454 4.35536 3.46976 4.37409 3.5031 4.40743C3.53644 4.44077 3.55516 4.48599 3.55516 4.53314V5.42203C3.55516 5.46918 3.53644 5.5144 3.5031 5.54774C3.46976 5.58108 3.42454 5.59981 3.37739 5.59981H2.4885C2.44135 5.59981 2.39613 5.58108 2.36279 5.54774C2.32945 5.5144 2.31072 5.46918 2.31072 5.42203V4.53314C2.31072 4.48599 2.32945 4.44077 2.36279 4.40743C2.39613 4.37409 2.44135 4.35536 2.4885 4.35536ZM3.68085 2.52549C3.71324 2.49196 3.73116 2.44706 3.73075 2.40044C3.73035 2.35383 3.71165 2.30924 3.67869 2.27628C3.64573 2.24332 3.60114 2.22462 3.55453 2.22422C3.50791 2.22381 3.46301 2.24173 3.42948 2.27412L2.84405 2.85954L2.61419 2.62967C2.58066 2.59729 2.53575 2.57937 2.48914 2.57977C2.44253 2.58018 2.39794 2.59888 2.36498 2.63184C2.33201 2.6648 2.31332 2.70939 2.31291 2.756C2.31251 2.80261 2.33043 2.84752 2.36281 2.88105L2.84405 3.36229L3.68085 2.52549Z"
																fill="#898989"
															/>
														</g>
														<defs>
															<clipPath id="clip0_3459_5653">
																<rect width="8" height="8" fill="white" />
															</clipPath>
														</defs>
													</svg>
												)}
											</div>
											<p className="truncate border">{item.name}</p>
										</div>

										<p>{item.totalNumberOfQuestions} questions</p>
									</button>
								);
							} else {
								return <></>;
							}
						})}
					</>
				)
			}
		/>
	);
};

const ModuleDetailsAccordion = React.forwardRef(ModuleDetailsAccordionWithRef);

export default ModuleDetailsAccordion;
