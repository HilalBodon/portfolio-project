import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import defaultImg from '../../../img/hanadiLogo.png';
import './Training.css';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const FullscreenTraining = () => {
  const { objectId } = useParams();
  const [selectedTraining, setSelectedTraining] = useState(null);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/Training/${objectId}`,
          method: 'get',
          params: {
            fields: '*',
            media: 'images',
            crops: 'ax1000', 
          },
          headers: Headers,
        });
        setSelectedTraining(response.data.results[0]);
        // console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching training data:', error);
      }
    };

    fetchTrainingData();
  }, [objectId]);

  return (
    <div className="fullscreen-training">
      {selectedTraining && (
        <>
          <div className="card-image-training">
            <img
              src={selectedTraining.images?.untitled[0]?.dir + selectedTraining.images?.untitled[0]?.imageax1000 || defaultImg}
              alt="training"
            />
          </div>
          {/* <h2>{selectedTraining.Title}</h2> */}
          <div dangerouslySetInnerHTML={{ __html: selectedTraining.Content }} className="fs-trainingText" />

        </>
      )}
    </div>
  );
};

export default FullscreenTraining;
