import Hero from "@/components/Hero";
import PromoSection from "@/components/PromoSection";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import OrderForm from "@/components/OrderForm";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <PromoSection />
      <Services />
      <Portfolio />
      <Process />
      <WhyUs />
      <Reviews />
      <FAQ />
      <OrderForm />
      <Contact />
    </>
  );
}
