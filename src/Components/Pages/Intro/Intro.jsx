import React, { useEffect , useState, useRef} from 'react'
import axios from 'axios'
import './Intro.css'
import { FaFacebook, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import Works from '../Works/Works'
import Shop from '../Shop/Shop'
import Contact from '../../Contact/Contact'
import defaultImg from '../../../img/hanadiLogo.png'
import LoadingSpinner from '../../LoadingSpinner';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};


const Intro =() =>{

    const [mainImg, setMainImg] = useState([null]);
    const contactRef = useRef(null);
    const [loading, setLoading] = useState(true);


// const scrollToContact = () => {
//   if (contactRef.current) {
//     contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start', alignToTop: true });
//   }
// };


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
            setLoading(false);

            
            } catch (error) {
            console.error('Error fetching :', error);
            }
        }
    fetchMainImg();
    }, []);

    // useEffect(() => {
      //   const fetchMainImg = async () => {
      //       try {
      //           const response = await axios({
      //               url: BaseURL + '/P_Info',
      //               params: {
      //                   "media": "images",
      //                   "crops": "ax300,ax1000",
      //               },
      //               headers: Headers,
      //           });
      
      //           // Extract image data
      //           const imgData = response.data.results[0]?.images?.untitled[0];
      //           const smallImgUrl = imgData ? imgData.dir + imgData.imageax300 : null;
      //           const largeImgUrl = imgData ? imgData.dir + imgData.imageax1000 : null;
      
      //           // Initially set the smaller image
      //           if (smallImgUrl) setMainImg(smallImgUrl);
      
      //           const preloadImage = (src, onSuccess) => {
      //               const img = new Image();
      //               img.onload = () => onSuccess(src); 
      //               img.onerror = () => console.error('Error loading image:', src);
      //               img.src = src;
      //           };
      
      //           if (largeImgUrl) preloadImage(largeImgUrl, setMainImg);
                
      //       } catch (error) {
      //           console.error('Error fetching :', error);
      //       }
      //   };
      //   fetchMainImg();
      // }, []);


  return (

    <div className="intro">
            {loading ? (
        <LoadingSpinner />
      ) : (
        <>
    <div className="intro-intro">
        <div className="i-left">
            <div className="i-name">
                <span> هنادي الشيخ نجيب</span>
                <span >  محاضِرة ومتحدثة تحفيزية ومدربة اجتماعية ومُقَدِّمة برامج إعلامية
                 </span> 
                 <div>
                 على مدى أكثر من 25 عاماً عملت هنادي الشيخ نجيب كمحاضرة ومتحدثة تحفيزية ومدربة وكاتبة ومؤلفة، ومعدة ومقدمة برامج إعلامية، وتواصلت مع شريحة كبيرة من الشباب تزيد عن 100 ألف من لبنان وخارجه، حيث قدمت منتجاتها الفكرية والإعلامية والتدريبية  لقطاعات مختلفة في المجتمع، من الجامعات والمدارس والثانويات، مراكز التدريب، الأندية الشبابية والكشفية، الروابط والاتحادات التدريبية، المؤسسات الإعلامية، المؤتمرات والمعارض، مؤسسات المجتمع المدني، الجمعيات النسائية والفعاليات الخيرية والاجتماعية.
                    </div>     
            </div>
            <a href="https://wa.me/96171553688" target="_blank" rel="noopener noreferrer">
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

        <div className="i-right" >
            <img src={mainImg} alt="hanadiImg" />


        </div>
        </div>

        <Works/>

        <div >
        <Shop/>
        </div>
        
        {/* <div>
        <Contact ref={contactRef} />
        </div> */}
        </>
      )}
    </div>
    );
};

export default Intro



