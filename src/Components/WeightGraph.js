import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Colors from "../Utilities/Colors";
import { ThemeContext } from "../Utilities/ThemeContext";

function WeightGraph(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const data = () => {
    let tmpData = [];
    let i = 1;

    props.data.forEach((element) => {
      tmpData.push({ entry: i, Vaha: element.weight });
      i++;
    });

    return tmpData;
  };

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

      return <div className={`bg-${theme}-bg text-${theme}-pr`}>{tmp}</div>;
    }
    return null;
  };

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return <span style={{ color }}>{value}</span>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data()}
        margin={{
          top: 20,
          right: 20,
          left: -15,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="10 10" /> */}
        <XAxis dataKey="entry" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderColorfulLegendText} />

        <Line
          type="monotone"
          dataKey="Vaha"
          stroke="#7F6BFF"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default WeightGraph;
