import React from 'react'
import './Intro.css'
import Github from '../../img/github.png'
import LinkedIn from '../../img/linkedin.png'
import Instagram from '../../img/instagram.png'
import boy from '../../img/boy.png';
import Vector1 from '../../img/Vector1.png';
import Vector2 from '../../img/Vector2.png';
import thumbup from '../../img/thumbup.png';
import Crown from '../../img/crown.png';
import glassesimoji from '../../img/glassesimoji.png';
import FloatingDiv from '../FloatingDiv/FloatingDiv'
import { themeContext } from '../../Context'
import { useContext } from "react";
import {motion} from 'framer-motion';

const Intro =() =>{
    const transition = {duration:2 , type: 'spring'}
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode
  

  return (

    <div className="intro">

        <div className="i-left">
            <div className="i-name">
                <span style = {{color:darkMode ? 'white' : '' }}>Hi! I Am</span>
                <span> Andrew Thomas</span>
                <span> Frontend Developer with high 
                    level of exoirience in web designing
                     and development, producting the Quality work </span>      
            </div>
            <button className="button i-button"> Hire Me!</button>
            <div className="i-icons">
                <a href="https://github.com" target='_blank'>
                   <img src={Github} alt='Github logo'/>
                </a>
                <a href="https://www.linkedin.com" target='_blank'>
                    <img src={LinkedIn} alt='LinkedIn logo'/>
                </a>    
                <a href="https://www.instagram.com" target='_blank'>
                <img src={Instagram} alt='Instagram logo'/>
                </a>
            </div>
        </div>

        <div className="i-right">
            <img src={Vector1} alt="Vector1" />
            <img src={Vector2} alt="Vector2" />
            <img src={boy} alt="boy" />
            <motion.img
            initial={{left:'36%'}}
            whileInView={{left: '-24%'}}
            transition={{transition}}
            src={glassesimoji} alt="glassesimoji"
            />

            <motion.div 
            initial={{left: '74%', top: '-4%'}}
            whileInView={{left: '68%'}}
            transition={{transition}}
            className='fd-right-up floating-div'>

                <FloatingDiv image={Crown} txt1="web" txt2="Developer"/>

            </motion.div>

            <motion.div
            initial={{left: '9rem', top: '18rem'}}
            whileInView={{left: '0rem'}}
            transition={{transition}}
             className='fd-right-down floating-div'>

                <FloatingDiv image={thumbup} txt1="Best Design" txt2="Award"/>

            </motion.div>

            <div className="blur" style={{background: "rgb(238, 210, 255)"}}></div>
            <div className="blur" style={{background: "#c1f5ff", top:'17rem', width:'21rem', height:'11rem', left:'-9rem'}}></div>
        </div>
    </div>
    )
}

export default Intro