import React, { useContext, useState, useEffect } from 'react';
import './Services.css';
import Card from '../Card/Card';
import { themeContext } from '../../Context';
import { motion } from 'framer-motion';
import axios from 'axios';
import HeartEmoji from '../../img/heartemoji.png';
import LoadingSpinner from '../LoadingSpinner';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Services = () => {
  const transition = { duration: 1, type: 'spring' };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [CVlink, setCVlink] = useState('');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cvResponse = await axios({
          url: BaseURL + '/P_Info',
          method: 'get',
          params: {
            fields: 'cv_file',
            media: 'files',
          },
          headers: Headers,
        });
        setCVlink(cvResponse.data.results[0].files[0].url);

        const servicesResponse = await axios({
          url: BaseURL + '/Services',
          method: 'get',
          params: {
            fields: '*,categories',
            limit: '50',
          },
          headers: Headers,
        });
        setServices(servicesResponse.data.results);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const organizeServicesByCategory = () => {
    const servicesByCategory = {};

    services.forEach((service) => {
      const categoryName = service.categories && service.categories.length > 0 ? service.categories[0].Name : 'Uncategorized';

      if (servicesByCategory.hasOwnProperty(categoryName)) {
        servicesByCategory[categoryName].push(service);
      } else {
        servicesByCategory[categoryName] = [service];
      }
    });

    return servicesByCategory;
  };

  const servicesByCategory = organizeServicesByCategory();

  return (
    <div className="services">
      {/* leftside */}
      <div className="awesome">
        <span style={{ color: darkMode ? 'white' : '' }}>My Awesome</span>
        <span>Services</span>
        <span>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          <br />
          Saepe fugit explicabo consequatur
        </span>
        <a href={CVlink} target='_blank'>
          <button className="button s-button">View CV</button>
        </a>

        <div className="blur s-blur1" style={{ background: '#ABF1FF94' }}></div>
      </div>
    <div className='left-section-cards'>
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <LoadingSpinner/>
        ) : (
        // Show content once data is loaded
        <div className="services-list-container">
          {Object.entries(servicesByCategory).map(([categoryName, categoryServices], index) => (
            <div key={index} className="category-container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-list-LRbuttons"
              >
                <Card
                  emoji={HeartEmoji}
                  heading={categoryName}
                  detail={categoryServices.map((service, index) => (
                    <React.Fragment key={index}>
                      {service.s_type}
                      <br />
                    </React.Fragment>
                  ))}
                />
              </motion.div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Services;



















// import React, { useContext, useState ,useEffect} from 'react'
// import './Services.css'
// import HeartEmoji from '../../img/heartemoji.png'
// import Glasses from '../../img/glasses.png'
// import Humble from '../../img/humble.png'
// import Card from '../Card/Card'
// import { themeContext } from '../../Context'
// import {motion} from 'framer-motion'
// import axios from 'axios'

// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// const Services = () => {

//     const transition = {duration:1 , type: 'spring'}
//     const theme = useContext(themeContext);
//     const darkMode = theme.state.darkMode
    
//     const [CVlink, setCVlink] = useState('');

//     useEffect(() => {

//         const fetchCV = async () => {
//           try {
//             const response = await axios({
//               url: BaseURL + '/P_Info',
//               method: 'get',
//               params: {
//                 "fields": "cv_file",
//                 "media": "files",
//               },
//               headers: Headers,
//             });
//             setCVlink(response.data.results[0].files[0].url);
//           } catch (error) {
//             console.error('Error fetching :', error);
//           }
//         };


//         const fetchServices = async () => {
//             try {
//               const response = await axios({
//                 url: BaseURL + '/Services',
//                 method: 'get',
//                 params: {
//                     "fields": "*,categories",
//                     "limit": "50",
//                 },
//                 headers: Headers,
//               });
//               console.log(response.data);
//             } catch (error) {
//               console.error('Error fetching :', error);
//             }
//           };
      
//         fetchCV();
//         fetchServices ();
//       }, []);
      

//         return (

// <div className="services" id='Services'>

// {/* leftside */}
// <div className="awesome">
//     <span style = {{color:darkMode ? 'white' : '' }}>My Awesome</span>
//     <span>Services</span>
//     <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//         <br />
//         Saepe fugit explicabo consequatur 
//     </span>
//     <a href={CVlink} target='_blank'> 
//     <button className="button s-button">View CV</button>

//     </a>

//     <div className="blur s-blur1" style={{background:'#ABF1FF94'}}></div>
// </div>

// {/* rightside */}
// <div className="cards">

//     <motion.div
//     initial={{left: '25rem'}}
//     whileInView={{left: '14rem'}}
//     transition={{transition}}
//     style={{left:'18rem'}}>
//         <Card emoji={HeartEmoji}
//         heading={'Design'}
//         detail={'Figma, Sketch Photoshop, Adobe XD'}
//         />
//     </motion.div>

//     <motion.div
//     initial={{left: '-10rem'}}
//     whileInView={{left: '0rem'}}
//     transition={{transition}}
//     style={{top:'12rem',left:'-4rem'}}>
//         <Card emoji={Glasses}
//         heading={'Developer'}
//         detail={'Html, Css, Javascript, React'}
//         />
//     </motion.div>

//     <motion.div
//     initial={{left: '25rem'}}
//     whileInView={{left: '20rem'}}
//     transition={{transition}}     style={{top:'19rem',left:'12rem'}}>
//         <Card emoji={Humble}
//         heading={'UI/UX'}
//         detail={'Lorem ispum dumy text are usually use in section where u want any thing to show'}
//         />
//     </motion.div>
//     <div className="blur s-blur2" style={{background: 'var(--purple)'  }}></div>
// </div>

// </div>

// )
// }

// export default Services
