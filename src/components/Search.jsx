import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Search = ({ toggler, searchQuery }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (val) => {
    setValue(() => val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchQuery(value);
    value && navigate("/results?value=" + value);
    setValue(() => "");
  };

  return (
    <div className="search-bar" role="searchbox">
      <button className="btn search-back" onClick={() => toggler(false)}>
        <HiArrowLeft className="icon" />
      </button>

      <form className="search-container" onSubmit={handleSubmit}>
        <input
          className="search-input"
          name="search"
          type="search"
          placeholder="search..."
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          minLength={"3"}
          required
        />

        <button
          className="btn search-btn"
          title="search"
          aria-label="search"
          type="submit"
        >
          <BiSearch className="icon" />
        </button>
      </form>
    </div>
  );
};

export default Search;
