import React from 'react';
import { useParams } from 'react-router-dom';
import './InvitationForm.css'

const InvitationForm = ({invitationType}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Render form fields based on the invitation type
  const renderFormFields = () => {
    switch (invitationType) {
      case 'Presentation':
        return (
          <>
            <label htmlFor='guestName'>Guest Name:</label>
            <input type='text' id='guestName' name='guestName' required />
          </>
        );
      case 'inviteToExam':
        return (
          <>
            <label htmlFor='examDate'>Exam Date:</label>
            <input type='date' id='examDate' name='examDate' required />
          </>
        );
      case 'inviteToParty':
        return (
          <>
            <label htmlFor='partyTheme'>Party Theme:</label>
            <input type='text' id='partyTheme' name='partyTheme' required />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='invitation'>
      <h2>Invitation Form</h2>
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default InvitationForm;















// import React from 'react';

// const InviteForm = ({ selection }) => {
//   // Define the related information for each invite option
//   const inviteInfo = {
//     'invite to dinner': {
//       title: 'Dinner Invitation Form',
//       description: 'Please fill out the following information to RSVP for the dinner:',
//       // Add more fields as needed
//     },
//     'invite to exam': {
//       title: 'Exam Invitation Form',
//       description: 'Please fill out the following information to register for the exam:',
//       // Add more fields as needed
//     },
//     'invite to party': {
//       title: 'Party Invitation Form',
//       description: 'Please fill out the following information to RSVP for the party:',
//       // Add more fields as needed
//     },
//     // Add more invite options and their related information
//   };

//   // Get the related information based on the selection
//   const info = inviteInfo[selection];

//   if (!info) {
//     return <div>No information available for this selection.</div>;
//   }

//   return (
//     <div>
//       <h2>{info.title}</h2>
//       <p>{info.description}</p>
//       {/* Render form fields based on the selected option */}
//       {/* Example: Input fields for name, email, etc. */}
//     </div>
//   );
// };

// export default InviteForm;
