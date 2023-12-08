import { LabelContext } from "../context/labelContext";
import { labelArr } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Labels = () => {
  let labelComponentArr = labelArr.map((label) => (
    <Label name={label} key={label} />
  ));
  
  return (
    <div className="labels">
      <LabelSelector>{labelComponentArr}</LabelSelector>
    </div>
  );
};

const LabelSelector = ({ children }) => {
  const [scroll, setScroll] = useState({ x: 0, index: 0, trail: [] });

  const handleScroll = (e, dir = 1) => {
    let ls = e.target.parentNode.querySelectorAll(".label");
    if (
      ls[labelArr.length - 1]?.getBoundingClientRect().x <
      e.target?.getBoundingClientRect().x - 10
    )
      return;

    const newIndex = labelArr.length - scroll.index - 1;
    if (dir === -1 && scroll.index !== labelArr.length - 1) {
      let offset = ls[newIndex].offsetWidth;
      let nextIndex = scroll.index + 1;
      let newX = (scroll.x += offset * dir);
      const newScroll = {
        x: newX,
        index: nextIndex,
        trail: [...scroll.trail, offset * dir],
      };
      setScroll(() => newScroll);
    } else if (dir === 1) {
      let nextIndex = scroll.index - 1;
      let arr = scroll.trail;
      let newX = scroll.x - arr.pop();
      const newScroll = { x: newX, index: nextIndex, trail: arr };
      setScroll(() => newScroll);
    }
  };

  return (
    <>
      {scroll.index !== labelArr.length - 1 && (
        <ScrollButton handleScroll={handleScroll} dir={-1}>
          <HiChevronRight className="icon" />
        </ScrollButton>
      )}
      {scroll.index != 0 && (
        <ScrollButton handleScroll={handleScroll} dir={1}>
          <HiChevronLeft className="icon" />
        </ScrollButton>
      )}

      <div
        className="label-selector"
        role="tablist"
        style={{ transform: "translateX(" + scroll.x + "px)" }}
      >
        {children}
      </div>
    </>
  );
};

const Label = ({ name }) => {
  const [active, changeActive] = useContext(LabelContext);

  const handler = () => {
    changeActive(name);
  };

  return (
    <Link
      to="/"
      className="label"
      role="tab"
      aria-selected={name === active}
      onClick={() => handler()}
    >
      <span> {name} </span>
    </Link>
  );
};

const ScrollButton = ({ handleScroll, dir, children }) => {
  const title = dir == -1 ? "Next" : "Previous";
  const clName = dir == -1 ? "btn-rs" : "btn-ls";

  return (
    <button
      className={clName}
      onClick={(e) => handleScroll(e, dir)}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
};

export default Labels;
