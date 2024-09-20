import './App.css';
import './index.css';
<script src="http://localhost:5173"></script>
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/home';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import UserPost from './components/UserPost';

function App() {

  return (
    <div className="h-100vh w-100vw text-black bg-white">
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Navigate  to="/home"/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/createpost' element={<CreatePost/>}/>
      <Route path='/userpost' element={<UserPost/>}/>
      <Route path='/post/:id' element={<PostDetail/>}/>      
    </Routes>
     </div>
  )
}

export default App
