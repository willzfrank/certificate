import React, { useState } from "react";
const stars = [1, 2, 3, 4, 5];

interface StarProps {
  rating: number;
  setRating: Function;
}

const StarRating = ({ rating, setRating }: StarProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {stars.map((star) => {
        return (
          <button
            type="button"
            key={star}
            className={
              star <= (rating || hover) ? "text-orange-300 " : "text-[#D1CFDB] "
            }
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star text-3xl ml-3">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
