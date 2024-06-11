// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Testimonials.css';
// import defaultImg from '../../../img/hanadiLogo.png';

// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await axios({
//           url: BaseURL + '/Testimonials',
//           params: {
//             "fields": '*',
//             "media": "images",
//             "crops": "ax300",
//           },
//           headers: Headers,
//         });
//         console.log(response.data.results)
//         setTestimonials(response.data.results);
//       } catch (error) {
//         console.error('Error fetching testimonials:', error);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   return (
//     <div className="testimonials-container">
//       {testimonials.map((testimonial, index) => (
//         <div key={index} className="testimonial">

//         <img 
//           src={testimonial.images?.untitled[0]?.dir + testimonial.images?.untitled[0]?.imageax300 || defaultImg} 
//           alt="Item Image" 
//           onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
//         />
//           {/* <img src={testimonial.image || defaultImg} alt="Testimonial" /> */}
//           <div className='main-testimonial'>
//             <h2 className="testimonial-name">{testimonial.Name}</h2>
//             <div dangerouslySetInnerHTML={{ __html: testimonial.Testimony}} className="testimony" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );

// };

// export default Testimonials;


import React from 'react';
import './Testimonials.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import axios from 'axios';
import defaultImg from '../../../img/hanadiLogo.png';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = React.useState([]);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Testimonials',
          params: {
            fields: '*',
            media: 'images',
            crops: 'ax300',
          },
          headers: Headers,
        });
        setTestimonials(response.data.results);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const swiperConfig = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 100,
    slidesPerView: 1,
    direction: 'horizontal',
    navigation: true,
    pagination: true,
    autoplay: {
    delay: 4000, 
    },
  };

  return (

    <Swiper {...swiperConfig}
          onSwiper={(swiper) => {
          swiper.el.onmouseenter = () => swiper.autoplay.stop();
          swiper.el.onmouseleave = () => swiper.autoplay.start();
          swiper.el.ontouchstart = () => swiper.autoplay.stop();
          swiper.el.ontouchend = () => swiper.autoplay.start();
        }}
        >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index} className="testimonial">
          <img
            src={
              testimonial.images?.untitled[0]?.dir +
              testimonial.images?.untitled[0]?.imageax300 ||
              defaultImg
            }
            alt="Item Image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <div className="main-testimonial">
            <h2 className="testimonial-name">{testimonial.Name}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: testimonial.Testimony }}
              className="testimony"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Testimonials;