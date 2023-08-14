import React from 'react'
import { InstructorHeading, InstructorQanda } from 'app/components'
import { InstructorVerificationButtonProps } from './types'
import { AnimatePresence, motion} from 'framer-motion'

const SetAlias = ({
  goNext,
  goPrev,
  ...headingProps 
}: InstructorVerificationButtonProps) => {

  const [hasAlias, setHasAlias] = React.useState<boolean | null>(null)
  const [alias, setAlias] = React.useState<string>('')

  const question = 'Do you go by an Alias?'

  React.useEffect(() => {
    if (!hasAlias) {
      setAlias('')
    }
  }, [hasAlias])

  const infoQuestion =
    'Please provide a name you are popularly known by, could be a nickname, alias, stage or pen name.'

  return (
    <div>
      {' '}
      <div className=" bg-white">
        <InstructorHeading {...headingProps} />
        <div className="md:px-12 md:mt-4">
          <div className="mb-6">
        <p className="text- text-[28px] font-medium text-muted my-1">
          {question}
        </p>
        <p className="text-base font-normal md:w-[60%] mb-8">
          {infoQuestion}
        </p>
        <motion.div layout className="my-4 space-y-3 md:my-2 md:space-y-2">
            <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center">
              <input
                type={"radio"}
                role={"radio"}
                checked = {hasAlias === true}
                className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
                name={question}
                id = 'has-alias'
                onChange = {() => setHasAlias(true)}
              />

              <label htmlFor="has-alias"><p className="md:text-base md:ml-4 ml-1 text-muted">I go by an Alias</p></label>
            </div>

            <AnimatePresence>
              {
                hasAlias && (
                  <motion.div 
                    initial = {{opacity: 0}} 
                    animate = {{opacity: 1}} 
                    exit = {{opacity: 0}} 
                    className='flex gap-4 items-center pt-2 pb-8 md:w-[50%]'
                  >
                    <label htmlFor='alias'>What is your alias?</label>
                    <input type = 'text' name = 'alias' id = 'alias' 
                      className='p-2 border rounded flex-1' 
                      value = {alias} 
                      onChange = {(e) => setAlias(e.currentTarget.value)}
                    />
                  </motion.div>
                )
              }
            </AnimatePresence>

            <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center">
              <input
                type={"radio"}
                checked = {hasAlias === false}
                role={"radio"}
                className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
                name={question}
                id = 'no-alias'
                onChange = {() => setHasAlias(false)}
              />

              <label htmlFor='no-alias'><p className="md:text-base md:ml-4 ml-1 text-muted">I do not go by an Alias</p></label>
            </div>
        </motion.div>
      </div>
        </div>

        <div className="flex md:mt-[170px] justify-between">
          <div className="pl-12">
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
  )
}

export { SetAlias, type InstructorVerificationButtonProps }
