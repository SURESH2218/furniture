import { ShoppingCart, CircleUser, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';
export default function Shop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className='w-[100vw] h-[100vh] relative overflow-x-hidden hidden-scrollbar'>
      <div className='w-full h-[10vh] bg-black sticky top-0 flex justify-between items-center px-[20px]'>
        <h1 onClick={() => navigate('/')} className='cursor-pointer text-xl'>
          SREE SAI BALAJI WOOD WORKS
        </h1>
        <div className='w-[30%] absolute left-1/2 -translate-x-1/2'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='search for items...'
            className='bg-inherit border border-gray-800 rounded-md px-2 py-1 w-full '
          />
          <Search
            size={16}
            strokeWidth={1.5}
            className='hover:text-cyan-200 transition-colors duration-500 absolute right-2 top-1/2 -translate-y-1/2 text-gray-600'
          />
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <ShoppingCart
              size={18}
              strokeWidth={1.5}
              className='hover:text-cyan-200 transition-colors duration-500'
            />
            <p>Cart</p>
          </div>
          <div className='flex items-center gap-2'>
            <CircleUser
              size={18}
              strokeWidth={1.5}
              className='hover:text-cyan-200 transition-colors duration-500'
            />
            <p
              onClick={
                isAuthenticated ? handleLogout : () => navigate('/login')
              }
              className='cursor-pointer'
            >
              {isAuthenticated ? 'logout' : 'login'}
            </p>
          </div>
        </div>
      </div>
      <div className='w-full h-[200vh] bg-gray-800 p-[20px]'>
        <div className='w-full bg-black/20 h-[500px] rounded-md flex items-center justify-center'>
          Furniture Carousel
        </div>
      </div>
    </div>
  );
}
