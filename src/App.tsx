import { Route, Routes } from 'react-router-dom';
import { nanoid } from 'nanoid';

// import component pages
import SharedLayout from './components/SharedLayout/SharedLayout';
import Pills from './pages/Pills/Pills.tsx';
import Prescriptions from './pages/Prescriptions/Prescriptions.tsx';
import Tasks from './pages/Tasks/Tasks.tsx';
import Home from './pages/Home/Home.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

import './App.css'

const PILLS = '/pills';
const PRESCRIPTIONS = '/prescriptions';
const NOTFOUND = '/*';
const TASKS = '/tasks';

const App = () => {

  // Routes
  const appRoutes = [
  
  {path: PILLS, element: <Pills />,}, 
  {path: PRESCRIPTIONS, element: <Prescriptions />,}, 
  {path: TASKS, element: <Tasks />,},
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

export default App
