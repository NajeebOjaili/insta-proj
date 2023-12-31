

import { Navigate, Route, Routes } from 'react-router-dom';
import Homepag from '../pages/Homepag';
import Authpage from '../pages/Authpage';
import PageLayout from '../Layouts/pageLayout/pagelayout';
import ProfilePage from '../pages/ProfilePage/ProfilePage.JSX';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';




function App() {
 const [authUser] = useAuthState(auth);
  return (
    
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <Homepag /> : <Navigate to='/auth' /> } />
        <Route path='/auth' element={!authUser ? <Authpage /> : <Navigate to='/'/>} />
        <Route path='/:username' element={<ProfilePage/>} />
        
        
      </Routes>
    </PageLayout>
    
  );
}

export default App;