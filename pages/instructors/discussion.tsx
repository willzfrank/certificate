import type { NextPageWithLayout } from "app/types";
import { DiscussionChat, InstructorsLayout } from "app/components";
import { ChangeEvent, useState } from "react";

interface CommentProps {
  commentDetails: string;
}
const InstructorDiscussion: NextPageWithLayout<{}> = () => {
  const [comment, setComment] = useState<string>("");
  const [commentList, setCommentList] = useState<CommentProps[]>([]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // if(event.target.name === "comment"){
    //   setComment(event.target.value)
    // }
    setComment(event.target.value);
  };

  const addComment = (): void => {
    const newComment = { commentDetails: comment };
    setCommentList([newComment, ...commentList]);
    setComment("");
  };
  return (
    <div>
      <div className="flex">
        <p className="font-medium text-xl">Discussion forum</p>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 8.5L12 15.5L5 8.5"
            stroke="#2F2D37"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="md:w-[65%]">
        <div className="my-6 space-y-4 flex flex-col items-end">
          {/* <label htmlFor="bio" className="block mb-2 font-normal text-base">
          About me
        </label> */}
          <textarea
            name="comment"
            className="w-full h-[102px] outline-none border border-app-gray rounded p-4"
            placeholder="Type a message for your students..."
            id="comment"
            rows={4}
            value={comment}
            onChange={handleChange}
          ></textarea>

          <button
            onClick={addComment}
            className="bg-app-pink py-3 px-8 text-sm rounded text-white  "
          >
            Post
          </button>
        </div>
        <div>
          {commentList.map((comment: CommentProps, key: number) => {
            return <DiscussionChat key={key} comment={comment} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default InstructorDiscussion;

InstructorDiscussion.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>;
};
