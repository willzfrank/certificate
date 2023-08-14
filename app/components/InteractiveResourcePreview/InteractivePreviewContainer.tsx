import * as React from 'react'
import { Modal } from 'app/components'
import { AnimatePresence, motion } from 'framer-motion'
import { useElementDimension, useRerender } from 'app/hooks'
import ReactConfetti from 'react-confetti'

const InteractivePreviewContainer = ({
  children,
  isOpen,
  closeModal,
  isCompleted,
  isIncorrect,
  className,
}: {
  children: React.ReactNode
  isOpen: boolean
  closeModal: () => void
  isCompleted: boolean
  isIncorrect: boolean
  className?: string
}) => {
  const interactiveContentPreviewContainerRef = React.useRef<any>(null)

  const {
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
  } = useElementDimension(interactiveContentPreviewContainerRef)

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 200 }}
            animate={
              isCompleted
                ? isIncorrect
                  ? { x: [70, -60, 40, -30, 20, -10, 0], y: 0 }
                  : { y: 0, x: 0 }
                : { y: 0, x: 0 }
            }
            exit={{ y: -200 }}
            className="p-10 w-[65vw] min-h-[60vh] max-h-[90vh] overflow-y-scroll bg-slate-700 rounded-lg bg-gradient-to-r from-[#AB5C76] to-[#B33B62] relative"
          >
            {/* <p>Completed: {String(isCompleted)}</p>
            <p>Correct: {String(isCompleted && !isIncorrect)}</p>
            <p>InCorrect: {String(isCompleted && isIncorrect)}</p> */}
            <svg
              width="134"
              height="87"
              viewBox="0 0 134 87"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 right-10"
            >
              <circle
                cx="66.7774"
                cy="19.7774"
                r="62.7708"
                stroke="url(#paint0_linear_4408_6271)"
                strokeOpacity="0.6"
                strokeWidth="8.01329"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4408_6271"
                  x1="6.52579e-07"
                  y1="18.0652"
                  x2="133.555"
                  y2="18.0652"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D6064A" />
                  <stop offset="0.4875" stopColor="#EF4D41" />
                  <stop offset="1" stopColor="#FD8C46" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              width="38"
              height="114"
              viewBox="0 0 38 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 -right-[5px]"
            >
              <circle
                cx="67.2234"
                cy="47.1288"
                r="62.7708"
                transform="rotate(87.4253 67.2234 47.1288)"
                stroke="url(#paint0_linear_4408_6273)"
                strokeOpacity="0.6"
                strokeWidth="8.01329"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4408_6273"
                  x1="0.446"
                  y1="45.4165"
                  x2="134.001"
                  y2="45.4165"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D6064A" />
                  <stop offset="0.4875" stopColor="#EF4D41" />
                  <stop offset="1" stopColor="#FD8C46" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              width="85"
              height="113"
              viewBox="0 0 85 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-0"
            >
              <circle
                cx="17.7774"
                cy="66.8243"
                r="62.7708"
                stroke="url(#paint0_linear_4408_6270)"
                strokeOpacity="0.6"
                strokeWidth="8.01329"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4408_6270"
                  x1="-49"
                  y1="65.1121"
                  x2="84.5548"
                  y2="65.1121"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D6064A" />
                  <stop offset="0.4875" stopColor="#EF4D41" />
                  <stop offset="1" stopColor="#FD8C46" />
                </linearGradient>
              </defs>
            </svg>

            <svg
              width="134"
              height="102"
              viewBox="0 0 134 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 left-16"
            >
              <circle
                cx="67.2227"
                cy="67.1758"
                r="62.7708"
                stroke="url(#paint0_linear_4408_6272)"
                strokeOpacity="0.6"
                strokeWidth="8.01329"
              />

              <defs>
                <linearGradient
                  id="paint0_linear_4408_6272"
                  x1="0.445313"
                  y1="65.4636"
                  x2="134"
                  y2="65.4636"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D6064A" />
                  <stop offset="0.4875" stopColor="#EF4D41" />
                  <stop offset="1" stopColor="#FD8C46" />
                </linearGradient>
              </defs>
            </svg>

            {isCompleted && !isIncorrect && (
              <div className="w-full h-full absolute inset-0">
                <ReactConfetti
                  width={CONTAINER_WIDTH}
                  height={CONTAINER_HEIGHT}
                  wind={0.05}
                  gravity={0.1}
                  className="w-full h-full !z-20 absolute"
                />
              </div>
            )}

            <div
              className={`bg-white min-h-[inherit] w-full z-10 relative p-5 ${className}`}
              ref={(element) =>
                (interactiveContentPreviewContainerRef.current = element)
              }
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}
export default InteractivePreviewContainer
