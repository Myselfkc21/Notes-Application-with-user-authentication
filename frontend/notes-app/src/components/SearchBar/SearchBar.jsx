import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center gap-3 rounded-3xl border-2 px-3">
      <input
        type="text"
        className="w-full p-3 outline-none text-sm py-[11px]"
        value={value}
        onChange={onChange}
        placeholder="Search"
      />
      {value && (
        <IoMdClose
          className="mr-3 text-2xl text-slate-400 cursor-pointer hover:text-black"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      ></FaMagnifyingGlass>
    </div>
  );
};

export default SearchBar;
