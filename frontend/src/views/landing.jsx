import bed from '../assets/bed.png';
import HButton from '../components/common/hvrbutton';
import { useNavigate } from 'react-router-dom';
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className='w-full h-[75vh] bg-black px-[5%] grid grid-cols-12 grid-rows-12'>
      <div className='col-span-6 row-span-12 p-[2%] relative'>
        <h1 className='text-[50px] text-nowrap absolute top-[25%]'>
          SREE SAI BALAJI WOOD WORKS
        </h1>
        <p className='absolute top-[37%] text-primary'>
          Crafting Wood Wonders, One Masterpiece at a Time.
          <br />
          Delivering Purr-fect Quality with Every Meow!
        </p>
        <div className='absolute top-[47%] flex gap-2'>
          <div>
            <HButton content='know more' />
          </div>
          <div>
            <HButton content='Visit Store' onClick={() => navigate('/shop')} />
          </div>
        </div>
      </div>
      <div className='col-span-6 row-span-12 p-[2%] relative object-contain'>
        <img
          src={bed}
          alt='bed'
          className='absolute inset-0 w-full h-full object-contain'
        />
      </div>
    </div>
  );
}
