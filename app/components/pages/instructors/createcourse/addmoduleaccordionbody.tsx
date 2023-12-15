import * as React from "react";
import { InteractiveTypes, AllModuleResources, VideoResourceType, DocumentResourceType, ModuleContentTypes, ThisOrThatInteractives, AssessmentResourceType } from "app/types";
import { CourseCreationContext } from "app/contexts";

import {
	useCreateNewCourse__RemoveVideoFromModuleMutation,
	useCreateNewCourse__RemoveDocumentFromModuleMutation,
	useDeleteInteractiveTypeMutation,
	useGetModuleContentQuery,
	useDeleteAssessmentMutation,
} from "app/api/courseCreationApi";
import { Button, Loader } from "app/components";
import AddModuleContentForm from "./AddModuleContentForm";
import { DragAndDropContainer, Draggable } from "app/components/dnd";
import { getAllModuleResources } from "app/utils";
import * as resourceguards from "app/types/guards";
import { useDragContext } from "app/hooks";
import { useSortModuleContentMutation } from "app/api/courseApi";
import { useNotify } from "app/hooks";

const AddModuleAccordion__Body = ({
	moduleId,
	currentResourceType,
	setResourceType,
	setIsSaving,
}: {
	moduleId: string;
	currentResourceType: ModuleContentTypes;
	setResourceType: React.Dispatch<React.SetStateAction<ModuleContentTypes>>;
	setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const {
		courseInfo: { id: courseId },
	} = React.useContext(CourseCreationContext);

	const [deleteAssessment, { isLoading: isDeletingAssessment }] = useDeleteAssessmentMutation();

	const notify = useNotify();

	const { data, isFetching } = useGetModuleContentQuery({
		courseId,
		moduleId,
	});

	const [removeVideo, { isLoading: isRemovingVideo }] = useCreateNewCourse__RemoveVideoFromModuleMutation();

	const [removeDocument, { isLoading: isRemovingDocument }] = useCreateNewCourse__RemoveDocumentFromModuleMutation();

	const [allResources, setAllResources] = React.useState<
		Array<{
			isInputing: boolean;
			value: AllModuleResources[number];
		}>
	>([]);

	const { drag, drop } = useDragContext();

	const [sort] = useSortModuleContentMutation();

	const onDropCallback = React.useCallback(async () => {
		setIsSaving(true);

		if (drag.position >= 0 && drop.position >= 0 && drag.elementId && drop.elementId && drop.type && drag.type) {
			try {
				const res = await sort({
					positions: [drag.position, drop.position],
					moduleId: moduleId,
					pair: [
						{
							contentId: drag.elementId,
							contentType: drag.type,
						},
						{
							contentId: drop.elementId,
							contentType: drop.type,
						},
					],
				}).unwrap();

				setIsSaving(false);

				notify({
					title: "Success",
					description: "Module content rearranged successfully",
					type: "success",
				});

				console.log(res);
			} catch (error) {
				notify({
					title: "Error - Failed to rearrange module content",
					description: JSON.stringify(error),
					type: "error",
				});

				setIsSaving(false);

				console.log(error);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [drag, drop]);

	React.useEffect(() => {
		if (data?.data) {
			const stuff = getAllModuleResources(data?.data).map((_res) => ({
				isInputing: false,
				value: _res,
			}));

			setAllResources(stuff);
			// resetModuleResourcePosition(stuff);
		}
	}, [data?.data]);

	// const resetModuleResourcePosition = React.useCallback(
	//   (resources: typeof allResources) => {
	//     const res = Promise.all(
	//       resources.map((resource, index) =>
	//         sort({
	//           positions: [index + 1, index + 1],
	//           moduleId: moduleId,
	//           pair: [
	//             {
	//               contentId: resource.value.id,
	//               contentType: resource.value.type,
	//             },
	//             {
	//               contentId: resource.value.id,
	//               contentType: resource.value.type,
	//             },
	//           ],
	//         }),
	//       ),
	//     )

	//     console.log(res)
	//   },
	//   [],
	// )

	const isEmpty = allResources.length === 0;

	const [removingVideoId, setRemovingVideoId] = React.useState<string>("");
	const [removingDocumentId, setRemovingDocumentId] = React.useState<string>("");
	const [removingInteractiveId, setRemovingInteractiveId] = React.useState<string>("");

	const toggleVideoEdit = (video: VideoResourceType) => {
		const editedResources = allResources.map((_resource) => {
			if (resourceguards.isVideoResource(_resource) && _resource.value.id === video.value.id) {
				return {
					value: _resource.value,
					isInputing: !video.isInputing,
				};
			} else {
				return _resource;
			}
		});
		setResourceType(ModuleContentTypes.NULL);
		setAllResources(editedResources);
	};

	const toggleDocumentEdit = (document: DocumentResourceType) => {
		const editedResources = allResources.map((_resource) => {
			if (resourceguards.isDocumentResource(_resource) && _resource.value.id === document.value.id) {
				return {
					value: document.value,
					isInputing: !document.isInputing,
				};
			} else {
				return _resource;
			}
		});

		setAllResources(editedResources);
		setResourceType(ModuleContentTypes.NULL);
	};

	const toggleAccessmentEdit = (assessment: AssessmentResourceType) => {
		console.log(assessment);
		const editedResources = allResources.map((_resource) => {
			if (resourceguards.isAssessmentResource(_resource) && _resource.value.id === assessment.value.id) {
				return {
					value: assessment.value,
					isInputing: !assessment.isInputing,
				};
			} else {
				return _resource;
			}
		});

		setAllResources(editedResources);
		setResourceType(ModuleContentTypes.NULL);
	};

	const isThisOrThatResource = (res: { value: AllModuleResources[number]; isInputing: boolean }): res is { value: ThisOrThatInteractives; isInputing: boolean } => {
		return res.value.type === ModuleContentTypes.thisOrThat;
	};

	const toggleInteractiveEdit = (interactive: { isInputing: boolean; value: AllModuleResources[number] }) => {
		const editedResources = allResources.map((_resource) => {
			if ((isThisOrThatResource(_resource) && _resource.value.position === interactive.value.position) || interactive.value.position === _resource.value.position) {
				return {
					value: interactive.value,
					isInputing: !interactive.isInputing,
				};
			} else return _resource;
		});

		setAllResources(editedResources);
		setResourceType(ModuleContentTypes.NULL);
	};

	const [deleteInteractiveContent, { isLoading: isDeletingInteractiveContent }] = useDeleteInteractiveTypeMutation();

	const handleInteractiveDelete = React.useCallback(
		async ({ interactiveId, interactiveType }: { interactiveType: InteractiveTypes; interactiveId: string }) => {
			setRemovingInteractiveId(interactiveId);

			try {
				const res = await deleteInteractiveContent({
					moduleId,
					interactiveTypeId: interactiveId,
					interactiveTypeName: interactiveType,
				}).unwrap();

				if (res) {
					notify({
						type: "success",
						title: "Success",
						description: `Successfully deleted ${interactiveType} interactive type`,
					});
				}
			} catch (error) {
				console.error(error);
				notify({
					type: "error",
					title: "Error",
					description: `Could not delete ${interactiveType} interactive type`,
				});
			} finally {
				setRemovingInteractiveId("");
			}
		},
		[notify, moduleId, deleteInteractiveContent]
	);

	// if (window) {
	//   // @ts-ignore
	//   window.deleteInteractive = deleteInteractiveContent
	// }

	if (isFetching)
		return (
			<div className="h-[200px] grid place-items-center">
				<Loader className="w-24 h-24" mainColor="red" text="Loading module details..." />
			</div>
		);

	return (
		<div className="divide-y text-sm">
			{/* For displaying the content that already exists */}
			{allResources.map((resource) => {
				if (resourceguards.isVideoResource(resource)) {
					if (resource.isInputing)
						return (
							// This is what displays the video form for edits
							<AddModuleContentForm
								resourceType={resource?.value?.isYoutube ? ModuleContentTypes.youtube : ModuleContentTypes.video}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => setResourceType(ModuleContentTypes.NULL)}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleVideoEdit(resource)}
								key={resource.value.id}
							/>
						);
					else
						return (
							<Draggable
								contentType={resource.value.type}
								elementId={resource.value.id}
								key={resource.value.id}
								onDropClassName="opacity-50 p-4 border"
								position={resource.value.position}
								onDropCallback={onDropCallback}>
								<div className="px-4 md:px-6 py-3 flex justify-between items-center text-sm text-gray-600 bg-inherit">
									<div className="flex gap-8">
										<p className="w-[250px] truncate">{resource.value.displayName}</p>
										<p>{resource.value.totalSeconds} seconds of video content uploaded</p>
									</div>
									<div className="flex items-center gap-3 justify-end">
										<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleVideoEdit(resource)}>
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
													stroke="#545454"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Button>
										<Button
											loading={isRemovingVideo && removingVideoId === resource.value.id}
											onClick={() => {
												setRemovingVideoId(resource.value.id);
												removeVideo({
													courseId: courseId,
													videoId: resource.value.id,
													moduleId: moduleId,
												});
											}}
											className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center">
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
							</Draggable>
						);
				} else if (resourceguards.isDocumentResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.document}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => setResourceType(ModuleContentTypes.NULL)}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleDocumentEdit(resource)}
								key={resource.value.id}
							/>
						);
					} else
						return (
							<Draggable
								contentType={resource.value.type}
								position={resource.value.position}
								elementId={resource.value.id}
								key={resource.value.id}
								onDropClassName="opacity-50 p-4 border"
								onDropCallback={onDropCallback}>
								<div className="px-4 md:px-6 py-3 flex justify-between items-center text-sm text-gray-600">
									<div className="flex gap-8">
										<p className="w-[250px] truncate">Document: {resource.value.displayName}</p>
									</div>

									<div className="flex items-center gap-3 justify-end">
										<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleDocumentEdit(resource)}>
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
													stroke="#545454"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Button>
										<Button
											className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center "
											loading={removingDocumentId === resource.value.id && isRemovingDocument}
											onClick={() => {
												setRemovingDocumentId(resource.value.id);
												removeDocument({
													courseId: courseId,
													moduleDocumentId: resource.value.id,
													moduleId: moduleId,
												});
											}}>
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
							</Draggable>
						);
				} else if (resourceguards.isAssessmentResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.assessment}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => setResourceType(ModuleContentTypes.NULL)}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleAccessmentEdit(resource)}
								key={resource.value.id}
							/>
						);
					} else
						return (
							<Draggable
								contentType={resource.value.type}
								position={resource.value.position}
								elementId={resource.value.id}
								key={resource.value.id}
								onDropClassName="opacity-50 p-4 border"
								onDropCallback={onDropCallback}>
								<div className="px-4 md:px-6 py-3 flex justify-between items-center text-sm text-gray-600">
									<div className="flex gap-8">
										<p className="w-[250px] truncate">Assessment Name: {resource.value.name}</p>
										<p>{resource.value.totalNumberOfQuestions} questions added</p>
									</div>
									<div className="flex items-center gap-3 justify-end">
										<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleAccessmentEdit(resource)}>
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
													stroke="#545454"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Button>
										<Button
											className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center "
											onClick={() =>
												deleteAssessment({
													moduleId: moduleId,
													assessmentModuleId: resource.value.id,
												})
											}
											loading={isDeletingAssessment}>
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
							</Draggable>
						);
				} else if (resourceguards.isClickAndMatchResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.clickAndMatch}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					}
					return (
						<Draggable
							contentType={resource.value.type}
							position={resource.value.position}
							elementId={resource.value.id}
							key={resource.value.id}
							onDropClassName="opacity-50 p-4 border"
							onDropCallback={onDropCallback}>
							<div className="px-4 md:px-6 py-3 flex justify-between items-center text-sm text-gray-600">
								Click and Match Interactive Type with {resource.value.statements.length} statements added
								<div className="flex items-center gap-3 justify-end">
									<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
												stroke="#545454"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</Button>
									<Button
										className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
										loading={removingInteractiveId === resource.value.id && isDeletingInteractiveContent}
										onClick={() =>
											handleInteractiveDelete({
												interactiveType: InteractiveTypes.clickAndMatch,
												interactiveId: resource.value.id,
											})
										}>
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
						</Draggable>
					);
				} else if (resourceguards.isSelectAnAnswerResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.selectAnAnswer}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					}
					return (
						<Draggable
							contentType={resource.value.type}
							position={resource.value.position}
							elementId={resource.value.id}
							key={resource.value.id}
							onDropClassName="opacity-50 p-4 border"
							onDropCallback={onDropCallback}>
							<div className="px-4 md:px-6 py-3 flex justify-between gap-4 items-center text-sm text-gray-600">
								<p>Select an Answer Interactive Type</p>
								<p>Question: {resource.value.question}</p>

								<div className="flex items-center gap-3 justify-end">
									<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
												stroke="#545454"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</Button>
									<Button
										className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
										loading={isDeletingInteractiveContent && removingInteractiveId === resource.value.id}
										onClick={() =>
											handleInteractiveDelete({
												interactiveType: InteractiveTypes.selectAnAnswer,
												interactiveId: resource.value.id,
											})
										}>
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
						</Draggable>
					);
				} else if (resourceguards.isThisOrThatResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.thisOrThat}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					}
					return (
						<Draggable
							contentType={resource.value.type}
							position={resource.value.position}
							elementId={resource.value.id}
							key={resource.value.id}
							onDropClassName="opacity-50 p-4 border"
							onDropCallback={onDropCallback}>
							<div className="px-4 md:px-6 py-3 flex justify-between items-center text-sm text-gray-600">
								This or That Interactive Resource with {resource.value.questions.length} questions
								<div className="flex items-center gap-3 justify-end">
									<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
												stroke="#545454"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</Button>
									<Button
										className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
										loading={isDeletingInteractiveContent && removingInteractiveId === resource.value.id}
										onClick={() =>
											handleInteractiveDelete({
												interactiveType: InteractiveTypes.thisOrThat,
												interactiveId: resource.value.id,
											})
										}>
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
						</Draggable>
					);
				} else if (resourceguards.isFillInTheBlankResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.fillInTheBlank}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					}
					return (
						<Draggable
							contentType={resource.value.type}
							position={resource.value.position}
							elementId={resource.value.id}
							key={resource.value.id}
							onDropClassName="opacity-50 p-4 border"
							onDropCallback={onDropCallback}>
							<div className="px-4 md:px-6 py-3 flex justify-between gap-4 items-center text-sm text-gray-600">
								<p>Fill in the blanks Interactive Type</p>
								<p>
									<span>{resource.value.question}</span>
								</p>

								<div className="flex items-center gap-3 justify-end">
									<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
												stroke="#545454"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</Button>
									<Button
										className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
										loading={isDeletingInteractiveContent && removingInteractiveId === resource.value.id}
										onClick={() =>
											handleInteractiveDelete({
												interactiveType: InteractiveTypes.fillInTheBlank,
												interactiveId: resource.value.id,
											})
										}>
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
						</Draggable>
					);
				} else if (resourceguards.isAllThatApplyResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.allThatApply}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					}
					return (
						<Draggable
							contentType={resource.value.type}
							elementId={resource.value.id}
							key={resource.value.id}
							position={resource.value.position}
							onDropClassName="opacity-50 p-4 border"
							onDropCallback={onDropCallback}>
							<div className="px-4 md:px-6 py-3 flex justify-between gap-4 items-center text-sm text-gray-600">
								<p>Select all that apply Interactive Type</p>
								<p>
									Question: <span>{resource.value.question}</span>
								</p>

								<div className="flex items-center gap-3 justify-end">
									<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
										<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
												stroke="#545454"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</Button>
									<Button
										className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
										loading={isDeletingInteractiveContent && removingInteractiveId === resource.value.id}
										onClick={() =>
											handleInteractiveDelete({
												interactiveType: InteractiveTypes.selectAllThatApply,
												interactiveId: resource.value.id,
											})
										}>
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
						</Draggable>
					);
				} else if (resourceguards.isClickForMoreExplanationResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.clickForMore}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					} else {
						return (
							<Draggable
								contentType={resource.value.type}
								elementId={resource.value.id}
								key={resource.value.id}
								position={resource.value.position}
								onDropClassName="opacity-50 p-4 border"
								onDropCallback={onDropCallback}>
								<div className="px-4 md:px-6 py-3 flex justify-between gap-4 items-center text-sm text-gray-600">
									<p>Click For More Explanation Interactive Type</p>
									<p>
										Title: <span>{resource.value.title}</span>
									</p>

									<div className="flex items-center gap-3 justify-end">
										<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
													stroke="#545454"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Button>
										<Button
											className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
											loading={isDeletingInteractiveContent && removingInteractiveId === resource.value.id}
											onClick={() =>
												handleInteractiveDelete({
													interactiveType: InteractiveTypes.clickForMoreExplanation,
													interactiveId: resource.value.id,
												})
											}>
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
							</Draggable>
						);
					}
				} else if (resourceguards.isBoxWithOptionsResource(resource)) {
					if (resource.isInputing) {
						return (
							<AddModuleContentForm
								resourceType={ModuleContentTypes.boxWithOption}
								moduleId={moduleId}
								initialValues={resource}
								discard={() => {
									toggleInteractiveEdit(resource);
									setResourceType(ModuleContentTypes.NULL);
								}}
								isEditing={resource.isInputing}
								toggleEdit={() => toggleInteractiveEdit(resource)}
								key={resource.value.id}
							/>
						);
					} else {
						return (
							<Draggable
								contentType={resource.value.type}
								elementId={resource.value.id}
								key={resource.value.id}
								position={resource.value.position}
								onDropClassName="opacity-50 p-4 border"
								onDropCallback={onDropCallback}>
								<div className="px-4 md:px-6 py-3 flex justify-between gap-4 items-center text-sm text-gray-600">
									<p>Box With Appropriate Options Interactive Type</p>
									<p>
										Title: <span>{resource.value.title}</span>
									</p>

									<div className="flex items-center gap-3 justify-end">
										<Button className="w-10 !h-10 rounded-full flex items-center justify-center bg-app-stroke" onClick={() => toggleInteractiveEdit(resource)}>
											<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M17.1641 21.6287H21.9991" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
													stroke="#545454"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path d="M15.3477 12.0005L18.9825 14.7919" stroke="#545454" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Button>
										<Button
											className="w-10 !h-10 rounded-full bg-[#F6E9ED] flex items-center justify-center"
											loading={isDeletingInteractiveContent && removingInteractiveId === resource.value.id}
											onClick={() =>
												handleInteractiveDelete({
													interactiveType: InteractiveTypes.boxWithAppropriateOption,
													interactiveId: resource.value.id,
												})
											}>
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
							</Draggable>
						);
					}
				}
			})}

			{/* For a new form field based on the selected resourceType */}
			{currentResourceType !== ModuleContentTypes.NULL && (
				<AddModuleContentForm
					moduleId={moduleId}
					resourceType={currentResourceType}
					discard={() => setResourceType(ModuleContentTypes.NULL)}
					isEditing={false}
					toggleEdit={() => console.log("should edit")}
				/>
			)}

			{isEmpty && currentResourceType === ModuleContentTypes.NULL && (
				<div className="px-4 min-h-[200px] flex items-center justify-center text-center flex-col">
					<h1 className="text-2xl leading-10 mb-1">No resource added</h1>
					<p className="text-base w-1/3">You can add videos, assessments, documents or interactive modules.</p>
				</div>
			)}
		</div>
	);
};

const WithDND = (props: React.ComponentProps<typeof AddModuleAccordion__Body>) => {
	return (
		<DragAndDropContainer>
			<AddModuleAccordion__Body {...props} />
		</DragAndDropContainer>
	);
};

export default WithDND;
