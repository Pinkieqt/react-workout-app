import React from "react";
import PPLplan from "../Helpfiles/PPLplan"

function PlansComponent(){

    function getContent(category, week){
        return PPLplan.map(element => {
            if (element.week === week && element.category === category){
                return (
                    <tr key={element.key}>
                        <td className="border px-4 py-1 text-myTheme-tsec">{ element.label }</td>
                        <td className="border px-4 py-1 text-myTheme-tsec">{ element.series }</td>
                    </tr>
                )
            }
        })
    }

    const week1PushContent = getContent("push1", "ppl1")
    const week1PullContent = getContent("pull1", "ppl1")
    const week1LegsContent = getContent("legs1", "ppl1")
    const week2PushContent = getContent("push2", "ppl2")
    const week2PullContent = getContent("pull2", "ppl2")
    const week2LegsContent = getContent("legs2", "ppl2")

    return (
        <div className="w-full flex justify-center flex-wrap container mx-auto">
                <div className="w-full">
                    <h3 className="font-bold text-2xl text-center text-myTheme-tsec">PPL Workout plan</h3>
                    <h3 className="text-center text-myTheme-tsec pt-6 pb-1 w-full sm:w-full md:w-auto">
                        PPL program znamená Push/Pull/Legs. Cvičení tedy probíhá 3 dny po sobě.
                    </h3>
                    <h3 className="text-center text-myTheme-tsec w-full sm:w-full md:w-auto">
                        Přestávka může být mezi jednotlivými cykly (P/P/L/rest/P/P/L/rest) nebo se cvičí cykly po sobě (P/P/L/P/P/L/rest/rest).
                    </h3>
                </div>

                {/* WEEK 1 */}
                <div className="w-full sm:w-full md:w-1/3 bg-myTheme-cardbg rounded shadow-xl p-2 sm:p-2 md:p-10 text-center mr-0 sm:mr-0 md:mr-12 my-12">
                    <table className="w-full table-auto text-center py-2h-auto">
                        <thead>
                            <tr>
                                <th className="px-4 pt-6 sm:pt-6 md:pt-0 pb-8 text-myTheme-tpr font-bold text-xl" colSpan="2">První cyklus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-1 text-myTheme-tsec" colSpan="2">
                                    {/* <div className={`w-2 h-2 -mx-3 rounded-full bg-blue-300`}></div> */}
                                    Push
                                </td>
                            </tr>
                            {week1PushContent}
                            
                            <tr>
                                <td className="border px-4 py-1 text-myTheme-tsec" colSpan="2">
                                    Pull
                                </td>
                            </tr>
                            {week1PullContent}
                            
                            <tr>
                                <td className="border px-4 py-1 text-myTheme-tsec" colSpan="2">
                                    Legs
                                </td>
                            </tr>
                            {week1LegsContent}
                        </tbody>
                    </table>
                </div>

                {/* WEEK 2 */}
                <div className="w-full sm:w-full md:w-1/3 bg-myTheme-cardbg rounded shadow-xl p-2 sm:p-2 md:p-10 text-center my-12">
                    <table className="w-full table-auto text-center py-2 h-auto">
                        <thead>
                            <tr>
                                <th className="px-4 pt-6 sm:pt-6 md:pt-0 pb-8 text-myTheme-tpr font-bold text-xl" colSpan="2">Druhý cyklus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-1 text-myTheme-tsec" colSpan="2">Push</td>
                            </tr>
                            {week2PushContent}
                            
                            <tr>
                                <td className="border px-4 py-1 text-myTheme-tsec" colSpan="2">Pull</td>
                            </tr>
                            {week2PullContent}
                            
                            <tr>
                                <td className="border px-4 py-1 text-myTheme-tsec" colSpan="2">Legs</td>
                            </tr>
                            {week2LegsContent}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default PlansComponent;