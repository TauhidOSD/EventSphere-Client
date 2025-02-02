
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import Link from 'next/link';
const sliderItems = [
  {
    image: "https://i.ibb.co.com/b6hnG5k/pexels-george-dolgikh-551816-1303086.jpg",
    title: "\"Christmas Wonderland\"",
    description: "Step into a magical world this Christmas! Enjoy holiday markets, festive lights, and seasonal cheer with family and friends."
  },
  {
    image: "https://i.ibb.co.com/gmvcxtB/pexels-wendywei-1387174.jpg",
    title: "\"Epic Concert Night\"",
    description: "Experience an unforgettable night of live performances with world-renowned artists and electrifying music. Join the crowd and feel the energy!"
  },
  {
    image: "https://i.ibb.co/tmc1PgJ/pexels-furknsaglam-1596977-3131406.jpg",
    title: "\"Championship Finals\"",
    description: "The ultimate showdown is here! Witness the best athletes compete for the title in an exhilarating game that will keep you on the edge of your seat."
  },
  {
    image: "https://i.ibb.co.com/HhgGKX8/pexels-asadphoto-169198.jpg",
    title: "\"Festival of Colors\"",
    description: "Join the vibrant celebration at the Festival of Colors, where music, art, and culture collide in a day full of fun, food, and festivities."
  },

  {
    image: "https://i.ibb.co.com/2PL7cVP/pexels-wendywei-1540343.jpg",
    title: "\"Summer Music Fest\"",
    description: "Dance the summer away at the hottest music festival! With live performances from top bands and artists, it's an event you don't want to miss."
  },
  {
    image: "https://i.ibb.co.com/YWP7BD9/pexels-tima-miroshnichenko-7991486.jpg",
    title: "\"Premiere Movie Night\"",
    description: "Grab your popcorn and get ready for the latest blockbuster release! Enjoy the cinematic experience at its best in our premium movie hall."
  }
];


export default function Banner() {
  const [items, setItems] = useState(sliderItems);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bgTransition, setBgTransition] = useState(false);
  const sliderRef = useRef(null);


  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activate = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setBgTransition(true);

    setItems(prevItems => {
      const newItems = direction === 'next'
        ? [...prevItems.slice(1), prevItems[0]]
        : [prevItems[prevItems.length - 1], ...prevItems.slice(0, -1)];

      setTimeout(() => {
        setIsAnimating(false);
        setBgTransition(false);
      }, 500);
      return newItems;
    });
  };
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        activate('next');
      }
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAnimating]);
  return (
    <div className="h-screen grid place-items-center overflow-hidden">
      <main className="relative w-full h-full shadow-[0_3px_10px_rgba(0,0,0,0.3)]">
        <ul ref={sliderRef} className="slider">
          {items.map((item, index) => (
            <li
              key={index}
              className={`item absolute top-1/2 -translate-y-1/2 z-[1] w-[200px] h-[300px]  bg-center bg-cover rounded-[20px] shadow-[0_20px_30px_rgba(255,255,255,0.3)_inset] transition-all duration-1000 ease-in-out ${index === 5 ? 'opacity-0' : 'opacity-100'
                } ${bgTransition && index === 1 ? 'animate-zoomInUp' : ''} ${index > 1 ? 'hidden-sm' : ''
                }`}
              style={{
                backgroundImage: `url(${item.image})`,
                left:
                  index === 0 || index === 1
                    ? '0'
                    : index === 2
                      ? '50%'
                      : index === 3
                        ? 'calc(50% + 220px)'
                        : index === 4
                          ? 'calc(50% + 440px)'
                          : 'calc(50% + 660px)',
                top: index === 0 || index === 1 ? '0' : '50%',
                width: index === 0 || index === 1 ? '100%' : '200px',
                height: index === 0 || index === 1 ? '100%' : '300px',
                transform: index === 0 || index === 1 ? 'none' : 'translateY(-50%)',
                borderRadius: index === 0 || index === 1 ? '0' : '30px',
                boxShadow:
                  index === 0 || index === 1 ? 'none' : '0 20px 30px rgba(255,255,255,0.3) inset',
              }}
            >
              {index === 1 && (
                <div className="absolute inset-[0px] bg-black  bg-opacity-50 " />
              )}
               

              <div
                className={`bg-opacity-30  bg-gray-900 backdrop-blur-[2px] p-4 lg:p-6 rounded-2xl text-lime-100 transform absolute top-1/2 m-2 lg:left-20 -translate-y-1/2 md:w-60 lg:w-1/3 text-shadow-[0_3px_8px_rgba(0,0,0,0.5)] transition-opacity duration-500 ${index === 1 ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <h2 className="text-xl md:text-3xl md:font-['arial-black'] md:uppercase">
                  {item.title}
                </h2>
                <p className="text-white my-2 text-sm">{item.description}</p>
                <div className="ml-2">
                  <Link className="button" href="/events">
                    All Events
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <nav className="nav absolute flex gap-4 bottom-10 md:bottom-24 left-1/2 -translate-x-1/2 z-[5] select-none">
          <ArrowLeftIcon
            className="w-9 h-9 text-white rounded-full cursor-pointer transition-all duration-300 bg-[#1b85db] hover:bg-[#10a0b9]"
            onClick={() => activate('prev')}
          />
          <ArrowRightIcon
            className="w-9 h-9 text-white rounded-full cursor-pointer transition-all duration-300 bg-[#1b85db] hover:bg-[#10a0b9]"
            onClick={() => activate('next')}
          />
        </nav>
      </main>
      <style jsx>{`
      /* Animation styles */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }
      @keyframes zoomInUp {
        from {
          opacity: 0;
          transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
          animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        60% {
          opacity: 1;
          transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
          animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
        }
        to {
          opacity: 1;
          transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
        }
      }
      .content {
        animation: fadeIn 0.5s ease-out;
      }
      .item:not(:nth-child(1)):not(:nth-child(2)) {
        transition: all 1s ease-in-out;
      }
      .item:nth-child(1) {
        animation: fadeOut 0.5s ease-in forwards;
      }
      .item:nth-child(2) .content {
        animation: fadeIn 0.5s ease-out 0.25s forwards;
      }
  

      /* Small devices styling */
      @media (max-width: 640px) {
        .hidden-sm {
          display: none;
        }
        .item:first-child {
          width: 100%;
          height: 100%;
          border-radius: 0;
          box-shadow: none;
        }
      }
    `}</style>
    </div>
  );
}
