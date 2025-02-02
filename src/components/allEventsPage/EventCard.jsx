import { LucideFileType2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaShareAlt, FaClock, FaMapMarkerAlt, FaTag, FaUserFriends, FaBuilding } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the required styles

const EventCard = ({ event }) => {
    const [cartItems, setCartItems] = useState([]);

    const shareEvent = (event) => {
        toast.info(`Sharing options for ${event.title}`);
    };

    // Add to cart and share event functionality
    const addToCart = (event) => {
        setCartItems([...cartItems, event]);
        toast.success(`${event.title} added to cart!`);
    };

    return (
        <div>
            {/* Toast container to show toasts */}
            <ToastContainer />
            <div className="relative group rounded-lg overflow-hidden shadow-lg bg-white m-4 ">
                <Image
                    src={event?.gallery[0]}
                    alt={event?.title}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />

                {/* Love and Share Icons - visible on hover */}
                <div className="absolute top-36 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
                        onClick={() => {
                            addToCart(event);
                            toast.success(`${event.title} added to cart!`);
                        }}
                    >
                        <FaHeart />
                    </button>
                    <button
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
                        onClick={() => {
                            shareEvent(event);
                            toast.info('Sharing options opened!');
                        }}
                    >
                        <FaShareAlt />
                    </button>
                </div>

                <div className="p-4">
                    <h2 className="text-xl font-bold">{event?.title}</h2>
                    <div className="flex items-center text-gray-700 my-1">
                        <FaClock className="mr-2" />
                        <p>{event.dateTime}</p>
                    </div>

                    <div className="flex items-center text-gray-600 my-1">
                        <FaMapMarkerAlt className="mr-2" />
                        <p>{event.location.country},{event.location.city}</p>

                    </div>
                    <div>
                        <div className="flex items-center text-gray-600 my-1">
                            <LucideFileType2 className="mr-2" />
                            <p>type: {event.type} </p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 my-1">
                        <FaTag className="mr-2" />
                        <p>category: {event.category}</p>
                    </div>
                    <div className="my-2">
                        {event.tags?.map((tag, index) => (
                            <span key={index} className="inline-block bg-blue-500 text-white text-xs  rounded-full px-1 py-1 mr-1 mb-4">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className='flex justify-between items-center'>

                        <button className="bg-[--color-primary] text-white py-2 px-8 rounded-lg hover:bg-green-600 transition">
                            ${event.price}
                        </button>
                        <button className="bg-[--color-primary] text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                            Buy Ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
