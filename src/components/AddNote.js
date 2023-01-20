import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault(); // isse page reload nahi hoga
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: "-25px" }}>
      <div
        className="my-5"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>Add a Note</h1>
      </div>

      <form>
        <div
          style={{
            border: "0.5px solid",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "100px",
            borderColor: "darkgreen",
            boxShadow: "5px 10px 18px #8888",
          }}
        >
          <div
            className="my-3"
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label
              htmlFor="title"
              className="form-label"
              style={{ fontSize: "large", color: "black" }}
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label
              htmlFor="description"
              className="form-label"
              style={{ fontSize: "large", color: "black" }}
            >
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div
            className="my-3"
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <label
              htmlFor="tag"
              className="form-label"
              style={{ fontSize: "large", color: "black" }}
            >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "35px",
              marginBottom: "30px",
            }}
          >
            <button
              disabled={note.title.length < 3 || note.description.length < 5}
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Add Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
