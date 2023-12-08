import { useState } from "react";

const useToggle = (bool) => {
  const [toggle, setToggle] = useState(bool || false);

  const toggler = (bl = null) => {
    if (bl === true || bl === false) setToggle(() => bl);
    else setToggle((toggle) => (toggle = !toggle));
  };

  return [toggle, toggler];
};

export default useToggle;
