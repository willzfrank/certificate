import * as React from 'react'
import { useGetCoursesQuery } from 'app/api/courseApi'
import {
  CoursesSection,
  DashboardHero,
  MainLayout,
  CarouselContainer,
} from 'app/components'
import { NextPageWithLayout } from 'app/types'
import { USERTYPES } from 'app/types'
// import { shuffle } from 'app/utils'
import Head from 'next/head'

const DashboardIndex: NextPageWithLayout<{}> = () => {
  const {
    data = { data: { pagedList: [] } },
    isLoading,
    isError,
  } = useGetCoursesQuery({
    page: 1,
    pageSize: 20,
  })

  // const shuffledData = React.useMemo(() => shuffle(data.data.pagedList), [data])

  return (
    <>
      <Head>
        <title>Dashboard | Certifications by Unify</title>
      </Head>
      <DashboardHero />
      <CoursesSection />
      <CarouselContainer
        title={'Recommended For You'}
        // @ts-ignore
        courses={data.data.pagedList.slice(0, 6)}
      />
      <CarouselContainer
        title={'Trending Courses'}
        // @ts-ignore
        courses={data.data.pagedList.slice(7, 12)}
      />
    </>
  )
}

export default DashboardIndex

DashboardIndex.getLayout = function (page) {
  return (
    <MainLayout
      requiresLogin
      allowedUserTypes={[USERTYPES.STUDENT]}
      redirectUrl="/instructors/overview"
    >
      {page}
    </MainLayout>
  )
}
