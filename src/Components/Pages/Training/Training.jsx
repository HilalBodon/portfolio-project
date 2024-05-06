import React, { useEffect, useState, useRef } from 'react';
import './Training.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../img/hanadiLogo.png';
import LoadingSpinner from '../../LoadingSpinner';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Training = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [featuredTrainingData, setFeaturedTrainingData] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadingFeaturedImage, setLoadingFeaturedImage] = useState(false);
  const featuredTrainingRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/training',
          method: 'get',
          params: {
            "fields": "*",
            "media": "images,files",
            "crops": "ax300,ax1000",
          },
          headers: Headers,
        });
        setTrainingData(response.data.results);
      } catch (error) {
        console.error('Error fetching training data:', error);
      }
    };

    const fetchTrainingDataFeatured = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Training',
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
        setFeaturedTrainingData(response.data.results);
      } catch (error) {
        console.error('Error fetching featured training data:', error);
      }
    };

    fetchTrainingData();
    fetchTrainingDataFeatured();
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



  const handleTrainingClick = (training) => {
    navigate(`/fullscreen-training/${training.objectId}`);
  };
  

  return (
    <div className="t-wrapper" id='Training'>
       {!imageLoaded && <LoadingSpinner />}
      <div className="t-heading" ref={featuredTrainingRef}>
        <span>الدورات المتاحة</span>
      </div>

      <div className="training-cards-container">
        {trainingData.map((training, index) => (
          <div
            key={index}
            className="training-card"
            onClick={() => handleTrainingClick(training)}
          >
            <div className="card-image">
              <img
                src={training.images?.untitled[0]?.dir + training.images?.untitled[0]?.imageax1000 || defaultImg}
                alt="training"
                onLoad={handleImageLoad}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            </div>
            <div className="card-content">
              <span>{training.Title}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Training;
