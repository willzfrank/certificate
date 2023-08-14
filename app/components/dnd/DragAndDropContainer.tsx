import * as React from 'react'
import DragAndDropContext from './DragAndDropContext'
import { DragAndDropState } from './types'

type DragAndDropContainerProps = {
  children: React.ReactNode
}

function DragAndDropContainer<T>({ children }: DragAndDropContainerProps) {
  const [isDragging, setIsDragging] = React.useState<boolean>(false)
  const [drag, setDrag] = React.useState<DragAndDropState>({
    elementId: undefined,
    children: undefined,
    position: 0,
    type: undefined,
  })

  const [drop, setDrop] = React.useState<DragAndDropState>({
    elementId: undefined,
    children: undefined,
    position: 0,
    type: undefined,
  })

  const handleStartDrag = React.useCallback((drag: DragAndDropState) => {
    setIsDragging(true)
    setDrag(drag)
  }, [])

  const handleEndDrag = React.useCallback(() => {
    setIsDragging(false)
    setDrag({
      elementId: undefined,
      children: undefined,
      position: 0,
      type: undefined,
    })
    setDrop({
      elementId: undefined,
      children: undefined,
      position: 0,
      type: undefined,
    })
  }, [])

  const dragAndDropList: DragAndDropState[] = []

  return (
    <DragAndDropContext.Provider
      value={{
        isDragging,
        handleDragEnd: handleEndDrag,
        handleDragStart: handleStartDrag,
        drag,
        drop,
        setDrag,
        setDrop,
        dragAndDropList,
      }}
    >
      <div>{children}</div>
    </DragAndDropContext.Provider>
  )
}

export default DragAndDropContainer
