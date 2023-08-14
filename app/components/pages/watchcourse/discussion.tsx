import * as React from 'react'
import { useAppSelector, useWatchSearchParams } from 'app/hooks'
import {
  useAddDiscussionCommentMutation,
  useGetCourseDiscussionCommentsQuery,
} from 'app/api/courseApi'
import { Button, DiscussionComment } from 'app/components'
import { USERTYPES } from 'app/types'



const Discussion = () => {
  const { id } = useAppSelector((store) => store.user)
  const courseId = useWatchSearchParams('courseId') as string

  const { data, isFetching } = useGetCourseDiscussionCommentsQuery(
    {
      courseId,
      page: 1,
      perPage: 10,
    },
    { refetchOnMountOrArgChange: true },
  )

  const [
    addNewComment,
    { isLoading: isAddingComment },
  ] = useAddDiscussionCommentMutation()

  const [commentText, setCommentText] = React.useState<string>('')

  const addCommentHandler = async () => {
    const res = await addNewComment({
      courseId: courseId as string,
      userId: id as string,
      commentText,
    }).unwrap()

    // @ts-ignore
    if (res.errors.length === 0) {
      setCommentText('')
    }

    // console.log(res);
  }

  return (
    <div className="py-6 min-h-[400px] w-[95%] mr-auto">
      <p className="text-xl mb-6">Discussion</p>

      <div className="my-6 space-y-4 flex flex-col items-end">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full h-[102px] outline-none border border-app-gray rounded p-4"
          placeholder="Ask a question, or introduce yourself"
        />
        <Button
          loading={isAddingComment}
          onClick={addCommentHandler}
          className="bg-app-pink py-3 px-8 text-sm rounded text-white"
        >
          Add comment
        </Button>
      </div>

      <div className="commentsContainer flex flex-col gap-4">
        {data?.data.pagedList.map((comment) => (
          <DiscussionComment
            key={comment.id}
            commentText={comment.text}
            dateCreated={comment.dateCreated}
            studentName={comment.user.name}
            profilePictureUrl={comment.user.profilePictureUrl}
            numberOfReplies={comment.numberOfReplies}
            commentId={comment.id}
            courseId={courseId as string}
            userType={comment.user.roleName.toLowerCase() as USERTYPES}
          />
        ))}
      </div>
    </div>
  )
}

export default Discussion
