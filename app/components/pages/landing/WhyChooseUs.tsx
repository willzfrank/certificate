import { Image } from 'app/components/elements';

const WhyChooseUs = () => {
  return (
    <div className="whyChooseUs p-12 px-6 md:px-14 mt-8 mb-24 md:mb-auto">
      <h1 className="text-2xl md:text-3xl font-medium mb-12 md:mb-4 leading-10">
        Why choose Certification by Unify?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        <Reason
          color="#7728DB26"
          title="Excellent Instructors"
          description="With little to no experience, you can start learning from an array of reputable experts. Whether you're trying to learn a trade, advance your career, or simply get inspiration from the industry's best."
          iconUrl="/icons/youtuber.svg"
        />
        <Reason
          color="#EB776E4D"
          title="In-depth training"
          description="Our Instructors are fully vetted to ensure you're getting the best of the best. With brilliant storytelling and In-depth training catered to you. "
          iconUrl="/icons/tutorial.svg"
        />
        <Reason
          color="#A0B3F84D"
          title="Get Certified"
          description="Watch, listen and learn from Industry's best and get internationally recognized certification. Give your career the boost it needs today!"
          iconUrl="/icons/youtuber.svg"
        />
      </div>
    </div>
  );
};

interface ReasonProps {
  color: string;
  title: string;
  description: string;
  iconUrl: string;
}

const Reason = ({ color, title, description, iconUrl }: ReasonProps) => {
  return (
    <div className="bg-white shadow-md p-8 rounded-lg md:mt-16 md:mb-28">
      <div
        className="flex items-center justify-center w-[60px] h-[60px] rounded-full"
        style={{ backgroundColor: color }}
      >
        <Image src={iconUrl} alt={title} className="h-full w-1/2" />
      </div>

      <p className="font-semibold mt-5 mb-2">{title}</p>
      <p className="text-muted leading-[1.7em] tracking-[0.01em]">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseUs;
