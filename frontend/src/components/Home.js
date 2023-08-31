import React from "react";
import AddNote from "./AddNote.js";
import Notes from "./Notes.js";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <>
      <AddNote showAlert={showAlert} />
      <Notes showAlert={showAlert} />
    </>
  );
};

export default Home;
