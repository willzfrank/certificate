import { BoxWithAppropriateOptionFormvalues } from 'app/types'
import * as React from 'react'
import InteractivePreviewContainer from './InteractivePreviewContainer'

const BoxWithAppropriateOptionInteractivePreview = ({
  initialValues,
  shouldShow,
  onClose,
}: {
  initialValues: BoxWithAppropriateOptionFormvalues
  shouldShow: boolean
  onClose: VoidFunction
}) => {
  const [isCorrect, setIsCorrect] = React.useState<boolean>(false)
  const [hasSelected, setHasSelected] = React.useState<boolean>(false)

  return (
    <InteractivePreviewContainer
      isCompleted={hasSelected}
      isIncorrect={!isCorrect}
      isOpen={shouldShow}
      closeModal={() => onClose()}
    >
      <div className="space-y-4 my-4">
        <p className="text-center text-xl">{initialValues?.title}</p>
        <p className="text-muted text-center my-1 w-3/4 mx-auto">
          {initialValues?.question}
        </p>
      </div>

      <div className="flex flex-wrap mt-10 gap-4 justify-around">
        {initialValues.boxes.map((box, index) => (
          <button
            onClick={() => {
              setIsCorrect(box.isCorrect)
              setHasSelected(true)
            }}
            key={box.id || index}
            className={`box flex-1 p-4 bg-[#B3B1C9] min-h-[250px] min-w-[250px] flex items-center justify-center flex-col text-center ${
              hasSelected
                ? box.isCorrect
                  ? 'bg-[#3CAE5580]'
                  : 'bg-[#B4353580]'
                : ''
            }`}
            dangerouslySetInnerHTML={{ __html: box.value }}
          />
        ))}
      </div>
    </InteractivePreviewContainer>
  )
}

export default BoxWithAppropriateOptionInteractivePreview
