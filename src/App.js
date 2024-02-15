import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './Components/Intro/Intro';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Components/Shop/Shop';
import CategoryDetails from './Components/Pages/CategoryDetails/CategoryDetails';
import AboutUs from './Components/Pages/AboutUs/AboutUs';

function App() {

return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/المتجر" element={<Shop />} />
          <Route path="/الكتب" element={<CategoryDetails categoryName="الكتب" />} />
          <Route path="/الدورات" element={<CategoryDetails categoryName="الدورات" />} />
          <Route path="/الكتب الصوتية" element={<CategoryDetails categoryName="الكتب الصوتية" />} />
          <Route path="/مهمة هنادي" element={<AboutUs />} />
          <Route path="/رسالتنا" element={<AboutUs />} />

        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}
export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Intro from './Components/Intro/Intro';
// import Services from './Components/Services/Services';
// import Experience from './Components/Experience/Experience';
// import Works from './Components/Works/Works';
// import Shop from './Components/Shop/Shop';
// import Blog from './Components/Blog/Blog';
// import Contact from './Components/Contact/Contact';
// import Footer from './Components/Footer/Footer';

// import { themeContext } from './Context';
// import { useContext } from 'react';




// function App() {
  //   // const theme = useContext(themeContext);
  //   // const darkMode = theme.state.darkMode;
  
  //   return (
    //     <Router>
    //       <div
    //         className="App"
    //         // style={{
      //         //   background: darkMode ? 'var(--black)' : '',
      //         //   color: darkMode ? 'white' : '',
//         // }}
//       >

//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Intro />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/experience" element={<Experience />} />
//           <Route path="/works" element={<Works />} />
//           <Route path="/المتجر" element={<Shop />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/contact" element={<Contact />} />

//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

