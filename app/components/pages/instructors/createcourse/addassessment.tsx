import * as React from 'react'
import { useCreateNewCourse__AddAssessmentToModuleMutation } from 'app/api/courseCreationApi'
import AddModuleTypeAssessment from './addmoduletypeassessment'
import { useNotify } from 'app/hooks'
import { Button } from 'app/components'



const AddAssessment = ({
  moduleId,
  courseId,
  discard,
}: {
  moduleId: string
  courseId: string
  discard: () => void
}) => {
  const notify = useNotify()

  const [
    createAssessment,
    { isLoading: isAssessmentLoading },
  ] = useCreateNewCourse__AddAssessmentToModuleMutation()

  type AssessmentComponentRef = React.ElementRef<typeof AddModuleTypeAssessment>

  const assessmentComponentRef = React.useRef<AssessmentComponentRef>()

  const handleAssessmentSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault()

    const assessmentValues = await assessmentComponentRef.current?.submitAssessmentValues()

    
    if (assessmentValues?.isValid) {
      const res = await createAssessment({
        ...assessmentValues,
        moduleId,
        courseId,
      }).unwrap()

      console.log(res)

    } else {
      notify({
        type: 'error',
        description: 'Please fill the required fields',
        title: 'Error',
      })
    }
  }

  return (
    <form className="px-4 md:px-6 py-4" onSubmit={handleAssessmentSubmit}>
      <AddModuleTypeAssessment
        moduleId={moduleId}
        // @ts-ignore
        ref={assessmentComponentRef}
      />
      <div className="buttonContainer flex items-center justify-end gap-4 mt-10 mb-4">
        <Button
          type="button"
          className="text-app-pink border-2 border-app-pink px-8 py-2 rounded"
          onClick={discard}
        >
          Discard changes
        </Button>
        <Button
          type="submit"
          loading={isAssessmentLoading}
          className="text-white bg-app-pink border-2 border-app-pink px-8 py-2 rounded"
        >
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default AddAssessment
