import React from 'react';
import { useLocation } from 'react-router-dom';
import defaultImg from '../../../img/hanadiLogo.png'
import './Blog.css'
const FullscreenBlog = () => {

  const location = useLocation();
  const { selectedBlog } = location.state;
  // console.log(selectedBlog)

  return (
    <div className="fullscreen-blog">

      <div className="card-image">
              <img
                src={selectedBlog.images?.untitled[0]?.dir + selectedBlog.images?.untitled[0]?.imageax1000 || defaultImg}
                alt="blog"
                // onLoad={handleImageLoad}
              />
      </div>
      <h2>{selectedBlog.blog_content}</h2>
      <p>{selectedBlog.content}</p>

      </div>
  );
};

export default FullscreenBlog;
