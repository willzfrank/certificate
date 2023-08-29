import React, { useState, useEffect, Fragment, ReactNode, useMemo } from "react";
import { Checkbox, Image, StarRating, Modal, VideoPlayer, Button, CustomizedLottie, FallbackImage } from "app/components";
import { CheckDiscountCodeValidityResponse, ExternalCourse, SingleCourseDetailsResponse } from "app/types";
import { useAddSubscriptionMutation, useCheckDiscountCodeValidityMutation } from "app/api/subscriptionApi";
import { useAppSelector, useScriptLoaded, useNotify } from "app/hooks";
import { useRouter } from "next/router";
import useFreeModulesAvailable from "app/hooks/useFreeModulesAvailable";

import checkLottie from "app/lotties/check.json";
import { motion } from "framer-motion";
import { useLazyGetSingleCoursePreviewQuery } from "app/api/courseApi";
import { USER as USERMODEL, PricingPlan } from "app/types";
import { selectUser } from "app/redux/slices/userSlice";
import Link from "next/link";
import { useLazyPaymentConfirmQuery, usePaymentConfirmQuery } from "app/api/confirmPaymentApi";
import { getTime } from "app/utils";
import FullAccess from "../watchcourse/FullAccess";

const freePlan: PricingPlan = {
	id: `${Number.MAX_SAFE_INTEGER}`,
	offers: [],
	name: "Free",
	subscriptionType: "Free",
	price: 0,
};

const memoizedCheckLottieConfig = {
	loop: false,
	autoplay: true,
	animationData: checkLottie,
};

