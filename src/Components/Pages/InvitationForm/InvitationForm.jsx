import React, { useState, useEffect } from 'react';
import './InvitationForm.css';
import axios from 'axios';
import CitySearchAutosuggest from '../../Geosuggest/CitySearchAutosuggest';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

const InvitationForm = () => {
  const [invitationType, setInvitationType] = useState('');
  const [invitationTypes, setInvitationTypes] = useState([]);
  const [warnings, setWarnings] = useState({
    entity: '',
    date: '',
    duration: '',
    location: '',
    place: '',
    targetAudience: '',
    topic: '',
  });
  const [formValid, setFormValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    const fetchInvitationTypes = async () => {
      try {
        const response = await axios({
          url: `${BaseURL}/Nav_Content`,
          method: 'get',
          params: {
            fields: '*,categories',
            limit: -1,
            categories: "eBA3PZxGgr", // the id of 'إستضافة هنادي'
          },
          headers: Headers,
        });
        setInvitationTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching invitation types:', error);
      }
    };
    fetchInvitationTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted for invitation type:', invitationType);
  };

  const handleTypeChange = (e) => {
    setInvitationType(e.target.value);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Perform validation and update warnings
    const updatedWarnings = { ...warnings };
    // Example validation: check if the field is empty or contains invalid values
    if (name === 'duration') {
      const durationValue = parseInt(value);
      if (isNaN(durationValue) || durationValue <= 0 || durationValue > 30) {
        updatedWarnings[name] = 'Duration should be a positive number less than or equal to 30';
      } else {
        updatedWarnings[name] = '';
      }
    } else if (name === 'mobile') {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value)) {
        updatedWarnings[name] = 'Invalid mobile number format';
      } else {
        updatedWarnings[name] = '';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        updatedWarnings[name] = 'Invalid email address format';
      } else {
        updatedWarnings[name] = '';
      }
    } else {
      updatedWarnings[name] = value.trim() === '' ? 'This field is required' : '';
    }
    setWarnings(updatedWarnings);
  };
  
  
  

  useEffect(() => {
    // Check if all warnings are empty to enable form submission
    const isValid = Object.values(warnings).every((warning) => warning === '');
    setFormValid(isValid);
  }, [warnings]);


  const currentDate = new Date().toISOString().split('T')[0]; 

  const handlePhoneNumberChange = (value, country) => {
    setPhoneNumber(value);
  };

  return (
    <div className="invitation-container">
      <h2 className="form-heading"> استضافة هنادي</h2>
      <form onSubmit={handleSubmit} className="invitation-form">
        <div className="invitation-types">
          {invitationTypes.map((type, index) => (

            <label key={index} className="invitation-type">
              <input
                type="radio"
                name="invitationType"
                value={type.Dropdown_content} // Assuming Dropdown_content holds the type name
                onChange={handleTypeChange}
              />
              {type.Dropdown_content}
            </label>
          ))}
        </div>
        
        <div className="invitation-fields">
          
        <label htmlFor="entity">: الجهة المستضيفة / المركز</label>
        <input
          type="text"
          id="entity"
          name="entity"
          onChange={handleInputChange}
          required
        />
        {warnings.entity && <span className="warning">{warnings.entity}</span>}

        <label htmlFor="mobile">: رقم الهاتف المحمول</label>
        <IntlTelInput
        containerClassName="intl-tel-input"
        inputClassName="form-control my-custom-input"
        defaultValue={phoneNumber}
        defaultCountry="lb"
        preferredCountries={['ps', 'sa', 'ae']}
        onChange={handlePhoneNumberChange}
      />

        {/* <input
          type="tel"
          id="mobile"
          name="mobile"
          onChange={handleInputChange}
          pattern="[0-9]{10}"
          required
        />
        {warnings.mobile && <span className="warning">{warnings.mobile}</span>} */}

        <label htmlFor="email">: البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          required
        />
        {warnings.email && <span className="warning">{warnings.email}</span>}

        <label htmlFor="date">: التاريخ</label>
        <input
          type="date"
          id="date"
          name="date"
          onChange={handleInputChange}
          min={currentDate}
          max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
          required
        />
        {warnings.date && <span className="warning">{warnings.date}</span>}

        <label htmlFor="duration">: عدد الأيام</label>
        <input
          type="number"
          id="duration"
          name="duration"
          onChange={handleInputChange}
          required
        />
        {warnings.duration && <span className="warning">{warnings.duration}</span>}



        <label htmlFor="location">: البلد/المدينة</label>
        <CitySearchAutosuggest handleInputChange={handleInputChange} />
        {warnings.location && <span className="warning">{warnings.location}</span>}


        <label htmlFor="place">: المكان</label>
        <input
          type="text"
          id="place"
          name="place"
          onChange={handleInputChange}
          required
        />
         {warnings.place && <span className="warning">{warnings.place}</span>}

        <label htmlFor="targetAudience">: الفئة المستهدفة</label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          onChange={handleInputChange}
          required
        />
        {warnings.targetAudience && <span className="warning">{warnings.targetAudience}</span>}

        <label htmlFor="topic">: الموضوع</label>
        <input
          type="text"
          id="topic"
          name="topic"
          onChange={handleInputChange}
          required
        />
        {warnings.topic && <span className="warning">{warnings.topic}</span>}
      
      </div>

        <button type="submit" className="submit-button" disabled={!formValid}>
          إرسال طلب الإستضافة
        </button>
      </form>
    </div>
  );
};

export default InvitationForm;
