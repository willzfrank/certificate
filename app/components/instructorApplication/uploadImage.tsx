import React from 'react'
import { Button, InstructorHeading } from 'app/components'
import { InstructorVerificationButtonProps } from 'app/components'

const UploadImage = ({
  goNext,
  goPrev,
  ...headingProps
}: InstructorVerificationButtonProps) => {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = React.useState<File | null>(null)

  return (
    <div>
      <div>
        <div className=" bg-white">
          <InstructorHeading {...headingProps} />
          <div className="md:px-12 md:mt-4">
            <div>
              <p className="text- text-[28px] font-medium text-muted my-1">
                Upload a form of Identification
              </p>
              <p className="text-base font-normal mb-8">
                Some information about this question Some information about this
                question Some information about this question
              </p>
            </div>

            <div
              className="border border-dashed p-9 py-16 md:max-w-[40vw] mb-5"
              onClick={() => fileRef.current?.click()}
            >
              {file ? (
                <div className="h-full w-full flex items-center justify-center flex-col gap-4">
                  <p>{file.name}</p>
                  <button
                    className="text-app-pink"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex w-full justify-center space-x-2">
                    <div>
                      {' '}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <g
                          stroke="#ADADAD"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          clipPath="url(#clip0_1086_3656)"
                        >
                          <path d="M16 16l-4-4-4 4M12 12v9"></path>
                          <path d="M20.391 18.39A5 5 0 0018.001 9h-1.26a8 8 0 10-13.74 7.3"></path>
                          <path d="M16 16l-4-4-4 4"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_1086_3656">
                            <path fill="#fff" d="M0 0H24V24H0z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <p>Upload valid identification card</p>
                  </div>
                  <div className="mt-3 text-center">
                    <p>Drop a file or Select file</p>
                  </div>
                </>
              )}
              <input
                type="file"
                accept="image/*,application/pdf"
                hidden
                ref={fileRef}
                onChange={(e) => setFile((e.currentTarget.files || [null])[0])}
              />
            </div>

            <div className="flex justify-between md:mt-[140px]">
              <div className="">
                {' '}
                <button
                  type="button"
                  onClick={goPrev}
                  className="relative flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group hover:bg-app-fuschia focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-[#B61046] bg-white border-[#B61046] focus:z-10 focus:ring-4 focus:ring-gray-200 "
                >
                  Prev
                </button>
              </div>

              <div className="">
                {' '}
                <Button
                  type="button"
                  disabled={!file}
                  className="relative flex items-center justify-center text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200  "
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { UploadImage }
