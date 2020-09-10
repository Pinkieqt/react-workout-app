import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarGraph(props){
    return (
        <ResponsiveContainer width="50%" height={100}>
            <BarChart
                data={props.arrivals}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="arrivals" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
}

export default BarGraph;