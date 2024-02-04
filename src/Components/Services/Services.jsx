import React, { useContext, useState ,useEffect} from 'react'
import './Services.css'
import HeartEmoji from '../../img/heartemoji.png'
import Glasses from '../../img/glasses.png'
import Humble from '../../img/humble.png'
import Card from '../Card/Card'
import { themeContext } from '../../Context'
import {motion} from 'framer-motion'
import axios from 'axios'

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const Services = () => {

    const transition = {duration:1 , type: 'spring'}
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode
    
    const [CVlink, setCVlink] = useState('');
    useEffect(() => {
        const fetchCV = async () => {
          try {
            const response = await axios({
              url: BaseURL + '/P_Info',
              method: 'get',
              params: {
                "fields": "cv_file",
                "media": "files",
              },
              headers: Headers,
            });
            setCVlink(response.data.results[0].files[0].url);
          } catch (error) {
            console.error('Error fetching :', error);
          }
        };
      
        fetchCV(); 
      }, []);
      

        return (

<div className="services" id='Services'>

{/* leftside */}
<div className="awesome">
    <span style = {{color:darkMode ? 'white' : '' }}>My Awesome</span>
    <span>Services</span>
    <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        <br />
        Saepe fugit explicabo consequatur 
    </span>
    <a href={CVlink} target='_blank'> 
    <button className="button s-button">View CV</button>

    </a>

    <div className="blur s-blur1" style={{background:'#ABF1FF94'}}></div>
</div>

{/* rightside */}
<div className="cards">

    <motion.div
    initial={{left: '25rem'}}
    whileInView={{left: '14rem'}}
    transition={{transition}}
    style={{left:'18rem'}}>
        <Card emoji={HeartEmoji}
        heading={'Design'}
        detail={'Figma, Sketch Photoshop, Adobe XD'}
        />
    </motion.div>

    <motion.div
    initial={{left: '-10rem'}}
    whileInView={{left: '0rem'}}
    transition={{transition}}
    style={{top:'12rem',left:'-4rem'}}>
        <Card emoji={Glasses}
        heading={'Developer'}
        detail={'Html, Css, Javascript, React'}
        />
    </motion.div>

    <motion.div
    initial={{left: '25rem'}}
    whileInView={{left: '20rem'}}
    transition={{transition}}     style={{top:'19rem',left:'12rem'}}>
        <Card emoji={Humble}
        heading={'UI/UX'}
        detail={'Lorem ispum dumy text are usually use in section where u want any thing to show'}
        />
    </motion.div>
    <div className="blur s-blur2" style={{background: 'var(--purple)'  }}></div>
</div>

</div>

)
}

export default Services
