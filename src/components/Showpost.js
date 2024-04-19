import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Showpost = (props) => {
  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentdata, setCommentData] = useState([]);
  const [callapi, setCallApi] = useState(false);

  const [commenttext, setCommentText] = useState("");
  const [displaycomment, setDisplayComment] = useState(null);
 

  // const commentref = useRef('');

  function hideComments(index) {
    if (displaycomment === index) {
      setDisplayComment(null);
    } else {
      setDisplayComment(index);
    }
  }

  function commentDataHandler(id, e) {
    e.preventDefault();
    console.log(id);
    //const commenttext = commentref.current.value;
    console.log(commenttext);

    const newcomment = {
      comment: commenttext,
      id: id,
    };

    axios
      .post("http://localhost:4000/addcomment", newcomment)
      .then(() => {
        console.log("comment sent");
        setCallApi(!callapi);
        setCommentText("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:4000/getdata")
      .then((response) => {
        //console.log(response)
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.ChangedData]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getcomments")
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((err) => console.log(err));
  }, [callapi]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {console.log("props", props.ChangedData)}
          {userdata.map((data, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#666666",
                padding: "20px",
                width: "100%",
                maxWidth: "50%",
                border: "1px solid black",
                margin: "20px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={data.imageurl}
                alt="Post"
                style={{ maxWidth: "100%", alignSelf: "center" }}
              />
              <p style={{ color: "white", fontSize: "20px" }}>
                {" "}
                User - {data.description}
              </p>
              <button
                style={{ margin: "10px", fontSize: "20px" }}
                onClick={() => hideComments(index)}
              >
                Add Comment
              </button>
              {displaycomment === index && (
                <div>
                  <form
                    onSubmit={(e) => commentDataHandler(data.id, e)}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="text"
                      value={commenttext}
                      onChange={(e) => setCommentText(e.target.value)}
                      style={{ marginRight: "10px" , fontSize:'15px'}}
                    />
                    <button style={{ marginLeft: "10px" , fontSize:'15px'}}>Send</button>
                  </form>

                  <div style={{ margin: "10px", fontSize: "20px" }}>
                    {commentdata && commentdata.length > 0 ? (
                      <div>
                        {commentdata
                          .filter(
                            (comment) => comment.socialmediadatumId === data.id
                          )
                          .map((comment, index) => (
                            <div key={index} style={{ margin: "10px" }}>
                              <span style={{ color: "orange" }}>
                                Anonymous :
                              </span>
                              <span style={{ color: "white" }}>
                                {" "}
                                {comment.comment}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <h1>No comments</h1>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showpost;
