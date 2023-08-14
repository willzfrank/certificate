import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'

interface ITabs {
  isLink: boolean
  tabs: ITab[]
  activeTabIndex?: number
  id?: string
  tabClassName?: string
  containerClassName?: string
}

interface ITab {
  title: string
  active?: boolean | (() => boolean)
  href?: string
  onClick?: Function
}

const Tabs = ({
  isLink,
  tabs,
  id,
  containerClassName,
  tabClassName,
  activeTabIndex: _activeTabIndex,
}: ITabs) => {
  const [activeTabIndex, setActiveTabIndex] = useState(_activeTabIndex || 0)

  const getActive = (value: ITab['active'] | number): boolean => {
    if (isLink) {
      if (typeof value === 'function') {
        return value()
      } else {
        return Boolean(value)
      }
    } else return value === activeTabIndex
  }

  return (
    <LayoutGroup id={id}>
      <div
        className={`flex border border-x-0 border-t-0 mb-5 space-x-6 ${containerClassName}`}
      >
        {isLink
          ? tabs.map((tab) => (
              <div key={tab.title} className="relative">
                <Link href={tab.href || '/'} scroll={false}>
                  <a
                    className={`min-w-[70px] pb-2 block text-center ${
                      !getActive(tab.active) && 'text-muted'
                    } ${tabClassName}`}
                  >
                    {tab.title}
                  </a>
                </Link>

                {getActive(tab.active) && (
                  <motion.div
                    layout
                    layoutId="underline"
                    className="bg-app-pink h-[4px] w-full relative -bottom-[1px]"
                  ></motion.div>
                )}
              </div>
            ))
          : tabs.map((tab, index) => (
              <div key={tab.title} className="relative">
                <button
                  className={`min-w-[70px] pb-2 ${
                    !getActive(index) && 'text-muted'
                  } ${tabClassName}`}
                  onClick={() => {
                    setActiveTabIndex(index)
                    tab.onClick && tab.onClick()
                  }}
                >
                  {tab.title}
                </button>

                {getActive(index) && (
                  <motion.div
                    layout
                    layoutId="underline"
                    className="bg-app-pink h-[4px] w-full relative -bottom-[1px]"
                  ></motion.div>
                )}
              </div>
            ))}
      </div>
    </LayoutGroup>
  )
}

export default Tabs
