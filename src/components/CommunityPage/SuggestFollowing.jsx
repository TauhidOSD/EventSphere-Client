import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const SuggestFollowing = ({ userData, refetch }) => {
    const [ showFollower , setShowFollower ] = useState(3);
    const { data: session } = useSession();
    const myEmail = session?.user?.email;
    const router = useRouter()
    // Find the current user's data using their email
    const myData = userData.find(user => user?.email === myEmail);
    
    // If myData exists, extract the followers array
    const followerEmails = myData?.followers || [];
    
    // Filter userData to get the data of users who follow the current user
    const followerData = userData.filter(user => followerEmails.includes(user.email));
    const filteredUsersWithoutYou = userData.filter(user => !user.followers.includes(myEmail));

    // handleFollow Button
    const handleFollow = async (id) => {
        if ( !myEmail) {
            toast.error("Please Login First 👊")
            return router.push('/login')
        }
        try {
          const response = await fetch(`https://event-sphare-server.vercel.app/user/handleAddFollower/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ followerEmail: myEmail }),
          });
          const data = await response.json();
      
          if (response.ok) {
            toast.success('Followed successfully!');
            refetch()
          } else {
            console.error('Error:', data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return (
        <div className="mb-20">
            <h2 className="text-lg font-bold">Suggest</h2>
            <div className="mt-1">
                {filteredUsersWithoutYou.length > 0 ? (
                    filteredUsersWithoutYou.slice(0, showFollower).map(follower => (
                        <div key={follower._id} className="p-3 border mb-1 rounded">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-x-2">
                                    <div className="rounded-full h-11 w-11 border p-[2px]">
                                        <Image src={follower?.image} height={40} width={40} alt={follower?.name} className='rounded-full h-full w-full' />
                                    </div>
                                    <div className="">
                                        <p className="font-semibold">{follower.name}</p>
                                        <p className="text-sm">{(follower.email).slice(0, 15)}...</p>
                                    </div>
                                </div>
                                <button title='Follow User' onClick={() => handleFollow(follower?._id)} className="text-blue-500">Follow</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You have no followers.</p>
                )}
                {
                    // Show the "See more" or "See less" options only if the length of filteredUsersWithoutYou is more than 3
                    filteredUsersWithoutYou.length > 3 && (
                        showFollower === 3 ? (
                            <p onClick={() => {setShowFollower(showFollower + 3)}} className='text-gray-600 mt-1 hover:text-blue-500 duration-300 cursor-pointer'>See more</p>
                        ) : (
                            <p onClick={() => {setShowFollower(showFollower - 3)}} className='text-gray-600 mt-1 hover:text-blue-500 duration-300 cursor-pointer'>See less</p>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SuggestFollowing;