const CourseDetailsHero = (props: ExternalCourse) => {
	const [pricingPlan, setPricingPlan] = useState<PricingPlan>(props.pricings[0] ?? freePlan);

	const status = useScriptLoaded("https://checkout.flutterwave.com/v3.js");
	const [videoModalOpen, setVideoModalOpen] = useState(false);
	const [accessModal, setAccessModal] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
	const [addSubscription, { isLoading, error, isError, isSuccess }] = useAddSubscriptionMutation();
	const [accessCourse, setAccessCourse] = useState(false);
	const [showAccessButton, setShowAccessButton] = useState(true);

	const handleAccessCourse = () => {
		setShowAccessButton(false);
		setAccessCourse(true);
	};

	const [trigger, { isLoading: confirmingPurchase }] = useLazyPaymentConfirmQuery();

	const notify = useNotify();
	const { token } = useAppSelector((store) => store.user);
	const freeModulesAvailable = useFreeModulesAvailable(props?.modules);

	const [getCourseDetails, { isFetching: isLoadingCourseDetails }] = useLazyGetSingleCoursePreviewQuery();

	const router = useRouter();
	const { asPath } = useRouter();

	type DiscountDetailsType = {
		value: number;
		type: "DiscountByPercentage" | "DiscountByAbsoluteValue";
		hasAppliedDiscount: boolean;
		discountCode: string;
	};

	const [discountDetails, setDiscountDetails] = React.useState<DiscountDetailsType>({
		value: 0,
		type: "DiscountByPercentage",
		hasAppliedDiscount: false,
		discountCode: "",
	});

	React.useEffect(() => {
		if (discountDetails.hasAppliedDiscount) {
			setPricingPlan((pricingPlan) => ({
				...pricingPlan,
				price: discountDetails.type === "DiscountByAbsoluteValue" ? discountDetails.value : pricingPlan.price - Math.floor(pricingPlan.price * (discountDetails.value / 100)),
			}));
		}
	}, [discountDetails.hasAppliedDiscount, discountDetails.value, discountDetails.type]);

	useEffect(() => {
		(async () => {
			if (token) {
				try {
					const res = await getCourseDetails({
						courseId: props.id,
						token: token,
					}).unwrap();

					setIsSubscribed(res.isSubscribed);
				} catch (err) {
					console.log(err);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	useEffect(() => {
		if (error || isError) {
			// @ts-ignore
			if (error?.status === 401) {
				router.push(`/auth/register?redirectTo=${asPath}`);
			}
		}
	}, [error, isError, router, asPath]);

	const user = useAppSelector(selectUser);
	const [profile, setProfile] = useState<USERMODEL | null>(null);

	useEffect(() => {
		if (user?.id) {
			setProfile({ ...user });
		}
	}, [user]);

	const closeModal = () => {
		setAccessModal(false);
	};

	const openModal = () => {
		setAccessModal(true);
	};

	return (
		<React.Fragment>
			<div className="min-h-[65vh] lg:px-14 lg:py-20 lg:bg-app-dark-500 lg:text-white flex flex-col overflow-y-auto no-scrollbar">
				<div className="flex flex-col lg:flex-row lg:divide-x-2 lg:divide-[#2E284A] h-full items-stretch flex-1">
					<div className="lg:w-[63%] lg:h-[calc(65vh-4rem)] h-full lg:flex lg:items-center gap-8">
						<div className="h-[30vh] lg:h-[400px] w-full lg:w-[300px] relative rounded-lg overflow-clip">
							<Image src={props.imageUrl} alt="course image" className="!absolute h-full w-full" objectFit="cover" objectPosition={"top center"} />
							<button
								onClick={() => setVideoModalOpen(true)}
								className="w-20 h-20 rounded-full bg-[#FEFCF280] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
								<svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M29.5317 14.992C31.6827 16.234 31.6828 19.3388 29.5317 20.5807L5.33223 34.5522C3.18117 35.7942 0.492332 34.2418 0.492332 31.7579V3.8148C0.492332 1.33097 3.18116 -0.221436 5.33223 1.02048L29.5317 14.992Z"
										fill="#130F26"
										fillOpacity="0.5"
									/>
								</svg>
							</button>
						</div>

						<div className="flex-1 lg:pr-8 space-y-[16px] lg:space-y-[20px] p-6 lg:pl-0">
							<p className="text-xl lg:text-2xl font-semibold lg:mb-4">{props.name}</p>
							<p className="text-muted lg:text-[#D1CFDB] leading-[1.8rem]">{props.description}</p>
							<div className="flex gap-2">
								<StarRating rating={Number((props.ratings / (props.ratingsCount || 1)).toPrecision(2))} over={5} starClassName="scale-130" containerClassName="!gap-2" />
								<div className="stars flex gap-1 items-center"></div>

								<p className="text-muted lg:text-[#D1CFDB]">
									{(props.ratings / (props.ratingsCount || 1)).toPrecision(2)}
									/5.0 ({props.ratingsCount} reviews)
								</p>
							</div>

							<p className="text-muted lg:text-[#D1CFDB]">
								Duration: ({props.modules.length} lessons) {getTime(props.totalNumberOfSeconds * 1000, "HH hours, MM minutes", "relative")}
							</p>
							<p className="text-muted lg:text-[#D1CFDB]">Instructor(s): {props.instructors.map((instructor) => instructor.name).join(", ")}</p>
						</div>
					</div>

					<div className="lg:w-[37%] lg:h-[calc(65vh-4rem)] h-full pl-14 lg:pt-4 bg-app-dark-500 px-6 py-10 text-white flex flex-col justify-between">
						<div>
							<p className="text-xl font-semibold mb-3">Pricing</p>
							{props.pricings.map((plan) => (
								<div
									key={plan.name}
									className="flex gap-[12px] my-4 items-start"
									onClick={() =>
										discountDetails.hasAppliedDiscount
											? setPricingPlan({
													...plan,
													price:
														discountDetails.type === "DiscountByAbsoluteValue"
															? discountDetails.value
															: plan.price - Math.floor(plan.price * (discountDetails.value / 100)),
											  })
											: setPricingPlan(plan)
									}>
									<Checkbox value={pricingPlan?.name === plan.name} />
									<div className="flex-1">
										<p className="font-semibold">
											{/* {plan.name}{' '} */}
											{discountDetails.hasAppliedDiscount ? (
												<div className="inline-flex gap-4 ml-2">
													<span className="text-white line-through">₦ {plan.price}</span>
													<span className="text-white">
														₦
														{discountDetails.type === "DiscountByAbsoluteValue"
															? discountDetails.value
															: plan.price - Math.floor(plan.price * (discountDetails.value / 100))}
													</span>
												</div>
											) : (
												<span className="text-white">₦ {plan.price}</span>
											)}
										</p>
										<div className="ml-0">
											{/* {plan.offers.map((perk) => (
                        <div
                          key={perk}
                          className="flex gap-2 flex-col items-start text-[#A29FAE] my-[6px] "
                        >
                          <div className="flex items-center gap-2 ">
                            <svg
                              width="9"
                              height="8"
                              viewBox="0 0 9 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 3.99995L3.374 6.37295L8.12 1.62695"
                                stroke="#A29FAE"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="lg:text-sm">{perk}</p>
                          </div>
                          
                        </div>
                      ))} */}

											<p className="text-left underline cursor-pointer text-sm text-app-pink mb-2" onClick={openModal}>
												Get Full Access
											</p>

											{(!isSubscribed || !props.isSubscribed) && (
												<div className={`${isSubscribed || props.isSubscribed ? "cursor-not-allowed" : "cursor-pointer"}`}>
													{accessModal && !isSubscribed && (
														<Modal isOpen={accessModal} closeModal={closeModal}>
															<FullAccess
																closeModal={closeModal}
																pricings={props?.pricings}
																courseId={props?.id}
																setIsSubscribed={setIsSubscribed}
																isExternal={props?.isExternal}
															/>
														</Modal>
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="space-y-4 w-5/6">
							{isSubscribed || props.isSubscribed ? (
								<Link href={`/course/${props.id}?slugName=${props.slugName}`}>
									<div className="flex justify-center flex-1 gap-2 flex-col cursor-pointer">
										<span
											className="bg-white bg-opacity-10 rounded-lg h-[56px] w-full
                 text-[#06C281] border-2 inline-flex items-center justify-center space-x-4
                  border-[#06C281] font-bold">
											<CustomizedLottie config={memoizedCheckLottieConfig} className="w-9 h-9" />
											<motion.span
												initial={{ opacity: 0, y: 14 }}
												animate={{
													opacity: 1,
													y: 0,
													transition: { duration: 0.4, delay: 0.2 },
												}}>
												Start Course{" "}
											</motion.span>
										</span>
									</div>
								</Link>
							) : (
								<>
									{showAccessButton && freeModulesAvailable && (
										<button
											className={`bg-white text-[#4993ea] font-bold rounded-lg h-[56px] w-full mb-2 border-2 border-black`}
											onClick={() => {
												handleAccessCourse();
											}}>
											{pricingPlan.price === 0 ? (
												<div>
													<div>
														<p>Enroll For Free</p>
														<p className="text-xs">Start now</p>
													</div>
												</div>
											) : (
												<p>Access Course</p>
											)}
										</button>
									)}
									{showAccessButton && freeModulesAvailable && (
										<p className={`text-center text-xs text-zinc-100 mb-2 ${pricingPlan.price === 0 ? "" : "font-bold"}`}>
											{pricingPlan.price === 0 ? "Enroll now to access the free contents in this course" : "Start now to access the contents in this course"}
										</p>
									)}
								</>
							)}
							{/* BUY NOW BUTTON */}
							{(accessCourse || !freeModulesAvailable) && (
								<div className="space-y-2">
									<div className="w-full h-[56px] flex items-center justify-center bg-red-600 rounded-[35.06px]">
										<Button
											className="text-white text-[12.88px] font-semibold cursor-pointer"
											// onClick={handlePay(pricingPlan?.price, pricingPlan?.subscriptionType, pricingPlan?.name, pricingPlan?.id)}
											onClick={openModal}
											loading={confirmingPurchase || isLoading || isLoadingCourseDetails}>
											Buy Now
										</Button>
									</div>
									{freeModulesAvailable && (
										<Link href={`/course/${props.id}?slugName=${props.slugName}`}>
											<div className="w-full h-[56px] flex items-center justify-center rounded-[35.06px] border border-red-600 cursor-pointer">
												<p className="text-white text-[12.88px] font-semibold">Start Free</p>
											</div>
										</Link>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<Modal isOpen={videoModalOpen} closeModal={() => setVideoModalOpen(false)}>
				<VideoPlayer className="h-[70vh] w-[70vw]" title={props.name} src={props.previewVideoUrl} posterUrl={props.imageUrl} />
			</Modal>
		</React.Fragment>
	);
};

export default CourseDetailsHero;
