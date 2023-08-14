import * as React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useCreateNewCourse__AddDocumentToModuleMutation,
  useEditModuleDocumentMutation,
} from 'app/api/courseCreationApi'
import AddModuleTypeDocument from './AddModuleTypeDocument'
import { Button } from 'app/components'
import { DocumentResourceType } from 'app/types'
import { useNotify } from 'app/hooks'

const AddDocument = ({
  initialValues,
  courseId,
  moduleId,
  discard,
  isEditing,
  toggleEdit,
}: {
  initialValues: {
    documentName: string
    documentUrl: string
    documentDescription: string
    documentId: string
  }
  courseId: string
  moduleId: string
  discard: () => void
  toggleEdit: () => void
  isEditing: boolean
}) => {
  const {
    control: documentFormControl,
    handleSubmit: handleDocumentSubmit,
  } = useForm<{
    documentName: string
    documentFile: string
    documentDescription: string
  }>({
    defaultValues: {
      documentName: initialValues.documentName,
      documentFile: initialValues.documentUrl,
      documentDescription: initialValues.documentDescription,
    },
  })

  const [
    addDocument,
    { isLoading: isUploadingDocument },
  ] = useCreateNewCourse__AddDocumentToModuleMutation()

  const [
    editDocument,
    { isLoading: isEditingDocument },
  ] = useEditModuleDocumentMutation()

  const notify = useNotify()

  const documentSubmit: SubmitHandler<any> = async (data: {
    documentName: string
    documentFile: FileList
    documentDescription: string
  }) => {
    const formData = new FormData()

    if (isEditing) {
      const uploadedNewDocument = data.documentFile[0] instanceof Blob

      if (uploadedNewDocument) {
        formData.append(
          'documentToUpload',
          data.documentFile[0],
          data.documentFile[0].name,
        )
      }

      const res = await editDocument({
        courseId,
        moduleDocumentId: initialValues.documentId,
        documentName: data.documentName,
        documentDescription: data.documentDescription,
        formData: formData,
        moduleId,
      }).unwrap()

      if (res.errors.length === 0) {
        notify({
          title: 'Success',
          description: 'Document has been edited succesfully',
          type: 'success',
        })
      }
    } else {
      formData.append('Name', data.documentName)
      formData.append(
        'DocumentToUpload',
        data.documentFile[0],
        data.documentFile[0].name,
      )
      formData.append('Description', data.documentDescription)

      addDocument({ courseId, moduleId, formData }).unwrap()
    }
  }

  return (
    <form
      className="px-4 md:px-6 py-4"
      onSubmit={handleDocumentSubmit(documentSubmit)}
    >
      <AddModuleTypeDocument formControl={documentFormControl} isEditing = {isEditing}/>

      <div className="buttonContainer flex items-center justify-end gap-4 mt-10 mb-4">
        <Button
          type="button"
          className="text-app-pink border-2 border-app-pink px-8 py-2 rounded"
          onClick={isEditing ? toggleEdit : discard}
        >
          Discard changes
        </Button>
        <Button
          type="submit"
          loading={isUploadingDocument || isEditingDocument}
          className="text-white bg-app-pink border-2 border-app-pink px-8 py-2 rounded"
        >
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default AddDocument
