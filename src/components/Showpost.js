import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Showpost = () => {
  const [userdata, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [displaycomment, setDisplayComment] = useState(true);
  const [commentdata, setCommentData] = useState([]);
  const [callapi, setCallApi] = useState(false);

  const [commenttext, setCommentText] = useState('');

  const commentref = useRef('');

  function hideComments() {
    setDisplayComment(!displaycomment);
  }

  function commentDataHandler(id, e) {
    e.preventDefault();
    console.log(id);
    //const commenttext = commentref.current.value;
    console.log(commenttext)

    const newcomment = {
      comment: commenttext,
      id: id,
    };

    axios
      .post("http://localhost:4000/addcomment", newcomment)
      .then(() => {
        console.log("comment sent");
        setCallApi(!callapi);
        setCommentText('');
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
  }, [setCallApi]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getcomments")
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((err) => console.log(err));
  }, [setCallApi]);

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {userdata.map((data, index) => (
            <div
              key={index}
              style={{ margin: "20px", border: "1px solid black" }}
            >
              <img src={data.imageurl} alt="Post" style={{ maxWidth: "50%" }} />
              <p>{data.description}</p>
              <button onClick={hideComments}>Add Comment</button>
              {displaycomment ? (
                <div></div>
              ) : (
                <div>
                  <form onSubmit={(e) => commentDataHandler(data.id, e)}>
                  {/* <input type="text" ref={commentref} /> */}
                  <input type="text" value={commenttext} onChange={(e) => setCommentText(e.target.value)} />
                    <button>Send</button>
                  </form>
                  <div>
                    {commentdata && commentdata.length > 0 ? (
                      <div>
                        {commentdata
                          .filter((comment) => comment.socialmediadatumId === data.id) // Filter comments based on postId
                          .map((comment, index) => (
                            <div key={index}>
                              <h3>Anonymous : {comment.comment}</h3>
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
