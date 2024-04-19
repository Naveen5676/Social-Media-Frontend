import React, { useRef } from "react";
import axios from "axios";

const Forminput = (props) => {
  const url = useRef();
  const desc = useRef();

  function dataHandler(e) {
    e.preventDefault();
    const imageurl = url.current.value;
    const description = desc.current.value;

    const newdata = {
      imageurl: imageurl,
      description: description,
    };

    axios
      .post("http://localhost:4000/postdata", newdata)
      .then((result) => {
        console.log("data sent to backedn");
        props.onAddData(result);
      })
      .catch((err) => console.log(err));
  }

  return (
<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  }}
>
  <div
    style={{
      padding: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      border: "1px solid black",
      fontSize: "18px",
      backgroundColor: "white",
    }}
  >
    <form onSubmit={dataHandler}>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Post Link :
        </label>
        <input
          type="text"
          ref={url}
          style={{ fontSize: "16px", padding: "8px", width: "100%" }}
        ></input>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Post Description :
        </label>
        <input
          type="text"
          ref={desc}
          style={{ fontSize: "16px", padding: "8px", width: "100%" }}
        ></input>
      </div>
      <button style={{fontSize: "16px" , width:"100px" , height:"30px" , backgroundColor: "#90EE90"}}>Create Post</button>
    </form>
  </div>
</div>

  );
};

export default Forminput;
