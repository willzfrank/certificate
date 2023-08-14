import { ModuleContentTypes } from 'app/types';
import * as React from 'react';

export type DragAndDropElemId = string | number;

export type DraggableProps = {
    children: React.ReactNode;
    elementId: DragAndDropElemId;
    onDragClassName?: string
    onDropClassName?: string
    onDropCallback?: () => void;
    position: number
    contentType?: ModuleContentTypes
}

export type DragAndDropState = {
    elementId: DragAndDropElemId | undefined
    children: React.ReactNode
    position: number
    type: ModuleContentTypes | undefined
  }

export type DragAndDropContextType<T = any> = {
    isDragging: boolean;
    drag: DragAndDropState;
    drop: DragAndDropState;
    setDrag: React.Dispatch<React.SetStateAction<DragAndDropState>>
    setDrop: React.Dispatch<React.SetStateAction<DragAndDropState>>
    handleDragStart: (dragDetails: DragAndDropState) => void;
    handleDragEnd: () => void;
    dragAndDropList: Array<T>
}

