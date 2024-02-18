import React,{useEffect, useState} from 'react'
import { InlineWidget } from 'react-calendly';
import axios from 'axios';
import './CalendlyApointment.css';
import LoadingSpinner from '../../LoadingSpinner';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};



const CalendlyApointment = () => {

    const [calendlyLink,setCalendlyLink] = useState('');    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCalendlyLink = async () => {
          try {
            const response = await axios({
              url: BaseURL + '/Private_Taining',
              method: 'get',
              params: {
                "fields": "*",
              },
              headers: Headers,
            });
            setCalendlyLink(response.data.results[0].CalendlyURL);
            setLoading(false);
            // console.log(response.data.results[0].CalendlyURL);
          } catch (error) {
            console.error('Error fetching calendly link data:', error);
          }
        };
        fetchCalendlyLink();
      }, []);

  return (
    <div className="calendly-main">
        <div className='calendly-msg'>يرجى إختيار الموعد الذي يناسبكم و ملئ البيانات المطلوبة ريثما يتم الرد على طلبكم</div>

        {loading ? ( 
        <LoadingSpinner />
      ) : (
        <InlineWidget url={calendlyLink} />
      )}
    </div>
  );
};  
export default CalendlyApointment;
