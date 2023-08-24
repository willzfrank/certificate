import React from 'react';

const TargetAudienceAccordion = () => {
  interface Category {
    title: string;
    state: string;
    description: string;
  }

  const categories: Category[] = [
    {
      title: 'Contract Staff',
      state: 'ContractStaffOpen',
      description:
        "Transitioning from contract staff to a full-time role within the banking industry is a journey laden with promise and potential. The Language of Banking course serves as a compass on this journey, pointing the way toward specialized knowledge, practical insights, and refined communication skills. Embracing this course isn't merely a step; it's a leap toward realizing professional aspirations and solidifying a place within the bank's inner circle. Through this course, contract staff members elevate their competencies and position themselves as invaluable contenders for the coveted realm of full-time banking roles.",
    },
    {
      title: 'Entry-Level',
      state: 'EntryLevelOpen',
      description:
        'Entry-Level job seekers / Early career professionals looking to kick-start their careers in the dynamic world of banking, standing out in a competitive job market is essential. The Language of Banking course equips participants with the knowledge, skills, and confidence needed to excel in the industry. As entry-level job seekers position themselves as candidates who possess a comprehensive understanding of banking language and practices, they enhance their employability, stand out in a competitive job market, and set the stage for a successful and rewarding career journey in the world of banking.',
    },
    {
      title: 'Post-Graduate',
      state: 'postGraduateOpen',
      description:
        'Postgraduate students transitioning from the academic realm to the professional arena, strategic career preparation is paramount. The Language of Banking course emerges as a strategic investment in their career growth, by enrolling in this course, students unlock the door to a world of specialized knowledge, practical insights, and refined communication skills that are essential for success in the banking sector. Equipped with a deep understanding of banking terminology and practices, learners are poised to enter the industry as confident, capable, and competitive candidates, ready to make meaningful contributions and achieve remarkable success in their banking careers.',
    },
    {
      title: 'Corp members',
      state: 'corpMembers',
      description:
        'The Language of Banking course offers Corp members a unique chance to bolster their skill set, expand their knowledge, and enhance their employability within the banking sector. By investing in this course, Corp members position themselves as knowledgeable, committed, and competitive candidates in a field that demands expertise and professionalism. As you aspire to take your place in the workforce, enrolling in the "Language of Banking" course becomes a strategic move that can lead to a successful and fulfilling career journey in the banking industry.',
    },
  ];

  const [openSections, setOpenSections] = React.useState<{
    [key: string]: boolean;
  }>({});
  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="my-5 space-y-2">
      {categories.map((category) => (
        <div key={category.title}>
          <div
            className="w-full h-12 border border-rose-600 flex items-center justify-between px-5 cursor-pointer"
            onClick={() => toggleSection(category.state)}
          >
            <p className="text-center text-black text-[15px] font-semibold">
              {category.title}
            </p>
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
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
          {openSections[category.state] && (
            <p
              className={`md:hidden transition-opacity duration-300 ${
                openSections[category.state]
                  ? 'opacity-100 py-3'
                  : ' opacity-0 py-0'
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

export default TargetAudienceAccordion;
