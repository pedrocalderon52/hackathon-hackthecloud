
import { Routes, Route } from 'react-router'

import LoginPage from './pages/Login.jsx';
import UsersPage from './pages/UserCrud.jsx';


const App = () => {
  return (
   <div className="relative h-full w-full">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/cadastro" element={<UsersPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
