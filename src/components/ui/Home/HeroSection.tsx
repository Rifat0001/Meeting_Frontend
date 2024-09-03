// src/Slider.tsx
import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import bg1 from '../../../assets/images/bg1.jpg';
import bg2 from '../../../assets/images/bg2.jpg';
import bg3 from '../../../assets/images/bg3.jpg';
import { GrLinkNext } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
interface Slide {
    image: string;
    heading: string;
    subheading: string;
}

const slides: Slide[] = [
    {
        image: bg1, heading: 'Comprehensive Meeting Room Solutions',
        subheading: 'Customized Spaces for Every Business Need'
    },
    {
        image: bg2, heading: 'Advanced Technology Integration',
        subheading: 'Equip Your Meetings with Cutting-Edge Audio-Visual Tools'
    },
    {
        image: bg3, heading: 'Prime Locations with Premium Amenities',
        subheading: 'Conveniently Located Venues with Full-Service Support'
    },
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full lg:h-[600px] h-[500px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-transform transform ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <div className="flex flex-col items-center space-y-4 justify-center w-full h-full bg-black bg-opacity-50">
                        <Fade delay={1e2} cascade damping={1e-1}>
                            <h1 className="text-3xl lg:text-5xl text-center font-semibold text-white">{slide.heading}</h1></Fade>
                        <p className="text-md lg:text-xl text-center text-gray-300">{slide.subheading}</p>
                        <>
                            <button className='btn bg-black font-semibold lg:px-8 lg:text-lg hover:bg-white hover:text-black
                              border-black border-2  hover:border-black text-white '>Explore <GrLinkNext /></button></>
                    </div>
                </div>
            ))}

            <button
                className="absolute left-0 z-10 flex items-center justify-center h-full px-4 text-white"
                onClick={prevSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

            </button>
            <button
                className="absolute right-0 z-10 flex items-center justify-center h-full px-4 text-white "
                onClick={nextSlide}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </button>
            <div className="absolute bottom-0 flex justify-center w-full p-2 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2  rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;