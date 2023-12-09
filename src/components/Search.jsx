import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const Search = ({ toggler, searchQuery }) => {
  const [value, setValue] = useState("");

  const handleChange = (val) => {
    setValue(() => val);
  };

  const handleClick = () => {
    searchQuery(value);
  };

  return (
    <div className="search-bar" role="searchbox" >
      <button className="btn search-back" onClick={() => toggler(false)}>
        <HiArrowLeft className="icon" />
      </button>

      <div className="search-container">
        <input
          className="search-input"
          name="search"
          type="search"
          placeholder="search..."
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required
        />

        <Link
          reloadDocument
          to={value && "/results?value=" + value}
          className="btn search-btn"
          onClick={handleClick}
          title="search"
        >
          <BiSearch className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Search;
