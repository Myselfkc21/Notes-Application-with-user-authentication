import React from "react";
import moment from "moment";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-xs font-medium">{title}</h6>
          <span className="text-xs text-slate-500">
            {moment(date).format("DD MMMM, YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-blue-400" : "text-slate-400"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-sm font-light">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-1">
        <div>
          {tags?.map((tag) => (
            <span className="text-sm text-slate-500 font-light" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <MdCreate
            className="icon-btn text-lg hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn text-lg hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
