import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const KeyOutcomes = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const contentData = [
    'Key components and functions of the banking industry, including its structure and regulations.',
    'Benefits of digital banking and its impact on the industry, as well as data management.',
    'The use of office productivity tools such as Microsoft Excel, Word, and PowerPoint, for effective business writing and oral communication skills.',
    'The application of essential leadership skills and traits required to succeed in the banking industry, including emotional intelligence, problem-solving and decision-making.',
    'How to prepare effective communications both orally and in writing for professional contexts such as job interviews and presentations to key stakeholders.',
    'How digital and technology trends are impacting the future of work and business, and how to develop a digital marketing strategy that aligns with business goals and objectives.',
    'The fundamentals of data analytics, and how to collect, clean and analyze data to ensure data accuracy and completeness.',
  ];

  return (
    <div className="bg-zinc-100 px-5 py-10">
      <Slider {...settings}>
        {contentData.map((content, index) => (
          <div
            key={index}
            className={`p-3 h-[200px] w-full border ml-1 border-black border-opacity-25 ${'bg-white text-black'} shadow col-start-${
              index * 2 + 1
            } col-end-${index * 2 + 3}`}
          >
            <p className="leading-7 md:text-base text-xl pt-1">{content}</p>{' '}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default KeyOutcomes;
