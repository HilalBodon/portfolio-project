import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Intro from './Components/Pages/Intro/Intro';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Shop from './Components/Pages/Shop/Shop';
import Blog from './Components/Pages/Blog/Blog';
import CategoryDetails from './Components/Pages/ShopDetails/ShopDetails';
import AboutUs from './Components/Pages/AboutUs/AboutUs';
import FullscreenBlog from './Components/Pages/Blog/FullscreenBlog';
import Programs from './Components/Pages/Programs/Programs';
import CalendlyApointment from './Components/Pages/CalendlyApointment/CalendlyApointment';
import InvitationForm from './Components/Pages/InvitationForm/InvitationForm';
import FullScreenShop from './Components/Pages/Shop/FullScreenShop';
import Training from './Components/Pages/Training/Training';
import FullScreenTraining from './Components/Pages/Training/FullscreenTraining';

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
          <Route path="/المدوَّنة" element={<Blog />} />
          <Route path="/التدريب" element={<Training />} />
          <Route path="/مقلات" element={<Blog />} />
          <Route path="/fullscreen-blog/:objectId" element={<FullscreenBlog />} />
          <Route path="/البرامج" element={<Programs/>} />
          <Route path="/المقاطع" element={<Programs category='المقاطع' />} />
          <Route path="/البرامج المصورة" element={<Programs category='البرامج المصورة' />} />
          <Route path="/البرامج الإذاعية" element={<Programs category='البرامج الإذاعية' />} />
          <Route path="/المقابلات" element={<Programs category='المقابلات' />} />
          <Route path="/التدريب الشخصي و الاستشارات" element={<CalendlyApointment/>} />

          <Route path="/استضافة هنادي" element={<InvitationForm />} />

          {/* <Route path="/استضافة هنادي" element={<InvitationForm invitationType='Presentation'/>} /> */}

          <Route path="/fullscreen/:bookId" element={<FullScreenShop />} />
          <Route path="/fullscreen-training/:objectId"  element={<FullScreenTraining />} />




        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}
export default App;

