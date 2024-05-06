import React from 'react'
import './Footer.css'
import Wave from '../../img/wave.png'
import { FaFacebook, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';

import Logo from '../../img/darkHanadiLogo.png'
// import { Link } from 'react-router-dom'; 

    
const Footer = () => {

  return (
    <div className="footer" >
        {/* <img src={Wave} alt="wave" style={{width:'100%'}} /> */}
        <div className="f-content">
        <div className="f-icons">
                <a href="https://www.facebook.com/profile.php?id=100086631892117&mibextid=b06tZ0" target='_blank' rel="noreferrer noopener">
                <FaFacebook />
                </a>
                <a href="https://www.youtube.com/@hanadicheikhnajib" target='_blank' rel="noreferrer noopener">
                <FaYoutube />
                </a>    
                <a href="https://instagram.com/hanadicheikhnajib?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D" target='_blank' rel="noreferrer noopener">
                <FaInstagram />
                </a>
                <a href="https://wa.me/96171553688" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp/>
                </a>

            </div>
            <div className='experience-div'>
              <div className='f-desc'>
                  <div>عضو نقابة محرري الصحافة اللبنانية</div>
                  <div>  خبيرة الجودة الشخصية </div>
                  <div> عضو الاتحاد الدولي للصحفيين</div>
                  <div>  خبيرة مهارات الإلقاء والخطاب الجماهيري</div>
                  <div> عضو الهيئة التأسيسية لرابطة المدربين العرب</div>
                  <div>  مستشارة التدريب والتطوير الشخصي والقيادي </div>
                  <div> عضو الاتحاد العربي للكوتشينج</div> 
                </div>

                <div><img src={Logo} alt="hanadi logo" className='f-logo' /></div>

                <div className='f-desc'>
                  <div>  مستشارة إعلامية </div>            
                  <div>  مدربة وخبيرة إعداد حقائب وبرامج تدريب</div>
                  <div>  معدة ومقدمة برامج إذاعية </div>
                  <div>  محاضِرة تحفيزية </div>
                  <div>  ميسّرة لقاءات حوارية   </div>
                  <div>  كاتبة ومؤلفة (٦ كتب)  </div>
                  <div> LNDPعضو الهيئة التأسيسية للشبكة اللبنانية للتنمية والسلام  </div>
                </div>
            </div>
            
            <span><b>Quad Digital Media</b> Copyright 2024 All rights reserved.</span>
            
        </div>


    </div>
    )
}

export default Footer