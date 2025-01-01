import Landing from '../views/landing';
import Aboutus from '../views/aboutus';
import Products from '../views/products';
import Reachout from '../views/reachus';
import Footer from '../views/footer';

export default function Home() {
  return (
    <div>
      <Landing />
      <Aboutus />
      <Products />
      <Reachout />
      <Footer />
    </div>
  );
}
