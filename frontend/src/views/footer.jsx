import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
export default function Footer() {
  const [iconSize, setIconSize] = useState(10);
  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1536) {
      setIconSize(35);
    } else if (width >= 1280) {
      setIconSize(30);
    } else if (width >= 1024) {
      setIconSize(25);
    } else if (width >= 768) {
      setIconSize(20);
    } else if (width >= 640) {
      setIconSize(15);
    } else {
      setIconSize(10);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className='w-[100vw] h-[15vh] sm:h-[18vh] md:h-[20vh] lg:h-[23vh] xl:h-[25vh] 2xl:h-[30vh]  relative bg-white/10 grid grid-cols-12'>
      <div className='col-span-3 p-2'>
        <h1 className='text-lg text-nowrap'>Sree Balaji Wood Works</h1>
        <p className='text-md'>
          32-25-50, Appal Naidu Street, Moghal Raj Puram, Vijayawada, 520010.
        </p>
      </div>

      <div className='col-span-3  flex flex-col justify-center items-center gap-2 text-md '>
        <p>Home</p>
        <p>About Us</p>
        <p>Creations</p>
        <p>Contracts</p>
        <p>Reach out</p>
      </div>
      <div className='col-span-3  flex justify-around text-md gap-2'>
        <div className='h-full flex flex-col justify-center gap-2  items-center '>
          <p>Cots</p>
          <p>Dining</p>
          <p>Sofa</p>
          <p>Door</p>
          <p>Dewan</p>
        </div>
        <div className='h-full flex flex-col justify-center gap-2 items-center '>
          <p>Mandirs</p>
          <p>Swing</p>
          <p>Cup Boards</p>
        </div>
      </div>
      <div className='col-span-3 grid grid-rows-9 pr-2 py-5'>
        <div className='row-span-4 flex items-start'>
          <p className='font-semibold text-md text-nowrap'>Follow Us:</p>
          <div className='flex justify-around  items-center flex-1'>
            <a target='_blank' href='https://www.facebook.com/durga.1974'>
              <Facebook size={iconSize} />
            </a>
            <Instagram size={iconSize} />
            <a href='https://in.pinterest.com/durgaprasad1974/' target='_blank'>
              <p
                className={`bg-red-400 rounded-full  items-center flex text-md justify-center font-bold`}
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
              >
                P
              </p>
            </a>
          </div>
        </div>
        <div className='row-span-5 flex flex-col gap-1 text-md items-end'>
          <p>durgaprasad.d74@gmail.com</p>
          <p>9014699811</p>
          <p>9912414366</p>
        </div>
      </div>
    </div>
  );
}
