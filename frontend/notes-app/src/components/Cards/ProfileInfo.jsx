import React from "react";
import { GetInitials } from "../../utils/Helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-3">
      <div className="text-2xl bg-slate-100 p-2 text-slate-500 font-medium rounded-full">
        {GetInitials(userInfo.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo.fullName}</p>
        <button
          className="font-light underline text-blue-500"
          onClick={onLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
