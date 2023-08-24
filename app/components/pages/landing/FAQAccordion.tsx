import React, { useState } from 'react';

const FAQAccordion = () => {
  const categories = [
    {
      index: 1,
      title:
        'What is the Language of Banking course, and what will I learn from it?',
      description:
        'The Language of Banking course equips learners with knowledge and skills for a finance career. Learn banking fundamentals, financial analysis, credit evaluation, and risk management.',
    },
    {
      index: 2,
      title: 'Who is the course designed for?',
      description:
        'Designed for young graduates (20-28), career professionals pivoting to banking, contract bank staff seeking full employment, and those interested in finance industry insight.',
    },
    {
      index: 3,
      title: 'What are the prerequisites for the course?',
      description:
        'Graduates of recognized institutions. Commit 5-10 hours per week for classes.',
    },
    {
      index: 4,
      title: 'How long does the course last?',
      description: 'Typically 6 weeks, self-paced.',
    },
    {
      index: 5,
      title: 'Are the classes virtual or physical?',
      description: 'The course is online, providing flexibility in learning.',
    },
  ];

  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    {}
  );
  const toggleSection = (sectionIndex: number) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionIndex]: !prevState[sectionIndex],
    }));
  };

  return (
    <div className="my-5 space-y-2">
      {categories.map((category) => (
        <div key={category.index}>
          <div
            className="w-full h-12 border border-rose-600 flex items-center justify-between px-5 cursor-pointer"
            onClick={() => toggleSection(category.index)}
          >
            <p className="text-center text-black text-[15px] font-semibold">
              {category.title}
            </p>
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              className={`h-6 w-6 ${
                openSections[category.index] ? 'rotate-180' : ''
              }`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.0001 7.44824L11.6208 10.8276L8.24146 7.44824"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.6207 10.8275V5.03443C11.6207 2.90147 9.89154 1.17236 7.75862 1.17236H1"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {openSections[category.index] && (
            <p
              className={`p-5 transition-opacity duration-300 ${
                openSections[category.index]
                  ? 'opacity-100 py-3'
                  : 'opacity-0 py-0'
              }`}
            >
              {category.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
