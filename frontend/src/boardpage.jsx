import React, { useState, useEffect } from "react";
import "./style/board.css"; // CSS 파일 경로

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [author, setAuthor] = useState(""); // 작성자 이름 상태 추가
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null); // 선택한 게시글 상태 추가

  // 로컬 저장소에서 게시글을 불러오는 함수
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  // 게시글이 변경될 때마다 로컬 저장소에 저장하는 함수
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleWriteClick = () => {
    setIsWriting(true);
  };

  const handleCancelClick = () => {
    setIsWriting(false);
    setAuthor(""); // 작성자 이름 초기화
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      author, // 작성자 이름 추가
      title,
      content,
      date: new Date().toLocaleString(),
    };
    setPosts([...posts, newPost]);
    setIsWriting(false);
    setAuthor(""); // 작성자 이름 초기화
    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <div className="board-page">
      <h1>자유게시판</h1>
      <table className="post-table">
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
                  onClick={() => handleDelete(post.id)}
                  className="delete-btn"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPost && (
        <div className="modal board-modal">
          <div className="modal-content board-modal-content">
            <h2>{selectedPost.title}</h2>
            <div className="modal-body board-modal-body">
              <p>{selectedPost.content}</p>
            </div>
            <div className="post-footer">
              {selectedPost.author} | {selectedPost.date}
            </div>
            <button onClick={() => setSelectedPost(null)} className="close-btn">
              닫기
            </button>
          </div>
        </div>
      )}
      {isWriting && (
        <form onSubmit={handleSubmit} className="write-form">
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
          <div className="form-buttons">
            <button type="submit">등록</button>
            <button type="button" onClick={handleCancelClick}>
              취소
            </button>
          </div>
        </form>
      )}
      {!isWriting && (
        <button onClick={handleWriteClick} className="write-btn">
          글쓰기
        </button>
      )}
    </div>
  );
};

export default BoardPage;
