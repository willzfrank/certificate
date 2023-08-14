import React, { useState } from 'react';

const AddCertification = () => {

  // const handleCertificationChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setCertification(e.target.value);
  // };

  return (
    <div className="flex w-full gap-7 mb-5">
      {/* <div className="flex items-center gap-2">
        <input
          type="radio"
          name="certification"
          id="yes"
          value="yes"
          className="w-4 h-4 bg-white rounded-full border border-black cursor-pointer text-app-pink addCertificationInput"
          checked={certification === 'yes'}
          onChange={handleCertificationChange}
        />
        <label htmlFor="yes" className="text-black text-base font-semibold">
          Yes
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="certification"
          id="no"
          value="no"
          className="w-4 h-4 bg-white rounded-full border border-black cursor-pointer addCertificationInput "
          checked={certification === 'no'}
          onChange={handleCertificationChange}
        />
        <label htmlFor="no" className="text-black text-base font-semibold">
          No
        </label>
      </div> */}
    </div>
  );
};

export default AddCertification;
