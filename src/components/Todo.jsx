import "../components/Todo.css";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editMode, setEditMode] = useState({});

  const handleInputChange = (e) => {
    debugger;
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    debugger;
    e.preventDefault();

    if (inputValue.trim() === "") {
      alert("Post cannot be blank");
      return;
    }

    const newPost = { text: inputValue };
    setPosts([...posts, newPost]);
    setInputValue("");
    setErrorMsg("");
  };

  const deletePost = (index) => {
    debugger;
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const editPost = (index) => {
    debugger;
    setEditMode({ ...editMode, [index]: true });
  };

  // Add a new state variable to track edited text for each post in edit mode
  const [editedText, setEditedText] = useState({});

  const saveEditedPost = (index, newText) => {
    debugger;
    const updatedPosts = [...posts];
    updatedPosts[index].text = newText;
    setPosts(updatedPosts);
    setEditMode({ ...editMode, [index]: false });
    // Clear the edited text for this post
    setEditedText({ ...editedText, [index]: "" });
  };

  return (
    <div className="App">
      <div className="App-header">
        <div>
            <img
            src={require("../images/sticky-note.png")}
            alt="Todo list"
            className="logo"
            />
        </div>
        <div>
            <h1>React - Todo List</h1>
        </div>
      </div>
      <div className="container">
        <div className="left-box">
          <form onSubmit={handleFormSubmit}>
            <p htmlFor="post" className="form-label">
              Write your Task here
            </p>
            <textarea
              name="post"
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
            ></textarea>
            <div id="msg">{errorMsg}</div>
            <button type="submit" className="post-btn">
              Post
            </button>
          </form>
        </div>
        <div className="right-box">
          <p>Todo List</p>
          <div id="posts">
            {posts.map((post, index) => (
              <div key={index} className="post">
                {editMode[index] ? (
                  <div className="edit-box">
                    <textarea
                      name="post"
                      className="form"
                      value={editedText[index] || post.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        setEditedText({ ...editedText, [index]: newText });
                      }}
                    />
                    <div className="options">
                      <button
                        onClick={() =>
                          saveEditedPost(index, editedText[index] || post.text)
                        }
                        className="save-btn"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="todo-list">
                    <p>{post.text}</p>
                    <div className="options">
                      <div>
                        <button
                            onClick={() => editPost(index)}
                            className="edit-btn"
                        ><CiEdit color="blue" size={25} /></button>
                      </div>
                      <div>
                        <button
                            onClick={() => deletePost(index)}
                            className="delete-btn"
                        ><MdDeleteForever color="red" size={25}/></button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;