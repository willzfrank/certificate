import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  useCreateNewCourse__AddVideoToModuleMutation,
  useEditModuleVideoMutation,
} from 'app/api/courseCreationApi'
import { CourseCreationContext } from 'app/contexts'
import { VideoResourceType } from 'app/types'
import { Button } from 'app/components'
import { getVideoLength } from 'app/utils'
import { useNotify } from 'app/hooks'

let ORDER = 0

const validateVideo = (videoFile?: File) => {
  if (
    videoFile &&
    videoFile.name.match(/.(mp4|mkv|mov|avi|webm)$/i) &&
    videoFile.size / 1000 < 1000000 // should be less than 1gb
  ) {
    return true
  }
  return false
}

const AddVideo = ({
  moduleId,
  initialValues,
  discard,
  isEditing,
}: {
  isEditing: boolean
  moduleId: string
  initialValues: {
    videoName: string
    videoFile: string
    videoDescription: string
    videoId: string
  }
  discard: () => void
}) => {
  const {
    courseInfo: { id: courseId },
  } = React.useContext(CourseCreationContext)

  const {
    control: formControl,
    setValue,
    handleSubmit: handleVideoSubmit,
  } = useForm<{
    videoName: string
    videoFile: string
    videoDescription: string
  }>({
    defaultValues: {
      videoName: initialValues.videoName,
      videoFile: initialValues.videoFile,
      videoDescription: initialValues.videoDescription,
    },
  })

  const notify = useNotify()

  const [
    addVideo,
    { isLoading: isVideoLoading },
  ] = useCreateNewCourse__AddVideoToModuleMutation()

  const [
    editVideo,
    { isLoading: isEditVideoLoading },
  ] = useEditModuleVideoMutation()

  const videoSubmit: SubmitHandler<any> = async (data: {
    videoName: string
    videoFile: FileList
    videoDescription: string
  }) => {
    const formData = new FormData()

    if (isEditing) {

      const uploadedNewVideo = data.videoFile[0] instanceof Blob

      if (data.videoFile[0] instanceof Blob) {
        formData.append(
          'videoToUpload',
          data.videoFile[0],
          data.videoFile[0].name,
        )
      }

      const videoLength = uploadedNewVideo ? await getVideoLength(data.videoFile[0], document) : 0

      const res = await editVideo({
        courseId,
        moduleId,
        videoId: initialValues.videoId,
        name: data.videoName,
        description: data.videoDescription,
        formData: formData,
        numberOfSeconds: videoLength.toString()
      }).unwrap()

      if (res.errors.length === 0) {
        notify({ title: 'Successfully edited video', type: 'success' })
      } else {
        notify({
          title: 'Error',
          description: 'An error occurred while editing video',
          type: 'error',
        })
      }
    } else {
      formData.append('Name', data.videoName)
      formData.append(
        'VideoToUpload',
        data.videoFile[0],
        data.videoFile[0].name,
      )
      formData.append('Description', data.videoDescription)
      formData.append('Order', (++ORDER).toString())

      const videoLength = await getVideoLength(data.videoFile[0], document)

      formData.append('NumberOfSeconds', videoLength.toString())

      await addVideo({ courseId, moduleId, formData }).unwrap()
    }
  }

  const [fileError, setFileError] = React.useState(false) 

  return (
    <form
      className="px-4 md:px-6 py-4"
      onSubmit={handleVideoSubmit(videoSubmit)}
    >
      <div>
        <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
          <label htmlFor="videoName">Video Title</label>
          <input
            type="text"
            placeholder="Module 1"
            id="videoName"
            {...formControl.register('videoName', { required: true })}
            className="px-4 py-2 rounded border md:w-[450px] w-full text-[15px] text-muted focus:border-app-dark-500"
          />
        </div>
        <div className="pt-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
          <label htmlFor="videoFile">Video</label>
          <div className="relative">
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              {...formControl.register('videoFile', {
                onChange: (e) => {
                  const file = e?.target?.files ? e?.target.files[0] : null
                  if (validateVideo(file as File)) {
                    setFileError(false)
                  } else {
                    setValue('videoFile', '')

                    setFileError(true)
                  }
                },
                required: !isEditing,
              })}
              className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
            />
          </div>
          <div></div>
          {fileError ? (
            <p className="text-app-pink text-sm w-full italic py-1">
              <strong>Invalid File!</strong> File must be less than 1GB and
              must end in either .mp4, .mkv, .mov, .avi, .png or .webm
            </p>
          ) : null}
        </div>

        <div className="pt-4 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start">
          <label htmlFor="#videoDescription">Video Description</label>
          <div className="relative">
            <textarea
              rows={4}
              id="videoFile"
              {...formControl.register('videoDescription', { required: true })}
              className="px-4 text-sm py-2 rounded border md:w-[450px] w-full text-muted focus:border-app-dark-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-[100px,1fr] md:grid-cols-[150px,1fr] items-center my-2">
          <p></p>
          <p className="text-sm text-muted">
            Video size shouldn&apos;t exceed 1GB{' '}
          </p>
        </div>
      </div>

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
          loading={isVideoLoading || isEditVideoLoading}
          className="text-white bg-app-pink border-2 border-app-pink px-8 py-2 rounded"
        >
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default AddVideo
