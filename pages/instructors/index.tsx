import { InstructorsLayout, Redirect } from 'app/components'
import { NextPageWithLayout } from 'app/types'

// always redirect to the overview
const IndexPage: NextPageWithLayout<{}> = () => {
  return <Redirect to="/instructors/overview" />
}

export default IndexPage

IndexPage.getLayout = function (page) {
  return <InstructorsLayout>{page}</InstructorsLayout>
}
