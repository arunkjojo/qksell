import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LoadingProvider } from '@context/LoadingContext';
import { NewPostIcon } from '@ui/NewPostIcon';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { APP_PATH } from '@common/constants';
import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { NewPost } from '@pages/NewPost';
import { ImageUpload } from '@pages/ImageUpload';
import { Cart } from '@pages/Cart';
import { Search } from '@pages/Search';
import { PostDetails } from '@pages/PostDetails';
import { NotFound } from '@pages/NotFound';
import { CategoryPost } from '@pages/CategoryPost';

const HeaderFooterWrapper = ({ newPost = true, children }: { newPost?: boolean;children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    {newPost && <NewPostIcon />}
    <Footer />
  </>
);

// This hook ensures scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <LoadingProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HeaderFooterWrapper><Home /></HeaderFooterWrapper>} />
              <Route path="/signin" element={<Login />} />
              <Route path="/newpost" element={<NewPost activeStage={APP_PATH.STATE} />} />
              <Route path="/image-upload/:id" element={<ImageUpload />} />
              <Route path="/p/:id" element={<HeaderFooterWrapper><PostDetails /></HeaderFooterWrapper>} />
              <Route path="/pm/:id" element={<HeaderFooterWrapper newPost={false}><PostDetails /></HeaderFooterWrapper>} />
              <Route path="/cart/:id" element={<Cart />} />
              <Route path="/search" element={<HeaderFooterWrapper><Search /></HeaderFooterWrapper>} />
              <Route path="/c/:cname" element={<HeaderFooterWrapper><CategoryPost /></HeaderFooterWrapper>} />
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
