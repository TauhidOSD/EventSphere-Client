import Image from "next/image";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from "react";
import { FaDollarSign } from "react-icons/fa";

import {
    MapPin,
    Building2,
    Tag,
    Clock,
    FileType,
    ArrowRight,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import FireTextTitle from "../shared/FireText";
import RotateButton from "../shared/RotateButton";
import { format } from 'date-fns';
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { Heart, Share2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../shared/LoadingSpiner/Loading';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import SectionTitle from "../shared/SectionTitle";
import SectionTitleSimple from "../shared/SectionTitleSimple";
import CardForEvents from "../allEventsPage/CardForEvents";



const InfoItem = ({ icon, text }) => {
    return (
        <div className="flex items-center   space-x-2">
            {icon}
            <span>{text}</span>
        </div>
    );
};

const PopularEvents = () => {
    const [hoverd, setHoverd] = useState(false)
    const [favorite, setFavorite] = useState([]);
    const [favoriteUpdate, setFavoriteUpdate] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // New hover state
    const axiosPublic = useAxiosPublic()


    // Data fetching using react-query
    const { data: popularEventsMax = [], isLoading, refetch } = useQuery({
        queryKey: ['popularEventsMax'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/events/popular-events');
            return data;
        },
        staleTime: 0,
        keepPreviousData: true,
    });
    console.log(popularEventsMax)
    // console.log(popularEventsMax.title)
    // console.log(popularEventsMax.price)



    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const handleAddFavorite = (id) => {
        const storedFavorites = localStorage.getItem('favorites');
        let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setFavoriteUpdate(!favoriteUpdate)
            toast.error('Removed Bookmark!')
        } else {
            favorites.push(id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setFavoriteUpdate(!favoriteUpdate)
            toast.success('Successfully Bookmarked!')
        }
    };

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        let currentFavorute = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorite(currentFavorute)
    }, [favoriteUpdate])



    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);


    // 3d card const Card3D = ({ event }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const cardVariants = {
        hover: {
            scale: 1.05,
            // scale: 1.05,
            rotateX: 0,
            rotateY: 0,
            transition: { duration: 0.3 }
        }
    };

    const contentVariants = {
        hover: { z: 50, transition: { duration: 0.3 } }
    };

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const updateMousePosition = (ev) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            x.set((ev.clientX - centerX) / 5);
            y.set((ev.clientY - centerY) / 5);
        };

        card.addEventListener('mousemove', updateMousePosition);
        card.addEventListener('mouseleave', () => {
            animate(x, 0, { duration: 0.5 });
            animate(y, 0, { duration: 0.5 });
        });

        return () => {
            card.removeEventListener('mousemove', updateMousePosition);
            card.removeEventListener('mouseleave', () => { });
        };
    }, [x, y]);

    const formatDateTime = (dateTime) => {
        let formattedDateTime = dateTime.slice(0, 10) + " " + dateTime.slice(11);

        return formattedDateTime.slice(0, 16);
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="container">
            <SectionTitleSimple title="Popular Events" subtitle="Explore the top popular events with the most booked seats, offering exciting experiences across various categories like entertainment, sports, and cultural activities, ensuring unforgettable moments for everyone."></SectionTitleSimple>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:4 2xl:6 gap-2 lg:gap-4 2xl:gap-6">
                {popularEventsMax?.map(event => <CardForEvents
                    key={event._id}
                    event={event}
                />)}

            </div>
        </div>
    );
};

export default PopularEvents;