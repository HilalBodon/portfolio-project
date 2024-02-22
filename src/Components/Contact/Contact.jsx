import React, { useState, useRef } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { themeContext } from '../../Context';
import { useContext } from 'react';

    const Contact = React.forwardRef((props, ref) => {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

  const form = useRef();
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({
      user_name: '',
      user_email: '',
      message: '',
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const result = await emailjs.sendForm('service_j9n6lus', 'template_inietos', form.current, '_oaMPVMzFGM5eEqZI');
      // console.log(result.text);
      setDone(true);
      clearForm();
    } catch (error) {
      console.error(error.text);
    }
  };

  return (
    <div className="contact-form" ref={ref}>
      <div className="w-left">
        <div className="awesome">
          <span >تواصل معنا </span>
          <span>بالبريد الإلكتروني</span>
          {/* <div className="blur s-blur1" style={{ background: '#abf1ff94' }}></div> */}
        </div>
      </div>

      <div className="c-right">
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            className="user"
            placeholder="الإسم والشهرة"
            value={formData.user_name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="user_email"
            className="user"
            placeholder="البريد الإلكتروني"
            value={formData.user_email}
            onChange={handleInputChange}
          />
          <textarea
            name="message"
            className="user"
            placeholder="محتوى الرسالة"
            value={formData.message}
            onChange={handleInputChange}
          />
          <input type="submit" value="إرسال" className="button" />
          <span className={done ? 'show-message' : 'hide-message'}>Thanks for contacting me!!</span>
          {/* <div className="blur c-blur1" style={{ background: 'var(--purple)' }}></div> */}
        </form>
      </div>
    </div>
  );
});


export default Contact;
