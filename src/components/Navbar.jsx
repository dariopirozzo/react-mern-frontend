import React from 'react'
import { useNavigate } from "react-router";
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../store/slices/loginSlice';

const Navbar = () => {

const userData = useSelector((state)=>state.reducer.user)
const dispatch = useDispatch()
const navigate = useNavigate()
    const handleLogOut = ()=>{
        localStorage.removeItem('root')
        localStorage.removeItem('token')
        dispatch(logout())
        navigate(0)
    }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'></i>
            &nbsp;
            {userData?.data?.name}
        </span>
        <button className='btn btn-outline-danger' onClick={handleLogOut}>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Log out</span>
        </button>
    </div>
  )
}

export default Navbar