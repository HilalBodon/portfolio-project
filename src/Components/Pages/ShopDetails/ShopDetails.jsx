import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShopDetails.css';
import LoadingSpinner from '../../LoadingSpinner';
import defaultImg from '../../../img/hanadiLogo.png';
import { Link } from 'react-router-dom';

const ShopDetails = ({ categoryName }) => {
    const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios({
          url: `${process.env.REACT_APP_BASE_URL}/Store`,
          method: 'get',
          params: {
            "fields": "*,categories",
            "order": "-createdAt",
            "media": "images,files",
            "crops": "ax300,ax1000",
            "limit": "-1",
          },
          headers: {
            'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
            'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
          },
        });
  
        const filteredData = response.data.results.filter(item => {
          return item.categories.some(category => category.Name === categoryName);
        });
  
        setCategoryData(filteredData);
        // console.log(filteredData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setError('Network error: No response from server. Please check your internet connection.');
          } else {
            setError(`Request failed with status ${error.response.status}: ${error.response.statusText}`);
          }
        } else {
          setError('Error fetching data. Please try again later.');
        }
      }
    };
    fetchCategoryData();
  }, [categoryName]);
  
  return (
    <div className="category-details">
      <h1 className='cNameDiv'> {categoryName}</h1>
      {loading ? (
        <LoadingSpinner/>
        ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="category-data">
          {categoryData.map((item, index) => (
            <div key={index} className="category-item">
              {/* <Link to={{pathname: `/fullscreen/${index.objectId}`,
                state: { index }
              }}> */}
               <Link to={`/fullscreen/${item.objectId}`}> 
              <img 
                src={item.images?.untitled[0]?.dir + item.images?.untitled[0]?.imageax300 || defaultImg} 
                alt="Item Image" 
                onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
            />
</Link>
              <div className='title'>{item.name}</div>
              {/* <p className="brief">{item.Brief.length > 20 ? `${item.Brief.substring(0, 20)} ` : item.Brief }</p> */}
              {/* <div className='cat-price'>{item.book_price}</div> */}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopDetails;
