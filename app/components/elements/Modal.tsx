import * as React from 'react'
import { Fixed } from '../layouts'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  closeModal: () => void
}

const Modal = ({ children, className, isOpen, closeModal }: ModalProps) => {
  const _closeModal: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // @ts-ignore
    if (!e.currentTarget.contains(e.target) || e.currentTarget === e.target) {
      // the element clicked on is not a child of the modal
      closeModal()
    }
  }

  return (
    <Fixed className="w-full">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={_closeModal}
            className={`min-h-screen min-w-full bg-[#202020] bg-opacity-90 flex items-center justify-center ${className}`}
          >
            <div className="modalcontent">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fixed>
  )
}

export default Modal
