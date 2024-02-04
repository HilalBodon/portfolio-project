import React from 'react'
import './Books.css';
import LoadingSpinner from '../LoadingSpinner';

// import Sidebar from '../../img/sidebar.png'
// import Ecommerce from '../../img/ecommerce.png'
// import MusicApp from '../../img/musicapp.png'
// import HOC from '../../img/hoc.png'
import { themeContext } from '../../Context'
import { useContext , useEffect,useState } from "react";
import axios from 'axios';
import defaultImg from '../../img/hanadiLogo.png';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
  

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};


const Books = () => {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMobile = window.innerWidth < 480;
    const [error, setError] = useState(null); 

  
    useEffect(() => {
        const fetchBooksData = async () => {
            try {
              const response = await axios({
                url: BaseURL + '/Books',
                method: 'get',
                params: {
                  fields: '*',
                  media: 'images,files',
                  crops: 'ax300,ax1000',
                },
                headers: Headers,
              });
            //   console.log(response.data.results);
              setBooksData(response.data.results);
              setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Axios error (network issues, timeouts, etc.)
                    if (!error.response) {
                      setError('Network error: No response from server. Please check your internet connection.');
                    } else {
                      setError(`Request failed with status ${error.response.status}: ${error.response.statusText}`);
                    }
                  } else {
                    // Other errors
                    setError('Error fetching data. Please try again later.');
                  }
                  setLoading(false); // Set loading to false even in case of an error
                }
              };
      fetchBooksData();
    }, []);
  
    const swiperConfig = {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      spaceBetween: 50,
      slidesPerView: isMobile ? 1 : 3,
      direction: isMobile ? 'vertical' : 'horizontal',
      navigation: isMobile ? false : true,
      height: isMobile ? '500px' : '400px',
    //   onSwiper: (swiper) => console.log(swiper),
      onSlideChange: () => console.log('slide change'),
    };
  
    return (
      <div className="m-books">
        {/* heading */}
        <div className="books">
          <span style={{ color: darkMode ? 'white' : '' }}>Hanadi Sheikh Najib</span>
          <span>Books</span>
        </div>
  
        {loading ? (
          <LoadingSpinner />
            ) : error ? (
                <div className="error-message">{error}</div>
              ) : (
          <Swiper {...swiperConfig}>
            {booksData.map((book, index) => (
              <SwiperSlide key={index}>
                <div className="books-card">
                  <img src={book.images?.untitled[0]?.dir + book.images?.untitled[0]?.title || defaultImg} alt="Book" />
                  <div>{book.name}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    );
  };
  
  export default Books;















// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// export default () => {
//   return (
//     <Swiper
//       // install Swiper modules
//       modules={[Navigation, Pagination, Scrollbar, A11y]}
//       spaceBetween={50}
//       slidesPerView={3}
//       navigation
//       pagination={{ clickable: true }}
//       scrollbar={{ draggable: true }}
//       onSwiper={(swiper) => console.log(swiper)}
//       onSlideChange={() => console.log('slide change')}
//     >
//       <SwiperSlide>Slide 1</SwiperSlide>
//       <SwiperSlide>Slide 2</SwiperSlide>
//       <SwiperSlide>Slide 3</SwiperSlide>
//       <SwiperSlide>Slide 4</SwiperSlide>
//       ...
//     </Swiper>
//   );
// };













//   return (
//     <div className="books" id='Books'>
//         {/* heading */}
//         <span style = {{color:darkMode ? 'white' : '' }}>Hanadi Sheikh Najib</span>
//         <span>Books</span>

//         <Swiper
//             spaceBetween={30}
//             slidesPerView={3}
//             grabCursor={true}
//             className='books-slider'>

//             <SwiperSlide>
//                 <div className='books-card'>
//                     <img src={Sidebar} alt="Sidebar" />
//                     <div >First book</div>
//                 </div>
//             </SwiperSlide>   

//             <SwiperSlide>
//                 <img src={Ecommerce} alt="Sidebar" />
//             </SwiperSlide>  

//             <SwiperSlide>
//                 <img src={MusicApp} alt="Sidebar" />
//             </SwiperSlide>

//             <SwiperSlide>
//                 <img src={HOC} alt="Sidebar" />
//             </SwiperSlide>              

//         </Swiper>
//     </div>
//     )
// }

// export default Books