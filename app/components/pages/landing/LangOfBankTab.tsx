import { useState } from 'react';
import Link from 'next/link';
import { API_URL } from 'app/constants';

const categories = [
  {
    index: 1,
    title: 'Contract Staff',
    description:
      "Transitioning from contract staff to a full-time role within the banking industry is a journey laden with promise and potential. The Language of Banking course serves as a compass on this journey, pointing the way toward specialized knowledge, practical insights, and refined communication skills. Embracing this course isn't merely a step; it's a leap toward realizing professional aspirations and solidifying a place within the bank's inner circle. Through this course, contract staff members elevate their competencies and position themselves as invaluable contenders for the coveted realm of full-time banking roles.",
  },
  {
    index: 2,
    title: 'Entry-Level',
    description:
      'Entry-Level job seekers / Early career professionals looking to kick-start their careers in the dynamic world of banking, standing out in a competitive job market is essential. The Language of Banking course equips participants with the knowledge, skills, and confidence needed to excel in the industry. As entry-level job seekers position themselves as candidates who possess a comprehensive understanding of banking language and practices, they enhance their employability, stand out in a competitive job market, and set the stage for a successful and rewarding career journey in the world of banking.',
  },
  {
    index: 3,
    title: 'Post-Graduate',
    description:
      'Postgraduate students transitioning from the academic realm to the professional arena, strategic career preparation is paramount. The Language of Banking course emerges as a strategic investment in their career growth, by enrolling in this course, students unlock the door to a world of specialized knowledge, practical insights, and refined communication skills that are essential for success in the banking sector. Equipped with a deep understanding of banking terminology and practices, learners are poised to enter the industry as confident, capable, and competitive candidates, ready to make meaningful contributions and achieve remarkable success in their banking careers.',
  },
  {
    index: 4,
    title: 'Corp members',
    description:
      'The Language of Banking course offers Corp members a unique chance to bolster their skill set, expand their knowledge, and enhance their employability within the banking sector. By investing in this course, Corp members position themselves as knowledgeable, committed, and competitive candidates in a field that demands expertise and professionalism. As you aspire to take your place in the workforce, enrolling in the "Language of Banking" course becomes a strategic move that can lead to a successful and fulfilling career journey in the banking industry.',
  },
];

function LangOfBankTab() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const href =
    API_URL === 'https://api-certifications.unifyedu.ng/api/v1'
      ? '/course/language-of-banking-0380/preview'
      : '/course/language-of-banking-7961/preview';


  return (
    <div className="px-24 py-10">
      <h1 className="font-bold text-4xl jost">Who is the Course for?</h1>
      <p className="text-2xl py-6 jost">
        The course is for 4 categories of people;
      </p>

      <nav
        className="flex gap-6 overflow-hidden transition ease-in-out delay-150 duration-300"
        aria-label="Tabs"
        role="tablist"
      >
        {categories.map((category) => (
          <button
            key={category.index}
            type="button"
            className={`hs-tab-active:border-[#d60049] ${
              activeTab === category.index
                ? 'hs-tab-active:text-gray-900 border border-[#d60049]'
                : ''
            } relative heading min-w-0 flex-1 bg-white hover:border-[#d60049] m-1 border-2 py-4 px-4 font-semibold text-xl text-center overflow-hidden focus:z-10 active transition ease-in-out delay-50 duration-300`}
            id={`bar-with-underline-item-${category.index}`}
            onClick={() => handleTabClick(category.index)}
            role="tab"
            aria-controls={`bar-with-underline-${category.index}`}
            aria-selected={activeTab === category.index}
          >
            {category.title}
          </button>
        ))}
      </nav>

      <div className="mt-5">
        {categories.map((category) => (
          <div
            key={category.index}
            id={`bar-with-underline-${category.index}`}
            role="tabpanel"
            aria-labelledby={`bar-with-underline-item-${category.index}`}
            className={activeTab === category.index ? '' : 'hidden'}
          >
            <div className="border-2 border-[#E7E7E7] p-5 rounded-2xl">
              <h1 className="text-black text-3xl font-bold uppercase mb-2 jost">
                {category.title}
              </h1>
              <p className="text-black text-[20px] font-normal jost">
                {category.description}
              </p>
            </div>
            <Link href={href}>
              <button className="py-2 px-6 mt-5 text-white font-semibold rounded-[30px] jost bg-gradient-to-r from-[#d60049] to-[#ff8c40]">
                Join Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LangOfBankTab;
