import React, { useEffect ,useContext, useState, useRef} from 'react'
import axios from 'axios'
import './Intro.css'
import { FaFacebook, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';

// import FloatingDiv from '../FloatingDiv/FloatingDiv'
import { themeContext } from '../../Context'
// import {motion} from 'framer-motion';
import Works from '../Works/Works'
import Books from '../Books/Books'
import Contact from '../Contact/Contact'
// import Experience from '../Experience/Experience'

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};


const Intro =() =>{
    // const transition = { ease: [0.42, 0, 0.58, 1], type: 'spring' };


    const transition = {duration:4 , type: 'spring'}
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
    const [mainImg, setMainImg] = useState([null]);
    const contactRef = useRef(null);

const scrollToContact = () => {
  if (contactRef.current) {
    contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start', alignToTop: true });
  }
};


    useEffect(() => {
        const fetchMainImg = async () =>{
            try {
            const response = await axios({
            url: BaseURL + '/P_Info',
            params: {
            "media": "images",
            "crops": "ax300,ax1000",
            },
            headers: Headers,
            });

            const ImgUrl =
              response.data.results[0] && response.data.results[0].images?.untitled[0]
                ? response.data.results[0].images.untitled[0].dir +
                  response.data.results[0].images.untitled[0].imageax1000
                : null;
            
            setMainImg(ImgUrl || "");
            
            } catch (error) {
            console.error('Error fetching :', error);
            }
        }
    fetchMainImg();
    }, []);


  return (

    <div className="intro" style = {{background:darkMode ? 'var(--black)' : '' }}>
    <div className="intro-intro">
        <div className="i-left" style = {{background:darkMode ? 'var(--black)' : '' }}>
            <div className="i-name">
                {/* <span style = {{color:darkMode ? 'white' : '' }}>مرحبا ً، أنا</span> */}
                <span> هنادي الشيخ نجيب</span>
                <span style = {{color:darkMode ? 'white' : '' }}>  محاضِرة ومتحدثة تحفيزية ومدربة اجتماعية ومُقَدِّمة برامج إعلامية
                 </span> 
                 <div>
                 على مدى أكثر من 25 عاماً عملت هنادي الشيخ نجيب كمحاضرة ومتحدثة تحفيزية ومدربة وكاتبة ومؤلفة، ومعدة ومقدمة برامج إعلامية، وتواصلت مع شريحة كبيرة من الشباب تزيد عن 100 ألف من لبنان وخارجه، حيث قدمت منتجاتها الفكرية والإعلامية والتدريبية  لقطاعات مختلفة في المجتمع، من الجامعات والمدارس والثانويات، مراكز التدريب، الأندية الشبابية والكشفية، الروابط والاتحادات التدريبية، المؤسسات الإعلامية، المؤتمرات والمعارض، مؤسسات المجتمع المدني، الجمعيات النسائية والفعاليات الخيرية والاجتماعية.
                    </div>     
            </div>
            <a href="https://wa.me/9613469332" target="_blank" rel="noopener noreferrer">
            <button className="button i-button"> <FaWhatsapp/> تواصل معنا</button>
                </a>

            <div className="i-icons">
                <a href="https://www.facebook.com/profile.php?id=100086631892117&mibextid=b06tZ0" target='_blank' rel="noreferrer noopener">
                <FaFacebook />
                </a>
                <a href="https://www.youtube.com/@hanadicheikhnajib" target='_blank' rel="noreferrer noopener">
                <FaYoutube />
                </a>    
                <a href="https://instagram.com/hanadicheikhnajib?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D" target='_blank' rel="noreferrer noopener">
                <FaInstagram />
                </a>

            </div>
        </div>

        <div className="i-right" style = {{background:darkMode ? 'var(--black)' : '' }}>
            <img src={mainImg} alt="hanadiImg" />


        </div>
        </div>

        <Works scrollToContact={scrollToContact}/>
        <div style = {{background:darkMode ? 'var(--black)' : 'white' }}>
        <Books/>
        </div>
        
        <div style = {{background:darkMode ? 'var(--black)' : 'white' }}>
        <Contact ref={contactRef} />
        </div>
        {/* <Experience/> */}

    </div>
    )
}

export default Intro






            {/* <motion.img
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
            </motion.img> */}

            {/* <motion.div 
            initial={{left: '7%', top: '40%'}}
            whileInView={{left: '60%'}}
            transition={{transition}}
            className='fd-right-up floating-div'>

                <FloatingDiv image={Crown} txt1=" معاً لبناء جيل متوازن" txt2=" منتج، ومؤثر"/>

            </motion.div> */}

            {/* <motion.div
            initial={{left: '9rem', top: '18rem'}}
            whileInView={{left: '0rem'}}
            transition={{transition}}
             className='fd-right-down floating-div'>

                <FloatingDiv image={thumbup} txt1="Improve" txt2="Thinking"/>

            </motion.div> */}

            {/* <div className="blur" style={{background: "rgba(50, 50, 50, 0.258)", top:'7rem'} }></div>
            <div className="blur" style={{background: "rgba(252, 167, 31, 0.258)", top:'22rem', width:'21rem', height:'11rem', left:'-15rem'}}></div>
            <div className="blur" style={{background: "rgba(50, 50, 50, 0.258)", top:'0rem', left:'-5rem'} }></div> */}
