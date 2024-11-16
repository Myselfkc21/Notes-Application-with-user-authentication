import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdCreate } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(" ");
  const [AllNotes, SetAllNotes] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      console.log(response);
      if (!(response.data && response.data.error)) {
        setToastType("error");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
        getAllNotes();
      }
    } catch (error) {
      console.log("smthg went wrong");
    }
  };

  const searchNotes = async (query) => {
    console.log("search query", query);
    try {
      const response = await axiosInstance.get("/search-note", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        SetAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  const getAllNotes = async (showToastMessage = false) => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      console.log("response get all notes");
      console.log(response);
      if (response.data && response.data.notes) {
        SetAllNotes(response.data.notes);
        if (showToastMessage) {
          setToastType("success");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 1000);
        }
      }
    } catch (error) {
      console.log("smthg went wrong");
    }
  };

  const onClearSearch = () => {
    setIsSearch(false);
    getAllNotes(false);
  };

  useEffect(() => {
    getAllNotes(false);
    getUserInfo();
  }, []);

  return (
    <>
      {userInfo && (
        <NavBar
          userInfo={userInfo}
          onSearch={searchNotes}
          ClearSearch={onClearSearch}
        ></NavBar>
      )}
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {AllNotes.length > 0 ? (
            AllNotes.sort((a, b) => b.isPinned - a.isPinned).map(
              (note, key) => (
                <NoteCard
                  title={note.title}
                  content={note.content}
                  date={note.CreatedOn}
                  key={note._id}
                  id={note._id}
                  tags={note.tags}
                  isPinned={note.isPinned}
                  onEdit={() => {
                    setOpenAddEditModal({
                      isShown: true,
                      type: "edit",
                      data: note,
                    });
                  }}
                  onDelete={() => {
                    deleteNote(note._id);
                  }}
                  onPinNote={async () => {
                    try {
                      await axiosInstance.put(
                        `/update-note-pinned/${note._id}`,
                        {
                          isPinned: !note.isPinned,
                        }
                      );
                      getAllNotes();
                    } catch (error) {
                      console.log("Error pinning note:", error);
                    }
                  }}
                />
              )
            )
          ) : (
            <div className="col-span-3 text-center flex flex-col items-center justify-center gap-4">
              <img
                className="mix-blend-multiply w-64 h-64 object-contain"
                src="https://i.pinimg.com/736x/9c/e5/23/9ce523a9f93bf0c1e6fffa4fcb3d1c9f.jpg"
                alt="No notes"
              />
              <p className="text-lg text-gray-600">
                You have no notes. Create one by clicking the button at the
                bottom.
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        className="w-16 h-16 fixed bottom-5 right-5 bg-blue-500 rounded-2xl flex items-center justify-center hover:bg-blue-600"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="icon-btn text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={() => getAllNotes(true)}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
        ></AddEditNotes>
      </Modal>
      {showToast && <Toast type={toastType} />}
    </>
  );
};

export default Home;
