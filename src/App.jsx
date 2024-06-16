import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Home from './pages/home/home'
import Projects from './pages/projects/projects';
import Services from './pages/service/services';
import './style.css'
import Admin from './pages/admin/admin';
import { LoaderProvider } from './context/loaderContext';
import LoadingScreen from './components/loadingScreen/loadingScreen';

function App() {
  return (
    <>
    <LoaderProvider>
      <BrowserRouter>
      <LoadingScreen/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LoaderProvider>
      
    </>
  );
}

export default App;
