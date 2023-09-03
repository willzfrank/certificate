import * as React from "react";
import { Accordion, Loader } from "app/components";
import { CourseModules } from "app/types";
import { getTime, getAllModuleResources } from "app/utils";
import { useGetModuleContentQuery } from "app/api/courseApi";
import { useNotify } from "app/hooks";
import * as resourceguards from "app/types/guards";

type CourseContentProps = {
	modules: CourseModules[];
	courseId: string;
	containerClassName?: string;
	hideTitle?: boolean;
	courseType?: "free" | "paid";
	subscribed: boolean;
};

const CourseContent = ({ modules, courseId, containerClassName, hideTitle, courseType = "free", subscribed }: CourseContentProps) => {
	return (
		<div className={`md:p-14 md:w-[60%] px-6 py-12 ${containerClassName || ""}`}>
			{!hideTitle ? <p className="font-medium text-xl mb-4">Course Content</p> : null}
			<Accordion.Group>
				{modules.map((module) => {
					return (
						<ModuleDetailsAccordion
							{...{
								moduleId: module.moduleId,
								courseId,
								moduleName: module.name,
								paymentRequired: module.paymentRequired == undefined ? true : module?.paymentRequired,
								courseType: courseType,
								subscribed: subscribed,
							}}
							key={module.moduleId}
						/>
					);
				})}
			</Accordion.Group>
		</div>
	);
};

const ModuleDetailsAccordion = ({
	moduleId,
	courseId,
	moduleName,
	paymentRequired,
	courseType,
	subscribed,
}: {
	moduleId: string;
	courseId: string;
	moduleName: string;
	paymentRequired: boolean;
	courseType?: "free" | "paid";
	subscribed: boolean;
}) => {
	const { isLoading, data: moduleContent } = useGetModuleContentQuery({
		courseId,
		moduleId,
	});

	const notify = useNotify();

	const mergedList = React.useMemo(() => getAllModuleResources(moduleContent?.data), [moduleContent?.data]);

	return (
		<Accordion.Item
			key={moduleId}
			head={({ isOpen }) => (
				<div className="grid items-center grid-cols-[minmax(0,1fr)_minmax(20px,auto)] gap-4">
					<div className="flex justify-between items-center">
						<div>
							<p className="text-app-dark-400 truncate">{moduleName}</p>
							<p className="text-muted text-[15px]">{getTime((moduleContent?.data.totalSeconds || 0) * 1000, "MM mins", "absolute")}</p>
						</div>
						<div>
							{paymentRequired && courseType !== "free" && !subscribed && (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							)}
							{(!paymentRequired || courseType === "free" || subscribed) && (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
									/>
								</svg>
							)}
						</div>
					</div>
					<svg className={`transition duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 1L8 8L1 1" stroke="#2F2D37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			)}
			body={
				isLoading ? (
					<div className="flex items-center justify-center">
						<Loader className="w-20 h-20" mainColor="red" />
					</div>
				) : (
					<div>
						{mergedList.map((resource, index) => {
							if (resourceguards.isVideo(resource)) {
								return (
									<div className="grid items-center gap-2 grid-cols-[minmax(20px,auto)_minmax(0,1fr)_minmax(80px,auto)] text-muted my-4 w-full" key={"videoe-" + index}>
										<div className={`w-5 h-5 items-center justify-center flex rounded-full border border-app-dark-500`}>
											<svg className="scale-125 translate-x-[1px]" width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M5.25 4.43301C5.58333 4.24056 5.58333 3.75944 5.25 3.56699L0.75 0.968911C0.416666 0.776461 0 1.01702 0 1.40192V6.59808C0 6.98298 0.416667 7.22354 0.75 7.03109L5.25 4.43301Z"
													fill="#898989"
												/>
											</svg>
										</div>
										<p className="truncate text-left">{resource.displayName}</p>

										<p className="text-right">{getTime(resource.totalSeconds * 1000, "MM mins", "absolute")}</p>
									</div>
								);
							} else if (resourceguards.isAssessment(resource)) {
								return (
									<div className="grid items-center gap-2 grid-cols-[minmax(20px,auto)_minmax(0,1fr)_minmax(80px,auto)] text-muted my-4 w-full" key={"assessment" + index}>
										<div
											className={`w-5 h-5 items-center justify-center flex rounded-full border ${
												resource.isCompleted ? "bg-green-600 border-green-600" : "border-app-dark-500"
											}`}>
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
										</div>
										<button
											className="truncate text-left"
											onClick={() =>
												notify({
													title: "Not allowed to view this course",
													description: "You don't have access to this resource.",
													type: "error",
												})
											}>
											{resource.name}
										</button>

										<p>{resource.totalNumberOfQuestions} questions</p>
									</div>
								);
							} else if (resourceguards.isDocument(resource)) {
								return (
									<div className="grid items-center gap-2 grid-cols-[minmax(20px,auto)_minmax(0,1fr)] text-muted my-4 w-full" key={"document" + index}>
										<div className={"w-5 h-5 items-center justify-center flex rounded-full border"}>
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
										</div>
										<button
											className="truncate text-left"
											onClick={() =>
												notify({
													title: "Not allowed to view this course",
													description: "You don't have access to this resource.",
													type: "error",
												})
											}>
											<p>Testing {resource.displayName}</p>
										</button>
									</div>
								);
							}
						})}
					</div>
				)
			}
		/>
	);
};

export default CourseContent;
