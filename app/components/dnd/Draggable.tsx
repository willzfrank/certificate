import * as React from "react";
import { motion } from "framer-motion";
import { useDragContext } from "./DragAndDropContext";
import { DraggableProps, DragAndDropState } from "./types";

const Draggable = ({ children, elementId, onDragClassName, onDropClassName, onDropCallback, position, contentType }: DraggableProps) => {
	const { handleDragEnd, handleDragStart, isDragging, setDrop, drag, drop } = useDragContext();

	const [isDraggingOver, setIsDraggingOver] = React.useState<boolean>(false);

	/**
	 * INTERNAL STATE OF THE `DRAGGABLE` COMPONENT
	 *
	 * All State Values are initialized from props and updated when drag and drop happens
	 *
	 * Contains the `children` field, and is used to determine what is rendered on screen
	 * The element id is the id of the element from the backend and is used when making the request
	 * the position is the current position of the draggable component (based on the backend values)
	 * type is the type of the current element (based on the backend value ---- ModuleContentTypes)
	 *
	 */
	const [elementState, setElementState] = React.useState<DragAndDropState>({
		elementId,
		children,
		position,
		type: contentType,
	});

	React.useEffect(() => {
		// console.log(elementState)
		if (!isDragging) {
			setIsDraggingOver(false);
		}
	}, [isDragging]);

	return (
		<motion.div
			draggable
			onDragStart={() => handleDragStart(elementState)}
			onDragEnd={() => {
				if (drop.elementId !== elementState.elementId) {
					setElementState({ ...drop, position });
				}
				// resets the values of drag and drop in the context
				handleDragEnd();
			}}
			onDragOver={(e) => {
				e.preventDefault();
				setIsDraggingOver(true);
				setDrop(elementState);
				return false;
			}}
			onDragLeave={() => setIsDraggingOver(false)}
			onDragEnter={() => setIsDraggingOver(true)}
			onDrop={(e) => {
				e.stopPropagation();

				// if you don't drop on yourself
				if (drag.elementId !== elementState.elementId) {
					setElementState({ ...drag, position });
					onDropCallback && onDropCallback();
				}
			}}
			className={`transition-all duration-200 cursor-move
        ${isDragging && drag.elementId === elementId ? onDragClassName : ""}
        ${isDraggingOver ? onDropClassName : ""}
        `}>
			{elementState.children}
		</motion.div>
	);
};

export default Draggable;
