import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Nuestra Historia | Dall'Ó Selfcare",
  description: "Dall'Ó Selfcare nace del sueño de un Alkimista, en el seno de una clínica de medicina estética de alto nivel. Ciencia aplicada al bienestar y la longevidad.",
  alternates: { canonical: '/sobre' },
}

const PRINCIPIOS = [
  {
    title: 'Precisión clínica',
    text: 'Cada ingrediente tiene un propósito, sin promesas vacías. Activos con respaldo científico y dosis personalizadas de precisión — para nosotros el autocuidado consciente y de precisión es la base de nuestros principios.',
  },
  {
    title: 'Formulación bajo pedido',
    text: 'Para garantizar la máxima frescura y eficacia de los principios activos, muchos de nuestros productos se elaboran cuando tú los pides.',
  },
  {
    title: 'Transparencia total',
    text: 'Publicamos ingredientes completos (INCI), concentraciones relevantes y modo de uso basado en evidencia. Sin letra pequeña.',
  },
  {
    title: 'Skin Longevity Science',
    text: 'Trabajamos en la interfaz entre cosmética y medicina estética. Activos que imitan la juventud: NAD+, NMN, OZONO, PÉPTIDOS y aceites esenciales de grado terapéutico europeos y brasileños. Validados por médicos estéticos y dermatólogos.',
  },
  {
    title: 'Libre de crueldad',
    text: 'Ninguno de nuestros productos es testado en animales.',
  },
  {
    title: 'Suplementación de precisión',
    text: 'Nuestra línea Nutri aplica los mismos estándares de la medicina: biodisponibilidad, sinergia de activos y dosis terapéuticas.',
  },
]

export default function SobrePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream">

        {/* Hero */}
        <section className="max-w-screen-xl mx-auto px-8 pt-20 pb-16 border-b border-sand-300">
          <div className="w-8 h-0.5 bg-cocoa-900 mb-8" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-6">Nuestra Historia</p>
          <h1 className="font-cormorant text-6xl md:text-7xl font-light text-cocoa-900 leading-tight max-w-3xl">
            Vivencia & Ciencia al servicio de la longevidad
          </h1>
        </section>

        {/* Manifesto */}
        <section className="max-w-screen-xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 border-b border-sand-300">
          <div>
            <p className="font-cormorant text-3xl font-light text-cocoa-900 leading-relaxed italic">
              "Creemos en prevención, que envejecer bien no es cuestión de suerte. Es el resultado de decisiones precisas, ingredientes correctos y ciencia aplicada."
            </p>
          </div>
          <div className="space-y-5 text-sm text-text leading-relaxed">
            <p>
              Dall&apos;Ó Selfcare nace del sueño de un niño Alkimista, en el seno de una clínica de medicina estética de alto nivel, con la convicción de que los mismos principios que guían los tratamientos médicos deben aplicarse a los productos de uso diario.
            </p>
            <p>
              Cada fórmula es el resultado de años de observación clínica, validada por profesionales de la salud y diseñada para actuar con precisión en los mecanismos del envejecimiento celular.
            </p>
            <p>
              No creamos productos para el mercado masivo, ni fórmulas mágicas de moda. Somos enamorados de crear soluciones para quienes entienden que el bienestar es una inversión, no un gasto.
            </p>
            <div className="pt-4 border-t border-sand-300">
              <p className="text-[13px] font-[500] text-cocoa-900">Dr. Vimerson Dall&apos;Ó — MD</p>
              <p className="text-xs text-text-muted tracking-wide uppercase">CEO Fundador</p>
            </div>
          </div>
        </section>

        {/* Principios */}
        <section className="max-w-screen-xl mx-auto px-8 py-20 border-b border-sand-300">
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-14">Nuestros principios</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {PRINCIPIOS.map((item) => (
              <div key={item.title}>
                <div className="w-6 h-0.5 bg-cocoa-900 mb-5" />
                <h3 className="font-cormorant text-xl font-light text-cocoa-900 mb-3">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Las dos líneas */}
        <section className="max-w-screen-xl mx-auto px-8 py-20 border-b border-sand-300">
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-14">Nuestras líneas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand-300">
            <div className="bg-sand-100 p-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4">Dall&apos;Ó Skin</p>
              <h2 className="font-cormorant text-4xl font-light text-cocoa-900 mb-6 leading-tight">Longevidad cutánea</h2>
              <p className="text-sm text-text leading-relaxed mb-8">
                Cuidado tópico magistral. Limpiadores y sérums de pequeño lote, formulados bajo pedido para reprogramar la longevidad de tu piel con activos de grado biotecnológico.
              </p>
              <Link href="/coleccion/skin" className="inline-block text-[10px] tracking-[0.2em] uppercase border border-brown text-brown px-8 py-3 hover:bg-brown hover:text-bg transition-colors">
                Ver Dall&apos;Ó Skin
              </Link>
            </div>
            <div className="bg-sand-200 p-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4">Dall&apos;Ó Nutri</p>
              <h2 className="font-cormorant text-4xl font-light text-cocoa-900 mb-6 leading-tight">Suplementación de precisión</h2>
              <p className="text-sm text-text leading-relaxed mb-8">
                Complementos alimenticios formulados con criterios médicos: alta biodisponibilidad, activos sinérgicos y dosis con respaldo clínico. Desde CoQ10 y NAD+ hasta colágeno, magnesio citrato y omega-3 de grado farmacéutico.
              </p>
              <Link href="/coleccion/nutri" className="inline-block text-[10px] tracking-[0.2em] uppercase border border-brown text-brown px-8 py-3 hover:bg-brown hover:text-bg transition-colors">
                Ver Dall&apos;Ó Nutri
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-screen-xl mx-auto px-8 py-20 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-6">Empieza hoy</p>
          <h2 className="font-cormorant text-5xl font-light text-cocoa-900 mb-8">Diseñado para durar.</h2>
          <Link href="/productos" className="inline-block border border-brown text-brown text-[10px] tracking-[0.25em] uppercase px-10 py-4 hover:bg-brown hover:text-bg transition-colors">
            Ver todos los productos
          </Link>
        </section>

      </main>
      <Footer />
    </>
  )
}
