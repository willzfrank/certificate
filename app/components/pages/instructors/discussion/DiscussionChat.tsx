import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import React from "react";

interface CommentProps {
  commentDetails: string;
}

interface Props {
  comment: CommentProps;
}

const DiscussionChat = ({ comment }: Props) => {
  return (
    <div className="md:border border-[#EAEAEA] md:p-6 rounded-lg">
      <div className="flex gap-4">
        <div className="mt-1 md:mt-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-app-dark text-white grid place-items-center">
          <p className="md:text-xl text-lg font-medium leading-[30px] tracking-[0.02em]">
            RN
          </p>
        </div>

        <div className="space-y-[8px] flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="md:space-y-2">
              <p>Roseline</p>
              <p className="text-muted">1hr ago</p>
            </div>
          </div>
          <p className="text-muted leading-[160%] tracking-[0.01em] text-sm">
            {comment.commentDetails}
          </p>
        </div>
      </div>
    </div>
  );
};

export { DiscussionChat };
