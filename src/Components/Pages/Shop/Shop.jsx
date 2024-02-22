import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Shop.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import LoadingSpinner from '../../LoadingSpinner';
import defaultImg from '../../../img/hanadiLogo.png';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Shop = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);
  const isMobile = window.innerWidth < 480;
  const location = useLocation();
  // console.log('Location Pathname:', location.pathname);
  const isStorePage = location.pathname === '/%D8%A7%D9%84%D9%85%D8%AA%D8%AC%D8%B1';// this equal المتجر in arabic
  
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/Store`,
          method: 'get',
          params: {
            fields: '*,categories',
            media: 'images,files',
            crops: 'ax300,ax1000',
            limit: -1,
          },
          headers: Headers,
        });
        setBooksData(response.data.results);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setError('Network error: No response from server. Please check your internet connection.');
          } else {
            setError(`Request failed with status ${error.response.status}: ${error.response.statusText}`);
          }
        } else {
          setError('Error fetching data. Please try again later.');
        }
        setLoading(false);
      }
    };
    fetchBooksData();
  }, []);

  const handleMouseEnter = (book) => {
    setHoveredBook(book);
  };

  const handleMouseLeave = () => {
    setHoveredBook(null);
  };

  const renderSwipers = () => {
    const categories = {};
    booksData.forEach(book => {
      const category = book.categories[0]?.Name || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(book);
    });

    const swiperConfig = {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      spaceBetween: 50,
      slidesPerView: isMobile ? 1 : 3,
      direction: 'horizontal',
      navigation:  true,
      height: isMobile ? '500px' : '400px',
    };

    return Object.entries(categories).map(([category, books]) => (
      <div className='swiper-container' key={category}>
        <h2 className='categoryName'>{category}</h2>
        <Swiper {...swiperConfig}>
          {books.map(book => (
            <SwiperSlide key={book.objectId}>
              <Link to={{pathname: `/fullscreen/${book.objectId}`,
                state: { booksData }
                
              }}>

                <div className="books-card">
                  <div className="image-container" onMouseEnter={() => handleMouseEnter(book)} onMouseLeave={handleMouseLeave}>
                    <img 
                      src={book.images?.untitled[0]?.dir + book.images?.untitled[0]?.imageax300 || defaultImg} 
                      alt="Item Image" 
                      onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
                    />
                    {hoveredBook === book && <div className="price">{book.book_price}</div>}
                  </div>
                </div>
              </Link>
                  <div className="name">{book.name}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ));
  };

  return (
    <div className="m-books">
        {isStorePage && (
      <div className="books">
        <span> &nbsp;أهم الدورات </span>
        <span> والكتب </span>
      </div>)}

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        renderSwipers()
      )}
    </div>
  );
};

export default Shop;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Shop.css';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import LoadingSpinner from '../../LoadingSpinner';
// import defaultImg from '../../../img/hanadiLogo.png';

// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const Shop = () => {
//   const [booksData, setBooksData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredBook, setHoveredBook] = useState(null);
//   const isMobile = window.innerWidth < 480;

//   useEffect(() => {
//     const fetchBooksData = async () => {
//       try {
//         const response = await axios({
//           url: `${BaseURL}/Store`,
//           method: 'get',
//           params: {
//             fields: '*,categories',
//             media: 'images,files',
//             crops: 'ax300,ax1000',
//             limit: -1,
//           },
//           headers: Headers,
//         });
//         setBooksData(response.data.results);
//         // console.log(response.data.results);
//         setLoading(false);
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           if (!error.response) {
//             setError('Network error: No response from server. Please check your internet connection.');
//           } else {
//             setError(`Request failed with status ${error.response.status}: ${error.response.statusText}`);
//           }
//         } else {
//           setError('Error fetching data. Please try again later.');
//         }
//         setLoading(false);
//       }
//     };
//     fetchBooksData();
//   }, []);

//   const handleMouseEnter = (book) => {
//     setHoveredBook(book);
//   };

//   const handleMouseLeave = () => {
//     setHoveredBook(null);
//   };

//   const renderSwipers = () => {
//     const categories = {};

//     // Group books by category
//     booksData.forEach(book => {
//       const category = book.categories[0]?.Name || 'Uncategorized';
//       if (!categories[category]) {
//         categories[category] = [];
//       }
//       categories[category].push(book);
//     });

//     const swiperConfig = {
//       modules: [Navigation, Pagination, Scrollbar, A11y],
//       spaceBetween: 50,
//       slidesPerView: isMobile ? 1 : 3,
//       direction: isMobile ? 'vertical' : 'horizontal',
//       navigation: isMobile ? false : true,
//       height: isMobile ? '500px' : '400px',
//     };

//     return Object.entries(categories).map(([category, books]) => (
//       <div className='swiper-container' key={category}>
//         <h2 className='categoryName'>{category}</h2>
//         <Swiper {...swiperConfig}>
//   {books.map(book => (
//     <SwiperSlide key={book.objectId}>
//       <div className="books-card">
//         <div className="image-container" onMouseEnter={() => handleMouseEnter(book)} onMouseLeave={handleMouseLeave}>
//           <img 
//             src={book.images?.untitled[0]?.dir + book.images?.untitled[0]?.imageax300 || defaultImg} 
//             alt="Item Image" 
//             onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
//           />
//           {hoveredBook === book && <div className="price">{book.Brief}</div>}
//         </div>
//         <div className="name">{book.name}</div>
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>

//       </div>
//     ));
//   };

//   return (
//     <div className="m-books">
//       <div className="books">
//         <span> &nbsp;أهم الدورات </span>
//         <span> والكتب </span>
//       </div>

//       {loading ? (
//         <LoadingSpinner />
//       ) : error ? (
//         <div className="error-message">{error}</div>
//       ) : (
//         renderSwipers()
//       )}
//     </div>
//   );
// };

// export default Shop;









