"use client"
import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
// import { useRouter } from 'next/router';

const QualityCheckoutForm = ({ quality }) => {
    // console.log(quality)
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const session = useSession();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false);

console.log(quality.price)
    useEffect(() => {
        if (quality?.price > 0) {
          const createPaymentIntent = async () => {
            try {
              const res = await axiosPublic.post('/payment-stripe', { price: quality?.price });
              console.log('Response Data:', res.data);
              console.log('Client Secret:', res.data.clientSecret);
              setClientSecret(res.data.clientSecret);
            } catch (err) {
              console.error("Error creating payment intent:", err);
            }
          };
          createPaymentIntent();
        }
      }, [axiosPublic, quality?.price]);
      


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || isProcessing) {
            return;
        }
        setIsProcessing(true);

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        try {
            if (!clientSecret) {
                console.error("Client secret is missing");
                setError("Client secret is missing");
                setIsProcessing(false);
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            });

            if (error) {
                console.log('Payment error', error);
                setError(error.message);
                setIsProcessing(false);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                console.log('Confirm error', confirmError);
                setError(confirmError.message);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const subscribeInfo = {
                    bg: quality?.BG,
                    coupon:quality?.coupon,
                    price:quality?.price,
                    benefits:quality?.benefits,
                    validity:quality?.validity,
                    type:quality?.type,
                    bookedUserName: session?.data?.user?.name,
                    bookedUserPhoto: session?.data?.user?.image,
                    bookedUserEmail: session?.data?.user?.email,
                    transitionId: paymentIntent.id,
                };


                const res = await axiosPublic.post('/subscribe',subscribeInfo);
                console.log('Payment saved', res.data);


                if (res.data?.success && res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `Thanks you for buy ${quality?.type} packages`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    elements.getElement(CardElement).clear();
                  

                    router.push(`/card-payment?transitionId=${paymentIntent.id}`);
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to save payment. Please try again.",
                        showConfirmButton: true,
                    });
                }
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
            setError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };


    return (
        <div className='flex flex-col lg:flex-row '>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md lg:w-2/3"
            >
                <p className="text-4xl font-bold mb-4 text-blue-500 for payment getway">Please provide your info</p>



                {/* Stripe Card Element */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Card Information</label>
                    <CardElement
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                            hidePostalCode: false,
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className={`w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition duration-300 ${isProcessing ? "cursor-not-allowed opacity-50" : ""
                        }`}
                >
                    {isProcessing ? "Processing..." : `Pay ${quality?.price}$`}
                </button>

                {error && <div className="text-red-600 mt-2">{error}</div>}
                {success && <div className="text-green-600 mt-2">{success}</div>}
            </form>

            <div className="lg:w-1/3 pl-6">
                <Image
                    src='https://cdn-icons-png.flaticon.com/512/5790/5790705.png'
                    alt='payment image'
                    height={200}
                    width={200}
                    className='w-72 h-48 ' />
                <p className=" font-bold mt-4 font-mono ">Secure payment ensures data protection, encryption, and fraud prevention</p>
            </div>
        </div>

    );
};

export default QualityCheckoutForm;
