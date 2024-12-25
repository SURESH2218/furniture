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
import { useState, useEffect } from 'react';
export default function Products() {
  return (
    <div className='relative w-[100vw] h-auto flex-col flex justify-center items-center'>
      <div className='relative w-[100vw] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[100vh] p-[2%] flex justify-center items-center'>
        <div className='w-full h-full grid grid-cols-12 grid-rows-12 sm:gap-0'>
          <Itemdisplay
            cols={'col-span-4'}
            rows={'row-span-5'}
            item={swing}
            itemName={'swing'}
          />
          <Itemdisplay
            cols={'col-span-5'}
            rows={'row-span-5'}
            item={cupboard}
            itemName={'cupboard'}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-7'}
            item={mandir}
            itemName={'madir'}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-8'}
            item={door}
            itemName={'door'}
          />

          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-4'}
            item={bed}
            itemName={'bed'}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-3'}
            item={sofa}
            itemName={'sofa'}
          />

          <div className=' overflow-hidden rounded-sm p-[2px]  sm:p-[5px]  transition-all duration-500  col-span-3 row-span-5 relative text-white/50 hover:text-white'>
            <div className='w-full h-full bg-white/10 rounded-sm  flex justify-center items-center flex-col text-lg'>
              <p>Many more items .....</p>
              <p>Visit Store &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -&gt;</p>
            </div>
          </div>

          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-4'}
            item={dining}
            itemName={'dining'}
          />
          <Itemdisplay
            cols={'col-span-3'}
            rows={'row-span-3'}
            item={dewan}
            itemName={'dewan'}
          />
        </div>
      </div>
      <div className='relative w-[100vw] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[100vh] py-[5%] grid grid-cols-2'>
        <div className='col-span-1 relative flex items-center justify-center'>
          <div className='w-[80%] h-[90%] relative rounded-md overflow-hidden'>
            <div className='w-full h-full bg-black/40 absolute z-20'></div>
            <img
              src={displayImg}
              alt='aboutsus'
              className='w-full h-full absolute object-cover z-10'
            />
          </div>
        </div>
        <div className='col-span-1 flex justify-center items-center pr-[5%]'>
          <div className='flex flex-col gap-2 w-[80%] '>
            <h1 className='text-sub'>Woodwork for Building Projects</h1>
            <p className=' text-justify text-md'>
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

function Itemdisplay({ cols, rows, item, itemName }) {
  const [hover, setHover] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [iconSize, setIconSize] = useState(10);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setSupportsHover(mediaQuery.matches);
    handleResize();

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', (e) => setSupportsHover(e.matches));

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', (e) =>
        setSupportsHover(e.matches)
      );
    };
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1536) setIconSize(35);
    else if (width >= 1280) setIconSize(30);
    else if (width >= 1024) setIconSize(25);
    else if (width >= 768) setIconSize(20);
    else if (width >= 640) setIconSize(15);
    else setIconSize(10);
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ${cols} ${rows} ${supportsHover? `${hover? 'p-0' : 'p-[5px]'}`: 'p-[2px]'}  left-0
`}
      onMouseEnter={() => supportsHover && setHover(true)}
      onMouseLeave={() => supportsHover && setHover(false)}
    >
      <div
        className={`absolute w-full h-full top-0 left-0 z-50 ${
          supportsHover ? 'bg-black/50 hover:bg-transparent' : ''
        } transition-all duration-500`}
      />

      <img
        src={item}
        className='w-full h-full object-cover rounded-sm sm:rounded-md'
        alt={itemName}
      />

      <div
        className={`w-full h-[18px] sm:h-[35px] md:h-[45px] lg:h-[60px] xl:h-[70px] 2xl:h-[80px] 
        overflow-hidden absolute  transition-all duration-500 z-50 

        ${supportsHover ? `${hover ? 'bottom-0' : 'bottom-[-50%]'}` : 'bottom-0 px-[2px] pb-[2px]'} left-0`}
      >
        <div
          className='relative w-full h-full flex justify-around items-center rounded-b-sm sm:rounded-b-md bg-black/30'
          style={{ backdropFilter: 'blur(2px)' }}
        >
          <p className='text-lg flex items-center font-semibold capitalize'>
            {itemName}
          </p>
          <ChevronRight size={iconSize} />
        </div>
      </div>
    </div>
  );
}
Itemdisplay.propTypes = {
  cols: PropTypes.string,
  rows: PropTypes.string,
  item: PropTypes.string,
  itemName: PropTypes.string,
};
