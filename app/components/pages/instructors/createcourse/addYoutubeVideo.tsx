import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewCourse__AddVideoToModuleMutation, useEditModuleVideoMutation } from "app/api/courseCreationApi";
import { CourseCreationContext } from "app/contexts";
import { VideoResourceType } from "app/types";
import { Button } from "app/components";
import { getVideoLength } from "app/utils";
import { useNotify } from "app/hooks";
import { Description } from "@headlessui/react/dist/components/description/description";

let ORDER = 0;

const AddYoutubeVideo = ({
	moduleId,
	initialValues,
	discard,
	isEditing,
}: {
	isEditing: boolean;
	moduleId: string;
	initialValues?: {
		videoName: string;
		videoUrl: string;
		videoDescription: string;
		videoId: string;
		startFrom: string;
		endAt: string;
	};
	discard: () => void;
}) => {
	const {
		courseInfo: { id: courseId },
	} = React.useContext(CourseCreationContext);

	const {
		control: formControl,
		setValue,
		handleSubmit: handleVideoSubmit,
	} = useForm<{
		videoName: string;
		videoUrl: string;
		videoDescription: string;
		startFrom: string;
		endAt: string;
	}>({
		defaultValues: {
			videoName: initialValues?.videoName ? initialValues?.videoName : "",
			videoUrl: initialValues?.videoUrl ? initialValues?.videoUrl : "",
			videoDescription: initialValues?.videoDescription ? initialValues?.videoDescription : "",
			startFrom: initialValues?.videoUrl ? initialValues?.startFrom : "",
			endAt: initialValues?.videoDescription ? initialValues?.endAt : "",
		},
	});

	const notify = useNotify();

	const [addVideo, { isLoading: isVideoLoading }] = useCreateNewCourse__AddVideoToModuleMutation();

	const [editVideo, { isLoading: isEditVideoLoading }] = useEditModuleVideoMutation();

	const videoSubmit: SubmitHandler<any> = async (data: { videoName: string; videoUrl: string; videoDescription: string; startFrom: string; endAt: string }) => {
		let { videoName, videoUrl, videoDescription, startFrom, endAt } = data;
		const formData = new FormData();
		formData.append("Name", videoName);
		formData.append("Description", videoDescription);
		formData.append("Order", (++ORDER).toString());
		formData.append("NumberOfSeconds", "" + (+endAt - +startFrom));
		formData.append("isYoutube", "true");
		formData.append("YoutubeLink", videoUrl);
		formData.append("startFrom", startFrom);
		formData.append("endAt", endAt);

		if (isEditing) {
			const res = await editVideo({
				courseId,
				moduleId,
				videoId: initialValues?.videoId as string,
				name: data.videoName,
				description: data.videoDescription,
				formData: formData,
				numberOfSeconds: (+endAt - +startFrom).toString(),
			}).unwrap();
			if (res.errors.length === 0) {
				notify({ title: "Successfully edited video", type: "success" });
			} else {
				notify({
					title: "Error",
					description: "An error occurred while editing video",
					type: "error",
				});
			}
		} else {
			await addVideo({ courseId, moduleId, formData }).unwrap();
		}
	};

	return (
		<form className="px-4 md:px-6 py-4" onSubmit={handleVideoSubmit(videoSubmit)}>
			<div>
				<div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
					<label htmlFor="videoName">Video Title</label>
					<input
						type="text"
						placeholder="Module 1"
						id="videoName"
						{...formControl.register("videoName", { required: true })}
						className="px-4 py-2 rounded border md:w-[450px] w-full text-[15px] text-muted focus:border-app-dark-500"
					/>
				</div>
				<div className="pt-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
					<label htmlFor="videoUrl">Video URL</label>
					<div className="relative">
						<input
							type="text"
							id="videoUrl"
							{...formControl.register("videoUrl", {
								onChange: (e) => {
									setValue("videoUrl", e.target.value);
								},
								required: true,
							})}
							className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
						/>
					</div>
				</div>

				<div className="pt-4 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start">
					<label htmlFor="#videoDescription">Video Description</label>
					<div className="relative">
						<textarea
							rows={4}
							id="description"
							{...formControl.register("videoDescription", { required: true })}
							className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
						/>
					</div>
				</div>
				<div className="w-1/2 mt-3 h-auto gap-5 flex justify-start items-center">
					<div className="w-1/2 h-full">
						<label htmlFor="startFrom" className="block mb-[5px]">
							Start Time(in seconds)
						</label>
						<input
							type="text"
							id="startFrom"
							placeholder="120 for (2:00)"
							className="w-full border-[1px] rounded-[5px] py-3 px-2"
							{...formControl.register("startFrom", { required: true })}
						/>
					</div>
					<div className="w-1/2 h-full">
						<label htmlFor="endAt" className="block mb-[5px]">
							End Time (in seconds)
						</label>
						<input
							type="text"
							id="endAt"
							placeholder="3640 for (01:10:40)"
							className="w-full border-[1px] rounded-[5px] py-3 px-2"
							{...formControl.register("endAt", { required: true })}
						/>
					</div>
				</div>
			</div>

			<div className="buttonContainer flex items-center justify-end gap-4 mt-10 mb-4">
				<Button type="button" className="text-app-pink border-2 border-app-pink px-8 py-2 rounded" onClick={discard}>
					Discard changes
				</Button>
				<Button type="submit" loading={isVideoLoading || isEditVideoLoading} className="text-white bg-app-pink border-2 border-app-pink px-8 py-2 rounded">
					Save changes
				</Button>
			</div>
		</form>
	);
};

export default AddYoutubeVideo;
