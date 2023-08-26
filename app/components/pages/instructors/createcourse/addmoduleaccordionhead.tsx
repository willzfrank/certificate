import * as React from "react";
import { CourseModules, ModuleContentTypes } from "app/types";
import { CourseCreationContext } from "app/contexts";
import { useLazyGetCoursePreviewWhileCreatingQuery, useUpdateModuleMutation, useDeleteModuleMutation } from "app/api/courseCreationApi";
import { useNotify } from "app/hooks";
import { Loader, Image, Button, StopPropagation } from "app/components";
import { AnimatePresence, motion } from "framer-motion";

const AddModuleTypeAccordion__Head = ({
	moduleDetails,
	setResourceType,
	openAccordion,
	isSaving,
}: {
	moduleDetails: CourseModules;
	resourceType: ModuleContentTypes;
	setResourceType: React.Dispatch<React.SetStateAction<ModuleContentTypes>>;
	openAccordion: () => void;
	isSaving: boolean;
}) => {
	const [editingModuleName, setEditingModuleName] = React.useState(false);
	const [editedModuleName, setEditedModuleName] = React.useState(moduleDetails.name);

	const { courseInfo, updateCourseModules } = React.useContext(CourseCreationContext);

	const [getCourseDetails, { isFetching: isFetchingNewCourseDetails }] = useLazyGetCoursePreviewWhileCreatingQuery();

	const [updateModule, { isLoading }] = useUpdateModuleMutation();
	const notify = useNotify();

	const [deleteModule, { isLoading: isDeletingModule }] = useDeleteModuleMutation();

	const handleEditModuleName = React.useCallback(async () => {
		if (editingModuleName && editedModuleName) {
			const res = await updateModule({
				courseId: courseInfo.id,
				moduleDetails: {
					id: moduleDetails.moduleId,
					isExtra: moduleDetails.isExtra,
					name: editedModuleName,
					description: moduleDetails.description,
					paymentRequired: moduleDetails?.paymentRequired ? moduleDetails.paymentRequired : true,
				},
			}).unwrap();

			if (res.errors.length === 0) {
				const courseDetailsRes = await getCourseDetails({
					courseId: courseInfo.id,
				}).unwrap();

				updateCourseModules(courseDetailsRes.modules);
			}
		}
	}, [editingModuleName, editedModuleName, updateModule, courseInfo.id, moduleDetails, getCourseDetails, updateCourseModules]);

	const handleModuleDelete = React.useCallback(async () => {
		if (confirm("Are you sure you want to delete this module?")) {
			try {
				const res = await deleteModule({
					courseId: courseInfo.id,
					moduleId: moduleDetails.moduleId,
				}).unwrap();

				if (res.errors.length === 0) {
					// module was successfully deleted
					const courseDetailsRes = await getCourseDetails({
						courseId: courseInfo.id,
					}).unwrap();

					updateCourseModules(courseDetailsRes.modules);
				}
			} catch (err) {
				notify({
					type: "error",
					title: "An error occurred while deleting",
					description: JSON.stringify(err),
				});
			}
		}
	}, [deleteModule, courseInfo.id, moduleDetails.moduleId, getCourseDetails, updateCourseModules, notify]);

	React.useEffect(() => {
		setEditedModuleName(moduleDetails.name);
	}, [moduleDetails]);

	const [showResourceTypeDropdown, setShowResourceTypeDropdown] = React.useState(false);

	const buttonRef0 = React.useRef<HTMLButtonElement>(null);
	const buttonRef1 = React.useRef<HTMLButtonElement>(null);
	const buttonRef2 = React.useRef<HTMLButtonElement>(null);
	const buttonRef3 = React.useRef<HTMLButtonElement>(null);
	const buttonRef4 = React.useRef<HTMLButtonElement>(null);

	const dropdownRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const dropdownElement = dropdownRef.current;

		const handleDocumentClick = (event: MouseEvent) => {
			if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
				setShowResourceTypeDropdown(false);
			}
		};

		if (dropdownElement) {
			window.addEventListener("click", handleDocumentClick);
		}

		return () => window.removeEventListener("click", handleDocumentClick);
	}, []);

	return (
		<div className="py-2 flex items-center justify-between">
			<div className="flex md:gap-8 gap-4 items-center" onClick={(e) => e.stopPropagation()}>
				{editingModuleName ? (
					<input type="text" value={editedModuleName} onChange={(e) => setEditedModuleName(e.currentTarget.value)} className="w-[200px] text-sm p-2 rounded" />
				) : (
					<p>{moduleDetails.name}</p>
				)}
				<div className="flex items-center gap-3">
					<button
						className={`w-8 h-8 rounded-full flex items-center justify-center ${editingModuleName ? "bg-green-400 bg-opacity-25" : "bg-app-stroke"}`}
						onClick={(e) => {
							e.stopPropagation();
							setEditingModuleName(!editingModuleName);
							handleEditModuleName();
						}}>
						{isLoading || isFetchingNewCourseDetails ? (
							<Loader mainColor="red" className="w-6 h-6" />
						) : editingModuleName ? (
							<Image src="/images/save-icon.png" alt="" className="w-4 h-4" />
						) : (
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.1641 21.6287H21.9991" stroke={editingModuleName ? "#FFF" : "#545454"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
									stroke={editingModuleName ? "#FFF" : "#545454"}
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path d="M15.3477 12.0005L18.9825 14.7919" stroke={editingModuleName ? "#FFF" : "#545454"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						)}
					</button>
					<Button loading={isDeletingModule} className="w-8 !h-8 rounded-full bg-[#F6E9ED] flex items-center justify-center" onClick={handleModuleDelete}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12.8825 6.3125C12.8825 6.3125 12.5205 10.8025 12.3105 12.6938C12.2105 13.5972 11.6525 14.1265 10.7385 14.1432C8.99921 14.1745 7.25788 14.1765 5.51921 14.1398C4.63987 14.1218 4.09121 13.5858 3.99321 12.6985C3.78188 10.7905 3.42188 6.3125 3.42188 6.3125"
								stroke="#B61010"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M13.8053 4.15999H2.5" stroke="#B61010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path
								d="M11.6284 4.15998C11.105 4.15998 10.6544 3.78998 10.5517 3.27732L10.3897 2.46665C10.2897 2.09265 9.95102 1.83398 9.56502 1.83398H6.74302C6.35702 1.83398 6.01835 2.09265 5.91835 2.46665L5.75635 3.27732C5.65369 3.78998 5.20302 4.15998 4.67969 4.15998"
								stroke="#B61010"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Button>
				</div>
			</div>

			<div className="flex items-center gap-8">
				{isSaving && <p className="text-sm">Saving...</p>}
				<div className="relative" ref={dropdownRef}>
					<Button
						className="px-6 py-3 border-app-pink border rounded h-auto text-app-pink text-sm flex gap-2 items-center"
						onClick={(e) => {
							e.stopPropagation();
							setShowResourceTypeDropdown(!showResourceTypeDropdown);
						}}>
						Add Sub-section
						<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.6654 6.16699L7.9987 10.8337L3.33203 6.16699" stroke="#B61046" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Button>

					<AnimatePresence>
						{showResourceTypeDropdown && (
							<motion.div
								className="absolute flex flex-col bg-white w-[120%] top-12 shadow-md rounded z-[1] divide-y divide-[#EDEDED] text-app-dark-400"
								animate={{ opacity: 1 }}
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}>
								{/* <StopPropagation<HTMLButtonElement>
                      elementRef={buttonRef0}
                      callback={() => setResourceType(ResourceTypes.slide)}
                    >
                      <button
                        ref={buttonRef0}
                        className="px-4 pl-6 py-3 text-left"
                      >
                        Slide
                      </button>
                    </StopPropagation> */}
								<StopPropagation<HTMLButtonElement>
									elementRef={buttonRef1}
									callback={() => {
										setResourceType(ModuleContentTypes.video);
										openAccordion();
									}}>
									<button ref={buttonRef1} className="px-4 pl-6 py-3 text-left">
										Video
									</button>
								</StopPropagation>
								<StopPropagation<HTMLButtonElement>
									elementRef={buttonRef2}
									callback={() => {
										setResourceType(ModuleContentTypes.selectAnAnswer);
										openAccordion();
									}}>
									<button ref={buttonRef2} className="px-4 pl-6 py-3 text-left">
										Interactive Type
									</button>
								</StopPropagation>
								<StopPropagation<HTMLButtonElement>
									elementRef={buttonRef3}
									callback={() => {
										setResourceType(ModuleContentTypes.document);
										openAccordion();
									}}>
									<button ref={buttonRef3} className="px-4 pl-6 py-3 text-left">
										Document
									</button>
								</StopPropagation>
								<StopPropagation<HTMLButtonElement>
									elementRef={buttonRef4}
									callback={() => {
										setResourceType(ModuleContentTypes.assessment);
										openAccordion();
									}}>
									<button ref={buttonRef4} className="px-4 pl-6 py-3 text-left">
										Assessment
									</button>
								</StopPropagation>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default AddModuleTypeAccordion__Head;
