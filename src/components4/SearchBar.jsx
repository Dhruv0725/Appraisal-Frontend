import "./SearchBar.css";
import SearchImage from "../assets/search.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchBar({ searchValue, searchClick }) {
  const [inputState, setInput] = useState("");
  const navigate = useNavigate();
  const clickHandler = () => {
    console.log(inputState);
    if (inputState.trim() !== "") {
      const encodedSearchParam = encodeURIComponent(inputState.trim());
      navigate(`search?searchParam=${encodedSearchParam}`);
      setInput("");
    }
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
    searchValue(e.target.value);
  };
  return (
    <div class="search-bar">
      <input
        type="text"
        class="textbox"
        placeholder="type here..."
        onChange={changeHandler}
        value={inputState}
      />
      <a class="search-btn" onClick={clickHandler}>
        <img src={SearchImage} />
      </a>
    </div>
  );
}
