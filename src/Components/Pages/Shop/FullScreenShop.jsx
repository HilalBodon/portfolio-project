import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';
import defaultImg from '../../../img/hanadiLogo.png';
import Shop from './Shop';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const FullScreenView = () => {
  const { bookId } = useParams();
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestedItems, setSuggestedItems] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/Store/${bookId}`,
          method: 'get',
          params: {
            fields: '*,categories',
            media: 'images,files',
            crops: 'ax1000',
          },
          headers: Headers,
        });

        const bookData = response.data.results[0];
        // console.log(bookData.categories[0].Name)
        setSelectedBook(bookData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  useEffect(() => {
    const fetchSuggestedItems = async () => {
      try {
        // Extract the category name from the selected book
        const selectedCategoryName = selectedBook.categories[0]?.Name;
  // console.log(selectedCategoryName)
        // Check if the category name is available
        if (selectedCategoryName) {
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
  
          const suggestedItemsData = response.data.results;
          const filteredSuggestedItems = suggestedItemsData.filter(item => {
            const category = item.categories[0];
            return category.Name === selectedCategoryName;
          });
          const finalSuggestedItems = filteredSuggestedItems.filter(item => item.objectId !== bookId);
  
          setSuggestedItems(finalSuggestedItems);
        }
      } catch (error) {
        console.error('Error fetching suggested items:', error);
      }
    };
  
    if (selectedBook && selectedBook.categories && selectedBook.categories.length > 0) {
      fetchSuggestedItems();
    }

  }, [selectedBook, bookId]);
  
  

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <LoadingSpinner color="#36D7B7" loading={true} size={150} />
      </div>
    );
  }

  return (
    <div className='main-fs' >
      <div className="full-screen-view">
      <img 
        src={selectedBook.images?.untitled[0]?.dir + selectedBook.images?.untitled[0]?.imageax1000 || defaultImg} 
        alt="Item Image" 
        onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
      />
      <div className='fs-right'>
        <h1 className="fs-Name">{selectedBook.name}</h1>
        <div className="fs-Brief">{selectedBook.Brief}</div>
        <div className="fs-Price">Price: {selectedBook.book_price}</div>
      </div>
      <hr />
      </div>
      <div className='All-suggested'>
      <h2>Suggested Items</h2>
      <div className='All-suggested-wrap' >
        {suggestedItems.map(item => (
          <div className="suggested-items" key={item.objectId}>
            <img 
              src={item.images?.untitled[0]?.dir + item.images?.untitled[0]?.imageax300 || defaultImg} 
              alt="Suggested Item Image" 
              onError={(e) => { e.target.onerror = null; e.target.src = defaultImg; }} 
            />
            <div>{item.name}</div>
            <div>Price: {item.book_price}</div>
          </div>
        ))}
      </div>
</div>
    </div>
  );
};

export default FullScreenView;



