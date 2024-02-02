import React from 'react'
import './Intro.css'
import Facebook from '../../img/facebook.svg'
import LinkedIn from '../../img/linkedin.svg'
import Instagram from '../../img/instagram.svg'
import hanadiImg from '../../img/hanadiSheikhNajib.png';
// import Vector1 from '../../img/Vector1.png';
// import Vector2 from '../../img/Vector2.png';
// import thumbup from '../../img/thumbup.png';
// import Crown from '../../img/crown.png';
import micro from '../../img/microphone-headphones.png';
import audience from '../../img/audience.png';
import writer from '../../img/writer.png';
// import FloatingDiv from '../FloatingDiv/FloatingDiv'
import { themeContext } from '../../Context'
import { useContext } from "react";
import {motion} from 'framer-motion';
import Works from '../Works/Works'
import Blog from '../Blog/Blog'

const Intro =() =>{
    // const transition = { ease: [0.42, 0, 0.58, 1], type: 'spring' };

    const transition = {duration:4 , type: 'spring'}
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode
  

  return (

    <div className="intro">
    <div className="intro-intro">
        <div className="i-left">
            <div className="i-name">
                <span style = {{color:darkMode ? 'white' : '' }}>Hi! I Am</span>
                <span> Hanadi SHeikh Najib</span>
                <span style = {{color:darkMode ? 'white' : '' }}> Frontend Developer with high 
                    level of exoirience in web designing
                     and development, producting the Quality work </span>      
            </div>
            <button className="button i-button"> Contact Me!</button>
            <div className="i-icons">
                <a href="https://github.com" target='_blank' rel="noreferrer noopener">
                   <img src={Facebook} alt='Facebook logo' />
                </a>
                <a href="https://www.linkedin.com" target='_blank' rel="noreferrer noopener">
                    <img src={LinkedIn} alt='LinkedIn logo' />
                </a>    
                <a href="https://www.instagram.com" target='_blank' rel="noreferrer noopener">
                <img src={Instagram} alt='Instagram logo'/>
                </a>
            </div>
        </div>

        <div className="i-right">
            {/* <img src={Vector1} alt="Vector1" />
            <img src={Vector2} alt="Vector2" /> */}
            <img src={hanadiImg} alt="hanadiImg" />

            <motion.img
            initial={{left:'36%'}}
            whileInView={{left: '-10%'}}
            transition={{transition}}
            src={micro} alt="micro"
            />

            <motion.img 
                initial={{left: '0%', top: '-4%'}}
                whileInView={{left: '25%'}}
                transition={{transition}}
                // className='fd-right-up floating-div'
                src={audience} alt="audience"
                >
            </motion.img>


            <motion.img 
                initial={{left: '0%', top: '20%'}}
                whileInView={{left: '-30%'}}
                transition={{transition}}
                src={writer} alt="writer"
                >
            </motion.img>

            {/* <motion.div 
            initial={{left: '74%', top: '-4%'}}
            whileInView={{left: '68%'}}
            transition={{transition}}
            className='fd-right-up floating-div'>

                <FloatingDiv image={Crown} txt1="Goodwill" txt2="Ambassador"/>

            </motion.div>

            <motion.div
            initial={{left: '9rem', top: '18rem'}}
            whileInView={{left: '0rem'}}
            transition={{transition}}
             className='fd-right-down floating-div'>

                <FloatingDiv image={thumbup} txt1="Improve" txt2="Thinking"/>

            </motion.div> */}

            <div className="blur" style={{background: "rgb(238, 210, 255)"}}></div>
            <div className="blur" style={{background: "#c1f5ff", top:'17rem', width:'21rem', height:'11rem', left:'-9rem'}}></div>
        </div>
        </div>
        <Works/>
        <Blog/>

    </div>
    )
}

export default Intro