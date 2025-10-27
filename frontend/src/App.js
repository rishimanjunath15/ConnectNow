import './App.css';
import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Authprovider } from './controllers/Authcontrollers';

// Lazy load components for faster initial load
const LandingPage = lazy(() => import('./pages/landing'));
const Auth = lazy(() => import('./pages/Auth'));
const VideoMeetComponent = lazy(() => import('./pages/VideoMeetComponent'));
const HomeComponent = lazy(() => import('./pages/HomeComponent'));
const History = lazy(() => import('./pages/History'));

// Simple loading fallback
const LoadingFallback = () => <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>Loading...</div>;

function App() {
  return (
    <>
      <Router>
        <Authprovider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/home' element={<HomeComponent />} />
              <Route path='/:url' element={<VideoMeetComponent />} />
              <Route path='/history' element={<History />} />
            </Routes>
          </Suspense>
        </Authprovider>
      </Router>
    </>
  );
}

export default App;
