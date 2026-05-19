import type { Metadata } from 'next'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "Aviso Legal | Dall'Ó Selfcare",
  description: "Aviso legal, condiciones de uso, política de privacidad y condiciones generales de contratación de Dall'Ó Pharma S.L.U.",
  alternates: { canonical: '/aviso-legal' },
}

const sectionClass = 'mb-10'
const h2Class = 'font-cormorant text-2xl font-light text-cocoa-900 mb-4 mt-10'
const h3Class = 'text-[13px] font-[600] text-cocoa-900 mb-2 mt-6 uppercase tracking-[0.05em]'
const pClass = 'text-sm text-text leading-relaxed mb-3'
const liClass = 'text-sm text-text leading-relaxed mb-1'

export default function AvisoLegalPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream">

        <section className="max-w-[860px] mx-auto px-8 pt-20 pb-32">

          <div className="w-8 h-0.5 bg-cocoa-900 mb-8" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4">Legal</p>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-cocoa-900 leading-tight mb-16">
            Aviso Legal
          </h1>

          {/* 1. Información LSSI */}
          <div className={sectionClass}>
            <h2 className={h2Class}>1. Información conforme a la LSSI</h2>
            <p className={pClass}>
              En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa sobre los datos del titular del sitio web <strong>www.dalloselfcare.es</strong>:
            </p>
            <ul className="list-none p-0 m-0 space-y-1 pl-4 border-l-2 border-sand-300 mb-4">
              <li className={liClass}><strong>Denominación Social:</strong> Dall&apos;Ó Pharma S.L.U.</li>
              <li className={liClass}><strong>Nombre Comercial:</strong> Dall&apos;Ó SelfCare</li>
              <li className={liClass}><strong>Domicilio Social:</strong> Pg. Amunt, 12-14, 08024 Barcelona · C/ Gibraltar 2, bajo, Estepona (29680), Málaga</li>
              <li className={liClass}><strong>NIF:</strong> B22489355</li>
              <li className={liClass}><strong>Email:</strong> contacto@dalloselfcare.es</li>
            </ul>
          </div>

          {/* 2. Condiciones de uso */}
          <div className={sectionClass}>
            <h2 className={h2Class}>2. Condiciones de uso</h2>
            <p className={pClass}>
              El acceso y/o uso de este sitio web atribuye la condición de USUARIO, que acepta desde dicho acceso las Condiciones Generales de Uso aquí reflejadas. El USUARIO asume la responsabilidad del uso del portal, incluyendo el registro necesario para acceder a determinados servicios, siendo responsable de aportar información veraz y lícita.
            </p>
          </div>

          {/* 3. Propiedad intelectual */}
          <div className={sectionClass}>
            <h2 className={h2Class}>3. Propiedad intelectual e industrial</h2>
            <p className={pClass}>
              Dall&apos;Ó Pharma S.L.U. es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (imágenes, sonido, vídeo, software, textos, marcas, logotipos, combinaciones de colores, estructura y diseño). Quedan expresamente prohibidas la reproducción, distribución y comunicación pública de la totalidad o parte de los contenidos con fines comerciales sin autorización expresa y por escrito.
            </p>
          </div>

          {/* 4. Exclusión de responsabilidad */}
          <div className={sectionClass}>
            <h2 className={h2Class}>4. Exclusión de responsabilidad</h2>
            <p className={pClass}>
              Dall&apos;Ó Pharma S.L.U. no se hace responsable de los daños y perjuicios que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
            </p>
          </div>

          {/* 5. Modificaciones */}
          <div className={sectionClass}>
            <h2 className={h2Class}>5. Modificaciones</h2>
            <p className={pClass}>
              Dall&apos;Ó Pharma S.L.U. se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal.
            </p>
          </div>

          {/* 6. Legislación */}
          <div className={sectionClass}>
            <h2 className={h2Class}>6. Legislación aplicable y jurisdicción</h2>
            <p className={pClass}>
              La relación entre Dall&apos;Ó Pharma S.L.U. y el USUARIO se regirá por la normativa española vigente. Cualquier controversia se someterá a los Juzgados y Tribunales de la ciudad de Estepona (Málaga), salvo que la ley aplicable en materia de consumidores disponga otra cosa de forma imperativa.
            </p>
          </div>

          <div className="w-full h-px bg-sand-300 my-12" />

          {/* Condiciones generales de contratación */}
          <h2 className="font-cormorant text-3xl font-light text-cocoa-900 mb-8">
            Condiciones Generales de Contratación, Envíos y Devoluciones
          </h2>

          <div className={sectionClass}>
            <h3 className={h3Class}>1. Objeto y generalidades</h3>
            <p className={pClass}>
              Las presentes Condiciones regulan las transacciones comerciales realizadas a través de <strong>www.dalloselfcare.es</strong>, propiedad de Dall&apos;Ó Pharma S.L.U. (NIF B22489355). La adquisición de cualquier producto implica la aceptación plena de estas condiciones.
            </p>
          </div>

          <div className={sectionClass}>
            <h3 className={h3Class}>2. Proceso de compra y precios</h3>
            <p className={pClass}>
              Todos los precios están expresados en Euros (€) e incluyen el IVA aplicable en España. Los gastos de envío se desglosarán antes de finalizar el pago.
            </p>
          </div>

          <div className={sectionClass}>
            <h3 className={h3Class}>3. Política de envíos</h3>
            <p className={pClass}>Los pedidos se procesan en 24/48 horas laborables. El plazo de entrega en Península es de 24 a 72 horas laborables desde que el paquete sale del almacén.</p>
            <ul className="list-none p-0 m-0 space-y-1 pl-4 border-l-2 border-sand-300 mb-4">
              <li className={liClass}><strong>Envío estándar (Península):</strong> 5,00 €</li>
              <li className={liClass}><strong>Envío gratuito:</strong> Para pedidos superiores a 50 €</li>
            </ul>
            <p className={pClass}>Una vez enviado el pedido, recibirás un correo con el número de seguimiento.</p>
          </div>

          <div className={sectionClass}>
            <h3 className={h3Class}>4. Formas de pago</h3>
            <p className={pClass}>Tarjeta de crédito o débito (Visa, Mastercard). Las transacciones están gestionadas de forma segura y encriptada por Stripe.</p>
          </div>

          <div className={sectionClass}>
            <h3 className={h3Class}>5. Derecho de desistimiento y devoluciones</h3>
            <p className={pClass}>
              El cliente dispone de 14 días naturales desde la recepción del producto para ejercer su derecho de desistimiento.
            </p>
            <p className={pClass}>
              <strong>Excepción por higiene:</strong> Al tratarse de productos cosméticos y de autocuidado, no se admitirá la devolución de productos que hayan sido desprecintados, abiertos o utilizados. El producto debe conservar su embalaje original e intacto.
            </p>
            <p className={pClass}>
              Los gastos de devolución por desistimiento corren a cargo del cliente, salvo error de Dall&apos;Ó SelfCare o producto defectuoso. Para iniciar una devolución, escribe a <strong>contacto@dalloselfcare.es</strong> indicando número de pedido y productos a devolver.
            </p>
          </div>

          <div className={sectionClass}>
            <h3 className={h3Class}>6. Productos defectuosos o errores de envío</h3>
            <p className={pClass}>
              Si el paquete llega dañado o el producto es incorrecto, contacta en un máximo de 48 horas a través de contacto@dalloselfcare.es adjuntando fotografías. Dall&apos;Ó SelfCare asumirá todos los costes de recogida y sustitución.
            </p>
          </div>

          <div className="w-full h-px bg-sand-300 my-12" />

          {/* Política de cookies */}
          <h2 className="font-cormorant text-3xl font-light text-cocoa-900 mb-8">
            Política de Cookies
          </h2>

          <p className={pClass}>
            El sitio web <strong>www.dalloselfcare.es</strong> utiliza cookies y tecnologías similares que almacenan y recuperan información cuando navegas.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { title: 'Cookies técnicas (necesarias)', text: 'Imprescindibles para el funcionamiento correcto de la web: gestión del carrito, sesión e identificación. No requieren consentimiento.' },
              { title: 'Cookies de preferencias', text: 'Permiten recordar información como el idioma o región para personalizar tu experiencia.' },
              { title: 'Cookies analíticas', text: 'Permiten cuantificar usuarios y analizar estadísticamente el uso de la web (Google Analytics).' },
              { title: 'Cookies de publicidad comportamental', text: 'Almacenan información del comportamiento de navegación para mostrar publicidad personalizada (Píxel de Meta, Google Ads). Permiten crear audiencias personalizadas en redes sociales.' },
            ].map((c) => (
              <div key={c.title} className="pl-4 border-l-2 border-sand-300">
                <p className="text-[13px] font-[600] text-cocoa-900 mb-1">{c.title}</p>
                <p className="text-sm text-text-muted leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-sand-300">
                  <th className="text-left py-3 pr-4 text-[11px] tracking-[0.1em] uppercase text-text-muted font-[500]">Proveedor</th>
                  <th className="text-left py-3 pr-4 text-[11px] tracking-[0.1em] uppercase text-text-muted font-[500]">Tipo / Finalidad</th>
                  <th className="text-left py-3 text-[11px] tracking-[0.1em] uppercase text-text-muted font-[500]">Duración</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { proveedor: "Dall'Ó SelfCare", tipo: 'Técnicas (carrito y sesión)', duracion: 'Sesión / Propia' },
                  { proveedor: 'Google Analytics', tipo: 'Analíticas', duracion: 'Persistente (Terceros)' },
                  { proveedor: 'Meta / Facebook', tipo: 'Publicidad y Perfilado', duracion: 'Persistente (Terceros)' },
                ].map((row) => (
                  <tr key={row.proveedor} className="border-b border-sand-200">
                    <td className="py-3 pr-4 text-text">{row.proveedor}</td>
                    <td className="py-3 pr-4 text-text-muted">{row.tipo}</td>
                    <td className="py-3 text-text-muted">{row.duracion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
