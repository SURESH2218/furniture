import sofa from '../assets/images/sofa-1.jpg';
import displayImg from '../assets/images/dewan-1.jpg';
import HButton from '../components/common/hvrbutton';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className='bg-inherit w-[100vw] h-[70%] p-[2%] relative flex justify-center items-center'>
      <div
        className=' w-full h-full rounded-md z-10'
        style={{
          backgroundImage: `url(${sofa})`,
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
      <div
        className='absolute w-full h-full bg-black/60 z-20'
        style={{
          backdropFilter: 'blur(2.5px)',
        }}
      ></div>
      <div className='absolute z-20 w-full h-full grid grid-cols-2 p-[5%]'>
        <div className='col-span-1 relative'>
          <div className=' flex flex-col gap-2 absolute top-[25%] left-[10%]  '>
            <h1
              style={{
                fontWeight: 700,
                fontSize: '40px',
              }}
            >
              SREE BALAJI WOOD WORKS
            </h1>
            <p>
              Delivering reliable and strong wood furniture from years.
              <br />
              The works are just amazing.{' '}
            </p>
            <div className='flex gap-2 mt-[10px]'>
              <HButton
                content={'Explore'}
                onClick={() => navigate('/products')}
              ></HButton>
              <HButton
                content={'Shop'}
                onClick={() => {
                  navigate('/shop');
                }}
              ></HButton>
            </div>
          </div>
        </div>
        <div className='col-span-1 flex justify-center items-center relative'>
          <div
            className='absolute w-[60%] h-[70%] rounded-md grid grid-rows-6 bg-white/20'
            style={{
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className='row-span-5 relative overflow-hidden p-2 rounded-t-md flex justify-center items-center '>
              <img
                src={displayImg}
                alt='bed'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='row-span-1 px-2 relative'>
              <p className='text-xl'>Queen Dewan</p>
              <p>Explore the collection of dewans ...</p>
              <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
