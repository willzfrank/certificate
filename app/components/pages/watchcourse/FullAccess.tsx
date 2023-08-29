import React, { useMemo } from "react";
import { PricingPlan } from "app/types";
import { motion } from "framer-motion";
import { Button } from "app/components";
import { useNotify } from "app/hooks";
import { useAppSelector } from "app/hooks";
import { selectUser } from "app/redux/slices/userSlice";
import { useAddSubscriptionMutation } from "app/api/subscriptionApi";
import { useScriptLoaded } from "app/hooks";

import { useCheckDiscountCodeValidityMutation } from "app/api/subscriptionApi";
import { useRouter } from "next/router";

type DiscountDetailsType = {
	value: number;
	type: "DiscountByPercentage" | "DiscountByAbsoluteValue";
	hasAppliedDiscount: boolean;
	discountCode: string;
};

interface Props {
	closeModal: () => void;
	pricings: any;
	courseId: string;
	setIsSubscribed: React.Dispatch<React.SetStateAction<boolean | null>>;
	isExternal: boolean;
}

const freePlan: PricingPlan = {
	id: `${Number.MAX_SAFE_INTEGER}`,
	offers: [],
	name: "Free",
	subscriptionType: "Free",
	price: 0,
};

// interface Props {
//   closeModal: () => void;
//   pricingPlan: PricingPlan;
// }

const FullAccess = (props: Props) => {
	const { closeModal, pricings, courseId, setIsSubscribed, isExternal } = props;
	const status = useScriptLoaded("https://checkout.flutterwave.com/v3.js");
	const [isApplyingDiscountCode, setIsApplyingDiscountCode] = React.useState(false);
	const notify = useNotify();
	const pricingPlan = useMemo<PricingPlan>(() => pricings[0] ?? freePlan, [pricings]);
	const [checkCodeValidity, { isLoading: isCheckingCodeValidity }] = useCheckDiscountCodeValidityMutation();
	const user = useAppSelector(selectUser);
	const [addSubscription, { isLoading, error, isError, isSuccess }] = useAddSubscriptionMutation();

	const router = useRouter();

	const [discountDetails, setDiscountDetails] = React.useState<DiscountDetailsType>({
		value: 0,
		type: "DiscountByPercentage",
		hasAppliedDiscount: false,
		discountCode: "",
	});

	const applyDiscountCode = React.useCallback(async () => {
		console.log(discountDetails);
		try {
			const res = await checkCodeValidity(discountDetails.discountCode).unwrap();
			if (res.data.isValid) {
				setDiscountDetails({
					...discountDetails,
					hasAppliedDiscount: true,
					value: res.data.value,
					type: res.data.discountType,
				});
				notify({
					type: "success",
					title: `Discount code ${res.data.code.toUpperCase()} applied successfully`,
					description: "Please process to make payment",
				});
			} else {
				notify({
					type: "error",
					title: `Discount code ${res.data.code.toUpperCase()} not valid`,
				});
			}
		} catch (error) {
			notify({
				type: "error",
				title: "Failed to apply discount code",
				description: (error as any).data.errors[0].errorMessages[0],
			});
		}
		// eslint-disable-next-line
	}, [discountDetails]);

	const handlePay = (price: number, subscriptionType: string | number, title: string, pricingId: string) => async () => {
		if (price === 0) {
			try {
				const {
					data: { id, referenceNumber },
				} = await addSubscription({
					studentId: user?.id as string,
					courseId,
					amountPaid: price,
					subscriptionType,
					channel: "Card",
					source: "Web",
					discountCode: discountDetails.hasAppliedDiscount ? discountDetails.discountCode : undefined,
					coursePricingId: pricingId,
				}).unwrap();
				// await trigger({ tx_ref: referenceNumber }).unwrap();
				setIsSubscribed(true);
				router.push(`/paymentProcess?tx_ref=${referenceNumber}`);
			} catch (error) {
				//@ts-ignore
				if (error?.status === 400 || error?.status === 401) {
					router.push("/auth/register");
					notify({
						title: "Couldn't enroll for this course.",
						description: "Please create an account to enrol for this course.",
						type: "error",
					});
				}

				//@ts-ignore
				if (error?.status >= 500) {
					notify({
						title: "Could not enroll for this course",
						description: "The fault is on us. Please reach out to our customer support",
						type: "error",
					});
				}
			}

			return;
		}

		if (status === "ready" && window) {
			const config = {
				public_key: isExternal ? process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY_NEXFORD : process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY_TEST || process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
				tx_ref: "",
				amount: price,
				currency: "NGN",
				meta: {},

				payment_options: "card,mobilemoney,ussd",
				customer: {
					email: user?.email,
					name: `${user?.lastName} ${user?.firstName}`,
				},
				customizations: {
					title: `${title} package`,
				},
				redirect_url: `${window?.location?.origin}/paymentProcess/${courseId}?isExternal=${isExternal}`,
			};

			try {
				const {
					data: { id, referenceNumber },
				} = await addSubscription({
					studentId: user?.id as string,
					courseId,
					amountPaid: price,
					subscriptionType,
					channel: "Card",
					source: "Web",
					coursePricingId: pricingId,
					discountCode: discountDetails.hasAppliedDiscount ? discountDetails.discountCode : undefined,
				}).unwrap();

				config.meta = { id, referenceNumber };
				config.tx_ref = referenceNumber;
				// console.log(config)

				// @ts-ignore
				window.FlutterwaveCheckout(config);
			} catch (error) {
				// @ts-ignore
				if (error?.status === 400 || error?.status === 401) {
					router.push("/auth/register");
					notify({
						title: "Couldn't enroll for this course.",
						description: "Please create an account to enrol for this course.",
						type: "error",
					});
				} else {
					notify({
						title: "Couldn't process payment",
						description: JSON.stringify(error),
						type: "error",
					});
				}
			}
		}
	};

	return (
		<div className="flex items-center justify-center flex-col relative  bg-zinc-300  rounded p-10 md:px-20 md:py-12">
			<div>
				<div className="text-black md:text-[25px] font-bold text-center">Get Full Access!</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="2.5"
					stroke="currentColor"
					className=" w-[20px] md:w-[30px] h-10.5  cursor-pointer absolute top-5 right-10"
					onClick={closeModal}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
				<div className=" text-black sm:text-xs md:text-lg font-medium text-center">Subscribe for this course to get full access</div>
				<div className="flex mt-10 items-center gap-2">
					{/* DISCOUNT HERE */}
					<div className="space-y-4 w-full">
						{!isApplyingDiscountCode && user.id && (
							<button className=" text-black text-[15px] font-medium underline" onClick={() => setIsApplyingDiscountCode(true)}>
								Use Discount Code
							</button>
						)}
						{isApplyingDiscountCode && (
							<div className="overflow-clip ">
								<motion.div className="bg-white rounded-lg p-1 text-muted h-14 flex" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 60 }}>
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
										disabled={discountDetails.hasAppliedDiscount}>
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
								onClick={handlePay(pricingPlan?.price, pricingPlan?.subscriptionType, pricingPlan?.name, pricingPlan?.id)}>
								Subscribe
							</button>
						</div>
						<div className="  text-white text-center text-[12px] font-medium">{pricingPlan.price > 0 ? <span>₦{pricingPlan.price}</span> : <span>₦0</span>}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FullAccess;
