import React from "react";

interface ContentProps {
  question: string;
  infoQuestion: string;
  allOptions: string[];
}

const InstructorQanda = (props: ContentProps) => {
  return (
    <div>
      {" "}
      <div className="mb-6">
        <p className="text- text-[28px] font-medium text-muted my-1">
          {props.question}
        </p>
        <p className="text-base font-normal md:w-[60%] mb-8">
          {props.infoQuestion}
        </p>
        <div className="my-4 space-y-3 md:my-2 md:space-y-2">
          {props.allOptions.map((info, i) => (
            <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center" key = {i}>
              <input
                type={"radio"}
                role={"radio"}
                className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
                name={props.question}
              />

              <p className="md:text-base md:ml-4 ml-1 text-muted">{info}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { InstructorQanda };
