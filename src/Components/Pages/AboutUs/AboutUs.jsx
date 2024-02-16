import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutUs.css';
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

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/AboutUs`,
          method: 'get',
          params: {
            fields: "*",
            media: 'images',
            crops: 'ax300,ax1000',
            limit: -1,
          },
          headers: Headers,
        });
        setAboutUsData(response.data.results);
        // console.log(response.data.results);
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
    fetchAboutUsData();
  }, []);

  return (
    <div className="AboutUsMain">
      {loading ? (
        <LoadingSpinner/>
      ) : error ? (
        <div>Error: {error}</div>
      ) : aboutUsData.length > 0 ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: aboutUsData[0].Details }} className="" />

              <div className="images-container">
      {aboutUsData[0].images?.untitled.map((image, index) => (
        <img
          key={index}
          src={`${image.dir}${image.imageax300}`}
          alt={`Image ${index + 1}`}
          className="aboutus-image"
        />
      ))}
    </div>

        </>
      ) : (
        <div>
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
