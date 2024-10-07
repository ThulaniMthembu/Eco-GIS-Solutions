"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  GlobeIcon,
  MenuIcon,
  XIcon,
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
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

gsap.registerPlugin(ScrollToPlugin)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const servicesRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const videos = [
    {
      src: '/videos/video1.mp4',
      h1: 'Eco GIS Solutions',
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
        return () => clearTimeout(timer) // Cleanup function
      } else {
        currentVideo.pause()
      }
    }
    return undefined
  }, [currentVideoIndex, isPlaying, videos.length])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      document.body.style.overflow = 'unset'
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
      })
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      document.querySelectorAll('.fade-in-section').forEach((element) => {
        const elementPosition = (element as HTMLElement).offsetTop
        const elementHeight = (element as HTMLElement).offsetHeight

        if (
          scrollPosition >
          elementPosition - windowHeight + elementHeight / 2
        ) {
          element.classList.add('fade-in')
        } else {
          element.classList.remove('fade-in')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
        if (href && href !== '#') {
          const target = document.querySelector(href)
          if (target) {
            gsap.to(window, {
              duration: 1,
              scrollTo: target,
              ease: 'power2.inOut',
            })
          }
        }
      })
    })
  }, [])

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (hamburgerRef.current) {
      gsap.to(hamburgerRef.current, {
        rotation: isMenuOpen ? 0 : 90,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    gsap.to(window, {
      duration: 1,
      scrollTo: 0,
      ease: 'power2.inOut',
    })
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 text-gray-900'>
      <header className='fixed top-0 left-0 right-0 z-50 bg-[rgba(46,73,47,255)] text-white'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            <div className='flex items-center'>
              <Link href='/' className='flex-shrink-0' onClick={scrollToTop}>
                <Image
                  src='/images/logo-cut.png'
                  alt='Eco GIS Solutions Logo'
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
                className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[rgba(70,97,71,255)] focus:outline-none transition-colors duration-300'
                aria-expanded={isMenuOpen}
              >
                <span className='sr-only'>Open main menu</span>
                {isMenuOpen ? (
                  <XIcon className='block h-6 w-6' aria-hidden='true' />
                ) : (
                  <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                )}
              </button>
            </div>
          </div>
        </nav>

        <div
          ref={mobileMenuRef}
          className='fixed inset-0 bg-[rgba(46,73,47,255)] z-50 transform transition-transform duration-300 ease-in-out translate-x-full'
        >
          <div className='flex flex-col h-full justify-start pt-20 px-4'>
            <button
              onClick={toggleMenu}
              className='absolute top-4 right-4 text-white'
              aria-label='Close menu'
            >
              <XIcon className='h-8 w-8' />
            </button>
            <div className='space-y-4 text-left'>
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
        </div>
      </header>

      <main className='flex-grow pt-20'>
        <section className='relative bg-gray-900 h-screen'>
          <div className='absolute inset-0 overflow-hidden'>
            {videos.map((video, index) => (
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
                  <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center text-green-400 animate-zoom-in-up'>
                    {video.h1}
                  </h1>
                  <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center animate-zoom-in-up animation-delay-300'>
                    {video.h2}
                  </h2>
                  <p className='text-xl sm:text-2xl max-w-2xl text-center leading-relaxed animate-zoom-in-up animation-delay-600'>
                    {video.text}
                  </p>
                  <div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center animate-zoom-in-up animation-delay-900'>
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
                  </div>
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
            <div className='lg:text-center fade-in-section'>
              <h2 className='text-base text-green-600 font-semibold tracking-wide uppercase'>
                Services
              </h2>
              <p className='mt-2 text-3xl leading-8 font-ext rabold tracking-tight text-gray-900 sm:text-4xl'>
                Our Expertise
              </p>
              <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto leading-relaxed'>
                We offer a comprehensive range of services to help you achieve
                sustainable environmental practices and leverage innovative GIS
                technologies.
              </p>
            </div>

            <div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section transform transition duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <ClipboardCheckIcon className='h-8 w-8 text-green-500 mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>
                      Environmental Impact Assessments (EIA)
                    </h3>
                  </div>
                  <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                    Comprehensive assessments to evaluate the potential
                    environmental effects of proposed projects, ensuring
                    compliance and sustainability.
                  </p>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section transform transition duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <MapIcon className='h-8 w-8 text-green-500 mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>
                      Site Assessments
                    </h3>
                  </div>
                  <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                    Detailed evaluations of land and environmental conditions to
                    inform project planning and ensure regulatory compliance.
                  </p>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section transform transition duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <ClipboardCheckIcon className='h-8 w-8 text-green-500 mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>
                      Regulatory Compliance
                    </h3>
                  </div>
                  <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                    Expert guidance on meeting local, national, and
                    international environmental regulations and standards.
                  </p>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section transform transition duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <GlobeIcon className='h-8 w-8 text-green-500 mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>
                      GIS Mapping
                    </h3>
                  </div>
                  <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                    Creation of detailed maps for environmental analysis, land
                    use planning, and resource management using cutting-edge GIS
                    technology.
                  </p>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section transform transition duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <BarChartIcon className='h-8 w-8 text-green-500 mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>
                      Spatial Analysis
                    </h3>
                  </div>
                  <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                    Utilizing advanced GIS technology to analyze spatial data,
                    supporting informed decision-making and strategic planning.
                  </p>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section transform transition duration-300 hover:scale-105 hover:shadow-xl'>
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <BarChartIcon className='h-8 w-8 text-green-500 mr-3' />
                    <h3 className='text-xl font-medium text-gray-900'>
                      Data Visualization
                    </h3>
                  </div>
                  <p className='text-base text-gray-500 mb-4 leading-relaxed'>
                    Development of clear and impactful visual representations of
                    data to effectively communicate findings and support project
                    objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='about' className='py-12 bg-gray-100'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='lg:text-center fade-in-section'>
              <h2 className='text-base text-green-600 font-semibold tracking-wide uppercase'>
                About Us
              </h2>
              <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
                Our Mission and Values
              </p>
            </div>
            <div className='mt-10'>
              <div className='prose prose-lg mx-auto text-gray-500'>
                <p className='mb-6 flex items-start'>
                  <Leaf className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>At Eco GIS Solutions, we are passionate about creating
                    sustainable solutions through innovative Environmental Science
                    and Geographic Information Systems (GIS) technologies.</strong> With a
                    strong focus on environmental monitoring, land management, and
                    geospatial analysis, we offer cutting-edge tools and services
                    to help our clients make informed, data-driven decisions.
                  </span>
                </p>
                <p className='mb-6 flex items-start'>
                  <Users className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>Our team of environmental scientists, GIS experts, and soil
                    specialists brings years of experience in solving complex
                    environmental challenges.</strong> From monitoring air and water quality
                    to assessing land use and ecological health, we integrate
                    advanced mapping, Earth observation, and data analytics to
                    support industries, governments, and conservation projects.
                  </span>
                </p>
                <p className='mb-6 flex items-start'>
                  <GlobeIcon className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>Driven by a commitment to sustainability, we aim to empower
                    businesses to reduce their environmental impact</strong> while
                    optimizing land use, agriculture, and natural resource
                    management. We believe that through innovation and
                    collaboration, we can shape a future where both nature and
                    communities thrive.
                  </span>
                </p>
                <p className='mb-6 flex items-start'>
                  <Lightbulb className='h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
                  <span>
                    <strong>Let us help you make smarter, greener decisions with the power
                    of GIS and environmental science.</strong>
                  </span>
                </p>
              </div>
            </div>

            <div className='mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8'>
              <div className='text-center'>
                <div className='flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto'>
                  <BarChart2 className='h-6 w-6' />
                </div>
                <h3 className='mt-2 text-lg font-medium text-gray-900'>Data Analysis</h3>
              </div>
              <div className='text-center'>
                <div className='flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto'>
                  <Droplet className='h-6 w-6' />
                </div>
                <h3 className='mt-2 text-lg font-medium text-gray-900'>Water Management</h3>
              </div>
              <div className='text-center'>
                <div className='flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto'>
                  <Mountain className='h-6 w-6' />
                </div>
                <h3 className='mt-2 text-lg font-medium text-gray-900'>Land Conservation</h3>
              </div>
              <div className='text-center'>
                <div className='flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto'>
                  <Sprout className='h-6 w-6' />
                </div>
                <h3 className='mt-2 text-lg font-medium text-gray-900'>Sustainable Growth</h3>
              </div>
            </div>
          </div>
        </section>

        <section className='py-12 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='relative overflow-hidden rounded-lg shadow-lg'>
                <Image
                  src='/images/image5.jpg'
                  alt='Environmental Project'
                  width={600}
                  height={400}
                  className='object-cover w-full h-full'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                  <p className='text-white text-2xl font-bold'>Environmental Project</p>
                </div>
              </div>
              <div className='relative overflow-hidden rounded-lg shadow-lg'>
                <Image
                  src='/images/image4.jpg'
                  alt='GIS Mapping'
                  width={600}
                  height={400}
                  className='object-cover w-full h-full'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                  <p className='text-white text-2xl font-bold'>GIS Mapping</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='contact' className='py-12 bg-gray-100'>
          <div className='container mx-auto px-4'>
            <div className='max-w-7xl mx-auto'>
              <div className='text-center mb-12 fade-in-section'>
                <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
                  Get in Touch
                </h2>
                <p className='mt-4 text-xl text-gray-500 leading-relaxed'>
                  We&apos;d love to hear from you. Send us a message and
                  we&apos;ll respond as soon as possible.
                </p>
              </div>
              <div className='flex flex-col md:flex-row gap-8'>
                <div className='md:w-1/2 fade-in-section'>
                  <div className='bg-white rounded-lg shadow-lg p-8'>
                    <h3 className='text-2xl font-semibold text-gray-900 mb-6'>
                      Contact Us
                    </h3>
                    <form className='space-y-6'>
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
                          required
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type='submit'
                          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300'
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='md:w-1/2 fade-in-section'>
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
                        Ndlelenhle Zondi - CEO
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
                        info@namaqualand.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                  <span>Ndlelenhle Zondi - CEO</span>
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
                  <span>info@namaqualand.com</span>
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
              </ul>
            </div>
            <div className='md:col-span-1'>
              <h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4'>
                Resources
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="blog">
                  <AccordionTrigger>Blog</AccordionTrigger>
                  <AccordionContent>
                    Insights and articles on environmental science and GIS technology.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="case-studies">
                  <AccordionTrigger>Case Studies</AccordionTrigger>
                  <AccordionContent>
                    Real-world examples of our environmental and GIS projects.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="research">
                  <AccordionTrigger>Research</AccordionTrigger>
                  <AccordionContent>
                    Our latest findings and contributions to environmental science.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="environmental-reports">
                  <AccordionTrigger>Environmental Reports</AccordionTrigger>
                  <AccordionContent>
                    Detailed reports on various environmental assessments and studies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className='mt-8 border-t border-[rgba(70,97,71,255)] pt-8 md:flex md:items-center md:justify-between'>
            <div className='flex space-x-6 md:order-2'>
              <a
                href='#'
                className='text-gray-400 hover:text-gray-300 transition duration-300'
              >
                <span className='sr-only'>Facebook</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-gray-300 transition duration-300'
              >
                <span className='sr-only'>Twitter</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-gray-300 transition duration-300'
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
              &copy; 2023 Eco GIS Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}