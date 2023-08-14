import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Image, Button, Loader } from 'app/components'
import { useAppSelector } from 'app/hooks'
import { USERTYPES } from 'app/types'
import { getTimeDifference } from 'app/utils'
import {
  useAddCommentReplyMutation,
  useLazyGetCommentRepliesQuery,
} from 'app/api/courseApi'

interface DiscussionCommentProps {
  profilePictureUrl: string
  studentName: string
  dateCreated: string
  commentText: string
  numberOfReplies: number
  commentId: string
  courseId: string
  userType: USERTYPES
}

const DiscussionComment = (props: DiscussionCommentProps) => {
  const [shouldComment, setShouldComment] = React.useState(false)
  const { id: userId } = useAppSelector((store) => store.user)
  const [numberOfReplies, setNumberOfReplies] = React.useState(
    props.numberOfReplies,
  )

  const { register, handleSubmit, setValue } = useForm<{ commentText: string }>(
    {
      defaultValues: { commentText: '' },
    },
  )

  const [
    getCommentReplies,
    {
      data: commentReplies,
      isLoading: isGettingReplies,
      isSuccess: gotCommentReplies,
      error: getRepliesError,
    },
  ] = useLazyGetCommentRepliesQuery()

  const [
    addCommentReply,
    { isLoading: isAddingReply, isSuccess: addedReply },
  ] = useAddCommentReplyMutation()

  const onSubmit = handleSubmit(async (data) => {
    const res = await addCommentReply({
      courseId: props.courseId,
      replyText: data.commentText,
      parentMessageId: props.commentId,
      userId: userId as string,
    }).unwrap()

    // @ts-ignore
    if (res.errors.length === 0) {
      setValue('commentText', '')
      setNumberOfReplies(numberOfReplies + 1)
    }
  })

  React.useEffect(() => {
    ;(async function () {
      if (shouldComment && !gotCommentReplies) {
        await getCommentReplies({
          commentId: props.commentId,
          page: 1,
          perPage: 20,
        }).unwrap()
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldComment])

  return (
    <div className={'md:border border-[#EAEAEA] md:p-6 rounded-lg'}>
      <div className="flex gap-4">
        <div className="mt-1 md:mt-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-app-dark text-white grid place-items-center overflow-clip">
          {props.profilePictureUrl ? (
            <Image
              src={props.profilePictureUrl}
              alt={props.studentName}
              className="h-full w-full"
            />
          ) : (
            <p className="md:text-xl text-lg font-medium leading-[30px] tracking-[0.02em]">
              {props.studentName.split(' ')[0].charAt(0).toUpperCase() +
                props.studentName.split(' ')[1].charAt(0).toUpperCase()}
            </p>
          )}
        </div>

        <div className="space-y-[10px] flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="md:space-y-1">
              <p>
                {props.studentName}{' '}
                {props.userType === USERTYPES.INSTRUCTOR ? (
                  <span className="ml-3 p-1 bg-gray-600 text-white text-sm rounded px-2">
                    INSTRUCTOR
                  </span>
                ) : null}
              </p>
              <p className="text-muted text-sm">
                {getTimeDifference(props.dateCreated)}
              </p>
            </div>
          </div>
          <p
            className="text-muted leading-[160%] tracking-[0.01em]"
            style={{ overflowWrap: 'anywhere' }}
          >
            {props.commentText}
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end">
        <button
          className="flex gap-4 items-center"
          onClick={() => setShouldComment(!shouldComment)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evefnodd"
              d="M12.7149 12.7134C10.6775 14.7511 7.6605 15.1913 5.1916 14.0495C4.82712 13.9028 4.52831 13.7842 4.24423 13.7842C3.45298 13.7889 2.46809 14.5561 1.95622 14.0448C1.44435 13.5329 2.21216 12.5472 2.21216 11.7512C2.21216 11.4671 2.09826 11.1736 1.95153 10.8084C0.809205 8.33991 1.25006 5.32195 3.28749 3.28497C5.88838 0.683117 10.114 0.683118 12.7149 3.2843C15.3205 5.89017 15.3158 10.1122 12.7149 12.7134Z"
              stroke="#545454"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {numberOfReplies}
        </button>
      </div>

      {shouldComment && (
        <div className="w-[90%] ml-auto">
          <div className="flex my-6 items-center justify-between">
            <p className="font-semibold">
              {numberOfReplies} repl{numberOfReplies === 1 ? 'y' : 'ies'}
            </p>
            <Button
              className="flex gap-2 items-center"
              onClick={() => setShouldComment(false)}
            >
              Show less{' '}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33268 10.3335L7.99935 5.66683L12.666 10.3335"
                  stroke="#545454"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>

          <form onSubmit={onSubmit}>
            <textarea
              // ref={replyCommentTextAreaRef}
              {...register('commentText', { required: true })}
              className="w-full h-[102px] outline-none border border-app-gray rounded p-4"
              placeholder="Add comment"
            />
            <Button
              loading={isAddingReply}
              type="submit"
              className="ml-auto block px-8 py-3 border-2 border-app-gray-400 rounded"
            >
              Add Comment
            </Button>
          </form>

          <div>
            {isGettingReplies ? (
              <div className="flex items-center justify-center flex-col text-center min-h-[200px]">
                <Loader className="w-24 h-24" mainColor="red" />
                <p className="-mt-4 text-muted">Loading Comments...</p>
              </div>
            ) : getRepliesError ? (
              <div className="flex items-center justify-center flex-col text-center min-h-[200px]">
                <h1 className="text-2xl font-semibold mb-2">Aw Snap!</h1>
                <p className="text-muted text-center">
                  Something went wrong. Please try again later.
                </p>
                <Button
                  className="px-8 py-2 border-2 border-app-pink rounded text-app-pink hover:bg-app-pink hover:text-white mt-4 !h-auto"
                  onClick={() => {
                    getCommentReplies({
                      commentId: props.commentId,
                      page: 1,
                      perPage: 20,
                    }).unwrap()
                  }}
                >
                  Retry
                </Button>
              </div>
            ) : (
              commentReplies?.data.pagedList.map((reply) => (
                <DiscussionSubComment
                  key={reply.id}
                  profilePictureUrl={reply.user.profilePictureUrl}
                  studentName={reply.user.name}
                  dateCreated={reply.dateCreated}
                  commentText={reply.text}
                  numberOfReplies={reply.numberOfReplies}
                  commentId={reply.id}
                  courseId={props.courseId}
                  userType={reply.user.roleName.toLowerCase() as USERTYPES}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const DiscussionSubComment = (props: DiscussionCommentProps) => {
  return (
    <div className={'my-2 md:p-6 rounded-lg'}>
      <div className="flex gap-4">
        <div className="mt-1 md:mt-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-app-dark text-white grid place-items-center overflow-clip">
          {props.profilePictureUrl ? (
            <Image
              src={props.profilePictureUrl}
              alt={props.studentName}
              className="h-full w-full"
            />
          ) : (
            <p className="md:text-xl text-lg font-medium leading-[30px] tracking-[0.02em]">
              {props.studentName.split(' ')[0].charAt(0).toUpperCase() +
                props.studentName.split(' ')[1].charAt(0).toUpperCase()}
            </p>
          )}
        </div>

        <div className="space-y-[10px] flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="md:space-y-1">
              <p>
                {props.studentName}{' '}
                {props.userType === USERTYPES.INSTRUCTOR ? (
                  <span className="ml-3 p-1 bg-gray-600 text-white text-sm rounded px-2">
                    INSTRUCTOR
                  </span>
                ) : null}
              </p>
              <p className="text-muted text-sm">
                {getTimeDifference(props.dateCreated)}
              </p>
            </div>
          </div>
          <p
            className="text-muted leading-[160%] tracking-[0.01em]"
            style={{ overflowWrap: 'anywhere' }}
          >
            {props.commentText}
          </p>
        </div>
      </div>
    </div>
  )
}


export default DiscussionComment