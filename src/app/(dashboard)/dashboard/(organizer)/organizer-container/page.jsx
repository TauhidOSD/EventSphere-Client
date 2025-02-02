"use client";
import BarChart2 from "@/components/dashboard/organizer/organizer-container/BarChart";
import Card from "@/components/dashboard/organizer/organizer-container/Card";
import Chart from "@/components/dashboard/organizer/organizer-container/Chart";
import CirculeChart from "@/components/dashboard/organizer/organizer-container/CirculeChart";
import Profile from "@/components/dashboard/organizer/organizer-container/Profile";
import StatsChart from "@/components/dashboard/organizer/organizer-container/StatsChart";
import Subscriber from "@/components/dashboard/organizer/organizer-container/Suscriber";
import Table from "@/components/dashboard/organizer/organizer-container/Table";
import Top from "@/components/dashboard/organizer/organizer-container/Top";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const OrganizerContainer = () => {


  const session = useSession();

  const { data} = useQuery({
      queryKey: ["users"],
      queryFn: () =>
        fetch(`https://event-sphare-server.vercel.app/user/${session?.data?.user?.email}`).then((res) =>
          res.json()
        ),
    });
    console.log(data);
  const { data: organizerOrders} = useQuery({
    queryKey: ["organizer-orders"],
    queryFn: () =>
      fetch(`https://event-sphare-server.vercel.app/organizer-orders/${session?.data?.user?.email}`).then((res) =>
        res.json()
      ),
  });
  const { data: organizerStats } = useQuery({
    queryKey: ["organizer-stats"],
    queryFn: () =>
      fetch(`https://event-sphare-server.vercel.app/organizer-stats/${session?.data?.user?.email}`).then((res) =>
        res.json()
      ),
  });
  const { data: PieChartData } = useQuery({
    queryKey: ["organizer-pieChart"],
    queryFn: () =>
      fetch(`https://event-sphare-server.vercel.app/organizer-pieChart/${session?.data?.user?.email}`).then((res) =>
        res.json()
      ),
  });


  return (
    <div>
      <div>
        <Profile  data={data}/>
      </div>
      <div>

        <Card data={organizerOrders} email={session?.data?.user?.email}/>
      </div>
      <div className=" mt-8">
        <Chart organizerStats={organizerStats} />

      </div>
      <div className="mt-8 flex flex-col-reverse md:flex-row gap-4">

        <div className="flex-1">
          <CirculeChart PieChartData={PieChartData} />
        </div>
        <div className="flex-1">
          {/* <StatsChart email={session?.data?.user?.email} /> */}
          <BarChart2 email={session?.data?.user?.email}/>
        </div>
 
      </div>

      <div className="mt-8 flex flex-col-reverse md:flex-row gap-4 p-4">
        <div className="flex-1 w-full border-2">
          <Top />
        </div>

        <div className="flex-1 w-full border-2">
          <Subscriber  data={data}/>
        </div>
      </div>
      <div className="mt-8">
        <Table data={organizerOrders} email={session?.data?.user?.email}/>
      </div>

    </div>
  );
};

export default OrganizerContainer;
