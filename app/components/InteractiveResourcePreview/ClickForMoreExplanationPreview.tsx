import * as React from 'react'
import { ClickForMoreExplanationFormValues } from 'app/types'
import InteractivePreviewContainer from './InteractivePreviewContainer'
import { Image } from '../elements'

interface ClickForMoreExplanationInteractivePreviewProps {
  shouldShow: boolean
  onClose: (isCorrect?: boolean) => void
  initialValues: ClickForMoreExplanationFormValues
}

const ClickForMoreExplanationPreview = ({
  shouldShow,
  onClose,
  initialValues,
}: ClickForMoreExplanationInteractivePreviewProps) => {
  const [activeButtonIndex, setActiveButtonIndex] = React.useState<
    number | null
  >(null)

  return (
    <InteractivePreviewContainer
      isOpen={shouldShow}
      closeModal={() => onClose(true)}
      isCompleted={false}
      isIncorrect={false}
    >
      <div className="interactive-head text-center">
        <h1 className="text-xl my-2">{initialValues.title}</h1>
        <p className="text-muted leading-6 w-2/3 mx-auto">
          {initialValues.content}
        </p>
      </div>

      <Image
        className="w-[350px] aspect-video rounded border overflow-clip my-[40px] mx-auto"
        src={
          initialValues.image instanceof FileList
            ? URL.createObjectURL(initialValues.image[0])
            : initialValues.image
        }
        objectFit="contain"
        objectPosition={'center'}
        alt={''}
      />

      <div className="flex gap-4 w-[90%] mx-auto mb-4">
        {initialValues.buttons.map((button, index) => (
          <button
            key={index}
            className={`py-4 flex-1 ${
              activeButtonIndex === index ? 'bg-blue-500' : 'bg-[#B3B1C9]'
            }`}
            onClick={() => setActiveButtonIndex(index)}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="explanation-container text-center w-[90%] mx-auto py-4">
        {activeButtonIndex !== null ? (
          <p>{initialValues.buttons[activeButtonIndex].content}</p>
        ) : null}
      </div>
    </InteractivePreviewContainer>
  )
}

export default ClickForMoreExplanationPreview
