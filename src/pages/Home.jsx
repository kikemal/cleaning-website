import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Booking from '../components/Booking';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import FloatingQuote from '../components/FloatingQuote';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Booking />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <FloatingQuote />
    </>
  );
}
