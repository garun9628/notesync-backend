import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  const handleDelete = () => {
    deleteNote(note._id);
    showAlert("Note deleted successfully", "success");
  };

  const handleEditClick = () => {
    updateNote(note);
  };

  return (
    <div className="col-md-4 my-3">
      <div
        className="card"
        style={{
          boxShadow: "5px 10px 18px #8888",
          background: "content-box",
        }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 class="card-subtitle mb-2 text-muted">{note.title}</h5>
            <div>
              <i className="far fa-trash-alt mx-2" onClick={handleDelete}></i>
              <i className="far fa-edit mx-2" onClick={handleEditClick}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          <h6 className="card-title">{note.tag}</h6>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
