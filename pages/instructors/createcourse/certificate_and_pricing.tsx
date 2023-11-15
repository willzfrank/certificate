import { CreateCourseLayout } from 'app/components';

import { NextPageWithLayout } from 'app/types';

import * as React from 'react';
import Link from 'next/link';
import { useNotify, useWatchSearchParams, useAppSelector } from 'app/hooks';
import { CourseCreationContext } from 'app/contexts';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useRouter } from 'next/router';
import {
  useCreateNewCourse_CourseInfoMutation,
  useEditCourseDetailsMutation,
  useSetCoursePricingMutation,
} from 'app/api/courseCreationApi';
import { useUpdateModuleMutation } from 'app/api/courseCreationApi';
import { CourseCreationContextFields } from 'app/contexts/CourseCreationContext';

const Certificate_and_pricing: NextPageWithLayout<{}> = () => {
  const {
    courseInfo,
    updateCourseInfo,
    updateCertificateRequired,
    certificateRequired,
    courseModules,
    updateCourseModules,
    pricings,
    updatePricings,
  } = React.useContext(CourseCreationContext);
  const ddd = React.useContext(CourseCreationContext);
  // console.log(ddd?.pricings);
  const [updateModule, { isLoading: moduleLoading }] =
    useUpdateModuleMutation();

  console.log('certificateRequired', certificateRequired);

  const [checkboxes, setCheckboxes] = React.useState<boolean[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const router = useRouter();
  const { courseId } = router.query;

  const handleCertificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateCertificateRequired(e?.target?.value === 'yes');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value ? e.target.value : '0';
    let priceValue = parseFloat(value);

    updatePricings(
      pricings.map((price: any, index: number) => ({
        ...price,
        price: index === 0 ? priceValue : price.price, // Corrected
        subscriptionType: priceValue === 0 ? 'Free' : 'Standard',
      }))
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    // Set the course price to zero and subscriptionType to "Free" if checked
    if (isChecked) {
      updatePricings([
        {
          ...pricings[0],
          price: 0,
          subscriptionType: 'Free',
        },
        ...pricings.slice(1), // Keep the other pricing options unchanged
      ]);
    } else {
      // If unchecked, use the previous price (pricings[0].price)
      updatePricings([
        {
          ...pricings[0],
          price: pricings[0].price,
          subscriptionType: 'Standard',
        },
        ...pricings.slice(1), // Keep the other pricing options unchanged
      ]);
    }
  };
  React.useEffect(() => {
    if (courseModules) {
      setCheckboxes(
        courseModules.map((module) => (module?.paymentRequired ? true : false))
      );
    }
  }, [courseModules]);

  const toggleCheckbox = async (index: number) => {
    // Update the course module
    let { moduleId, ...rest } = courseModules[index];
    setCheckboxes((prev) => prev.map((box, i) => (i === index ? !box : box)));
    const res = await updateModule({
      courseId: courseInfo.id,
      moduleDetails: {
        id: moduleId,
        ...rest,
        paymentRequired: !checkboxes[index],
      },
    }).unwrap();
    if (res.errors.length === 0) {
      // Update course modules
      updateCourseModules(
        courseModules.map((module, i) =>
          i === index
            ? { ...module, paymentRequired: !module.paymentRequired }
            : module
        )
      );
    }
  };

  const [mode] = useWatchSearchParams(['mode']) as string[];

  const { id: userId } = useAppSelector((store) => store.user);

  const [createCourse, { isLoading, error, data, isError }] =
    useCreateNewCourse_CourseInfoMutation();

  const [editCourse, { isLoading: isEditingCourse, error: editCourseError }] =
    useEditCourseDetailsMutation();
  const [setPricing, { error: setPricingError }] =
    useSetCoursePricingMutation();

  const notify = useNotify();

  const onSubmit = async () => {
    try {
      // Update the course with certificate and pricing information and update pricing
      let promises = [
        editCourse({
          courseId: courseId as string,
          certificateRequired,
        }),
        setPricing({ courseId: courseId as string, pricing: pricings }),
      ];

      await Promise.all(promises);

      // Handle successful course update here
      // Redirect to the next step
      router.push(`./uploadimages?mode=edit&courseId=${courseId}`);
    } catch (error) {
      // Handle error
      notify({
        type: 'error',
        title: 'Error',
        description: 'An error occurred while updating the course',
      });
    }
  };

  React.useEffect(() => {
    updateCourseInfo({
      ...courseInfo,
      lastSavePoint: 3,
    });
  }, []);

  return (
    <div className="lg:py-6 overflow-y-auto overflow-x-hidden no-scrollbar">
      <div>
        <h5 className="text-black text-[15px] font-semibold">
          Does this course have a Certificate?
        </h5>
        {/* CERTIFICATION CHOICE  */}
        <div className="flex w-full gap-7 mb-5">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="certification"
              id="yes"
              value="yes"
              className="w-4 h-4 bg-white rounded-full border border-black cursor-pointer text-app-pink addCertificationInput"
              checked={certificateRequired}
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
              checked={!certificateRequired}
              onChange={handleCertificationChange}
            />
            <label htmlFor="no" className="text-black text-base font-semibold">
              No
            </label>
          </div>
        </div>{' '}
        {/* COURSE PRICING */}
        <div className="mb-5">
          <h5 className="text-black text-[15px] font-semibold mb-1">
            Course Price
          </h5>
          <div>
            <input
              className="w-[285px] h-[37px] bg-white border-2 border-black text-neutral-900 text-[14px] font-normal px-2 py-1 rounded"
              value={pricings[0]?.price}
              onChange={handlePriceChange}
              min="0"
              step=".01"
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              name=""
              id=""
              checked={pricings[0]?.price === 0} // Checked if the price is zero
              onChange={handleCheckboxChange}
            />
            <div className="text-black text-sm font-normal font-['Inter']">
              This course is free
            </div>
          </div>
        </div>{' '}
        <div className="mb-6 lg:w-full h-[189.08px] lg:h-full   md:w-[65%] overflow-x-auto no-scrollbar">
          <h5 className="text-black text-[15px] font-semibold mb-1 h-[50px]">
            Course Content
          </h5>

          {courseModules ? (
            courseModules.map((module, index) => (
              <div key={index}>
                <div className="flex">
                  <div className="border-[#EDEDED] border-t bg-[#F4F4F4] transition duration-500 cursor-pointer w-[491px] px-4 py-3 lg:pr-20 gap-1">
                    <div>
                      <div className="py-3">
                        <h5 className="text-app-dark-400 truncate">
                          Module {index} - {module.name}
                        </h5>
                        {/* <p className="text-muted text-[15px]">05 mins</p>
                         */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between flex-col items-center">
                    <div className="px-4 py-3 h-[90px] flex justify-center flex-col items-center">
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                        <label
                          className="relative inline-flex items-center mb-5 cursor-pointer"
                          data-tooltip-id="my-tooltip"
                          data-tooltip-html="Unlocking this module will make it accessible <br md:block /> to learners  without having to pay for the course. <br />This can allow learners to experience a part <br md:block /> of the course before deciding to pay for it. 
"
                          data-tooltip-place="top"
                        >
                          <input
                            type="checkbox"
                            value={''}
                            disabled={pricings[0]?.price === 0}
                            checked={
                              pricings[0]?.price !== 0 && checkboxes[index]
                            }
                            onChange={() => toggleCheckbox(index)}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-9 h-5 bg-gray-200 peer-focus:outline-none dark:peer-focus:app-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 ${
                              pricings[0]?.price === 0
                                ? 'bg-gray-600'
                                : 'peer-checked:bg-app-pink '
                            }`}
                          ></div>{' '}
                        </label>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                        <ReactTooltip
                          className="w-[100px] break-words"
                          id="my-tooltip" // Unique tooltip ID
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading course modules...</p>
          )}
        </div>
      </div>
      <div>
        <button
          className="text-app-pink border-2 border-app-pink px-8 py-2 rounded"
          onClick={onSubmit}
        >
          Next
        </button>
        {/* <Link href={mode === "edit" ? `./uploadimages?mode=edit&courseId=${courseId}` : "./uploadimages"}>
					<a className="text-app-pink border-2 border-app-pink px-8 py-2 rounded">Next</a>
				</Link> */}
      </div>
    </div>
  );
};

export default Certificate_and_pricing;

Certificate_and_pricing.getLayout = function (page) {
  return (
    <CreateCourseLayout title="Certificate and Pricing">
      {page}
    </CreateCourseLayout>
  );
};
