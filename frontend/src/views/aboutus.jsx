import displayImg from '../assets/images/chair-2.jpg';
export default function Aboutus() {
  return (
    <div className='relative w-[100vw] h-[100vh] py-[5%] grid grid-cols-2'>
      <div className='col-span-1 flex justify-center items-center pl-[5%]'>
        <div className='flex flex-col gap-10 w-[80%] '>
          <h1 className='text-[35px]'>Crafting Timeless Wooden Solutions</h1>
          <p className=' text-justify'>
            For over 35 years, Sree Sai Balaji Wood Works has been a trusted
            name in Vijayawada, Andhra Pradesh, known for delivering
            high-quality woodwork tailored to customer needs. Led by Durga
            Prasad Donkina, with over three decades of expertise, our skilled
            craftsmen create durable and precise works, from custom furniture to
            large-scale apartment contracts. <br />
            Our portfolio includes cots, dining sets, sofas, swings, Mandirs,
            and more. We specialize in turning customer ideas into reality,
            blending traditional craftsmanship with modern efficiency to ensure
            every project meets exacting standards. Located in Vijayawada, we
            pride ourselves on our reliable service, skilled workforce, and
            commitment to customer satisfaction, making every creation a lasting
            testament to quality.
          </p>
        </div>
      </div>
      <div className='col-span-1 relative flex items-center justify-center '>
        <div className='w-[70%] h-[90%] relative bg-blue-200 rounded-md overflow-hidden'>
          <div className='w-full h-full bg-black/40 absolute z-20'></div>
          <img
            src={displayImg}
            alt='aboutsus'
            className='w-full h-full absolute object-cover z-10'
          />
        </div>
      </div>
    </div>
  );
}
