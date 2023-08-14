import { Image } from 'app/components'
import { useAppSelector } from 'app/hooks'
import Link from 'next/link'

const DashboardHero = () => {

  const user = useAppSelector(store => store.user)

  return (
    <div className="dashboardHero bg-app-purple min-h-[50vh] grid grid-cols-1 md:grid-cols-[60%,_1fr]">
      <div className="p-6 md:px-14 md:py-12 order-2 md:order-1">
        <div className="space-y-[16px] md:space-y-[24px] md:w-[75%]">
          <p className="text-2xl md:text-3xl text-app-dark-500 font-medium">
            Welcome { user.firstName },
          </p>
          <p className="text-muted leading-6 md:leading-8">
            Access to over 500 courses, learn from powerfully talented
            individuals using brilliant storytelling and in-depth learning
            methods. You can learn a trade, improve a career, or get inspiration
            from industry best.
          </p>

          <p className="text-muted font-semibold">
            Browse our available courses and start learning
          </p>

          <Link href="/courses/browseCourses">
            <button className="px-16 py-3 border-2 border-app-dark rounded-full font-medium" role="link">
              Browse courses
            </button>
          </Link>
        </div>
      </div>

      <div className="relative order-1 md:order-2 h-[220px] md:h-auto">
        <Image
          src="/images/darkwoman.png"
          alt="woman studying"
          className="w-full h-full !absolute inset-0"
          objectFit="cover"
          objectPosition={'top right'}
        />

       <div className="bg-gradient-to-r  to-[#E9DEFA10] via-[#E9DEFADA] from-app-purple h-full w-full relative"></div>
      </div>
    </div>
  )
}

export default DashboardHero
