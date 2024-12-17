import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <div className='w-[100vw] h-[30vh] relative bg-white/20'>
      <div className='absolute w-full h-full z-20 grid grid-cols-12 p-5 gap-2'>
        <div className='col-span-3'>
          <h1 className='text-[30px]'>Sree Balaji Wood Works</h1>
          <p>
            32-25-50, Appal Naidu Street, Moghal Raj Puram, Vijayawada, 520010.
          </p>
        </div>

        <div className='col-span-3  flex flex-col gap-3 items-center justify-center text-[16px]'>
          <p>Home</p>
          <p>About Us</p>
          <p>Creations</p>
          <p>Contracts</p>
          <p>Reach out</p>
        </div>
        <div className='col-span-3  flex  gap-3 justify-around text-[16px]'>
          <div className='h-full flex flex-col justify-start gap-3 p-[7%] items-center'>
            <p>Cots</p>
            <p>Dining</p>
            <p>Sofa</p>
            <p>Door</p>
            <p>Dewan</p>
          </div>
          <div className='h-full flex flex-col justify-start p-[7%]  gap-3 items-center'>
            <p>Mandirs</p>
            <p>Swing</p>
            <p>Cup Boards</p>
          </div>
        </div>
        <div className='col-span-3 grid grid-rows-9z'>
          <div className='row-span-3 flex items-center justify-between'>
            <p className='font-semibold'>Follow Us:</p>
            <div className='flex justify-around w-[40%] items-center'>
              <Facebook />
              <Instagram />
              <p className='bg-red-400 w-[30px] h-[30px] rounded-full  items-center flex justify-center font-bold'>
                P
              </p>
            </div>
          </div>
          <div className='row-span-4 flex flex-col gap-3'>
            <p>durgaprasad.d74@gmail.com</p>
            <p>9014699811</p>
            <p>9912414366</p>
          </div>
        </div>
      </div>
    </div>
  );
}
