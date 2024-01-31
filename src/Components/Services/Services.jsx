import React from 'react'
import './Services.css'
import HeartEmoji from '../../img/heartemoji.png'
import Glasses from '../../img/glasses.png'
import Humble from '../../img/humble.png'
import Card from '../Card/Card'
import Resume from './Resume.pdf'
import { themeContext } from '../../Context'
import { useContext } from "react";
import {motion} from 'framer-motion'

const Services = () => {
    const transition = {duration:1 , type: 'spring'}
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode
      
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
    <a href={Resume} download> 
    <button className="button s-button">Download CV</button>

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
