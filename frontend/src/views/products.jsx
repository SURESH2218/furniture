import swing from '../assets/images/swing-1.jpg';
import dining from '../assets/images/dining-2.jpg';
import mandir from '../assets/images/mandir-1.jpg';
import door from '../assets/images/door-1.jpg';
import sofa from '../assets/images/sofa-2.jpg';
import dewan from '../assets/images/dewan-1.jpg';
import cupboard from '../assets/images/cupboard-1.jpg';
import bed from '../assets/images/bed-2.jpg';
// import woodtexture from '../assets/images/woodtexture.jpg'
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
export default function Products() {
  const [swingflag, setswingflag] = useState(false)
  return (
    <div className='relative w-[100vw] h-[100vh] p-[2%] flex justify-center items-center'>
      <div className='w-full h-full grid grid-cols-12 grid-rows-12'>
        <div className='relative overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-4 row-span-5'
          onMouseEnter={()=>{

              setswingflag(true)
          }}
          onMouseLeave={()=>setswingflag(false)}
        >
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div>
          <img
            src={swing}
            className=' w-full h-full object-cover rounded-md'
            alt='swing'
          />
          <div className={`flex justify-around bg-white/30 items-center w-full h-[20%] absolute transition-all rounded-b-md duration-500 z-50 ${swingflag? 'bottom-0' : 'bottom-[-50%]'} `}
               style={{
               backdropFilter: 'blur(5px)'
               }}
          >
            <p className='text-[30px] flex items-center font-semibold'>swing</p>
            <ChevronRight />
          </div>
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-5 row-span-5 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={cupboard}
            className=' w-full h-full object-cover rounded-md'
            alt=''
          />
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-7 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={mandir}
            className=' w-full h-full object-cover rounded-md'
            alt=''
          />
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-8 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={door}
            className=' w-full h-full object-cover rounded-md'
            alt=''
          />
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-4 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={bed}
            className=' w-full h-full object-cover rounded-md'
            alt=''
          />
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-3 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={sofa}
            className=' w-full h-full object-cover rounded-md'
            alt=''
          />
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-5 relative text-white/50 hover:text-white'>
          <div className='w-full h-full bg-white/10 rounded-md flex justify-center items-center flex-col'>
            <p>Many more items .....</p>
            <p>Visit Store &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  -&gt;</p>
          </div>
        </div> 
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-4 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={dining}
            className=' w-full h-full object-cover rounded-md'
            alt='dining'
          />
        </div>
        <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-3 relative'>
          <div className="absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500"  ></div><img
            src={dewan}
            className=' w-full h-full object-cover rounded-md'
            alt=''
          />
        </div> 
        
        {/*
        
        */}
      </div>
    </div>
  );
}
