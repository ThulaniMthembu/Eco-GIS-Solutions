'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
	ArrowRightIcon,
	BeakerIcon,
	GlobeIcon,
	BrainIcon,
	MenuIcon,
	XIcon,
	PlayIcon,
	PauseIcon,
	ClipboardCheckIcon,
	MapIcon,
	BarChartIcon,
	LeafIcon,
	RecycleIcon,
	PhoneIcon,
	MailIcon,
	MapPinIcon,
	BookOpenIcon,
	UsersIcon,
	ShieldCheckIcon,
	AwardIcon,
	ChevronDownIcon,
	StarIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from 'lucide-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
	const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
	const servicesRef = useRef<HTMLDivElement>(null);
	const photosRef = useRef<HTMLDivElement>(null);
	const testimonialsRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const servicesDropdownRef = useRef<HTMLDivElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);

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
	];

	const testimonials = [
    {
      name: "Emily",
      role: "Environmental Scientist",
      company: "EcoTech Research",
      image: "/images/Emily.jpg",
      quote: "Eco GIS Solutions provided invaluable insights for our climate change research. Their advanced spatial analysis techniques helped us identify critical areas for conservation efforts."
    },
    {
      name: "Jane",
      role: "Urban Planner",
      company: "GreenCity Developments",
      image: "/images/jane.jpg",
      quote: "Working with Eco GIS Solutions transformed our approach to sustainable urban planning. Their detailed GIS mapping and environmental impact assessments were crucial to our project's success."
    },
    {
      name: "Mike",
      role: "Conservation Manager",
      company: "Wildlife Protection Alliance",
      image: "/images/Mike.jpg",
      quote: "The team at Eco GIS Solutions went above and beyond in our habitat restoration project. Their expertise in GIS technology and environmental analysis was instrumental in our conservation efforts."
    },
    {
      name: "Swazi",
      role: "Sustainability Director",
      company: "EcoAfrica Initiatives",
      image: "/images/Swazi.jpg",
      quote: "Eco GIS Solutions' data visualization capabilities helped us effectively communicate complex environmental data to stakeholders. Their work was key in gaining support for our renewable energy projects."
    },
    {
      name: "Thwala",
      role: "Environmental Policy Advisor",
      company: "National Environmental Agency",
      image: "/images/Thwala.jpg",
      quote: "The insights provided by Eco GIS Solutions significantly enhanced our environmental policy-making process. Their comprehensive spatial analysis and GIS mapping informed critical decisions for our national conservation strategies."
    }
  ];


	useEffect(() => {
		const currentVideo = videoRefs.current[currentVideoIndex];
		if (currentVideo) {
			if (isPlaying) {
				currentVideo.play();
				setTimeout(() => {
					setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
				}, 8000); // Change video every 8 seconds
			} else {
				currentVideo.pause();
			}
		}
	}, [currentVideoIndex, isPlaying, videos.length]);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				servicesDropdownRef.current &&
				!servicesDropdownRef.current.contains(event.target as Node)
			) {
				setIsServicesDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
			gsap.to(mobileMenuRef.current, {
				x: '0%',
				duration: 0.5,
				ease: 'power2.out',
			});
		} else {
			document.body.style.overflow = 'unset';
			gsap.to(mobileMenuRef.current, {
				x: '100%',
				duration: 0.5,
				ease: 'power2.in',
			});
		}
	}, [isMenuOpen]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const windowHeight = window.innerHeight;

			document.querySelectorAll('.fade-in-section').forEach((element) => {
				const elementPosition = (element as HTMLElement).offsetTop;
				const elementHeight = (element as HTMLElement).offsetHeight;

				if (
					scrollPosition >
					elementPosition - windowHeight + elementHeight / 2
				) {
					element.classList.add('fade-in');
				} else {
					element.classList.remove('fade-in');
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		// Smooth scrolling
		const links = document.querySelectorAll('a[href^="#"]');
		links.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const target = document.querySelector(
					(e.currentTarget as HTMLAnchorElement).getAttribute('href') as string
				);
				if (target) {
					gsap.to(window, {
						duration: 1,
						scrollTo: target,
						ease: 'power2.inOut',
					});
				}
			});
		});
	}, []);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const nextTestimonial = () => {
		setCurrentTestimonialIndex(
			(prevIndex) => (prevIndex + 1) % testimonials.length
		);
	};

	const prevTestimonial = () => {
		setCurrentTestimonialIndex(
			(prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
		);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		if (hamburgerRef.current) {
			gsap.to(hamburgerRef.current, {
				rotation: isMenuOpen ? 0 : 90,
				duration: 0.3,
				ease: 'power2.inOut',
			});
		}
	};

	return (
		<div className='flex flex-col min-h-screen bg-gray-100 text-gray-900'>
			<header className='fixed top-0 left-0 right-0 z-50 bg-green-800 text-white'>
				<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						<div className='flex items-center'>
							<Link href='/' className='flex-shrink-0'>
								<span className='text-2xl font-bold text-green-300'>
									Eco GIS Solutions
								</span>
							</Link>
						</div>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-baseline space-x-4'>
								<Link
									href='/'
									className='text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
								>
									Home
								</Link>
								<div className='relative group' ref={servicesDropdownRef}>
									<button
										onClick={() =>
											setIsServicesDropdownOpen(!isServicesDropdownOpen)
										}
										className='text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out flex items-center'
									>
										Services
										<ChevronDownIcon className='ml-1 h-4 w-4' />
									</button>
									{isServicesDropdownOpen && (
										<div className='absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
											<div
												className='py-1'
												role='menu'
												aria-orientation='vertical'
												aria-labelledby='options-menu'
											>
												<Link
													href='#services'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
													role='menuitem'
													onClick={() => setIsServicesDropdownOpen(false)}
												>
													Environmental Impact Assessments
												</Link>
												<Link
													href='#services'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
													role='menuitem'
													onClick={() => setIsServicesDropdownOpen(false)}
												>
													Site Assessments
												</Link>
												<Link
													href='#services'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
													role='menuitem'
													onClick={() => setIsServicesDropdownOpen(false)}
												>
													Regulatory Compliance
												</Link>
												<Link
													href='#services'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
													role='menuitem'
													onClick={() => setIsServicesDropdownOpen(false)}
												>
													GIS Mapping
												</Link>
												<Link
													href='#services'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
													role='menuitem'
													onClick={() => setIsServicesDropdownOpen(false)}
												>
													Spatial Analysis
												</Link>
												<Link
													href='#services'
													className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
													role='menuitem'
													onClick={() => setIsServicesDropdownOpen(false)}
												>
													Data Visualization
												</Link>
											</div>
										</div>
									)}
								</div>
								<Link
									href='#about'
									className='text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
								>
									About
								</Link>
								<Link
									href='#contact'
									className='text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
								>
									Contact
								</Link>
								<Link
									href='/news'
									className='text-gray-300 hover:bg-green-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out'
								>
									News
								</Link>
							</div>
						</div>
						<div className='md:hidden'>
							<button
								ref={hamburgerRef}
								onClick={toggleMenu}
								className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-green-700 focus:outline-none transition-colors duration-300'
								aria-expanded='false'
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
					className='fixed inset-0 bg-green-800 z-50 transform transition-transform duration-300 ease-in-out translate-x-full'
				>
					<div className='flex flex-col h-full justify-center items-center'>
						<button
							onClick={toggleMenu}
							className='absolute top-4 right-4 text-white'
						>
							<XIcon className='h-8 w-8' />
						</button>
						<div className='space-y-8 text-center'>
							<Link
								href='/'
								className='block text-white text-2xl hover:text-green-300 transition-colors duration-300'
								onClick={toggleMenu}
							>
								Home
							</Link>
							<Link
								href='#services'
								className='block text-white text-2xl hover:text-green-300 transition-colors duration-300'
								onClick={toggleMenu}
							>
								Services
							</Link>
							<Link
								href='#about'
								className='block text-white text-2xl hover:text-green-300 transition-colors duration-300'
								onClick={toggleMenu}
							>
								About
							</Link>
							<Link
								href='#contact'
								className='block text-white text-2xl hover:text-green-300 transition-colors duration-300'
								onClick={toggleMenu}
							>
								Contact
							</Link>
							<Link
								href='/news'
								className='block text-white text-2xl hover:text-green-300 transition-colors duration-300'
								onClick={toggleMenu}
							>
								News
							</Link>
						</div>
					</div>
				</div>
			</header>

			<main className='flex-grow pt-16'>
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
											videoRefs.current[index] = el;
										}
									}}
									src={video.src}
									className='absolute inset-0 w-full h-full object-cover'
									muted
									playsInline
								/>
								<div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4 sm:px-6 lg:px-8'>
									<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center text-green-400 animate-fade-in-out'>
										{video.h1}
									</h1>
									<h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center'>
										{video.h2}
									</h2>
									<p className='text-xl sm:text-2xl max-w-2xl text-center leading-relaxed'>
										{video.text}
									</p>
									<div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
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
							<p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
								Our Expertise
							</p>
							<p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto leading-relaxed'>
								We offer a comprehensive range of services to help you achieve
								sustainable environmental practices and leverage innovative GIS
								technologies.
							</p>
						</div>

						<div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
							<div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section'>
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
									<Link
										href='/services/eia'
										className='inline-flex items-center text-green-600 hover:text-green-500 transition-colors duration-300'
									>
										Read more <ArrowRightIcon className='ml-2 h-4 w-4' />
									</Link>
								</div>
							</div>

							<div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section'>
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
									<Link
										href='/services/site-assessments'
										className='inline-flex items-center text-green-600 hover:text-green-500 transition-colors duration-300'
									>
										Read more <ArrowRightIcon className='ml-2 h-4 w-4' />
									</Link>
								</div>
							</div>

							<div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section'>
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
									<Link
										href='/services/regulatory-compliance'
										className='inline-flex items-center text-green-600 hover:text-green-500 transition-colors duration-300'
									>
										Read more <ArrowRightIcon className='ml-2 h-4 w-4' />
									</Link>
								</div>
							</div>

							<div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section'>
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
									<Link
										href='/services/gis-mapping'
										className='inline-flex items-center text-green-600 hover:text-green-500 transition-colors duration-300'
									>
										Read more <ArrowRightIcon className='ml-2 h-4 w-4' />
									</Link>
								</div>
							</div>

							<div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section'>
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
									<Link
										href='/services/spatial-analysis'
										className='inline-flex items-center text-green-600 hover:text-green-500 transition-colors duration-300'
									>
										Read more <ArrowRightIcon className='ml-2 h-4 w-4' />
									</Link>
								</div>
							</div>

							<div className='bg-white rounded-lg shadow-lg overflow-hidden service-item fade-in-section'>
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
									<Link
										href='/services/data-visualization'
										className='inline-flex items-center text-green-600 hover:text-green-500 transition-colors duration-300'
									>
										Read more <ArrowRightIcon className='ml-2 h-4 w-4' />
									</Link>
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
							<div className='space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10'>
								<div className='relative fade-in-section'>
									<div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white'>
										<LeafIcon className='h-6 w-6' aria-hidden='true' />
									</div>
									<p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
										Environmental Preservation
									</p>
									<p className='mt-2 ml-16 text-base text-gray-500 leading-relaxed'>
										We are committed to preserving and protecting our
										environment for future generations.
									</p>
								</div>

								<div className='relative fade-in-section'>
									<div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white'>
										<RecycleIcon className='h-6 w-6' aria-hidden='true' />
									</div>
									<p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
										Sustainability
									</p>
									<p className='mt-2 ml-16 text-base text-gray-500 leading-relaxed'>
										Our solutions are designed with long-term sustainability in
										mind, balancing ecological and economic needs.
									</p>
								</div>

								<div className='relative fade-in-section'>
									<div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white'>
										<BrainIcon className='h-6 w-6' aria-hidden='true' />
									</div>
									<p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
										Innovation
									</p>
									<p className='mt-2 ml-16 text-base text-gray-500 leading-relaxed'>
										We leverage cutting-edge technologies to provide innovative
										solutions to environmental challenges.
									</p>
								</div>
							</div>
						</div>

						<div
							className='mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4'
							ref={photosRef}
						>
							<div className='relative overflow-hidden rounded-lg shadow-lg group photo-item fade-in-section'>
								<Image
									src='/images/image2.jpg'
									alt='Our Team'
									width={300}
									height={200}
									className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-green-800 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<p className='text-white text-center font-semibold'>
										Our Team
									</p>
								</div>
							</div>
							<div className='relative overflow-hidden rounded-lg shadow-lg group photo-item fade-in-section'>
								<Image
									src='/images/image3.jpg'
									alt='Our Office'
									width={300}
									height={200}
									className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-green-800 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<p className='text-white text-center font-semibold'>
										Our Office
									</p>
								</div>
							</div>
							<div className='relative overflow-hidden rounded-lg shadow-lg group photo-item fade-in-section'>
								<Image
									src='/images/image1.jpg'
									alt='In the Field'
									width={300}
									height={200}
									className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
								/>
								<div className='absolute inset-0 bg-green-800 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
									<p className='text-white text-center font-semibold'>
										In the Field
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

        <section className="py-12 bg-white" ref={testimonialsRef}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:text-center mb-8 fade-in-section">
      <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
        Testimonials
      </h2>
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        What Our Clients Say
      </p>
    </div>
    <div className="mt-10 relative fade-in-section">
      <div className="bg-green-50 rounded-lg shadow-md p-6 testimonial-item">
        <div className="flex items-center mb-4">
          <Image
            className="h-12 w-12 rounded-full object-cover"
            src={testimonials[currentTestimonialIndex].image}
            alt={testimonials[currentTestimonialIndex].name}
            width={48}
            height={48}
          />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {testimonials[currentTestimonialIndex].name}
            </h3>
            <p className="text-sm text-gray-500">
              {testimonials[currentTestimonialIndex].role} at {testimonials[currentTestimonialIndex].company}
            </p>
          </div>
        </div>
        <p className="text-gray-600 italic leading-relaxed">
          {testimonials[currentTestimonialIndex].quote}
        </p>
        <div className="mt-4 flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevTestimonial}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextTestimonial}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
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
													className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
													placeholder='Enter your name'
													type='text'
													id='name'
													required
												/>
											</div>
											<div>
												<label
													className='block text-sm font-medium text-gray-700'
													htmlFor='email'
												>
													Your Email
												</label>
												<input
													className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
													placeholder='Enter your email'
													name='email'
													id='email'
													type='email'
													required
												/>
											</div>
											<div>
												<label
													className='block text-sm font-medium text-gray-700'
													htmlFor='message'
												>
													Your Message
												</label>
												<textarea
													className='mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm'
													rows={4}
													placeholder='Enter your message'
													name='message'
													id='message'
													required
												></textarea>
											</div>
											<button
												className='w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300'
												type='submit'
											>
												Send Message
											</button>
										</form>
									</div>
								</div>
								<div className='md:w-1/2 fade-in-section'>
									<div className='bg-white rounded-lg shadow-lg overflow-hidden'>
										<div className='h-96 relative'>
											<iframe
												src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.947088839418!2d20.66181526273364!3d-32.39378002433524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c2cea62e775125f%3A0x5b05ec1782c20b22!2s96%20Piet%20Retief%20St%2C%20Sutherland%2C%206920!5e0!3m2!1sen!2sza!4v1728115928326!5m2!1sen!2sza'
												width='100%'
												height='100%'
												style={{ border: 0 }}
												allowFullScreen
												loading='lazy'
												referrerPolicy='no-referrer-when-downgrade'
											></iframe>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer className='bg-green-800 text-white'>
				<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
					<div className='xl:grid xl:grid-cols-3 xl:gap-8'>
						<div className='grid grid-cols-2 gap-8 xl:col-span-2'>
							<div className='md:grid md:grid-cols-2 md:gap-8'>
								<div>
									<h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase'>
										Services
									</h3>
									<ul className='mt-4 space-y-4'>
										<li>
											<a
												href='#'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												Environmental Consulting
											</a>
										</li>
										<li>
											<a
												href='#'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												GIS Mapping
											</a>
										</li>
										<li>
											<a
												href='#'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												Spatial Analysis
											</a>
										</li>
										<li>
											<a
												href='#'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												Data Visualization
											</a>
										</li>
									</ul>
								</div>
								<div className='mt-12 md:mt-0'>
									<h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase'>
										Company
									</h3>
									<ul className='mt-4 space-y-4'>
										<li>
											<a
												href='#'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												About
											</a>
										</li>
										<li>
											<a
												href='#'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												Contact
											</a>
										</li>
										<li>
											<a
												href='/news'
												className='text-base text-gray-300 hover:text-white transition duration-300'
											>
												News
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className='md:grid md:grid-cols-2 md:gap-8'>
								<div>
									<h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase'>
										Resources
									</h3>
									<ul className='mt-4 space-y-4'>
										<li>
											<a
												href='#'
												className='flex items-center text-base text-gray-300 hover:text-white transition duration-300'
											>
												<BookOpenIcon className='h-5 w-5 mr-2' />
												Blog
											</a>
										</li>
										<li>
											<a
												href='#'
												className='flex items-center text-base text-gray-300 hover:text-white transition duration-300'
											>
												<UsersIcon className='h-5 w-5 mr-2' />
												Case Studies
											</a>
										</li>
										<li>
											<a
												href='#'
												className='flex items-center text-base text-gray-300 hover:text-white transition duration-300'
											>
												<BeakerIcon className='h-5 w-5 mr-2' />
												Research
											</a>
										</li>
									</ul>
								</div>
								<div className='mt-12 md:mt-0'>
									<h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase'>
										Legal
									</h3>
									<ul className='mt-4 space-y-4'>
										<li>
											<a
												href='#'
												className='flex items-center text-base text-gray-300 hover:text-white transition duration-300'
											>
												<ShieldCheckIcon className='h-5 w-5 mr-2' />
												Privacy Policy
											</a>
										</li>
										<li>
											<a
												href='#'
												className='flex items-center text-base text-gray-300 hover:text-white transition duration-300'
											>
												<AwardIcon className='h-5 w-5 mr-2' />
												Terms of Service
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='mt-8 xl:mt-0'>
							<h3 className='text-sm font-semibold text-gray-200 tracking-wider uppercase'>
								Contact Information
							</h3>
							<ul className='mt-4 space-y-4'>
								<li className='flex items-center'>
									<MapPinIcon className='h-6 w-6 text-green-400 mr-2' />
									<span>96 Piet Retief Street, Sutherland Northern Cape</span>
								</li>
								<li className='flex items-center'>
									<PhoneIcon className='h-6 w-6 text-green-400 mr-2' />
									<span>+27 123 456 789</span>
								</li>
								<li className='flex items-center'>
									<MailIcon className='h-6 w-6 text-green-400 mr-2' />
									<span>info@ecogissolutions.com</span>
								</li>
							</ul>
						</div>
					</div>
					<div className='mt-8 border-t border-green-700 pt-8 md:flex md:items-center md:justify-between'>
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
	);
}
