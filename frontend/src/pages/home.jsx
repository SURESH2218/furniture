import Landing from '../views/landing';
import Aboutus from '../views/aboutus';
import Products from '../views/products';
import Reachout from '../views/reachus';
export default function Home() {
  return (
    <div className='w-[100vw] h-[100vh] hidden-scrollbar overflow-x-hidden'>
      <Landing />
      <Aboutus />
      <Products />
      <Reachout />
    </div>
  );
}
