import React from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const Dropdown = ({ dropdownData, isOpen, handleCategorySelect }) => {

  const handleClick = (categoryContent) => {
    handleCategorySelect(categoryContent);
  };

  return isOpen ? (
    <ul className='dropdown-menu'>
      {dropdownData.map((item, index) => (
        <li key={index} className='dropdown-item' onClick={() => handleClick(item.Dropdown_content)}>
            <Link to={`/${item.Dropdown_content}`} >
          {item.Dropdown_content}
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
};

export default Dropdown;

