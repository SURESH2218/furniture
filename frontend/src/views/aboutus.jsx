import displayImg from '../assets/images/chair-2.jpg';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Aboutus() {
  useGSAP(() => {
    // Select all elements with the fade-up class
    const fadeUpElements = document.querySelectorAll('.text-fade-up-ab');

    fadeUpElements.forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top bottom', // Trigger when the element is near the viewport
            once: true, // Ensures the animation only happens once
          },
        }
      );
    });
  });

  return (
    <div className='relative w-[100vw] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[100vh] py-[5%] grid grid-cols-2 '>
      <div className='col-span-1 flex justify-center items-center pl-[5%] abcontainer'>
        <div className='flex flex-col gap-2 sm:gap-6 md:gap-8 lg:gap-10 w-[80%]'>
          <h1 className='text-sub text-nowrap text-fade-up-ab'>
            Crafting Timeless Wooden Solutions
          </h1>
          <div>
            <p className='text-justify text-md text-fade-up-ab'>
              For over 35 years, Sree Sai Balaji Wood Works has been a trusted
              name in Vijayawada, Andhra Pradesh, known for delivering
              high-quality woodwork tailored to customer needs. Led by Durga
              Prasad Donkina, with over three decades of expertise, our skilled
              craftsmen create durable and precise works, from custom furniture
              to large-scale apartment contracts. <br />
            </p>
            <p className='text-justify text-md text-fade-up-ab'>
              Our portfolio includes cots, dining sets, sofas, swings, Mandirs,
              and more. We specialize in turning customer ideas into reality,
              blending traditional craftsmanship with modern efficiency to
              ensure every project meets exacting standards. Located in
              Vijayawada, we pride ourselves on our reliable service, skilled
              workforce, and commitment to customer satisfaction, making every
              creation a lasting testament to quality.
            </p>
          </div>
        </div>
      </div>
      <div className='col-span-1 relative flex items-center justify-center '>
        <div className='w-[70%] h-[90%] relative rounded-md overflow-hidden '>
          <div className='w-full h-full bg-black/40 absolute z-20'></div>
          <img
            src={displayImg}
            alt='aboutus'
            className='w-full h-[70%] lg:h-[80%] xl:h-full absolute object-cover z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md'
          />
        </div>
      </div>
    </div>
  );
}
