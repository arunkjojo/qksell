import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LoadingProvider } from '@context/LoadingContext';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { NewPostIcon } from '@components/layout/NewPostIcon';
import { MobileFooterIcons } from '@components/layout/MobileFooterIcons';
import { APP_PATH } from '@common/constants';
import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { NewPost } from '@pages/NewPost';
import { ImageUpload } from '@pages/ImageUpload';
import { Cart } from '@pages/Cart';
import { LocationPost } from '@common/pages/LocationPost';
import { PostDetails } from '@pages/PostDetails';
import { SavedPost } from './pages/SavedPost';
import { ProfilePost } from './pages/ProfilePost';
import { NotFound } from '@pages/NotFound';
import { CategoryPost } from '@pages/CategoryPost';
import { fetchAllDistricts } from './api';
import { District } from './types';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { setAllDistricts } from './store/appSlice';

const HeaderFooterWrapper = ({ footer = true, newPostFooter = false, children }: { footer?: boolean; newPostFooter?: boolean; children: React.ReactNode }) => {
  const [isCitySearchOpen, setIsCitySearchOpen] = useState(false);
  return (
    <>
      <Header isCitySearchOpen={isCitySearchOpen} setIsCitySearchOpen={setIsCitySearchOpen} />
      {!isCitySearchOpen && children}
      {footer && <MobileFooterIcons />}
      {newPostFooter && <NewPostIcon />}
    </>
  );
};

// This hook ensures scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function App() {
  
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { allDistricts } = useAppSelector((state) => state.app);
  const allDistrictsList = localStorage.getItem('allDistrict') || '';
  useEffect(() => {
    const loadLocationData = async () => {
      try {
        setLoading(true);
        const allDistrictsData: District[] = [];
        const districtsResponse = await fetchAllDistricts();
        allDistrictsData.push(...districtsResponse.data);
        dispatch(setAllDistricts(allDistrictsData));
        localStorage.setItem('allDistrict', JSON.stringify(allDistrictsData));
      } catch (error) {
        console.error('Error loading location data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (allDistrictsList && JSON.parse(allDistrictsList) && allDistrictsList !== '') {
      dispatch(setAllDistricts(JSON.parse(allDistrictsList)));
    } else if (allDistricts.length === 0 && !loading) {
      loadLocationData();
    }
  }, [allDistricts.length, dispatch, allDistrictsList]);
  return (
    <LoadingProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HeaderFooterWrapper><Home /><Footer /></HeaderFooterWrapper>} />
              <Route path="/signin" element={<Login />} />
              <Route path="/newpost" element={<NewPost activeStage={APP_PATH.STATE} />} />
              <Route path="/image-upload/:id" element={<ImageUpload />} />
              <Route path="/p/:id" element={<HeaderFooterWrapper footer={false} newPostFooter={true}><PostDetails /></HeaderFooterWrapper>} />
              <Route path="/pm/:id" element={<HeaderFooterWrapper footer={false} newPostFooter={true}><PostDetails /></HeaderFooterWrapper>} />
              <Route path="/cart/:id" element={<Cart />} />
              <Route path="/l/:location/:lname" element={<HeaderFooterWrapper><LocationPost /></HeaderFooterWrapper>} />
              <Route path="/c/:cname" element={<HeaderFooterWrapper><CategoryPost /></HeaderFooterWrapper>} />
              <Route path="/favorites" element={<HeaderFooterWrapper><SavedPost /></HeaderFooterWrapper>} />
              <Route path="/profile" element={<HeaderFooterWrapper><ProfilePost /></HeaderFooterWrapper>} />
              <Route path="/my-post" element={<HeaderFooterWrapper><ProfilePost /></HeaderFooterWrapper>} />
              <Route path="/newpost/state" element={<NewPost activeStage={APP_PATH.STATE} />} />
              <Route path="/newpost/district" element={<NewPost activeStage={APP_PATH.DISTRICT} />} />
              <Route path="/newpost/category" element={<NewPost activeStage={APP_PATH.CATEGORY} />} />
              <Route path="/newpost/subCategory" element={<NewPost activeStage={APP_PATH.SUB_CATEGORY} />} />
              <Route path="/newpost/postDetails" element={<NewPost activeStage={APP_PATH.POST_DETAILS} />} />
              <Route path="/newpost/user" element={<NewPost activeStage={APP_PATH.USER} />} />
              <Route path="/newpost/otpValidation" element={<NewPost activeStage={APP_PATH.OTP} />} />
              <Route path="*" element={<HeaderFooterWrapper><NotFound /></HeaderFooterWrapper>} />
            </Routes>
          </main>
        </div>
      </Router>
    </LoadingProvider>
  );
}

export default App;
