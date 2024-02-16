import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import defaultImg from '../../../img/hanadiLogo.png';
import './Blog.css';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const FullscreenBlog = () => {
  const { objectId } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/blog/${objectId}`,
          method: 'get',
          params: {
            fields: '*',
            media: 'images',
            crops: 'ax1000', // Adjust as needed
          },
          headers: Headers,
        });
        setSelectedBlog(response.data.results[0]);
        // console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [objectId]);

  return (
    <div className="fullscreen-blog">
      {selectedBlog && (
        <>
          <div className="card-image">
            <img
              src={selectedBlog.images?.untitled[0]?.dir + selectedBlog.images?.untitled[0]?.imageax1000 || defaultImg}
              alt="blog"
            />
          </div>
          <h2>{selectedBlog.blog_content}</h2>
          <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} className="" />

        </>
      )}
    </div>
  );
};

export default FullscreenBlog;
