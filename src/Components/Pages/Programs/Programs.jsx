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
import Img from '../../../img/hanadiLogo.png';
import youTubeImg from './youTubeImg.png';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Programs = ({ category }) => {
  const [programsData, setProgramsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = window.innerWidth < 480;
  const [imageLoaded, setImageLoaded] = useState(false);


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
        
        const filteredPrograms = category
        ? response.data.results.filter(program => program.categories[0]?.Name === category)
        : response.data.results;
        setProgramsData(filteredPrograms);
        // console.log(filteredPrograms);
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



  const getYouTubeThumbnail = (videoUrl) => {
    const videoId = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` : null;
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
          {programs.map(program => {
            const videoUrl = program.URL;
            const thumbnailUrl = getYouTubeThumbnail(videoUrl);
            return (
                <SwiperSlide key={program.objectId}>
                <div className="programs-card">
                    <a href={program.URL} target="_blank" rel="noopener noreferrer">
                    <div className="image-container" >
                    <img className="overlay-image" src={youTubeImg} alt="YouTube Overlay" />
                        <img 
                        className="thumbnail-image"
                        src={thumbnailUrl} 
                        alt="Video Thumbnail" 
                        onError={(e) => e.target.src = Img}
                        onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    </a>
                    <div className="name">{program.Title}</div>
                </div>
                </SwiperSlide>

            );
          })}
        </Swiper>
      </div>
    ));
  };
  

  return (
<div className="m-programs">
  {category == null && (
    <div className="programs">
      <span> &nbsp; جميع</span>
      <span> البرامج</span>
    </div>
  )}

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