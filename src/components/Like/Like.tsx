import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

interface likeProps {
  onClick?: () => void;
}

const Like = ({ onClick }: likeProps) => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
    if (onClick) {
      onClick();
    }
  };

  return (
    <AiFillHeart size={32} color={status ? "red" : "gray"} onClick={toggle} />
  );
};

export default Like;
