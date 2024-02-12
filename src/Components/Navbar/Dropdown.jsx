// import React, { useState } from 'react';
// import { MenuItems } from './MenuItems';
// import './Dropdown.css';
// import { Link } from 'react-router-dom';


// const Dropdown=()=> {
//   const [click, setClick] = useState(false);

//   const handleClick = () => setClick(!click);


//   return (
//     <>
//       <ul
//         onClick={handleClick}
//         className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
//       >
//         {MenuItems.map((item, index) => {
//           return (
//             <li key={index}>
//               <Link
//                 className={item.cName}
//                 to={item.path}
//                 onClick={() => setClick(false)}
//               >
//                 {item.title}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// }

// export default Dropdown;






import React from 'react';
import './Dropdown.css';

const Dropdown = ({ dropdownData, isOpen }) => {
  return isOpen ? (
    <ul className='dropdown-menu'>
      {dropdownData.map((item, index) => (
        <li key={index} className='dropdown-item'>
          <a href={item.Dropdown_content}>{item.Dropdown_content}</a>
        </li>
      ))}
    </ul>
  ) : null;
};

export default Dropdown;







// const [DropdownData,setDropDownsData]=useState([]);


// useEffect(() => {
//   const fetchDropDownsData = async () => {
//       try {
//         const response = await axios({
//           url: BaseURL + '/Nav_Content',
//           method: 'get',
//           params: {
//             fields: '*,categories',
//             limit: '150'
//           },
//           headers: Headers,
//         });
//         console.log(response.data.results);
//         setDropDownsData(response.data.results);
//       } catch (error) {
//           console.log(error);
//         };
//     };
// fetchDropDownsData();
// }, []);


// const organizeNavByCategory = () => {
// const NavByCategory = {};

// DropdownData.forEach((service) => {
//   const categoryName = service.categories && service.categories.length > 0 ? service.categories[0].Name : 'Uncategorized';

//   if (NavByCategory.hasOwnProperty(categoryName)) {
//     NavByCategory[categoryName].push(service);
//   } else {
//     NavByCategory[categoryName] = [service];
//   }
// });

// return NavByCategory;
// };

// const NavByCategory = organizeNavByCategory();

// console.log({NavByCategory})
