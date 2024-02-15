import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { FaAlignRight ,FaCaretDown } from "react-icons/fa";
import darkLogo from '../../img/darkHanadiLogo.png';
import darkNameLogo from '../../img/darkNameLogo.png';
import axios from 'axios';
import CategoryDetails from '../Pages/CategoryDetails/CategoryDetails';


const BaseURL = process.env.REACT_APP_BASE_URL;
const Headers = {
  'X-BEA-Application-Id': process.env.REACT_APP_API_KEY,
  'X-BEA-Authorization': process.env.REACT_APP_AUTHORIZATION_TOKEN,
};

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [DropdownData,setDropDownsData]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to hold selected category content

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setDropdownOpen(false);
  };

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const toggleDropdown = (index) => {
    setHoveredCategory(hoveredCategory === index ? null : index);
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
      // console.log(response.data.results);
      setDropDownsData(response.data.results);
    } catch (error) {
      console.log(error);
    };
  };
  fetchDropDownsData();
}, []);

  const handleCategorySelect = (categoryContent) => {
    setSelectedCategory(categoryContent);
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

// Now, you can dynamically render the navbar items based on the categories
return (
  <>
    <nav className='navbar'>
         <Link to='/' className='navbar-logo'>
           <img src={darkLogo} alt="hanadi logo" />
           <img src={darkNameLogo} alt="nameLogo" />
         </Link>
      <div className='menu-icon' onClick={toggleSidebar}><FaAlignRight/>
        <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
{Object.keys(NavByCategory).map((category, index) => (
  <li key={index} className='nav-item' onMouseEnter={() => toggleDropdown(index)} onMouseLeave={() => toggleDropdown(null)}>
    <Link to={`/${category}`} className='nav-links'>
      {category}
    </Link>
    {hoveredCategory === index && (
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
















// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import Dropdown from './Dropdown';
// import { FaAlignRight ,FaCaretDown } from "react-icons/fa";
// import darkLogo from '../../img/darkHanadiLogo.png';
// import darkNameLogo from '../../img/darkNameLogo.png';

// function Navbar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//     setDropdownOpen(false);
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <>
//       <nav className='navbar'>
//         <Link to='/' className='navbar-logo'>
//           <img src={darkLogo} alt="hanadi logo" />
//           <img src={darkNameLogo} alt="nameLogo" />
//         </Link>
//         <div className='menu-icon' onClick={toggleSidebar}
//         ><FaAlignRight/>
//           <i className={sidebarOpen ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/' className='nav-links'>
//               Home
//             </Link>
//           </li>
//           <li className='nav-item' onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
//             <Link to='/services' className='nav-links'>
//               Services 
//             </Link>
//               <FaCaretDown />
//             {dropdownOpen && <Dropdown />}
//           </li>
//           <li className='nav-item'>
//             <Link to='/products' className='nav-links'>
//               Products
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link to='/contact-us' className='nav-links'>
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link to='/sign-up' className='nav-links-mobile'>
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// }

// export default Navbar;









// import React, { useState } from 'react';
// import { Button } from './Button';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import Dropdown from './Dropdown';

// function Navbar() {
//   const [click, setClick] = useState(false);
//   const [dropdown, setDropdown] = useState(false);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   const onMouseEnter = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(true);
//     }
//   };

//   const onMouseLeave = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(false);
//     }
//   };

//   return (
//     <>
//       <nav className='navbar'>
//         <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
//           EPIC
//           <i className='fab fa-firstdraft' />
//         </Link>
//         <div className='menu-icon' onClick={handleClick}>
//           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/' className='nav-links' onClick={closeMobileMenu}>
//               Home
//             </Link>
//           </li>
//           <li
//             className='nav-item'
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//           >
//             <Link
//               to='/services'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Services <i className='fas fa-caret-down' />
//             </Link>
//             {dropdown && <Dropdown />}
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/products'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Products
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link
//               to='/contact-us'
//               className='nav-links'
//               onClick={closeMobileMenu}
//             >
//               Contact Us
//             </Link>
//           </li>
//           <li>
//             <Link
//               to='/sign-up'
//               className='nav-links-mobile'
//               onClick={closeMobileMenu}
//             >
//               Sign Up
//             </Link>
//           </li>
//         </ul>
//         <Button />
//       </nav>
//     </>
//   );
// }

// export default Navbar;
