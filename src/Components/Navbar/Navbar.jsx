// import React, { useState ,useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import Dropdown from './Dropdown';
// import { FaAlignRight ,FaCaretDown } from "react-icons/fa";
// import darkLogo from '../../img/darkHanadiLogo.png';
// import darkNameLogo from '../../img/darkNameLogo.png';
// import axios from 'axios';
// import CategoryDetails from '../Pages/CategoryDetails/CategoryDetails';


// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [DropdownData,setDropDownsData]=useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category content

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//     setDropdownOpen(false);
//   };

//   // const toggleDropdown = () => {
//   //   setDropdownOpen(!dropdownOpen);
//   // };
//   const [hoveredCategory, setHoveredCategory] = useState(null);

//   const toggleDropdown = (index) => {
//     setHoveredCategory(hoveredCategory === index ? null : index);
//   };


// useEffect(() => {
//   const fetchDropDownsData = async () => {
//     try {
//       const response = await axios({
//         url: BaseURL + '/Nav_Content',
//         method: 'get',
//         params: {
//           fields: '*,categories',
//           limit: '-1'
//         },
//         headers: Headers,
//       });
//       // console.log(response.data.results);
//       setDropDownsData(response.data.results);
//     } catch (error) {
//       console.log(error);
//     };
//   };
//   fetchDropDownsData();
// }, []);

//   const handleCategorySelect = (categoryContent) => {
//     setSelectedCategory(categoryContent);
//   };


// const organizeNavByCategory = () => {
//   const NavByCategory = {};

//   DropdownData.forEach((service) => {
//     const categoryName = service.categories && service.categories.length > 0 ? service.categories[0].Name : 'Uncategorized';

//     if (NavByCategory.hasOwnProperty(categoryName)) {
//       NavByCategory[categoryName].push(service);
//     } else {
//       NavByCategory[categoryName] = [service];
//     }
//   });

//   return NavByCategory;
// };

// const NavByCategory = organizeNavByCategory();

// return (
//   <>
//     <nav className='navbar'>
//          <Link to='/' className='navbar-logo'>
//            <img src={darkLogo} alt="hanadi logo" />
//            <img src={darkNameLogo} alt="nameLogo" />
//          </Link>
//       <div className='menu-icon' onClick={toggleSidebar}><FaAlignRight/>
//         <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
//       </div>
//       <ul className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
// {Object.keys(NavByCategory).map((category, index) => (

//   <li key={index} className='nav-item' onMouseEnter={() => toggleDropdown(index)} onMouseLeave={() => toggleDropdown(null)}>
//     <Link to={`/${category}`} className='nav-links'>
//       {category}
//     </Link>

//     {hoveredCategory === index &&  category !== 'المدوَّنة' &&  category !== 'رسالتنا' && category !=='التدريب' && category !=='التدريب الشخصي و الإستشارات' &&(
//       <Dropdown
//         dropdownData={NavByCategory[category]}
//         isOpen={hoveredCategory === index}
//         handleCategorySelect={handleCategorySelect}
//       />
//     )}
//   </li>
// ))}

//       </ul>
//     </nav>
//   </>
// );
// }
// export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { FaAlignRight } from "react-icons/fa";
import darkLogo from '../../img/darkHanadiLogo.png';
import darkNameLogo from '../../img/darkNameLogo.png';
import axios from 'axios';
import CategoryDetails from '../Pages/ShopDetails/ShopDetails';

const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [DropdownData, setDropDownsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category content
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchDropDownsData = async () => {
      try {
        const response = await axios({
          url: BaseURL + '/Nav_Content',
          method: 'get',
          params: {
            fields: '*,categories',
            limit: '-1'
          },
          headers: Headers,
        });
        setDropDownsData(response.data.results);
      } catch (error) {
        console.log(error);
      };
    };
    fetchDropDownsData();
  }, []);

  const handleCategorySelect = (categoryContent) => {
    setSelectedCategory(categoryContent);
    setSidebarOpen(false); 
  };

  const handleCategoryClick = (category) => {
    if (['المدوَّنة', 'رسالتنا', 'التدريب', 'التدريب الشخصي و الإستشارات','إستضافة هنادي'].includes(category)) {
      setSidebarOpen(false);
    }
  };
  
  


  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false); // Close the sidebar when clicking outside of it
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (index) => {
    setHoveredCategory(hoveredCategory === index ? null : index);
  };

  const organizeNavByCategory = () => {
    const NavByCategory = {};
    DropdownData.forEach((service) => {
      const categoryName = service.categories && service.categories.length > 0 ? service.categories[0].Name : 'Uncategorized';
      if (NavByCategory.hasOwnProperty(categoryName)) {
        NavByCategory[categoryName].push(service);
      } else {
        NavByCategory[categoryName] = [service];
      }
    });
    return NavByCategory;
  };

  const NavByCategory = organizeNavByCategory();

  return (
    <>
      <nav className='navbar' ref={sidebarRef}>
        <Link to='/' className='navbar-logo'>
          <img src={darkLogo} alt="hanadi logo" />
          <img src={darkNameLogo} alt="nameLogo" />
        </Link>
        <div className='menu-icon' onClick={toggleSidebar}><FaAlignRight />
          <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
          {Object.keys(NavByCategory).map((category, index) => (
            <li key={index} className='nav-item' onMouseEnter={() => toggleDropdown(index)} onMouseLeave={() => toggleDropdown(null)}>
              <Link to={`/${category}`} className='nav-links'   onClick={() => handleCategoryClick(category)} >
                {category}
              </Link>
              {hoveredCategory === index && category !== 'المدوَّنة' && category !== 'رسالتنا' && category !== 'التدريب' && category !== 'التدريب الشخصي و الإستشارات' && category !== 'إستضافة هنادي' && (
                <Dropdown
                  dropdownData={NavByCategory[category]}
                  isOpen={hoveredCategory === index}
                  handleCategorySelect={handleCategorySelect}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

