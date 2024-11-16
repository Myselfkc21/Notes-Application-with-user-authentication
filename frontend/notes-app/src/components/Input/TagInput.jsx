import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    console.log(tags);
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue(""); // Corrected state setter function
    }
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags?.map((tag, index) => (
            <span
              className="bg-slate-100 p-2 rounded-2xl mb-3 text-sm text-black font-medium flex align-center justify-center"
              key={index}
            >
              #{tag}
              <button
                onClick={() => {
                  console.log(tag);
                  handleRemoveTag(tag);
                }}
                className="flex align-center justify-center bg-slate-200 text-white rounded-full mx-2 my-1"
              >
                <MdClose className=" text-black"></MdClose>
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center align-center gap-3">
        <input
          type="text"
          className="border-2 p-2 rounded-lg outline-none"
          value={inputValue} // Make sure input value is controlled
          onChange={(e) => setInputValue(e.target.value)} // Corrected state setter function
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-1 bg-blue-500 text-white rounded-lg text-3xl"
          onClick={addNewTag}
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
