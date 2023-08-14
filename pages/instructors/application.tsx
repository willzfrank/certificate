import React, { useState } from 'react'
import type { NextPageWithLayout } from 'app/types'
import {
  SetAlias,
  SetProfession,
  UploadImage,
  InstructorsLayout,
} from 'app/components'
import { clamp } from 'app/utils'

const Application: NextPageWithLayout<{}> = () => {
  const NUMBER_OF_PAGES = 3
  const [currentPage, setCurrentPage] = useState(0)

  const getPrevious = () => {
    setCurrentPage(clamp(0, NUMBER_OF_PAGES, currentPage - 1))
  }
  const getNext = () => {
    setCurrentPage(clamp(0, NUMBER_OF_PAGES, currentPage + 1))
  }

  if (currentPage === 0) {
    return (
      <SetAlias
        goNext={getNext}
        goPrev={getPrevious}
        currentNumber={currentPage + 1}
        totalNumber={NUMBER_OF_PAGES}
      />
    )
  } else if (currentPage === 1) {
    return (
      <SetProfession
        goNext={getNext}
        goPrev={getPrevious}
        currentNumber={currentPage + 1}
        totalNumber={NUMBER_OF_PAGES}
      />
    )
  } else
    return (
      <div>
        <UploadImage
          goNext={getNext}
          goPrev={getPrevious}
          currentNumber={currentPage + 1}
          totalNumber={NUMBER_OF_PAGES}
        />
        ;
      </div>
    )
}

export default Application

Application.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>
}
