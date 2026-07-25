import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Gallery from "@/components/Gallery/Gallery";
import Advantages from "@/components/Advantages/Advantages";
import Booking from "@/components/Booking/Booking";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Advantages />
      <Booking />
      <Footer />
    </>
  );
}
