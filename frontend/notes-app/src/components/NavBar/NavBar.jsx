import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ({ userInfo, onSearch, ClearSearch }) => {
  const [SearchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (SearchQuery) {
      onSearch(SearchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    ClearSearch();
  };
  const Navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    Navigate("/login");
  };
  return (
    <div className="bg-white flex px-6 py-2 drop-shadow flex-row items-center justify-between">
      <h2 className="text-2xl font-medium text-black py-2 ">Notes</h2>

      <SearchBar
        value={SearchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      ></SearchBar>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo>
    </div>
  );
};

export default NavBar;
