import * as React from 'react'
import { DragAndDropContextType, DragAndDropState } from './types'

const EMPTY_DRAG_AND_DROP_STATE: DragAndDropState = {
  elementId: undefined,
  children: undefined,
  position: 0,
  type: undefined,
}

const DragAndDropContext = React.createContext<
  DragAndDropContextType<DragAndDropState>
>({
  handleDragStart: () => {},
  handleDragEnd: () => {},
  isDragging: false,
  drag: EMPTY_DRAG_AND_DROP_STATE,
  drop: EMPTY_DRAG_AND_DROP_STATE,
  setDrag: () => {},
  setDrop: () => {},
  dragAndDropList: [],
})

export default DragAndDropContext

export const useDragContext = () => {
  const dragAndDropContext = React.useContext(DragAndDropContext)
  return dragAndDropContext
}
