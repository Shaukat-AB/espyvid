import { SettingContext } from "../context/SettingContext";
import SideBarContext from "../context/SideBarContext";
import { useContext, useEffect, useRef } from "react";
import useToggle from "../hooks/useToggle";
import { HiCog6Tooth } from "react-icons/hi2";
import { setOptions } from "../utils/constants";

const Settings = () => {
  const [setToggle, setToggler] = useToggle(false);
  const [navToggle, navToggler] = useContext(SideBarContext);
  const settingRef = useRef(null);

  const clickedOutside = (e) => {
    if (settingRef?.current && !settingRef?.current.contains(e.target)) {
      setToggler();
    }
  };

  useEffect(() => {
    if (setToggle) {
      window.innerWidth < 1200 && navToggler(false);
      document.addEventListener("click", clickedOutside);
      return () => document.removeEventListener("click", clickedOutside);
    }
  }, [setToggle]);

  return (
    <div className="settings" ref={settingRef}>
      {setToggle && (
        <span className="set-pannel">
          {setOptions.map((e) => (
            <LabelNSelect
              key={e.title}
              id={e.title + "-select"}
              title={e.title}
              options={e.options}
            />
          ))}
        </span>
      )}
      <button
        className="btn"
        aria-label="Settings"
        onClick={() => setToggler()}
      >
        <HiCog6Tooth className="icon" />
      </button>
    </div>
  );
};

const LabelNSelect = ({ id, title = "", options = [] }) => {
  const [settings, changeSettings] = useContext(SettingContext);

  const changeOption = (e) => {
    changeSettings(title, e.target.value);
  };

  const htmlOption = options.map((opt, index) => {
    return (
      <option className="option" key={opt + index}>
        {" "}
        {opt}{" "}
      </option>
    );
  });

  return (
    <label htmlFor={id} className="select-label">
      {title} :
      <select
        id={id}
        name={id}
        className="select"
        defaultValue={settings[title]}
        onChange={(e) => changeOption(e)}
      >
        {htmlOption}
      </select>
    </label>
  );
};

export default Settings;
