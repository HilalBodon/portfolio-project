import React, { useContext, useRef } from 'react';
import './Works.css';
import Upwork from '../../img/IzaatAlQuoran.jpg';
import Fiverr from '../../img/darAlSalam.jpg';
import Amazon from '../../img/LND.jpg';
import Shopify from '../../img/moultaqaAlKhayr.jpg';
import Facebook from '../../img/khoubaraaAlTanmia.jpg';
import { themeContext } from '../../Context';
import { motion } from 'framer-motion';

const Works = ({ scrollToContact }) => {

    const transition = { duration: 3.5, type: 'spring' };
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;


    return (
        <div className="works">
            {/* leftside */}
            <div className="awesome-works">
                <span style={{ color: darkMode ? 'white' : '' }}>بعض العملاء</span>
                <span>من جمعيات و مؤسسات</span>
                <span style={{ color: darkMode ? 'white' : '' }}>
                    أهمية دورها في ان تُلهم وتُطور وتساعد في تفعيل الطاقات الشبابية في مجتمعاتنا العربية
                    <br />
                    وتساهم مع المؤثرين عليهم للوصول بهم إلى مرحلة الغنى الفكري والنفسي والمهاراتي والمالي
                    <br />
                    .بما يحقق الخير والفائدة والإنتاجية، والنهضة الإنسانية المتكاملة
                    <br />
                </span>
                <button className="button s-button" onClick={scrollToContact}>
                    أرسل لي دعوة
                </button>
            </div>

            {/* rightside */}
            <div className="w-right">
                <motion.div
                    initial={{ rotate: 45 }}
                    whileInView={{ rotate: 0 }}
                    transition={{ transition }}
                    viewport={{ margin: '-40px' }}
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
                </motion.div>
            </div>
        </div>
    );
};

export default Works;
