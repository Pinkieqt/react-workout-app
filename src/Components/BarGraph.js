import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Colors from "../Utilities/Colors";
import { ThemeContext } from "../Utilities/ThemeContext";

function BarGraph(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let tmp = [];
      for (let el in payload) {
        tmp.push(
          <p
            key={payload[el].dataKey}
            className={"m-3"}
          >{`${payload[el].dataKey} : ${payload[el].value}`}</p>
        );
      }

      return (
        <div className={`bg-${theme}-bg text-${theme}-pr`}>
          <p>{label}</p>
          {tmp}
        </div>
      );
    }
    return null;
  };
  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color }}>{value}</span>;
  }

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
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderColorfulLegendText} />
        {/* <Bar dataKey="Celkem" fill="#1B1A34" barSize={5} /> */}
        <Bar dataKey="2018" fill={Colors.magma[2]} barSize={5} />
        <Bar dataKey="2019" fill={Colors.magma[3]} barSize={5} />
        <Bar dataKey="2020" fill={Colors.magma[4]} barSize={5} />
        {props.arrivals[2][2021] > -1 && (
          <Bar dataKey="2021" fill={Colors.magma[5]} barSize={5} />
        )}
        {props.arrivals[2][2022] > -1 && (
          <Bar dataKey="2021" fill={Colors.magma[6]} barSize={5} />
        )}
        {props.arrivals[2][2023] > -1 && (
          <Bar dataKey="2021" fill={Colors.magma[7]} barSize={5} />
        )}
        {props.arrivals[2][2024] > -1 && (
          <Bar dataKey="2021" fill={Colors.magma[1]} barSize={5} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarGraph;
