import * as React from 'react'
import {
  AddAssessment,
  AddDocument,
  AddVideo,
  AddInteractive,
} from 'app/components'
import {
  ModuleContentTypes,
  VideoResourceType,
  DocumentResourceType,
  AssessmentResourceType,
  SelectAnAnswerInteractiveResourceType,
  SelectAllThatApplyInteractiveResourceType,
  ClickAndMatchInteractiveResourceType,
  ThisOrThatInteractiveResourceType,
  FillInTheBlanksInteractiveResourceType,
  InteractiveTypes,
  ClickForMoreInteractiveResourceType,
  BoxWithOptionsInteractiveResourceType,
} from 'app/types'
import { CourseCreationContext } from 'app/contexts'

const AddModuleContentForm = function <T extends ModuleContentTypes>({
  moduleId,
  toggleEdit,
  initialValues,
  discard,
  isEditing = false,
  resourceType,
}: {
  moduleId: string
  initialValues?: T extends ModuleContentTypes.video
    ? VideoResourceType
    : T extends ModuleContentTypes.document
    ? DocumentResourceType
    : T extends ModuleContentTypes.assessment
    ? AssessmentResourceType
    : T extends ModuleContentTypes.selectAnAnswer
    ? SelectAnAnswerInteractiveResourceType
    : T extends ModuleContentTypes.allThatApply
    ? SelectAllThatApplyInteractiveResourceType
    : T extends ModuleContentTypes.clickAndMatch
    ? ClickAndMatchInteractiveResourceType
    : T extends ModuleContentTypes.fillInTheBlank
    ? FillInTheBlanksInteractiveResourceType
    : T extends ModuleContentTypes.thisOrThat
    ? ThisOrThatInteractiveResourceType
    : T extends ModuleContentTypes.clickForMore
    ? ClickForMoreInteractiveResourceType
    : T extends ModuleContentTypes.boxWithOption
    ? BoxWithOptionsInteractiveResourceType
    : never
  discard: () => void
  isEditing: boolean
  toggleEdit: () => void
  resourceType: T
}) {
  const {
    courseInfo: { id: courseId },
  } = React.useContext(CourseCreationContext)

  const isVideo = (resource: any): resource is VideoResourceType => {
    return (
      resourceType === ModuleContentTypes.video &&
      typeof resource?.value.videoUrl === 'string' &&
      typeof resource?.value.displayName === 'string'
    )
  }

  const isDocument = (resource: any): resource is DocumentResourceType => {
    return (
      resourceType === ModuleContentTypes.document &&
      typeof resource?.value.displayName === 'string' &&
      typeof resource?.value.documentUrl === 'string'
    )
  }

  // this shows up when you click on the edit button
  if (isDocument(initialValues))
    return (
      <AddDocument
        isEditing={isEditing}
        courseId={courseId}
        moduleId={moduleId}
        discard={discard}
        toggleEdit={toggleEdit}
        initialValues={{
          documentName: initialValues.value.displayName,
          documentDescription: initialValues.value.description,
          documentUrl: initialValues.value.documentUrl,
          documentId: initialValues.value.id,
        }}
      />
    )

  // this also shows up when you click the edit button, the initial values are sure to exist
  if (isVideo(initialValues))
    return (
      <AddVideo
        isEditing={initialValues.isInputing}
        moduleId={moduleId}
        initialValues={{
          videoName: initialValues.value.displayName,
          videoFile: initialValues.value.videoUrl,
          videoDescription: initialValues.value.description,
          videoId: initialValues.value.id,
        }}
        discard={initialValues.isInputing ? toggleEdit : discard}
      />
    )

  if (resourceType === ModuleContentTypes.assessment)
    return (
      <AddAssessment
        moduleId={moduleId}
        courseId={courseId}
        discard={discard}
      />
    )

  if (
    !(
      resourceType === ModuleContentTypes.document ||
      resourceType === ModuleContentTypes.assessment ||
      resourceType === ModuleContentTypes.video ||
      resourceType === ModuleContentTypes.NULL
    )
  )
    return (
      <AddInteractive
        discard={discard}
        moduleId={moduleId}
        isEditing={isEditing}
        interactiveType={(resourceType as unknown) as InteractiveTypes}
        initialValues={initialValues as any}
      />
    )

  // this shows up when you're creating a new document, the selected resourcet type is a document
  if (resourceType === ModuleContentTypes.document) {
    return (
      <AddDocument
        isEditing={false}
        courseId={courseId}
        moduleId={moduleId}
        discard={discard}
        toggleEdit={() => {}}
        initialValues={{
          documentName: '',
          documentDescription: '',
          documentId: '',
          documentUrl: '',
        }}
      />
    )
  }

  // if the selected resource type is not a document, an assessment or an interactive, it must be a video.
  // this is the default case
  return (
    <AddVideo
      isEditing={false}
      moduleId={moduleId}
      initialValues={{
        videoName: '',
        videoFile: '',
        videoDescription: '',
        videoId: '',
      }}
      discard={discard}
    />
  )
}

export default AddModuleContentForm
