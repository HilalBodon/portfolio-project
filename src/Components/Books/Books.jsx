import React from 'react'
import './Books.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import Sidebar from '../../img/sidebar.png'
import Ecommerce from '../../img/ecommerce.png'
import MusicApp from '../../img/musicapp.png'
import HOC from '../../img/hoc.png'
import { themeContext } from '../../Context'
import { useContext , useEffect,useState } from "react";
import axios from 'axios';
import defaultImg from '../../img/hanadiLogo.png';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Books = () => {
    
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const fetchBooksData = async () => {
            try {
              const response = await axios({
                url: BaseURL + '/Books',
                method: 'get',
                params: {
                  "fields": "*",
                  "media": "images,files",
                  "crops": "ax300,ax1000",
                },
                headers: Headers,
              });
              console.log(response.data.results);
              setBooksData(response.data.results);
            } catch (error) {
              console.error('Error fetching :', error);
            }
          };
          fetchBooksData();
        }, []);


        return (
            <div className="books" id="Books">
              {/* heading */}
              <span style={{ color: darkMode ? 'white' : '' }}>Hanadi Sheikh Najib</span>
              <span>Books</span>
        
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                grabCursor={true}
                className="books-slider"
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
              >
                {booksData.map((book, index) => (
                  <SwiperSlide key={index}>
                    <div className="books-card">
                      <img src={book.images?.untitled[0]?.dir + book.images?.untitled[0]?.title || defaultImg} alt="Book" />
                      <div>{book.name}</div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
        
              {/* Navigation Arrows */}
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          );
        };
        
        export default Books;


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