import "./styles.css";
import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState } from "react";
import { data } from "./data";
import { Dropdown } from "./dropdown";

function LetterViz({ data }) {
  const plotRef = useRef();
  const [sort, setSort] = useState("Alphabetical");

  useEffect(() => {
    const barChart = Plot.plot({
      marks: [
        Plot.ruleY([1 / 26], { stroke: "orange", strokeWidth: 3 }),
        Plot.barY(data, {
          x: "letter",
          y: "frequency",
          sort:
            sort === "Alphabetical"
              ? null
              : { x: "y", reverse: sort === "Descending" }
        })
      ],
      y: { grid: true },
      marginTop: 50,
      marginBottom: 50,
      marginLeft: 50
    });
    plotRef.current.append(barChart);
    return () => barChart.remove();
  }, [data, sort]);

  return (
    <>
      <Dropdown
        title="Sort by"
        onChange={(event) => setSort(event.target.value)}
        options={["Alphabetical", "Descending", "Ascending"]}
      />
      <div ref={plotRef}></div>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello DataViz!</h1>
      <LetterViz data={data} />
    </div>
  );
}
