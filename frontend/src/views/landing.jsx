import sofa from '../assets/images/sofa-1.jpg';
import displayImg from '../assets/images/dewan-1.jpg';
import HButton from '../components/common/hvrbutton';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
export default function Landing() {
  const navigate = useNavigate();
  useGSAP(() => {
    gsap.fromTo(
      ['#productCard', '.head'],
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'slow',
      }
    );
  });
  return (
    <div className='bg-inherit w-[100vw] h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] p-[2%] relative flex justify-center items-center'>
      <div
        className=' w-full h-full rounded-md z-10'
        style={{
          backgroundImage: `url(${sofa})`,
          backgroundPosition: 'center',
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
      <div className='absolute z-30 w-full h-full grid grid-cols-2 p-[5%] sm:p-[5%]'>
        <div className='col-span-2 lg:col-span-1 relative flex flex-col justify-center gap-2 '>
          <h1 className='text-head font-bold head'>SREE BALAJI WOOD WORKS</h1>
          <p className='text-lg head'>
            Delivering reliable and strong wood furniture from years.
            <br />
            The works are just amazing.{' '}
          </p>
          <div className='flex gap-2 mt-[10px] head  '>
            <HButton content={'Explore'}></HButton>
            <HButton
              content={'Shop'}
              onClick={() => {
                navigate('/shop');
              }}
            ></HButton>
          </div>
        </div>
        <div
          className='hidden   lg:col-span-1 lg:flex justify-center items-center relative'
          id='productCard'
        >
          <div
            className='absolute w-[70%] h-[60%] 2xl:w-[60%] 2xl:h-[70%] rounded-md grid grid-rows-6 bg-white/20'
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
            <div className='row-span-1 px-2 relative flex flex-col'>
              <p className='text-md font-bold'>Queen Dewan</p>
              <p className='text-sm'>Explore the collection of dewans ...</p>
              <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
