import Hero from "@/components/sections/Hero";
import SobreProyecto from "@/components/sections/SobreProyecto";
import PropuestaValor from "@/components/sections/PropuestaValor";
import Galeria from "@/components/sections/Galeria";
import Espacios from "@/components/sections/Espacios";
import Ubicacion from "@/components/sections/Ubicacion";
import AvanceObra from "@/components/sections/AvanceObra";
import Agenda from "@/components/sections/Agenda";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <SobreProyecto />
        <PropuestaValor />
        <Galeria />
        <Espacios />
        <Ubicacion />
        <AvanceObra />
        <Agenda />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
