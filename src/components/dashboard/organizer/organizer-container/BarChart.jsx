"use client";
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const demoData = [
  { "month": "January", "Monthly_Sale": 2400 },
  { "month": "February", "Monthly_Sale": 1398 },
  { "month": "March", "Monthly_Sale": 9800 },
  { "month": "April", "Monthly_Sale": 3908 },
  { "month": "May", "Monthly_Sale": 4800 },
  { "month": "June", "Monthly_Sale": 3800 },
  { "month": "July", "Monthly_Sale": 4300 },
  { "month": "August", "Monthly_Sale": 6490 },
  { "month": "September", "Monthly_Sale": 4300 },
  { "month": "October", "Monthly_Sale": 5100 },
  { "month": "November", "Monthly_Sale": 6100 },
  { "month": "December", "Monthly_Sale": 7200 }
];

const BarChart2 = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={demoData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Monthly_Sale" fill="#82ca9d" activeBar={<Rectangle fill="green" stroke="blue" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChart2;




// "use client";
// import { useQuery } from "@tanstack/react-query";
// import React, { PureComponent } from 'react';
// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const demoData = [
//   { "month": "January", "Monthly_Sale": 2400 },
//   { "month": "February", "Monthly_Sale": 1398 },
//   { "month": "March", "Monthly_Sale": 9800 },
//   { "month": "April", "Monthly_Sale": 3908 },
//   { "month": "May", "Monthly_Sale": 4800 },
//   { "month": "June", "Monthly_Sale": 3800 },
//   { "month": "July", "Monthly_Sale": 4300 },
//   { "month": "August", "Monthly_Sale": 6490 },
//   { "month": "September", "Monthly_Sale": 4300 },
//   { "month": "October", "Monthly_Sale": 5100 },
//   { "month": "November", "Monthly_Sale": 6100 },
//   { "month": "December", "Monthly_Sale": 7200 }
// ]


// // Function to fetch statistics data
// const fetchStatsData = async (email) => {
//     const response = await fetch(
//         `https://event-sphare-server.vercel.app/organizer-barChart/${email}`
//     );
//     if (!response.ok) {
//         throw new Error("Network response was not ok");
//     }
//     return response.json(); // Adjust based on your API response structure
// };
// const BarChart2 = ({email}) => {
//     const {
//         data: chartData = { dayStats: [] },
//         error,
//         isLoading,
//     } = useQuery({
//         queryKey: ["organizer-wave"],
//         queryFn: () => fetchStatsData(email),
//     });
//     console.log(chartData);
    
//   return (
//     <ResponsiveContainer width="100%" height="100%">
//     <BarChart
//       width={500}
//       height={300}
//       data={chartData}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="month" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
 
//       <Bar dataKey="Monthly_Sale" fill="#82ca9d" activeBar={<Rectangle fill="green" stroke="blue" />} />
//     </BarChart>
//   </ResponsiveContainer>
//   )
// }

// export default BarChart2