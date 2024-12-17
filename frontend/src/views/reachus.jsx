import displayImg from '../assets/images/vijayawada-map.png';
export default function Reachout() {
  return (
    <div className='relative w-[100vw] h-[100vh] py-[5%] grid grid-cols-2'>
      <div className='col-span-1 relative flex items-center justify-center'>
        <div className='w-[70%] h-[90%] relative bg-blue-200 rounded-sm overflow-hidden'>
          <div className='w-full h-full bg-black/40 absolute z-20'></div>
          <img
            src={displayImg}
            alt='aboutsus'
            className='w-full h-full absolute object-cover z-10'
          />
        </div>
      </div>
      <div className='col-span-1 flex justify-center items-center pr-[5%]'>
        <div className='flex flex-col gap-10 w-[60%] '>
          <h1 className='text-[35px] text-center'>Reach Out to Us</h1>
          <form action='/' className='flex flex-col gap-4'>
            <div className='flex justify-between gap-2'>
              <input
                type='text'
                name='firstname'
                id='firstname'
                className='bg-white/30 rounded-sm p-2 w-[50%]'
                placeholder='First name'
              />
              <input
                type='text'
                name='lastname'
                id='lastname'
                className='bg-white/30 rounded-sm p-2 w-[50%]'
                placeholder='Last name'
              />
            </div>
            <input
              type='email'
              name='email'
              id='email'
              className='bg-white/30 rounded-sm p-2'
              placeholder='Email'
            />
            <input
              type='text'
              name='mobile'
              id='mobile'
              className='bg-white/30 rounded-sm p-2'
              placeholder='Mobile'
            />
            <textarea
              name='message'
              id='message'
              className='bg-white/30 rounded-sm p-2 h-[200px] w-full resize-none overflow-hidden'
              placeholder='Message'
              maxLength='500'
            ></textarea>

            <button className='p-2 bg-white/40 hover:bg-white/50 transition-all duration-500'>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
