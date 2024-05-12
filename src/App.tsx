import { Route, Routes } from 'react-router-dom';
import { nanoid } from 'nanoid';

// import component pages
import SharedLayout from './components/SharedLayout/SharedLayout.tsx';
import Courses from './pages/Courses/Courses.tsx';
import Prescriptions from './pages/Prescriptions/Prescriptions.tsx';
import Home from './pages/Home/Home.tsx';
import SignIn from './pages/SignIn/SignIn.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

import './App.css';

const COURSES = '/courses';
const PRESCRIPTIONS = '/prescriptions';
const SIGNIN = '/signin';
const SIGNUP = '/signup';
const NOTFOUND = '/*';

const App = () => {

  // Routes
  const appRoutes = [
  
  {path: COURSES, element: <Courses />,}, 
  {path: PRESCRIPTIONS, element: <Prescriptions />,}, 
  {path: SIGNIN, element: <SignIn />,}, 
  {path: SIGNUP, element: <SignUp />,},
  {path: NOTFOUND, element: <NotFound />,},
  
  ];
  
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index
            element={<Home/>}
          />

          {appRoutes.map(({ path, element }) => 
          {return <Route key={nanoid()} path= {path} element={element}/>})}
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
