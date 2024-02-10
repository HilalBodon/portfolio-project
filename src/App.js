import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Intro from './Components/Intro/Intro';
import Services from './Components/Services/Services';
import Experience from './Components/Experience/Experience';
import Works from './Components/Works/Works';
import Books from './Components/Books/Books';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';


import SignUp from './Components/pages/SignUp';
import Marketing from './Components/pages/Marketing';
import Consulting from './Components/pages/Consulting';
import Home from './Components/pages/Home';
import Products from './Components/pages/Products';
import ContactUs from './Components/pages/ContactUs';



import { themeContext } from './Context';
import { useContext } from 'react';
import './App.css';

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Router>
      <div
        className="App"
        style={{
          background: darkMode ? 'var(--black)' : '',
          color: darkMode ? 'white' : '',
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/works" element={<Works />} />
          <Route path="/books" element={<Books />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />


        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/marketing' component={Marketing} />
        <Route path='/consulting' component={Consulting} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
