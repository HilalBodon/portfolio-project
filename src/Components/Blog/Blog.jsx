import React, { useEffect, useState, useRef } from 'react';
import './Blog.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import axios from 'axios';
import defaultImg from '../../img/hanadiLogo.png';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [featuredBlogData, setFeaturedBlogData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const featuredBlogRef = useRef(null);
  
  useEffect(() => {
    const fetchBlogData = async () => {
        try {
          const response = await axios({
            url: BaseURL + '/blog',
            method: 'get',
            params: {
              "fields": "*",
              "media": "images,files",
              "crops": "ax300,ax1000",
            },
            headers: Headers,
          });
          setBlogData(response.data.results);
        } catch (error) {
          console.error('Error fetching :', error);
        }
      };
  


    const fetchBlogDataFeatured = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/blog',
          method: 'get',
        params: {
            fields: '*',
            media: 'images',
            crops: 'ax300,ax1000',
            where: {
              featured: 1,
            },
          },
          headers: Headers,
        });
        setFeaturedBlogData(response.data.results);
      } catch (error) {
        console.error('Error fetching :', error);
      }
    };

    fetchBlogData();
    fetchBlogDataFeatured();
  }, []);

  const modifyDate = (dateString) => {
    const originalDate = new Date(dateString);
    const modifiedDate = new Date(originalDate);
    modifiedDate.setHours(originalDate.getHours() + 4);
    return modifiedDate.toLocaleString('en-US', { timeZone: 'GMT' });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    featuredBlogRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="t-wrapper" id='Blog'>
      <div className="t-heading">
        <span>Client always get </span>
        <span>EXception Work </span>
        <span>From me...</span>
      </div>

      <div className="featuredBlog" ref={featuredBlogRef}>
        {selectedBlog ? (
          <>
            <img
              src={selectedBlog.images?.untitled[0]?.dir + selectedBlog.images?.untitled[0]?.imageax1000 || defaultImg}
              alt="image"
              onError={(e) => {
                e.target.src = defaultImg;
              }}
            />
            <span>{selectedBlog.blog_content}</span>
            <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
            <p>{modifyDate(selectedBlog.createdAt)}</p>
          </>
        ) : featuredBlogData.length > 0 ? (
          <>
            <img
              src={featuredBlogData[0].images?.untitled[0]?.dir + featuredBlogData[0].images?.untitled[0]?.imageax1000 || defaultImg}
              alt="image"
              onError={(e) => {
                e.target.src = defaultImg;
              }}
            />
            <span>{featuredBlogData[0].blog_content}</span>
            <div dangerouslySetInnerHTML={{ __html: featuredBlogData[0].content }} />
            <p>{modifyDate(featuredBlogData[0].createdAt)}</p>
          </>
        ) : blogData.length > 0 ? (
          <>
            <img
              src={blogData[0].images?.untitled[0]?.dir + blogData[0].images?.untitled[0]?.imageax300 || defaultImg}
              alt="image"
              onError={(e) => {
                e.target.src = defaultImg;
              }}
            />
            <span>{blogData[0].blog_content}</span>
            <div>{blogData[0].content}</div>
            <p>{modifyDate(blogData[0].createdAt)}</p>
          </>
        ) : (
          <p>Loading Blogs .....</p>
        )}
      </div>

      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {blogData.map((blog, index) => (
          <SwiperSlide key={index}>
            <div
              className="blog"
              onClick={() => handleBlogClick(blog)}
            >
              <img
                src={blog.images?.untitled[0]?.dir + blog.images?.untitled[0]?.imageax300 || defaultImg}
                alt="image"
                onLoad={handleImageLoad}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
              {!imageLoaded && <p>Loading...</p>}
              <span>{blog.blog_content}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Blog;














// import React, { useEffect, useState } from 'react';
// import "./Blog.css"
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination } from 'swiper/modules';
// import 'swiper/css/pagination';
// import 'swiper/css';
// import axios from 'axios';
// import defaultImg from '../../img/hanadiLogo.png'
// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const Blog = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [featuredBlogData, setFeaturedBlogData] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {


//     const fetchBlogData = async () => {
//         try {
//           const response = await axios({
//             url: BaseURL + '/blog',
//             method: 'get',
//             params: {
//               "fields": "*",
//               "media": "images,files",
//               "crops": "ax300,ax1000",
//             },
//             headers: Headers,
//           });
//           console.log(response.data.results);
//           setBlogData(response.data.results);
//         } catch (error) {
//           console.error('Error fetching :', error);
//         }
//       };
  


//     const fetchBlogDataFeatured = async () => {
//       try {
//         const response = await axios({
//           url: BaseURL + '/blog',
//           method: 'get',
//         params: {
//             fields: '*',
//             media: 'images',
//             crops: 'ax300,ax1000',
//             where: {
//               featured: 1,
//             },
//           },
//           headers: Headers,
//         });
//         console.log(response.data.results);
//         setFeaturedBlogData(response.data.results);
//       } catch (error) {
//         console.error('Error fetching :', error);
//       }
//     };

//     fetchBlogData();
//     fetchBlogDataFeatured();
//   }, []);


//   const modifyDate = (dateString) => {
//     const originalDate = new Date(dateString);
//     const modifiedDate = new Date(originalDate);
//     modifiedDate.setHours(originalDate.getHours() + 4);
//     return modifiedDate.toLocaleString('en-US', { timeZone: 'GMT' });
//   };

//   return (
//     <div className="t-wrapper" id='Blog'>
//       <div className="t-heading">
//         <span>Client always get </span>
//         <span>EXception Work </span>
//         <span>From me...</span>
//         {/* <div className="blur t-blur1" style={{ background: "var(--purple)" }}></div>
//         <div className="blur t-blur2" style={{ background: "skyblue" }}></div> */}
//       </div>

//       {/* <div className="featuredBlog">
//         {featuredBlogData.length > 0 && (
//             <>
//             <img
//                 src={featuredBlogData[0].images?.untitled[0]?.dir + featuredBlogData[0].images?.untitled[0]?.imageax300 || defaultImg}
//                 alt="image"
//                 onError={(e) => {
//                 e.target.src = defaultImg;
//                 }}
//             />
//             <span>{featuredBlogData[0].blog_content}</span>
//             <div>{featuredBlogData[0].content}</div>
//             <p>{modifyDate(featuredBlogData[0].createdAt)}</p>
//             </>
//         )}
//         </div> */}


// <div className="featuredBlog">
//         {selectedBlog ? (
//           <>
//             <img
//               src={selectedBlog.images?.untitled[0]?.dir + selectedBlog.images?.untitled[0]?.imageax1000 || defaultImg}
//               alt="image"
//               onError={(e) => {
//                 e.target.src = defaultImg;
//               }}
//             />
//             <span>{selectedBlog.blog_content}</span>
//             <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
//             <p>{modifyDate(selectedBlog.createdAt)}</p>
//           </>
//         ) : featuredBlogData.length > 0 ? (
//           <>
//             <img
//               src={featuredBlogData[0].images?.untitled[0]?.dir + featuredBlogData[0].images?.untitled[0]?.imageax1000 || defaultImg}
//               alt="image"
//               onError={(e) => {
//                 e.target.src = defaultImg;
//               }}
//             />
//             <span>{featuredBlogData[0].blog_content}</span>
//             <div dangerouslySetInnerHTML={{ __html: featuredBlogData[0].content }} />
//             <p>{modifyDate(featuredBlogData[0].createdAt)}</p>
//           </>
//         ) : blogData.length > 0 ? (
//           <>
//             <img
//               src={blogData[0].images?.untitled[0]?.dir + blogData[0].images?.untitled[0]?.imageax300 || defaultImg}
//               alt="image"
//               onError={(e) => {
//                 e.target.src = defaultImg;
//               }}
//             />
//             <span>{blogData[0].blog_content}</span>
//             <div>{blogData[0].content}</div>
//             <p>{modifyDate(blogData[0].createdAt)}</p>
//           </>
//         ) : (
//           <p>No blog data available</p>
//         )}
//       </div>



//       {/* slider */}
//       <Swiper
//         modules={[Pagination]}
//         slidesPerView={1}
//         pagination={{ clickable: true }}
//       >
//         {blogData.map((blog, index) => (
//           <SwiperSlide key={index}>
//             <div className="blog"
//               onClick={() => setSelectedBlog(blog)}
//             >
//               <img
//                 src={blog.images?.untitled[0]?.dir + blog.images?.untitled[0]?.imageax300 || defaultImg}
//                 alt="image"
//                 onError={(e) => {
//                   e.target.src = defaultImg;
//                 }}
//               />
//               <span>{blog.blog_content}</span>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default Blog;
