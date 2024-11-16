import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  const [tags, setTags] = useState(noteData?.tags || []);
  const [content, SetContent] = useState(noteData?.content || "");
  const [title, SetTitle] = useState(noteData?.title || "");
  const [error, SetError] = useState(null);
  const [tost, SetTost] = useState(false);
  //Add NOTES
  const AddNewNote = async () => {
    console.log("AddNewNote function called");
    try {
      const response = await axiosInstance.post("/add-note", {
        title: title,
        content: content,
        tags: tags,
      });
      console.log(response);

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        SetError(error.response.data.message);
      }
    }
  };

  //EDIT NOTES
  const EditNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note/" + noteId, {
        title: title,
        content: content,
        tags: tags,
      });
      console.log(response.data);

      if (response.data && response.data.note) {
        SetTost(true);
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        SetError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    console.log("handleAddNote function called"); // Debugging line
    if (!title) {
      SetError("Title is required");
      return;
    }
    if (!content) {
      SetError("Content is required");
      return;
    }
    SetError("");
    if (type === "edit") {
      EditNote();
    } else {
      AddNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="w-10 h-10 absolute right-3 bg-slate-100 rounded-full flex justify-center items-center"
      >
        <MdClose></MdClose>
      </button>
      <div className="flex flex-col gap-3">
        <label className="text-xl text-slate-500">TITLE</label>
        <input
          type="text"
          className="border-2 text-3xl outline-none"
          value={title}
          onChange={(e) => SetTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <label className="text-xl text-slate-500">CONTENT</label>
        <textarea
          className="border-2 "
          id=""
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => SetContent(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-3">
        <label className="flex flex-col gap-3">TAGS</label>
        <TagInput tags={tags} setTags={setTags}></TagInput>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button
        className="font-medium mt-5 p-3 bg-blue-500 text-white btn-primary w-100% rounded-3xl"
        onClick={handleAddNote}
      >
        {type == "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;

