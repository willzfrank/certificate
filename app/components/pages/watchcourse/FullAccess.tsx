import React from 'react';
import { USER as USERMODEL, PricingPlan } from 'app/types';
import { motion } from 'framer-motion';
import {
  CheckDiscountCodeValidityResponse,
  ExternalCourse,
  SingleCourseDetailsResponse,
} from 'app/types';
import { Button, CustomizedLottie } from 'app/components';
import Link from 'next/link';

type DiscountDetailsType = {
  value: number;
  type: 'DiscountByPercentage' | 'DiscountByAbsoluteValue';
  hasAppliedDiscount: boolean;
  discountCode: string;
};

interface Props {
  closeModal: () => void;
  pricingPlan: PricingPlan;
  user: USERMODEL;
  discountDetails: DiscountDetailsType;
  setDiscountDetails: (arg: any) => void;
  applyDiscountCode: () => void;
  isCheckingCodeValidity: boolean;
  handlePay: (
    price: number,
    subscriptionType: string | number,
    title: string,
    pricingId: string
  ) => () => Promise<void>;
  confirmingPurchase: boolean;
  isLoadingCourseDetails: boolean;
  isLoading: boolean;
}

// interface Props {
//   closeModal: () => void;
//   pricingPlan: PricingPlan;
// }

const FullAccess = (props: Props) => {
  const [isApplyingDiscountCode, setIsApplyingDiscountCode] =
    React.useState(false);

  const {
    closeModal,
    pricingPlan,
    user,
    discountDetails,
    setDiscountDetails,
    applyDiscountCode,
    isCheckingCodeValidity,
    handlePay,
  } = props;
  return (
    <div className="flex items-center justify-center flex-col relative  bg-zinc-300  rounded p-10 md:px-20 md:py-12">
      <div>
        <div className="text-black md:text-[25px] font-bold text-center">
          Get Full Access!
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className=" w-[20px] md:w-[30px] h-10.5  cursor-pointer absolute top-5 right-10"
          onClick={closeModal}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className=" text-black sm:text-xs md:text-lg font-medium text-center">
          Subscribe for this course to get full access
        </div>
        <div className="flex mt-10 items-center gap-2">
          {/* DISCOUNT HERE */}
          <div className="space-y-4 w-full">
            {!isApplyingDiscountCode && user.id && (
              <button
                className=" text-black text-[15px] font-medium underline"
                onClick={() => setIsApplyingDiscountCode(true)}
              >
                Use Discount Code
              </button>
            )}
            {isApplyingDiscountCode && (
              <div className="overflow-clip ">
                <motion.div
                  className="bg-white rounded-lg p-1 text-muted h-14 flex"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 60 }}
                >
                  <input
                    className="h-full px-2 flex-1 uppercase"
                    maxLength={8}
                    readOnly={discountDetails.hasAppliedDiscount}
                    onChange={(e) =>
                      setDiscountDetails((prev: DiscountDetailsType) => ({
                        ...prev,
                        discountCode: e.target.value,
                      }))
                    }
                  />

                  <Button
                    className="border border-muted h-full text-sm px-4 rounded-lg"
                    onClick={applyDiscountCode}
                    loading={isCheckingCodeValidity}
                    disabled={discountDetails.hasAppliedDiscount}
                  >
                    Apply
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
          <div className="bg-red-600 px-7 py-1 rounded-lg cursor-pointer shadow-md ">
            <div>
              <button
                className=" text-white text-[18px] font-semibold rounded"
                onClick={handlePay(
                  pricingPlan?.price,
                  pricingPlan?.subscriptionType,
                  pricingPlan?.name,
                  pricingPlan?.id
                )}
              >
                Subscribe
              </button>
            </div>
            <div className="  text-white text-center text-[12px] font-medium">
              {pricingPlan.price > 0 ? (
                <span>₦{pricingPlan.price}</span>
              ) : (
                <span>₦0</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullAccess;
