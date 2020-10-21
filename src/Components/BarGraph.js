import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarGraph(props){

    return (
        <ResponsiveContainer width="100%">
            <BarChart
                data={props.arrivals}
                // margin={{
                //     top: 5, right: 30, left: 20, bottom: 5,
                // }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                {/* <YAxis /> */}
                <Tooltip />
                {/* <Legend /> */}
                {/* <Bar dataKey="Celkem" fill="#1B1A34" barSize={5} /> */}
                <Bar dataKey="2018" fill="#f76b5c" barSize={5} />
                <Bar dataKey="2019" fill="#d3446d" barSize={5} />
                <Bar dataKey="2020" fill="#992c7f" barSize={5} />
                { props.arrivals[2][2021] > -1 && <Bar dataKey="2021" fill="#58157e" barSize={5} /> }
                { props.arrivals[2][2022] > -1 && <Bar dataKey="2021" fill="#1B1A34" barSize={5} /> }
                { props.arrivals[2][2023] > -1 && <Bar dataKey="2021" fill="#07051a" barSize={5} /> }
                { props.arrivals[2][2024] > -1 && <Bar dataKey="2021" fill="#fece90" barSize={5} /> }
        </BarChart>
      </ResponsiveContainer>
    );
}

export default BarGraph;