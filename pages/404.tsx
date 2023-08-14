import { Image, MainLayout } from 'app/components'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import Link from 'next/link'

const _404: NextPageWithLayout<{}> = () => {
  return (
    <div className="w-full p-8">
      <div className="flex items-center flex-col md:w-[45vw] gap-4 mx-auto text-center h-[70vh]">
        <Image src="/icons/404.svg" alt="" className="w-60 h-60" />
        <h1 className="text-3xl md:text-4xl font-semibold uppercase">
          Awwww Snap!
        </h1>
        <p className="leading-8 tracking-wider text-muted md:text-lg">
          You broke the internet... There&apos;s nothing here.
        </p>
        <Link href="/">
          <a className="actiongradient text-white text-lg uppercase px-20 py-4 md:py-4 rounded-lg">
            Go Back
          </a>
        </Link>
      </div>
    </div>
  )
}

_404.getLayout = function (page) {
  return (
    <MainLayout
      allowedUserTypes={[USERTYPES.STUDENT, USERTYPES.INSTRUCTOR]}
      completeFooter
    >
      {page}
    </MainLayout>
  )
}

export default _404
