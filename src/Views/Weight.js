import React, { useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { ThemeContext } from "../Utilities/ThemeContext";
import Members from "../Helpfiles/Members";
import WeightGraph from "../Components/WeightGraph";
import FastCardPreview from "../Components/FastCardPreview";
import { DefUserContext } from "../Utilities/DefUserContext";

function WeightComponent(props) {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { defUser, setDefUser } = React.useContext(DefUserContext);
  const [memberWeightData, setMemberWeightData] = React.useState([]);
  const [memberCardData, setMemberCardData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [numOfRecords, setNumOfRecords] = React.useState(10);

  //Generate new content everytime when props change
  useEffect(() => {
    if (props.usersData.data.length > 0) {
      setIsLoading(false);
      const memberData = props.usersData.data.filter((member) => {
        return member.id === defUser;
      });
      //Members max and work weights
      if (memberData) {
        if (memberData[0].weightData.length > 0) {
          let tmpMax = 0;
          let tmpMin = 1000; //can be 1000, coz no one weight one thousand killos right..
          let tmpAvg = 0;
          memberData[0].weightData.forEach((element) => {
            if (tmpMax < element.weight) tmpMax = element.weight;
            if (tmpMin > element.weight) tmpMin = element.weight;
            tmpAvg = tmpAvg + element.weight;
          });
          tmpAvg = tmpAvg / memberData[0].weightData.length;

          setMemberCardData({
            max: tmpMax,
            min: tmpMin,
            avg: tmpAvg.toFixed(1),
            idk: memberData[0].weightData.length,
          });
          setMemberWeightData(memberData[0].weightData);
        } else {
          setMemberCardData({
            max: "-",
            min: "-",
            avg: "-",
            idk: "-",
          });
          setMemberWeightData([]);
        }
      }
    } else {
      setIsLoading(true);
    }
  }, [props, defUser]);

  //Function to get weight table data
  function getWeightTableData() {
    let tmpWeightTableData = [];

    //date and weight
    let i = numOfRecords;
    //tmpArray.reverse();
    while (i >= numOfRecords - 10) {
      if (memberWeightData[i]) {
        let tmpDate = memberWeightData[i].date.toDate();
        tmpWeightTableData.push(
          <tr key={i}>
            <td
              className={`w-1/2 border-0 border-${theme}-ttern px-4 py-1 text-${theme}-tsec`}
            >
              {tmpDate.getDate() +
                "." +
                (tmpDate.getMonth() + 1) +
                "." +
                tmpDate.getFullYear()}
            </td>
            <td
              className={`w-1/2 border-0 border-${theme}-ttern px-4 py-1 text-${theme}-tsec`}
            >
              {memberWeightData[i].weight} &nbsp;kg
            </td>
          </tr>
        );
      }
      i--;
    }

    return tmpWeightTableData;
  }

  //Select options
  let userOptions = Members.map((member) => (
    <option key={member.key} value={member.key}>
      {member.label}
    </option>
  ));

  return (
    <div className={`p-3 min-h-screen bg-${theme}-bg`}>
      <div
        className={`w-full flex justify-center flex-wrap container mx-auto md:px-32`}
      >
        {isLoading && (
          <div className={`flex justify-center mt-64`}>
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && (
          <>
            <div className={`w-full mt-5 sm:mt-5 md:mt-10 mb-5`}>
              <h3
                className={`font-bold text-3xl text-center text-${theme}-tpr`}
              >
                Metriky
              </h3>
            </div>
            <div className={`w-full flex justify-center`}>
              <select
                className={`text-${theme}-tpr bg-${theme}-bg text-xl p-2 mb-5 cursor-pointer mx-3`}
                name="members"
                id="memberSelector"
                value={defUser}
                onChange={(e) => {
                  setDefUser(e.target.value);
                  localStorage.setItem("defaultUser", e.target.value);
                }}
              >
                {userOptions}
              </select>
            </div>

            {/* Fast card preview */}
            <FastCardPreview
              data={[
                { data: memberCardData.max, title: "maximální váha" },
                { data: memberCardData.min, title: "minimální váha" },
                { data: memberCardData.avg, title: "průměrná váha" },
                { data: memberCardData.idk, title: "počet zapsání" },
              ]}
            />

            {/* Linechart */}
            <div
              className={`w-full h-40 sm:h-40 md:h-64 p-1 sm:p-1 md:p-6 mb-8 sm:mb-8 md:mb-16`}
            >
              <div
                className={`w-full h-40 sm:h-40 md:h-64 bg-${theme}-cardbg rounded   text-center`}
              >
                <WeightGraph data={memberWeightData} />
              </div>
            </div>

            <div
              className={`w-full sm:w-full md:w-2/3 bg-${theme}-cardbg rounded p-2 sm:p-2 md:p-10 text-center mb-5 sm:mb-5 md:mb-16`}
            >
              <table className={`w-full table-auto py-2h-auto`}>
                <thead>
                  <tr>
                    <th
                      className={`px-4 py-2 mt-1 text-${theme}-tsec font-bold `}
                    >
                      Datum
                    </th>
                    <th
                      className={`px-4 py-2 mt-1 text-${theme}-tsec font-bold`}
                    >
                      Váha
                    </th>
                  </tr>
                </thead>
                <tbody>{getWeightTableData()}</tbody>
              </table>
              <div className={`w-full flex text-${theme}-tsec justify-center`}>
                <button
                  className="text-lg"
                  onClick={() =>
                    numOfRecords - 10 > 0
                      ? setNumOfRecords(numOfRecords - 10)
                      : true
                  }
                >
                  &#8592;
                </button>
                <p className="text-xl mx-3">
                  {numOfRecords - 10} - {numOfRecords}
                </p>
                <button
                  className="text-xl"
                  onClick={() => setNumOfRecords(numOfRecords + 10)}
                >
                  &#8594;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeightComponent;
