import * as React from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import { MainLayout } from 'app/components'

const _500: NextPageWithLayout<any> = (props) => {
  return (
    <h1>Server Error --- This is not you, we&apos;re working on fixing this</h1>
  )
}

_500.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}>
      {page}
    </MainLayout>
  )
}

export default _500
