import React from 'react'
import './Works.css'
import Upwork from '../../img/Upwork.png';
import Fiverr from '../../img/fiverr.png'
import Amazon from '../../img/amazon.png'
import Shopify from '../../img/Shopify.png'
import Facebook from '../../img/Facebook.png'
import { themeContext } from '../../Context'
import { useContext } from "react";
import {motion} from 'framer-motion';    
const Works = () => {

    const transition = {duration:3.5 , type: 'spring'}
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

  return (
    <div className="works">
        {/* leftside */}
        <div className="awesome">
            <span style = {{color:darkMode ? 'white' : '' }}>Works For All These</span>
            <span>Brands & Clients</span>
            <span>Lorem ispum dolor sit, amet consectetur adipisicing elit.
                <br />
                Saepe fugit explicabo consequatur 
                <br />
                Lorem ispum dolor sit, amet consectetur adipisicing elit.
                <br />
                Saepe fugit explicabo consequatur 
            </span>
            <button className="button s-button">Hire Me</button>
            <div className="blur s-blur1" style={{background:'#ABF1FF94'}}></div>
        </div>
        {/* rightside */}
        <div className="w-right">
            <motion.div
            initial={{rotate: 45}}
            whileInView={{rotate: 0}}
            transition={{transition}}
            viewport={{margin : '-40px'}}
            className="w-mainCircle">

                <div className="w-secCircle">
                    <img src={Upwork} alt="Upworkimg" />
                </div>

                <div className="w-secCircle">
                    <img src={Fiverr} alt="Fiverrimg" />
                </div>

                <div className="w-secCircle">
                    <img src={Amazon} alt="Amazonimg" />
                </div>

                <div className="w-secCircle">
                    <img src={Shopify} alt="Shopifyimg" />
                </div>

                <div className="w-secCircle">
                <img src={Facebook} alt="Facebookimg" />
                </div>

                <div className="w-backCircle blueCircle"></div>
                <div className="w-backCircle yellowCircle"></div>


            </motion.div>
        </div>
    </div>
    )
}

export default Works