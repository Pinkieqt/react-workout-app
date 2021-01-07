import React, { useEffect, useState } from "react";
import Months from "../Helpfiles/Months";
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

function LineGraph(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  function getLines() {
    let result = Months;

    for (let entry in props.categories) {
      for (let month in props.categories[entry]) {
        let slicedEntry = entry.substring(1);
        result[month][slicedEntry] = props.categories[entry][month];
      }
    }
    return result;
  }

  const graphData = getLines();

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
        data={graphData}
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="abbreviation" />
        {/* <YAxis /> */}
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderColorfulLegendText} />

        {graphData[0][18] > -1 && (
          <Line
            type="monotone"
            dataKey="18"
            stroke={Colors.magma[2]}
            strokeWidth={2}
            dot={false}
          />
        )}
        {graphData[0][19] > -1 && (
          <Line
            type="monotone"
            dataKey="19"
            stroke={Colors.magma[3]}
            strokeWidth={2}
            dot={false}
          />
        )}
        {graphData[0][20] > -1 && (
          <Line
            type="monotone"
            dataKey="20"
            stroke={Colors.magma[4]}
            strokeWidth={2}
            dot={false}
          />
        )}
        {graphData[0][21] > -1 && (
          <Line
            type="monotone"
            dataKey="21"
            stroke={Colors.magma[5]}
            strokeWidth={2}
            dot={false}
          />
        )}
        {graphData[0][22] > -1 && (
          <Line
            type="monotone"
            dataKey="22"
            stroke={Colors.magma[6]}
            strokeWidth={2}
            dot={false}
          />
        )}
        {graphData[0][23] > -1 && (
          <Line
            type="monotone"
            dataKey="23"
            stroke={Colors.magma[7]}
            strokeWidth={2}
            dot={false}
          />
        )}
        {graphData[0][24] > -1 && (
          <Line
            type="monotone"
            dataKey="24"
            stroke={Colors.magma[1]}
            strokeWidth={2}
            dot={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph;
