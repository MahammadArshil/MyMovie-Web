import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Layout from './components/Layout';
import MovieSearch from './components/MovieSearch';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';

function App() {
  const token = localStorage.getItem("token");
  // console.log(token);

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />

        <Route element={token ? <Layout /> : <Navigate to={'/'} />} >
          {localStorage.getItem("role") == 'admin'
            ? <Route path='/adminDashboard' element={<AdminDashboard />} />
            : <Route path='/home' element={<Home />} />}
          <Route path='/searchMovie' element={<MovieSearch />} />
          <Route path='/addMovie' element={<AddMovie />} />
          <Route path='/editMovie/:id' element={<EditMovie />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
