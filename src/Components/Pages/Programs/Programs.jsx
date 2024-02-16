import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Programs.css';
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

const Programs = ({ category }) => {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProgram, setHoveredProgram] = useState(null);
  const isMobile = window.innerWidth < 480;

  useEffect(() => {
    const fetchProgramsData = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/Programs`,
          method: 'get',
          params: {
            fields: '*,categories',
            media: 'images,files',
            crops: 'ax300,ax1000',
            limit: -1,
          },
          headers: Headers,
        });
        console.log(response.data.results);

        const filteredPrograms = category
          ? response.data.results.filter(program => program.categories[0]?.Name === category)
          : response.data.results;
        setProgramsData(filteredPrograms);
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
    fetchProgramsData();
  }, [category]);

  const handleMouseEnter = (program) => {
    setHoveredProgram(program);
  };

  const handleMouseLeave = () => {
    setHoveredProgram(null);
  };

  const renderSwipers = () => {
    const categories = {};
    programsData.forEach(program => {
      const category = program.categories[0]?.Name || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(program);
    });

    const swiperConfig = {
      modules: [Navigation, Pagination, Scrollbar, A11y],
      spaceBetween: 50,
      slidesPerView: isMobile ? 1 : 3,
      direction: isMobile ? 'vertical' : 'horizontal',
      navigation: isMobile ? false : true,
      height: isMobile ? '500px' : '400px',
    };

    return Object.entries(categories).map(([category, programs]) => (
      <div className='swiper-container' key={category}>
        <h2 className='categoryName'>{category}</h2>
        <Swiper {...swiperConfig}>
          {programs.map(program => (
            <SwiperSlide key={program.objectId}>
              <div className="programs-card">
                <div className="image-container" onMouseEnter={() => handleMouseEnter(program)} onMouseLeave={handleMouseLeave}>
                  <img 
                    src={program.images?.untitled[0]?.dir + program.images?.untitled[0]?.imageax300 || defaultImg} 
                    alt="Item Image" 
                    onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
                  />
                  {hoveredProgram === program && <div className="price">{program.URL}</div>}
                </div>
                <div className="name">{program.Title}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ));
  };

  return (
    <div className="m-programs">
      <div className="programs">
        <span> &nbsp; جميع</span>
        <span> البرامج</span>
      </div>

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

export default Programs;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Programs.css';
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

// const Programs = () => {
//   const [programsData, setProgramsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredProgram, setHoveredProgram] = useState(null);
//   const isMobile = window.innerWidth < 480;

//   useEffect(() => {
//     const fetchProgramsData = async () => {
//       try {
//         const response = await axios({
//           url: `${BaseURL}/Programs`,
//           method: 'get',
//           params: {
//             fields: '*,categories',
//             media: 'images,files',
//             crops: 'ax300,ax1000',
//             limit: -1,
//           },
//           headers: Headers,
//         });
//         setProgramsData(response.data.results);
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
//     fetchProgramsData();
//   }, []);

//   const handleMouseEnter = (program) => {
//     setHoveredProgram(program);
//   };

//   const handleMouseLeave = () => {
//     setHoveredProgram(null);
//   };

//   const renderSwipers = () => {
//     const categories = {};

//     // Group programs by category
//     programsData.forEach(program => {
//       const category = program.categories[0]?.Name || 'Uncategorized';
//       if (!categories[category]) {
//         categories[category] = [];
//       }
//       categories[category].push(program);
//     });

//     const swiperConfig = {
//       modules: [Navigation, Pagination, Scrollbar, A11y],
//       spaceBetween: 50,
//       slidesPerView: isMobile ? 1 : 3,
//       direction: isMobile ? 'vertical' : 'horizontal',
//       navigation: isMobile ? false : true,
//       height: isMobile ? '500px' : '400px',
//     };

//     return Object.entries(categories).map(([category, programs]) => (
//       <div className='swiper-container' key={category}>
//         <h2 className='categoryName'>{category}</h2>
//         <Swiper {...swiperConfig}>
//   {programs.map(program => (
//     <SwiperSlide key={program.objectId}>
//       <div className="programs-card">
//         <div className="image-container" onMouseEnter={() => handleMouseEnter(program)} onMouseLeave={handleMouseLeave}>
//           <img 
//             src={program.images?.untitled[0]?.dir + program.images?.untitled[0]?.imageax300 || defaultImg} 
//             alt="Item Image" 
//             onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
//           />
//           {hoveredProgram === program && <div className="price">{program.Brief}</div>}
//         </div>
//         <div className="name">{program.name}</div>
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>

//       </div>
//     ));
//   };

//   return (
//     <div className="m-programs">
//       <div className="programs">
//         <span> &nbsp; جميع</span>
//         <span> البرامج</span>
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

// export default Programs;