import React, { useState, ChangeEvent, FormEvent } from 'react';

const CoursePrice = () => {
  return (
    <div className="mb-5">
      <h5 className="text-black text-[15px] font-semibold mb-1">
        Course Price
      </h5>
      <div>
        <input
          className="w-[285px] h-[37px] bg-white border-2 border-black text-neutral-300 text-[14px] font-normal px-2 py-1 rounded"
          type="number"
          min="0"
          step=".01"
          placeholder="Enter Amount"
        />
      </div>
    </div>
  );
};

export default CoursePrice;
