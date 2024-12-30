import React from 'react'
import { useParams } from 'react-router-dom'

function ReadPage() {
   const { idx } = useParams() // 게시글의 idx를 라우트에서 가져옴

   // Dummy data for demonstration. Replace with API call or context data fetching.
   const post = {
      title: 'Example Title',
      content: 'This is the content of the post.',
      author: 'John Doe',
      date: '2024-12-19',
   }

   return (
      <div className="bbsRead">
         <h2>{post.title}</h2>
         <table id="readTbl">
            <tbody>
               <tr>
                  <td>작성자</td>
                  <td>{post.author}</td>
                  <td>등록일</td>
                  <td>{post.date}</td>
               </tr>
               <tr>
                  <td colSpan="4" id="readContentTd">
                     <pre>{post.content}</pre>
                  </td>
               </tr>
            </tbody>
            <tfoot>
               <tr>
                  <td colSpan="4" id="btnAreaTd" className="read">
                     <button onClick={() => alert('수정 페이지로 이동')}>수정</button>
                     <button onClick={() => alert('삭제 요청')}>삭제</button>
                  </td>
               </tr>
            </tfoot>
         </table>
      </div>
   )
}

export default ReadPage