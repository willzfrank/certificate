import React from "react";

interface InstructorFeaturesProp {
  value: number | string;
  title: string;
}

const InstructorFeatures = (props: InstructorFeaturesProp) => {
  return (
    <div>
      <div className="border p-6 w-full space-y-3 phone-md:w-[250px]">
        <div className="text-3xl font-normal">{props.value}</div>
        <div>{props.title}</div>
      </div>
    </div>
  );
};

export { InstructorFeatures };
