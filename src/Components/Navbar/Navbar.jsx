// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import Dropdown from './Dropdown';
// import { FaAlignRight } from "react-icons/fa";
// import darkLogo from '../../img/darkHanadiLogo.png';
// import darkNameLogo from '../../img/darkNameLogo.png';
// import axios from 'axios';
// import CategoryDetails from '../Pages/ShopDetails/ShopDetails';

// const BaseURL = process.env.REACT_APP_BASE_URL;
// const Headers = {
//   'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
//   'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
// };

// function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [DropdownData, setDropDownsData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category content
//   const [hoveredCategory, setHoveredCategory] = useState(null);

//   const sidebarRef = useRef(null);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   useEffect(() => {
//     const fetchDropDownsData = async () => {
//       try {
//         const response = await axios({
//           url: BaseURL + '/Nav_Content',
//           method: 'get',
//           params: {
//             fields: '*,categories',
//             limit: '-1'
//           },
//           headers: Headers,
//         });
//         setDropDownsData(response.data.results);
//       } catch (error) {
//         console.log(error);
//       };
//     };
//     fetchDropDownsData();
//   }, []);

//   const handleCategorySelect = (categoryContent) => {
//     setSelectedCategory(categoryContent);
//     setSidebarOpen(false); 
//   };

//   const handleCategoryClick = (category) => {
//     if (['المدوَّنة', 'رسالتنا', 'التدريب', 'التدريب الشخصي و الاستشارات','استضافة هنادي'].includes(category)) {
//       setSidebarOpen(false);
//     }
//   };
  
  


//   const handleOutsideClick = (e) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//       setSidebarOpen(false); // Close the sidebar when clicking outside of it
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('click', handleOutsideClick);
//     return () => {
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, []);

//   const toggleDropdown = (index) => {
//     setHoveredCategory(hoveredCategory === index ? null : index);
//   };

//   const organizeNavByCategory = () => {
//     const NavByCategory = {};
//     DropdownData.forEach((service) => {
//       const categoryName = service.categories && service.categories.length > 0 ? service.categories[0].Name : 'Uncategorized';
//       if (NavByCategory.hasOwnProperty(categoryName)) {
//         NavByCategory[categoryName].push(service);
//       } else {
//         NavByCategory[categoryName] = [service];
//       }
//     });
//     return NavByCategory;
//   };

//   const NavByCategory = organizeNavByCategory();

//   return (
//     <>
//       <nav className='navbar' ref={sidebarRef}>
//         <Link to='/' className='navbar-logo'>
//           <img src={darkLogo} alt="hanadi logo" />
//           <img src={darkNameLogo} alt="nameLogo" />
//         </Link>
//         <div className='menu-icon' onClick={toggleSidebar}><FaAlignRight />
//           <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
//           {Object.keys(NavByCategory).map((category, index) => (
//             <li key={index} className='nav-item' onMouseEnter={() => toggleDropdown(index)} onMouseLeave={() => toggleDropdown(null)}>
//               <Link to={`/${category}`} className='nav-links'   onClick={() => handleCategoryClick(category)} >
//                 {category}
//               </Link>
//               {hoveredCategory === index && category !== 'المدوَّنة' && category !== 'رسالتنا' && category !== 'التدريب' && category !== 'التدريب الشخصي و الاستشارات' && category !== 'استضافة هنادي' && (
//                 <Dropdown
//                   dropdownData={NavByCategory[category]}
//                   isOpen={hoveredCategory === index}
//                   handleCategorySelect={handleCategorySelect}
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// }

// export default Navbar;








import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { FaAlignRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

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
    if (['المدوَّنة', 'رسالتنا', 'التدريب', 'التدريب الشخصي و الاستشارات','استضافة هنادي'].includes(category)) {
      setSidebarOpen(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarOpen(false);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGoBack = () => {
    if (document.referrer !== 'https://www.hanadisheikhnajib.com/') {
      navigate(-1); // Use navigate with -1 to go back
    }
  };

  const isMainUrl = location.pathname === '/' || location.pathname === '/main'; // Adjust this if your main URL has a different path

  return (
    <>
      <nav className='navbar' ref={sidebarRef}>
        <Link to='/' className='navbar-logo'>
          <img src={darkLogo} alt="hanadi logo" />
          <img src={darkNameLogo} alt="nameLogo" />
        </Link>

        {windowWidth < 780 && !isMainUrl && (
          <div className='back-button-div'>
          <button onClick={handleGoBack} className="back-button">
            <FaArrowLeft />
          </button>
          </div>
        )}

        <div className='menu-icon' onClick={toggleSidebar}><FaAlignRight />
          <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
          {Object.keys(NavByCategory).map((category, index) => (
            <li key={index} className='nav-item' onMouseEnter={() => toggleDropdown(index)} onMouseLeave={() => toggleDropdown(null)}>
              <Link to={`/${category}`} className='nav-links' onClick={() => handleCategoryClick(category)}>
                {category}
              </Link>
              {hoveredCategory === index && category !== 'المدوَّنة' && category !== 'رسالتنا' && category !== 'التدريب' && category !== 'التدريب الشخصي و الاستشارات' && category !== 'استضافة هنادي' && (
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
