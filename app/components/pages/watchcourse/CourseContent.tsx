import * as React from "react";
import { ModuleContentTypes, SingleCourseDetailsResponse } from "app/types";
import { Accordion } from "app/components";
import ModuleDetailsAccordion from "./ModuleDetailsAccordion";

type CourseContentProps = {
	courseModules: SingleCourseDetailsResponse["modules"];
	courseId: string;
	openModuleId?: string;
	courseType?: "free" | "paid";
	subscribed: boolean;
	setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CourseContentWithRef: React.ForwardRefRenderFunction<
	{
		handleResourceClick: (resourceIndex: number, resourceType: ModuleContentTypes, moduleIndex: number) => void;
		autoClick: (resourceIndex: number) => void;
	},
	CourseContentProps
> = ({ courseModules, courseId, openModuleId, courseType = "paid", subscribed, setShowModal }, ref) => {
	return (
		<div className="bg-white">
			<Accordion.Group>
				{courseModules.map((module, moduleIndex) => (
					<ModuleDetailsAccordion
						courseId={courseId}
						courseType={courseType}
						subscribed={subscribed}
						module={module}
						moduleIndex={moduleIndex}
						key={module.moduleId}
						openModuleId={openModuleId}
						setShowModal={setShowModal}
						ref={ref}
					/>
				))}
			</Accordion.Group>
		</div>
	);
};

const CourseContent = React.forwardRef(CourseContentWithRef);

export default CourseContent;
