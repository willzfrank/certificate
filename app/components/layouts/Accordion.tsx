import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';

const AccordionGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

const AccordionItem = ({
  head,
  body,
  withBodyPadding = true,
  defaultOpen = false,
}: {
  head: (options: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggleOpen: () => void;
  }) => React.ReactNode;
  body: React.ReactNode;
  withBodyPadding?: boolean;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setOpen] = React.useState<boolean>(defaultOpen);

  React.useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <div className="">
      <div
        className="accordionHead cursor-pointer px-4 py-3 md:px-6  border border-[#EDEDED] bg-[#F4F4F4] transition duration-500 md:w-full"
        onClick={() => setOpen(!isOpen)}
      >
        {head({
          isOpen,
          open: () => setOpen(true),
          close: () => setOpen(false),
          toggleOpen: () => setOpen(!isOpen),
        })}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className={`${
              withBodyPadding ? 'px-4 md:px-6' : ''
            } border border-t-0 border-[#EDEDED]`}
          >
            {withBodyPadding && <div className="h-2 md:h-4"></div>}
            {body}
            {withBodyPadding && <div className="h-2 md:h-4"></div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = {
  Group: AccordionGroup,
  Item: AccordionItem,
};

export default Accordion;
