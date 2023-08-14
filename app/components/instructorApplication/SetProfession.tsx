import React from 'react'
import { InstructorHeading, Loader } from 'app/components'
import { InstructorVerificationButtonProps } from './types'
import {
  useAddIntructorProfessionsMutation as useAddInstructorProfessionsMutation,
  useGetProfessionsQuery,
} from 'app/api/userApi'

const SetProfession = ({
  goNext,
  goPrev,
  ...headingProps
}: InstructorVerificationButtonProps) => {
  const {
    data: professionsList = [],
    isLoading: isLoadingProfessionsList,
    error: loadProfessionsListError,
  } = useGetProfessionsQuery()

  const [
    addInstructorProfession,
    {
      isLoading: isAddingInstructorProfession,
      isError: addInstructorProfessionError,
    },
  ] = useAddInstructorProfessionsMutation()


  const [professions, setProfessions] = React.useState<string[]>([])
  

  const onChangeProfession = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newProfessions = [...professions]
    newProfessions[index] = e.currentTarget.value
    setProfessions(newProfessions)
  }

  return (
    <div>
      <div>
        <div className=" bg-white">
          <InstructorHeading {...headingProps} />
          <div className="md:px-12 md:mt-4">
            <div>
              <p className="text- text-[28px] font-medium text-muted my-1">
                What’s your profession?
              </p>
              <p className="text-base font-normal mb-8">
                What do you do for a living or are popularly known for. You can
                input up to 3 professions
              </p>
            </div>

            <div className="mb-20 md:max-w-[40vw]">
              {/* <div className="mt-10 w-full md:space-x-32 md:flex">
                <p className="text-lg font-medium md:min-w-[153px]">
                  Profession
                </p>
              </div> */}

              <div className="mt-8">
                {isLoadingProfessionsList ? (
                  <Loader mainColor="red" className="w-24 h-24" />
                ) : null}
                {loadProfessionsListError ? 'Loading profs failed...' : null}
                {/* @ts-ignore */}
                {professionsList ? (
                  <div className="bg-white rounded w-full">
                    <div className="mb-5 form-inputs mt-4 md:mt-0">
                      <label
                        htmlFor="prof3"
                        className="block mb-2 font-normal text-base"
                      >
                        Profession 1
                      </label>
                      <select
                        id="prof1"
                        name="prof1"
                        className="w-full capitalize md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                        placeholder="Profession 1"
                        onChange={(e) => onChangeProfession(e, 0)}
                      >
                        <option value="">Choose a profession</option>
                        {/* @ts-ignore */}
                        {professionsList?.map((profession) => (
                          <option
                            className="capitalize"
                            key={profession.id}
                            value={profession.id}
                          >
                            {profession.name.toLowerCase()}
                          </option>
                        ))}
                      </select>
                      <p className="flex justify-end">Mandatory</p>
                    </div>

                    <div className="mb-5 form-inputs mt-4 md:mt-0">
                      <label
                        htmlFor="prof2"
                        className="block mb-2 font-normal text-base"
                      >
                        Profession 2
                      </label>
                      <select
                        id="prof2"
                        name="prof2"
                        className="w-full capitalize md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                        placeholder="Profession 2"
                        onChange={(e) => onChangeProfession(e, 1)}
                      >
                        <option value="">Choose a profession</option>
                        {/* @ts-ignore */}
                        {professionsList?.map((profession) => (
                          <option
                            className="capitalize"
                            key={profession.id}
                            value={profession.id}
                          >
                            {profession.name.toLowerCase()}
                          </option>
                        ))}
                      </select>
                      <p className="flex justify-end">Optional</p>
                    </div>
                    <div className="mb-5 form-inputs mt-4 md:mt-0">
                      <label
                        htmlFor="prof3"
                        className="block mb-2 font-normal text-base"
                      >
                        Profession 3
                      </label>
                      <select
                        id="prof3"
                        name="prof3"
                        className="w-full capitalize md:min-w-[400px] px-3 py-2 leading-tight text-gray-700 border border-app-gray rounded"
                        placeholder="Profession 3"
                        onChange={(e) => onChangeProfession(e, 2)}
                      >
                        <option value="">Choose a profession</option>
                        {/* @ts-ignore */}
                        {professionsList?.map((profession) => (
                          <option
                            className="capitalize"
                            key={profession.id}
                            value={profession.id}
                          >
                            {profession.name.toLowerCase()}
                          </option>
                        ))}
                      </select>
                      <p className="flex justify-end">Optional</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
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
              <button
                type="button"
                onClick={goNext}
                className="relative flex items-center justify-center text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200  "
              >
                Save and continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { SetProfession }
