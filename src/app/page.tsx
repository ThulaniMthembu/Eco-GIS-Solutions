'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GlobeIcon,
  PlayIcon,
  PauseIcon,
  ClipboardCheckIcon,
  MapIcon,
  BarChartIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  UserIcon,
  Leaf,
  Users,
  Lightbulb,
  BarChart2,
  Droplet,
  Mountain,
  Sprout,
  BookOpenIcon,
  AwardIcon,
  LeafIcon,
  ShieldCheckIcon,
  UsersIcon
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollToPlugin)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const servicesRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const videos = [
    {
      src: '/videos/video1.mp4',
      h1: 'Namaqua Environmental',
      h2: 'Environmental Solutions',
      text: 'Discover innovative approaches to protect and preserve our planet for future generations.',
    },
    {
      src: '/videos/video2.mp4',
      h1: 'Cutting-Edge Technology',
      h2: 'GIS Mapping Excellence',
      text: 'Explore how we leverage advanced GIS technology to analyze and visualize environmental data.',
    },
    {
      src: '/videos/video3.mp4',
      h1: 'Sustainable Future',
      h2: 'Balancing Progress and Nature',
      text: 'Learn about our commitment to creating a harmonious balance between development and environmental conservation.',
    },
  ]

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play()
        const timer = setTimeout(() => {
          setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
        }, 8000) // Change video every 8 seconds
        return () => clearTimeout(timer)
      } else {
        currentVideo.pause()
      }
    }
    return undefined
  }, [currentVideoIndex, isPlaying, videos.length])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.body.style.overflow = 'unset'
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        const elementPosition = (element as HTMLElement).offsetTop
        const elementHeight = (element as HTMLElement).offsetHeight

        if (
          scrollPosition >
          elementPosition - windowHeight + elementHeight / 2
        ) {
          element.classList.add('animate')
        } else {
          element.classList.remove('animate')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('a')
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
        if (href) {
          if (href.startsWith('#')) {
            // Internal anchor link
            e.preventDefault()
            const targetId = href.substring(1)
            const target = document.getElementById(targetId)
            if (target) {
              gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: 'power2.inOut',
              })
            }
          } else if (href.startsWith('http') || href.startsWith('https')) {
            // External link
            // Let the default behavior handle it (opening in a new tab if target="_blank" is set)
            return
          }
          // If it's neither an anchor link nor an external link, let the default behavior handle it
        }
      })
    })
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: 'power2.inOut',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'namaquaenvironmental@gmail.com', // Add the recipient email here
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : -45,
      y: custom === 1 ? 8 : -8,
    }),
  }

  const slideInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 text-gray-900'>
      <header className='fixed top-0 left-0 right-0 z-50 bg-[rgba(46,73,47,255)] text-white'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            <div className='flex items-center'>
              <Link href='/' className='flex-shrink-0' onClick={scrollToTop}>
                <Image
                  src='/images/OFFICIAL-LOGO-cut.png'
                  alt='Namaqua Environmental Logo'
                  width={180}
                  height={60}
                  className='h-16 w-auto'
                />
              </Link>
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <Link
                  href='/'
                  className='text-white hover:bg-[rgba(70,97,71,255)] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
                  onClick={scrollToTop}
                >
                  Home
                </Link>
                <Link
                  href='#services'
                  className='text-white hover:bg-[rgba(70,97,71,255)] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
                >
                  Services
                </Link>
                <Link
                  href='#about'
                  className='text-white hover:bg-[rgba(70,97,71,255)] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
                >
                  About
                </Link>
                <Link
                  href='#contact'
                  className='text-white hover:bg-[rgba(70,97,71,255)] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
                >
                  Contact
                </Link>
                <Link
                  href='#footer'
                  className='text-white hover:bg-[rgba(70,97,71,255)] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
                >
                  Resources
                </Link>
              </div>
            </div>
            <div className='md:hidden'>
              <button
                ref={hamburgerRef}
                onClick={toggleMenu}
                className='inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none transition-colors duration-300'
                aria-expanded={isMenuOpen}
              >
                <span className='sr-only'>{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                <div className="w-6 h-6 flex flex-col justify-between items-center">
                  <motion.span
                    variants={lineVariants}
                    custom={1}
                    animate={isMenuOpen ? 'open' : 'closed'}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-white block origin-center"
                  ></motion.span>
                  <motion.span
                    animate={{ opacity: isMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-white block"
                  ></motion.span>
                  <motion.span
                    variants={lineVariants}
                    custom={3}
                    animate={isMenuOpen ? 'open' : 'closed'}
                    transition={{ duration: 0.3 }}
                    className="w-full h-0.5 bg-white block origin-center"
                  ></motion.span>
                </div>
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className='fixed inset-y-0 left-0 w-1/2 bg-[rgba(46,73,47,255)] z-50 flex flex-col shadow-lg'
            >
              <div className='p-4'>
                <Link href='/' onClick={(e) => { scrollToTop(e); toggleMenu(); }} className='flex justify-center'>
                  <Image
                    src='/images/OFFICIAL-LOGO-cut.png'
                    alt='Namaqua Environmental Logo'
                    width={180}
                    height={60}
                    className='h-16 w-auto'
                  />
                </Link>
              </div>
              <div className='flex-grow flex flex-col justify-center px-4'>
                <div className='space-y-8 text-center'>
                  <Link
                    href='/'
                    className='block text-white text-2xl hover:text-gray-300 transition-colors duration-300'
                    onClick={(e) => {
                      scrollToTop(e)
                      toggleMenu()
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    href='#services'
                    className='block text-white text-2xl hover:text-gray-300 transition-colors duration-300'
                    onClick={toggleMenu}
                  >
                    Services
                  </Link>
                  <Link
                    href='#about'
                    className='block text-white text-2xl hover:text-gray-300 transition-colors duration-300'
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                  <Link
                    href='#contact'
                    className='block text-white text-2xl hover:text-gray-300 transition-colors duration-300'
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                  <Link
                    href='#footer'
                    className='block text-white text-2xl hover:text-gray-300 transition-colors duration-300'
                    onClick={toggleMenu}
                  >
                    Resources
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className='flex-grow pt-20'>
        <section className='relative bg-gray-900 h-screen'>
          <div className='absolute inset-0 overflow-hidden'>
            {videos.map((video,    index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current[index] = el
                    }
                  }}
                  src={video.src}
                  className='absolute inset-0 w-full h-full object-cover'
                  muted
                  playsInline
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8'>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                  >
                    <motion.h1 
                      className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center text-green-400'
                      variants={slideInUp}
                    >
                      {video.h1}
                    </motion.h1>
                    <motion.h2 
                      className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center'
                      variants={slideInUp}
                    >
                      {video.h2}
                    </motion.h2>
                    <motion.p 
                      className='text-xl sm:text-2xl max-w-2xl text-center leading-relaxed'
                      variants={slideInUp}
                    >
                      {video.text}
                    </motion.p>
                    <motion.div 
                      className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'
                      variants={slideInUp}
                    >
                      <div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5'>
                        <Link
                          href='#contact'
                          className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-green-400 hover:bg-green-500 sm:px-8 transition-all duration-300 ease-in-out'
                        >
                          Get started
                        </Link>
                        <Link
                          href='#services'
                          className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-400 bg-gray-800 hover:bg-gray-700 sm:px-8 transition-all duration-300 ease-in-out'
                        >
                          Learn more
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className='absolute top-4 right-4 z-10'>
            <button
              onClick={togglePlayPause}
              className='bg-transparent text-white px-6 py-3 rounded-md flex items-center space-x-2 transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-sm'
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <>
                  <PauseIcon className='h-5 w-5 mr-2' />
                  <span>Pause Video</span>
                </>
              ) : (
                <>
                  <PlayIcon className='h-5 w-5 mr-2' />
                  <span>Play Video</span>
                </>
              )}
            </button>
          </div>
        </section>

        <section id='services' className='py-12 bg-white' ref={servicesRef}>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div 
              className='lg:text-center'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2 
                className='text-base text-green-600 font-semibold tracking-wide uppercase'
                variants={slideInUp}
              >
                Services
              </motion.h2>
              <motion.p 
                className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'
                variants={slideInUp}
              >
                Our Expertise
              </motion.p>
              <motion.p 
                className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto leading-relaxed'
                variants={slideInUp}
              >
                We offer a comprehensive range of services to help you achieve
                sustainable environmental practices and leverage innovative GIS
                technologies.
              </motion.p>
            </motion.div>

            <motion.div 
              className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {[
                {
                  icon: <ClipboardCheckIcon className='h-8 w-8 text-green-500 mr-3' />,
                  title: 'Environmental Impact Assessments (EIA)',
                  description: 'Comprehensive assessments to evaluate the potential environmental effects of proposed projects, ensuring compliance and sustainability.',
                },
                {
                  icon: <MapIcon className='h-8 w-8 text-green-500 mr-3' />,
                  title: 'Site Assessments',
                  description: 'Detailed evaluations of land and environmental conditions to inform project planning and ensure regulatory compliance.',
                },
                {
                  icon: <ClipboardCheckIcon className='h-8 w-8 text-green-500 mr-3' />,
                  title: 'Regulatory Compliance',
                  description: 'Expert guidance on meeting local, national, and international environmental regulations and standards.',
                },
                {
                  icon: <GlobeIcon className='h-8 w-8 text-green-500 mr-3' />,
                  title: 'GIS Mapping',
                  description: 'Creation of detailed maps for environmental analysis, land use planning, and resource management using cutting-edge GIS technology.',
                },
                {
                  icon: <BarChartIcon className='h-8 w-8 text-green-500 mr-3' />,
                  title: 'Spatial Analysis',
                  description: 'Utilizing advanced GIS technology to analyze spatial data, supporting informed decision-making and strategic planning.',
                },
                {
                  icon: <BarChartIcon className='h-8 w-8 text-green-500 mr-3' />,
                  title: 'Data Visualization',
                  description: 'Development of clear and impactful visual representations of data to effectively communicate findings and support project objectives.',
                },
              ].map((service) => (
                <motion.div 
                  key={service.title} 
                  className='bg-white rounded-lg shadow-lg overflow-hidden service-item transform transition duration-300 hover:scale-105 hover:shadow-xl'
                  variants={slideInUp}
                >
                  <div className='p-6'>
                    <div className='flex items-center mb-4'>
                      {service.icon}
                      <h3 className='text-xl font-medium text-gray-900'>
                        {service.title}
                      </h3>
                    </div>
                    <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id='about' className='py-12 bg-gray-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div 
              className='lg:text-center'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2 
                className='text-base text-green-600 font-semibold tracking-wide uppercase'
                variants={slideInUp}
              >
                About Us
              </motion.h2>
              <motion.p 
                className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'
                variants={slideInUp}
              >
                Our Mission and Values
              </motion.p>
            </motion.div>
            <motion.div 
              className='mt-10 flex flex-col lg:flex-row items-center justify-between'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <div className='prose prose-lg mx-auto text-gray-500 lg:max-w-2xl'>
                <motion.p className='mb-6 flex items-start' variants={slideInUp}>
                  <Leaf className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>At Namaqua Environmental, we are passionate about creating
                    sustainable solutions through innovative Environmental Science
                    and Geographic Information Systems (GIS) technologies.</strong> With a
                    strong focus on environmental monitoring, land management, and
                    geospatial analysis, we offer cutting-edge tools and services
                    to help our clients make informed, data-driven decisions.
                  </span>
                </motion.p>
                <motion.p className='mb-6 flex items-start' variants={slideInUp}>
                  <Users className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>Our team of environmental scientists, GIS experts, and soil
                    specialists brings years of experience in solving complex
                    environmental challenges.</strong> From monitoring air and water quality
                    to assessing land use and ecological health, we integrate
                    advanced mapping, Earth observation, and data analytics to
                    support industries, governments, and conservation projects.
                  </span>
                </motion.p>
                <motion.p className='mb-6 flex items-start' variants={slideInUp}>
                  <GlobeIcon className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>Driven by a commitment to sustainability, we aim to empower
                    businesses to reduce their environmental impact</strong> while
                    optimizing land use, agriculture, and natural resource
                    management. We believe that through innovation and
                    collaboration, we can shape a future where both nature and
                    communities thrive.
                  </span>
                </motion.p>
                <motion.p className='mb-6 flex items-start' variants={slideInUp}>
                  <Lightbulb className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>Let us help you make smarter, greener decisions with the power
                    of GIS and environmental science.</strong>
                  </span>
                </motion.p>
              </div>
              <motion.div 
                className='mt-10 lg:mt-0 lg:ml-10 flex-shrink-0'
                variants={slideInUp}
              >
                <Image
                  src='/images/OFFICIAL-LOGO.png'
                  alt='Namaqua Environmental Full Logo'
                  width={400}
                  height={400}
                  className='rounded-lg shadow-lg'
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className='mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {[
                { icon: <BarChart2 className='h-6 w-6' />, title: 'Data Analysis' },
                { icon: <Droplet className='h-6 w-6' />, title: 'Water Management' },
                { icon: <Mountain className='h-6 w-6' />, title: 'Land Conservation' },
                { icon: <Sprout className='h-6 w-6' />, title: 'Sustainable Growth' },
              ].map((item, index) => (
                <motion.div key={index} className='text-center' variants={slideInUp}>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto'>
                    {item.icon}
                  </div>
                  <h3 className='mt-2 text-lg font-medium text-gray-900'>{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className='py-12 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <motion.div 
              className='grid grid-cols-1 md:grid-cols-2 gap-8'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              {[
                { src: '/images/image5.jpg', alt: 'Environmental Project', title: 'Environmental Project' },
                { src: '/images/image4.jpg', alt: 'GIS Mapping', title: 'GIS Mapping' },
              ].map((image, index) => (
                <motion.div 
                  key={index} 
                  className='relative overflow-hidden rounded-lg shadow-lg'
                  variants={slideInUp}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className='object-cover w-full h-full'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <p className='text-white text-2xl font-bold'>{image.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id='contact' className='py-12 bg-gray-100'>
          <div className='container mx-auto px-4'>
            <div className='max-w-7xl mx-auto'>
              <motion.div 
                className='text-center mb-12'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.h2 
                  className='text-3xl font-bold text-gray-900 sm:text-4xl'
                  variants={slideInUp}
                >
                  Get in Touch
                </motion.h2>
                <motion.p 
                  className='mt-4 text-xl text-gray-500 leading-relaxed'
                  variants={slideInUp}
                >
                  We&apos;d love to hear from you. Send us a message and
                  we&apos;ll respond as soon as possible.
                </motion.p>
              </motion.div>
              <motion.div 
                className='flex flex-col md:flex-row gap-8'
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
              >
                <motion.div className='md:w-1/2' variants={slideInUp}>
                  <div className='bg-white rounded-lg shadow-lg p-8'>
                    <h3 className='text-2xl font-semibold text-gray-900 mb-6'>
                      Contact Us
                    </h3>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                      <div>
                        <label
                          className='block text-sm font-medium text-gray-700'
                          htmlFor='name'
                        >
                          Your Name
                        </label>
                        <input
                          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
                          type='text'
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className='block text-sm font-medium text-gray-700'
                          htmlFor='email'
                        >
                          Email Address
                        </label>
                        <input
                          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
                          type='email'
                          id='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className='block text-sm font-medium text-gray-700'
                          htmlFor='message'
                        >
                          Message
                        </label>
                        <textarea
                          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
                          id='message'
                          name='message'
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type='submit'
                          disabled={isSubmitting}
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:opacity-50'
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </form>
                    {submitStatus === 'success' && (
                      <p className="mt-4 text-green-600">Message sent successfully!</p>
                    )}
                    {submitStatus === 'error' && (
                                            <p className="mt-4 text-red-600">Failed to send message. Please try again.</p>
                    )}
                  </div>
                </motion.div>
                <motion.div className='md:w-1/2' variants={slideInUp}>
                  <div className='bg-white rounded-lg shadow-lg p-8 h-full'>
                    <h3 className='text-2xl font-semibold text-gray-900 mb-6'>
                      Our Location
                    </h3>
                    <div className='aspect-w-16 aspect-h-9 mb-6'>
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.9439245324143!2d20.65961887536386!3d-32.39386484418339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c2cea62e775125f%3A0x5b05ec1782c20b22!2s96%20Piet%20Retief%20St%2C%20Sutherland%2C%206920!5e0!3m2!1sen!2sza!4v1728261741348!5m2!1sen!2sza" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <div className='space-y-4'>
                      <p className='flex items-center text-gray-600'>
                        <MapPinIcon className='h-5 w-5 text-green-500 mr-2' />
                        96 Piet Retief Street, Sutherland Northern Cape
                      </p>
                      <p className='flex items-center text-gray-600'>
                        <UserIcon className='h-5 w-5 text-green-500 mr-2' />
                        Ndlelenhle Zondi - Managing Director
                      </p>
                      <p className='flex items-center text-gray-600'>
                        <PhoneIcon className='h-5 w-5 text-green-500 mr-2' />
                        +27 65 502 3093
                      </p>
                      <p className='flex items-center text-gray-600'>
                        <PhoneIcon className='h-5 w-5 text-green-500 mr-2' />
                        +27 76 401 3109
                      </p>
                      <p className='flex items-center text-gray-600'>
                        <MailIcon className='h-5 w-5 text-green-500 mr-2' />
                        namaquaenvironmental@gmail.com
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className='bg-[rgba(46,73,47,255)] text-white'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='md:col-span-1'>
              <h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4'>
                Contact Information
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-center'>
                  <MapPinIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>96 Piet Retief Street, Sutherland Northern Cape</span>
                </li>
                <li className='flex items-center'>
                  <UserIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>Ndlelenhle Zondi - Managing Director</span>
                </li>
                <li className='flex items-center'>
                  <PhoneIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>+27 65 502 3093</span>
                </li>
                <li className='flex items-center'>
                  <PhoneIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>+27 76 401 3109</span>
                </li>
                <li className='flex items-center'>
                  <MailIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>namaquaenvironmental@gmail.com</span>
                </li>
              </ul>
            </div>
            <div className='md:col-span-1'>
              <h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4'>
                Our Commitment
              </h3>
              <ul className='space-y-4'>
                <li className='flex items-center'>
                  <LeafIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>Sustainable Environmental Practices</span>
                </li>
                <li className='flex items-center'>
                  <AwardIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>Industry-Leading GIS Solutions</span>
                </li>
                <li className='flex items-center'>
                  <BookOpenIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>Continuous Learning and Innovation</span>
                </li>
                <li className='flex items-center'>
                  <ShieldCheckIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>Ethical and Responsible Operations</span>
                </li>
                <li className='flex items-center'>
                  <UsersIcon className='h-6 w-6 text-green-400 mr-2' />
                  <span>Community Engagement and Support</span>
                </li>
              </ul>
            </div>
            <div className='md:col-span-1'>
              <h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4'>
                Resources
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="knowledge-hub">
                  <AccordionTrigger>Knowledge Hub</AccordionTrigger>
                  <AccordionContent>
                    Access our extensive library of articles, whitepapers, and guides on environmental science, GIS technology, and sustainable practices. Stay informed about the latest industry trends and innovations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="project-showcase">
                  <AccordionTrigger>Project Showcase</AccordionTrigger>
                  <AccordionContent>
                    Explore our portfolio of successful projects, featuring detailed case studies, interactive maps, and visual presentations of our environmental and GIS solutions in action.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="educational-resources">
                  <AccordionTrigger>Educational Resources</AccordionTrigger>
                  <AccordionContent>
                    Discover our collection of webinars, tutorials, and online courses designed to enhance your understanding of environmental science and GIS technologies. Perfect for students, professionals, and lifelong learners.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="community-initiatives">
                  <AccordionTrigger>Community Initiatives</AccordionTrigger>
                  <AccordionContent>
                    Learn about our ongoing community projects, volunteer opportunities, and partnerships with local organizations. Find out how you can get involved in making a positive impact on the environment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className='mt-8 border-t border-[rgba(70,97,71,255)] pt-8 md:flex md:items-center md:justify-between'>
            <div className='flex space-x-6 md:order-2'>
              <a
                href='https://www.linkedin.com/in/ndlelenhle-zondi-3a5848245/'
                className='text-gray-400 hover:text-gray-300 transition duration-300'
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className='sr-only'>LinkedIn</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
            <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
              &copy; 2023 Namaqua Environmental. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}