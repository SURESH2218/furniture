import { ShoppingCart, CircleUser, Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';
import { useEffect } from 'react'
import banner1 from '../assets/images/get-a-credit.jpg'
export default function Shop() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {products} = useSelector((state) => state.products)
  console.log(products)
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  useEffect(() => {
    dispatch(fetchProducts())},[dispatch]
)
  return (
    <div className='w-[100vw] h-[auto] relative overflow-x-hidden hidden-scrollbar p-[10px] lg:px-[2rem] gap-1 flex flex-col items-center'>
      {/* Header */}
      <div className='w-full h-[80px] sm:h-[100px] lg:h-[40px] sticky top-0 grid grid-cols-9 grid-rows-2 lg:grid-rows-1 lg:grid-cols-12 items-center gap-1 mb-[10px]'>
        <h1 onClick={() => navigate('/')} className='cursor-pointer text-xl lg:text-lg  col-span-7 lg:col-span-3 h-full flex items-center'>
          SREE SAI BALAJI WOOD WORKS
        </h1>
        
        <div className='col-span-9 lg:col-span-7 items-center h-full grid grid-cols-9 border rounded-sm pl-2 border-gray-600'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='search for items...'
            className='bg-inherit w-full col-span-8 h-full focus:outline-none'
          />
          <div className='col-span-1 h-full flex items-center justify-center'>
          <Search
            size={20}
            strokeWidth={1.5}
            className='hover:text-cyan-200 transition-colors duration-500 text-gray-600'
          />
          </div>
        </div>
          <div className='flex items-center gap-2 h-full col-span-1 justify-end'>
            <ShoppingCart
              size={18}
              strokeWidth={1.5}
              className='hover:text-cyan-200 transition-colors duration-500'
            />
            <p className='hidden sm:block'>Cart</p>
          </div>
          <div className='flex items-center gap-2 h-full col-span-1 justify-end' onClick={
                isAuthenticated ? handleLogout : () => navigate('/login')
              }>
            <CircleUser
              size={18}
              strokeWidth={1.5}
              className='hover:text-cyan-200 transition-colors duration-500'
            />
            <p
              className='cursor-pointer hidden sm:block'
            > 
              {isAuthenticated ? 'logout' : 'login'}
            </p>
          </div>
      </div>
      {/* Banner */}
      <div className="w-full aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] xl:aspect-[16/4] overflow-hidden">

          <img src={banner1} className='w-full h-full rounded-sm'/>
      </div>
      {/* products carousel */}
      <div className='w-full overflow-x-scroll scroll-smooth hidden-scrollbar rounded-sm'>
        <div className='w-max h-full flex gap-1'>
          {products.map((product, index) => {
            return(
              <div key={index} className='w-[60vw] aspect-[16/16] sm:w-[50vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] h-full rounded-sm bg-gray-700 grid grid-rows-12 p-[5px] items-center'>
                <img className='row-span-10 w-full h-full object-contain' src={product.images.length === 0 ? '' : product.images[0].imageUrl} draggable='false' />
                <h1 className='row-span-1 capitalize text-lg'>{product.name}</h1>
                <p className='row-span-1 text-lg'>Rs.{product.price} /-</p>
              </div>
            )
          })}
          </div>
      </div>
    </div>
  );
}
