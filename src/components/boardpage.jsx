import React, { useState, useEffect } from "react";
import "../style/board.css"; // 정확한 경로 확인

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const initializeForm = () => {
    setAuthor("");
    setTitle("");
    setContent("");
  };

  const handleWriteClick = () => {
    setIsWriting(true);
  };

  const handleCancelClick = () => {
    setIsWriting(false);
    initializeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      author,
      title,
      content,
      date: new Date().toLocaleString(),
    };
    setPosts([...posts, newPost]);
    setIsWriting(false);
    initializeForm();
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="board-board-page">
      <h1>자유게시판</h1>
      <table className="board-post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              onClick={() => handlePostClick(post)}
              style={{ cursor: "pointer" }}
            >
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  className="board-delete-btn"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPost && (
        <div className="board-modal">
          <div className="board-modal-content">
            <h2>{selectedPost.title}</h2>
            <div className="board-modal-body">
              <p>{selectedPost.content}</p>
            </div>
            <div className="board-post-footer">
              {selectedPost.author} | {selectedPost.date}
            </div>
            <button
              onClick={() => setSelectedPost(null)}
              className="board-close-btn"
            >
              닫기
            </button>
          </div>
        </div>
      )}
      {isWriting && (
        <form onSubmit={handleSubmit} className="board-write-form">
          <input
            type="text"
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div className="board-form-buttons">
            <button type="submit">등록</button>
            <button type="button" onClick={handleCancelClick}>
              취소
            </button>
          </div>
        </form>
      )}
      {!isWriting && (
        <button onClick={handleWriteClick} className="board-write-btn">
          글쓰기
        </button>
      )}
    </div>
  );
};

export default BoardPage;
