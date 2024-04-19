import React, { useRef } from "react";
import axios from "axios";

const Forminput = () => {
  const url = useRef();
  const desc = useRef();

  function dataHandler(e) {
    e.preventDefault()
    const imageurl = url.current.value;
    const description = url.current.value;

    const newdata = {
      imageurl: imageurl,
      description: description,
    };

    axios
      .post("http://localhost:4000/postdata", newdata)
      .then(() => {
        console.log("data sent to backedn");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form onSubmit={dataHandler}>
        <label>Post Link</label>
        <input type="text" ref={url}></input>
        <br />
        <label>Post Description</label>
        <input type="text" ref={desc}></input>
        <br />
        <button>Create Post</button>
      </form>
    </div>
  );
};

export default Forminput;
