import React, { useState } from 'react';
import logo from '../../../public/images/CBU_Logo-removebg-preview 1.png';

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="w-[590px] h-max p-16 bg-white rounded-2xl justify-start items-start gap-px flex-col flex">
        <div className="flex items-center justify-center flex-col w-full">
          {/* <img src={logo} alt="" /> */}
          <span className="text-neutral-700 text-2xl font-medium font-['Inter']">
            Sign up and start you journey
          </span>
        </div>

        {/* TAB PAGE */}
        <div>
          <div className="flex my-5">
            <div className="flex  rounded-lg transition p-1 bg-neutral-100">
              <nav
                className="flex justify-between w-[462px] space-x-2"
                aria-label="Tabs"
                role="tablist"
              >
                <button
                  type="button"
                  className={`text-xl w-[215px] justify-center font-medium font-['Inter'] py-3 px-4  flex items-center gap-x-2 rounded-lg hover:text-gray-700 hover:hover:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none  dark:hover:text-white ${
                    activeTab === 1
                      ? 'text-neutral-700 bg-white shadow '
                      : 'text-neutral-400 bg-neutral-100'
                  }`}
                  onClick={() => handleTabChange(1)}
                  id="segment-item-1"
                  data-hs-tab="#segment-1"
                  aria-controls="segment-1"
                  role="tab"
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className={`text-xl font-medium justify-center w-[215px] font-['Inter'] py-3 px-4 flex items-center gap-x-2 rounded-lg hover:hover:text-neutral-700 disabled:opacity-50 disabled:pointer-events-none dark:hover:text-gray-300 ${
                    activeTab === 2
                      ? 'text-neutral-700 bg-white shadow '
                      : 'text-neutral-400 bg-neutral-100'
                  }`}
                  onClick={() => handleTabChange(2)}
                  id="segment-item-2"
                  data-hs-tab="#segment-2"
                  aria-controls="segment-2"
                  role="tab"
                >
                  Log in
                </button>
              </nav>
            </div>
          </div>
          <div className="mt-3">
            <div
              id="segment-1"
              role="tabpanel"
              aria-labelledby="segment-item-1"
            >
              {/* SIGN UP */}
              {activeTab === 1 && (
                <form action="">
                  <div className="flex items-center flex-wrap justify-between">
                    <div className="flex flex-col items-start space-y-2 my-3">
                      <label className="text-neutral-700 text-base font-medium font-['Inter']">
                        First name
                      </label>{' '}
                      <input
                        className="w-[215px] h-[51px] px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex text-stone-300 text-base font-normal font-['Inter']"
                        placeholder="First name"
                      />
                    </div>
                    <div className="flex flex-col items-start space-y-2 my-3">
                      <label className="text-neutral-700 text-base font-medium font-['Inter']">
                        Last name
                      </label>{' '}
                      <input
                        className="w-[215px] h-[51px] px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex text-stone-300 text-base font-normal font-['Inter']"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  {/* EMAIL ADDRESS */}
                  <div className="my-3">
                    <label className="text-neutral-700 text-base font-medium font-['Inter']">
                      Email address
                    </label>
                    <input
                      className="w-[462px] h-[51px] mt-2 px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex text-stone-300 text-base font-normal font-['Inter']"
                      placeholder="Your email address"
                    />
                  </div>

                  {/* password */}
                  <div className="my-3">
                    <label className="text-neutral-700 text-base font-medium font-['Inter']">
                      Password{' '}
                    </label>
                    <div className="mt-2 px-3 gap-px inline-flex justify-between items-center py-4 w-[462px] h-[51px] border border-neutral-200 rounded">
                      <input
                        className="border-none  text-stone-300 text-base font-normal font-['Inter']"
                        placeholder="10 digit password"
                      />
                      <span className="text-neutral-700 text-base font-normal font-['Inter']">
                        Show
                      </span>
                    </div>
                  </div>

                  {/* CHECKBOX */}
                  <div className="flex items-center gap-2 my-3">
                    <input type="checkbox" name="" id="" />
                    <div>
                      <span className="text-neutral-600 text-sm font-normal font-['Inter']">
                        I have read, understood and agreed to the{' '}
                      </span>
                      <span className="text-rose-600 text-sm font-normal font-['Inter'] underline">
                        Terms and Conditions
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-[462px] h-[59px] px-3 my-3 py-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg justify-center items-center gap-px inline-flex"
                  >
                    <div className="text-white text-base font-medium font-['Inter']">
                      Sign up
                    </div>
                  </button>
                </form>
              )}
            </div>
            <div
              id="segment-2"
              role="tabpanel"
              aria-labelledby="segment-item-2"
            >
              {activeTab === 2 && (
                <form action="">
                  {/* EMAIL ADDRESS */}
                  <div className="my-3">
                    <label className="text-neutral-700 text-base font-medium font-['Inter']">
                      Email address
                    </label>
                    <input
                      className="w-[462px] h-[51px] mt-2 px-3 py-4 rounded border border-neutral-200 justify-start items-center gap-px inline-flex text-stone-300 text-base font-normal font-['Inter']"
                      placeholder="Your email address"
                    />
                  </div>

                  {/* password */}
                  <div className="my-3">
                    <label className="text-neutral-700 text-base font-medium font-['Inter']">
                      Password{' '}
                    </label>
                    <div className="mt-2 px-3 gap-px inline-flex justify-between items-center py-4 w-[462px] h-[51px] border border-neutral-200 rounded">
                      <input
                        className="border-none  text-stone-300 text-base font-normal font-['Inter']"
                        placeholder="10 digit password"
                      />
                      <span className="text-neutral-700 text-base font-normal font-['Inter']">
                        Show
                      </span>
                    </div>
                  </div>

                  <div className="text-rose-600 my-4 text-center text-base font-normal font-['Inter']">
                    Forgot Password?
                  </div>

                  <button
                    type="submit"
                    className="w-[460px] h-[59px] px-3 py-5 bg-gradient-to-r from-red-500 to-rose-600 rounded-lg justify-center items-center gap-px inline-flex"
                  >
                    <div className="text-white text-base font-medium font-['Inter']">
                      Log in
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
