import { AccountSet, MainLayout } from 'app/components'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import * as React from 'react'

const PaymentMethods: NextPageWithLayout<{}> = () => {
  return <div></div>
}

export default PaymentMethods

PaymentMethods.getLayout = function (page) {
  return <MainLayout allowedUserTypes={[USERTYPES.STUDENT]}>{page}</MainLayout>
}
