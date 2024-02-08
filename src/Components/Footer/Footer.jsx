import React from 'react'
import './Footer.css'
import Wave from '../../img/wave.png'
import Insta from '@iconscout/react-unicons/icons/uil-instagram';
import Facebook from '@iconscout/react-unicons/icons/uil-facebook'
import Github from '@iconscout/react-unicons/icons/uil-github'
import Logo from '../../img/hanadiLogo.png'
import { Link } from 'react-router-dom'; 
import { themeContext } from '../../Context'
import { useContext } from "react";
    
const Footer = () => {

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

  return (
    <div className="footer" style = {{background:darkMode ? '#242D49' : '' }}>
        {/* <img src={Wave} alt="wave" style={{width:'100%'}} /> */}
        <div className="f-content">
            <div className='experience-div'>
                <div>عضو نقابة محرري الصحافة اللبنانية</div>
                <div>  خبيرة الجودة الشخصية </div>
                <div> عضو الاتحاد الدولي للصحفيين</div>
                <div>  خبيرة مهارات الإلقاء والخطاب الجماهيري</div>
                <div> عضو الهيئة التأسيسية لرابطة المدربين العرب</div>
                <div>  مستشارة التدريب والتطوير الشخصي والقيادي </div>
                <div> عضو الاتحاد العربي للكوتشينج</div> 
                <div>  مستشارة إعلامية </div>            
                <div>  مدربة وخبيرة إعداد حقائب وبرامج تدريب</div>
                <div>  معدة ومقدمة برامج إذاعية </div>
                <div>  محاضِرة تحفيزية </div>
                <div>  ميسّرة لقاءات حوارية   </div>
                <div>  كاتبة ومؤلفة (٦ كتب)  </div>
                <div> LNDPعضو الهيئة التأسيسية للشبكة اللبنانية للتنمية والسلام  </div>
            </div>

            {/* <div className="f-icons">
                <Insta color='white' size='3rem'/>
                <Facebook color='white' size='3rem'/>
                <Github color='white' size='3rem'/>
             <Link to="/about">About</Link>

            </div> */}

            <img src={Logo} alt="hanadi logo" className='f-logo' />
            <span><b>Quad Digital Media</b> Copyright 2024 All rights reserved.</span>
        </div>
    </div>
    )
}

export default Footer