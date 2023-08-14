import React, { useState } from "react";

const CommentForm = () => {
  const [comment, setComment] = useState({
    id: "",
    details: "",
  });

  return <div>CommentForm</div>;
};

export { CommentForm };
