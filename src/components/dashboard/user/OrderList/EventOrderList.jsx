'use client'
import { FaRegUser } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa6";
import { FaDiagramSuccessor } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSearch } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { RiRefund2Fill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Loading from "@/components/shared/LoadingSpiner/Loading";

const EventOrderList = () => {
  const session = useSession();
  const { data: invoice = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`http://localhost:9000/myAllOrder/${session?.data?.user?.email}`).then((res) =>
        res.json()
      ),
  });
  console.log(invoice);

  const handleRefundRequest = async (id) => {
    const res = await axios.put(`http://localhost:9000/refundRequest/${id}`)
    console.log(res)
    if (res?.data?.modifiedCount) {
      toast.success('Successfully Refund Requested 😊')
      refetch()
    }
  }
  const handleRefundAlert = () => {
    toast.error('Already Requested for Refund 😊')
  }
  const confirmedOrders = invoice?.filter(order => order?.refundRequested === "NotRequested");
  const totalConfirmedAmount = confirmedOrders?.reduce((total, order) => total + order?.amount, 0);


  invoice?.length === 0 && <div>
    <h1>You have not purchase any ticket</h1>
  </div>
  return (
    <div className=" text-black flex container mx-auto ml-4">
      {/* <div className=" w-[300px]">Order</div> */}
      <div className="">
        <div className=" flex justify-between my-5 flex-col md:flex-row mt-4 -z-10">
          <div className="">
            <p className=" font-semibold text-2xl text-black ml-5">Order List</p>
          </div>
          <div className=" flex gap-4 flex-col md:flex-row mt-4 mx-5">
            <div className=" relative  md:w-[200px]">
              <Input
                type="search"
                placeholder="Search"
                className=" rounded-full pl-10"
              />
              <p className=" absolute top-3 left-4">
                <LuSearch />
              </p>
            </div>
            <div className=" relative md:w-[200px]   md:mr-2">
              <Input
                type="search"
                placeholder="Filter"
                className=" rounded-full pl-7"
              />
              <p className=" absolute top-3 left-2">
                <CiFilter />
              </p>
            </div>
          </div>
        </div>
        <div className=" flex  gap-12 flex-col md:flex-row mx-5">
          <div className="md:w-[250px]  rounded-lg overflow-hidden shadow-sm border bg-white  transition-shadow duration-300">
            <div className=" px-4 py-3">
              <div className="flex  justify-between  items-center ">
                <div className="bg-[#f3f2ff] p-5 rounded-xl">
                  <FaRegUser color="black" size={30} />
                </div>
                <div className="">
                  <h2 className="font-bold text-xl text-gray-800">
                    Total Order
                  </h2>
                  <p>{invoice?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[250px] rounded-lg overflow-hidden shadow-sm border bg-white  transition-shadow duration-300">
            <div className=" px-4 py-3">
              <div className="flex  justify-between  items-center ">
                <div className="bg-[#f3f2ff] p-5 rounded-xl">
                  <FaMoneyCheck color="black" size={30} />
                </div>
                <div className="">
                  <h2 className="font-bold text-xl text-gray-800">
                    Total Payment
                  </h2>
                  <p>$ {totalConfirmedAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[250px] rounded-lg overflow-hidden shadow-sm border bg-white  transition-shadow duration-300">
            <div className=" px-4 py-3">
              <div className="flex  justify-between  items-center ">
                <div className="bg-[#f3f2ff] p-5 rounded-xl">
                  <FaDiagramSuccessor color="black" size={30} />
                </div>
                <div className="">
                  <h2 className="font-bold text-xl text-gray-800">
                    Total Success
                  </h2>
                  <p>{confirmedOrders?.length} Tickets</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col   mt-5">
          <div className="-mx-4 -my-2 overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <div className="flex items-center gap-x-3 ">
                          <span>Image</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <span>Title</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <span>Booking Date</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <span>Event Date</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <span>Amount</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <span>Ticket</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2"
                      >
                        <span>Status</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 md:px-4 text-sm font-bold text-black text-left rtl:text-right  -ml-2">
                        Refund Request
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200  text-sm">
                    {
                        // isLoading && <Loading></Loading>
                    }
                    {invoice?.map((invoice) => (
                      <tr key={invoice?._id}>


                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                          <div className=" flex gap-3 flex-col md:flex-row flex-wrap">
                            <Image
                              src={invoice?.eventImage}
                              width={50}
                              height={50}
                              alt="fdsg"
                              className=" border border-gray-200 rounded-lg"
                            />

                          </div>
                        </td>

                        <td className="md:px-4 px-2 py-4 text-sm text-gray-500  whitespace-nowrap text-wrap">
                          {invoice?.eventName?.slice(0, 15)}
                        </td>
                        <td className="md:px-4 px-2 py-4 text-sm text-gray-500  whitespace-nowrap text-wrap">
                          {new Date(invoice?.createdAt).toLocaleDateString("en-US")}
                        </td>
                        <td className="md:px-4 px-2 py-4 text-sm text-gray-500  whitespace-nowrap text-wrap">
                          {new Date(invoice?.eventDate).toLocaleDateString("en-US")}
                        </td>
                        <td className="md:px-4 px-2 py-4 text-sm text-gray-500  whitespace-nowrap text-wrap">
                          $ {invoice?.amount}
                        </td>
                        <td className="md:px-4 px-2 py-4 text-sm text-gray-500  whitespace-nowrap text-wrap">
                          {invoice?.totalTickets} P
                        </td>
                        <td className="md:px-4 px-2 py-4 text-sm text-gray-500  whitespace-nowrap text-wrap">
                          <span className="bg-emerald-100/60 text-emerald-500 px-2 py-1 rounded-3xl">
                            {invoice?.refundRequested === "NotRequested" ? "Success" : invoice?.refundRequested === "Requested" ? "Requested" : "Refunded"}</span>
                        </td>

                        <td onClick={() => {
                          invoice?.refundRequested === "Requested" ? handleRefundAlert() : handleRefundRequest(invoice?._id)
                        }
                        } className={`md:px-4 px-2 py-4 text-sm   whitespace-nowrap text-wrap text-center  flex flex-col items-center jsutify-center`}>
                          <span>
                            <RiRefund2Fill size={22} className="text-red-500 bg-red-200 text-center hover:scale-105 cursor-pointer rounded-full "></RiRefund2Fill>
                          </span>
                        </td>


                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrderList;
