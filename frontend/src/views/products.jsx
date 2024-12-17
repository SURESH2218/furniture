import swing from '../assets/images/swing-1.jpg';
import dining from '../assets/images/dining-2.jpg';
import mandir from '../assets/images/mandir-1.jpg';
import door from '../assets/images/door-1.jpg';
import sofa from '../assets/images/sofa-2.jpg';
import dewan from '../assets/images/dewan-1.jpg';
import cupboard from '../assets/images/cupboard-1.jpg';
import bed from '../assets/images/bed-2.jpg';
import PropTypes from 'prop-types';
import displayImg from '../assets/images/flat-1.jpg';
// import woodtexture from '../assets/images/woodtexture.jpg'
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
export default function Products() {
  const [swingflag, setswingflag] = useState(false);
  const [diningflag, setdiningflag] = useState(false);
  const [mandirflag, setmandirflag] = useState(false);
  const [doorflag, setdoorflag] = useState(false);
  const [sofaflag, setsofaflag] = useState(false);
  const [dewanflag, setdewanflag] = useState(false);
  const [cupboardflag, setcupboardflag] = useState(false);
  const [bedflag, setbedflag] = useState(false);

  return (
    <div className='relative w-[100vw] h-auto flex-col flex justify-center items-center'>
      <div className='relative w-full h-[100vh] p-[2%] flex justify-center items-center'>
        <div className='w-full h-full grid grid-cols-12 grid-rows-12'>
          <Itemdisplay
            cols={'col-span-4'}
            rows={'row-span-5'}
            onMouseEnter={() => {
              setswingflag(true);
            }}
            onMouseLeave={() => {
              setswingflag(false);
            }}
            item={swing}
            itemName={'swing'}
            flag={swingflag}
          />
          <Itemdisplay
            cols={'col-span-5'}
            rows={'row-span-5'}
            onMouseEnter={() => {
              setcupboardflag(true);
            }}
            onMouseLeave={() => {
              setcupboardflag(false);
            }}
            item={cupboard}
            itemName={'cupboard'}
            flag={cupboardflag}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-7'}
            onMouseEnter={() => {
              setmandirflag(true);
            }}
            onMouseLeave={() => {
              setmandirflag(false);
            }}
            item={mandir}
            itemName={'madir'}
            flag={mandirflag}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-8'}
            onMouseEnter={() => {
              setdoorflag(true);
            }}
            onMouseLeave={() => {
              setdoorflag(false);
            }}
            item={door}
            itemName={'door'}
            flag={doorflag}
          />

          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-4'}
            onMouseEnter={() => {
              setbedflag(true);
            }}
            onMouseLeave={() => {
              setbedflag(false);
            }}
            item={bed}
            itemName={'bed'}
            flag={bedflag}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-3'}
            onMouseEnter={() => {
              setsofaflag(true);
            }}
            onMouseLeave={() => {
              setsofaflag(false);
            }}
            item={sofa}
            itemName={'sofa'}
            flag={sofaflag}
          />

          <div className=' overflow-hidden p-3  hover:p-0  transition-all duration-500  col-span-3 row-span-5 relative text-white/50 hover:text-white'>
            <div className='w-full h-full bg-white/10 rounded-md flex justify-center items-center flex-col'>
              <p>Many more items .....</p>
              <p>Visit Store &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -&gt;</p>
            </div>
          </div>

          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-4'}
            onMouseEnter={() => {
              setdiningflag(true);
            }}
            onMouseLeave={() => {
              setdiningflag(false);
            }}
            item={dining}
            itemName={'dining'}
            flag={diningflag}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-3'}
            onMouseEnter={() => {
              setdewanflag(true);
            }}
            onMouseLeave={() => {
              setdewanflag(false);
            }}
            item={dewan}
            itemName={'dewan'}
            flag={dewanflag}
          />
        </div>
      </div>
      <div className='relative w-[100vw] h-[100vh] py-[5%] grid grid-cols-2'>
        <div className='col-span-1 relative flex items-center justify-center'>
          <div className='w-[70%] h-[90%] relative bg-blue-200 rounded-md overflow-hidden'>
            <div className='w-full h-full bg-black/40 absolute z-20'></div>
            <img
              src={displayImg}
              alt='aboutsus'
              className='w-full h-full absolute object-cover z-10'
            />
          </div>
        </div>
        <div className='col-span-1 flex justify-center items-center pr-[5%]'>
          <div className='flex flex-col gap-10 w-[80%] '>
            <h1 className='text-[35px]'>Woodwork for Building Projects</h1>
            <p className=' text-justify'>
              We also specialize in providing comprehensive contract-based
              woodwork services for entire buildings during construction. Our
              expertise includes crafting and installing wooden frames for doors
              and windows, sliding doors, and bathroom doors, ensuring a perfect
              foundation for any architectural project.
              <br />
              With years of experience, we have successfully completed
              large-scale projects for numerous residential and commercial
              buildings, delivering reliable and precise work that aligns with
              construction timelines and quality standards. Our proven track
              record makes us a trusted partner for developers and builders
              looking for dependable woodwork solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Itemdisplay({
  cols,
  rows,
  onMouseEnter,
  onMouseLeave,
  item,
  itemName,
  flag,
}) {
  return (
    <div
      className={`relative overflow-hidden p-3  hover:p-0  transition-all duration-500  ${cols} ${rows} rounded-md`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='absolute w-full h-full z-50 bg-black/50 hover:bg-transparent tansition-all duration-500'></div>
      <img
        src={item}
        className=' w-full h-full object-cover rounded-md'
        alt={`${itemName}`}
      />
      <div
        className={`flex justify-around bg-black/30 items-center w-full h-[75px] absolute transition-all rounded-b-md duration-500 z-50 ${flag ? 'bottom-[-5px]' : 'bottom-[-50%]'} `}
        style={{
          backdropFilter: 'blur(5px)',
        }}
      >
        <p className='text-[30px] flex items-center font-semibold capitalize'>
          {itemName}
        </p>
        <ChevronRight />
      </div>
    </div>
  );
}

Itemdisplay.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  item: PropTypes.string,
  itemName: PropTypes.string,
  flag: PropTypes.bool,
};
