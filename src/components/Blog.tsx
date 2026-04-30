import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { BLOG_POSTS } from '../content'
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Blog() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section id="blog" className="py-28 bg-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div className="flex flex-col gap-3">
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium w-fit"
            >
              Blog & Recursos
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-bold text-carbon-900"
            >
              Últimas novedades<br />
              <span className="text-brand-600">sobre tu piel</span>
            </motion.h2>
          </div>
          <motion.a
            variants={fadeUp}
            href="#blog"
            className="group inline-flex items-center gap-1.5 text-brand-600 font-medium hover:text-brand-700 transition-colors text-sm shrink-0"
          >
            Ver todos los artículos
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={i} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BlogCard({ post }: { post: (typeof BLOG_POSTS)[0] }) {
  return (
    <motion.a
      href={post.href}
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-3xl overflow-hidden border border-cream-400 bg-cream-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/30 transition-all duration-300"
    >
      {/* Image placeholder */}
      <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center relative overflow-hidden">
        <div className="text-brand-300">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <span className="absolute top-3 left-3 px-3 py-1 bg-cream-200/90 backdrop-blur-sm rounded-full text-xs font-medium text-brand-700">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-1.5 text-carbon-400 text-xs">
          <CalendarDays size={12} />
          {post.date}
        </div>
        <h3 className="text-base font-semibold text-carbon-900 group-hover:text-brand-700 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-carbon-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-1 text-brand-600 text-xs font-medium mt-auto pt-2">
          Leer más
          <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  )
}
