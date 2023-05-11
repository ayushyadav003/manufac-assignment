import { wineData } from "./data";
import { useEffect, useState } from "react";

export default function Tables() {
  const [classCount, setClassCount] = useState(1);

  useEffect(() => {
    calculateClass();
  }, [wineData]);

  const calculateClass = () => {
    wineData.map((item) => {
      let alchohol = item["Alcohol"];
      setClassCount(alchohol);
    });
  };

  //   mean calculator
  function calculateClassMean(data, className, type) {
    console.log("className", className);
    let classData = data.filter((item) => item.Alcohol === className);

    let sum = classData.reduce(
      (acc, item) =>
        acc + type === "gamma"
          ? (item["Ash"] + item["Hue"]) / item["Magnesium"]
          : item.Flavanoids,
      0
    );
    return (sum / classData.length).toFixed(3);
  }

  //   median calculation
  function calculateClassMedian(data, className, type) {
    let classData = data.filter((item) => item.Alcohol === className);
    let sortedData = classData
      .map((item) =>
        type === "gamma"
          ? (item["Ash"] + item["Hue"]) / item["Magnesium"]
          : item.Flavanoids
      )
      .sort();
    let mid = Math.floor(sortedData.length / 2);
    return (
      sortedData.length % 2 !== 0
        ? sortedData[mid]
        : (sortedData[mid - 1] + sortedData[mid]) / 2
    ).toFixed(3);
  }

  //   mode calculation
  function calculateClassMode(data, className, type) {
    let classData = data.filter((item) => item.Alcohol === className);

    let frequency = {};
    let maxFrequency = 0;
    let mode = null;
    for (let i = 0; i < classData.length; i++) {
      let num =
        type === "gamma"
          ? classData[i].Ash + classData[i]["Hue"] / classData[i].Magnesium
          : classData[i].Flavanoids;
      if (frequency[num]) {
        frequency[num]++;
      } else {
        frequency[num] = 1;
      }

      if (frequency[num] > maxFrequency) {
        maxFrequency = frequency[num];
        mode = num;
      }
    }
    return typeof mode === "number"
      ? mode.toFixed(3)
      : mode.split(".").slice(0, 2).join(".");
  }

  return (
    <div>
      <h2>Flavanoids (Mean, Median, Mode)</h2>
      <table style={{ margin: "auto" }}>
        <tr>
          <th>Measure</th>
          {[...Array(classCount)].map((item, i) => {
            return <th>Class {i + 1}</th>;
          })}
        </tr>
        <tr>
          <td>Flavanoids Mean</td>
          {[...Array(classCount)].map((item, i) => {
            return <td>{calculateClassMean(wineData, i + 1)}</td>;
          })}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {[...Array(classCount)].map((item, i) => {
            return <td>{calculateClassMedian(wineData, i + 1)}</td>;
          })}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {[...Array(classCount)].map((item, i) => {
            return <td>{calculateClassMode(wineData, i + 1)}</td>;
          })}
        </tr>
      </table>

      <h2 style={{ marginTop: "2rem" }}>Flavanoids (Mean, Median, Mode)</h2>
      <table style={{ margin: "auto" }}>
        <tr>
          <th>Measure</th>
          {[...Array(classCount)].map((item, i) => {
            return <th>Class {i + 1}</th>;
          })}
        </tr>
        <tr>
          <td>Gamma Mean</td>
          {[...Array(classCount)].map((item, i) => {
            return <td>{calculateClassMean(wineData, i + 1, "gamma")}</td>;
          })}
        </tr>
        <tr>
          <td>Gamma Median</td>
          {[...Array(classCount)].map((item, i) => {
            return <td>{calculateClassMedian(wineData, i + 1, "gamma")}</td>;
          })}
        </tr>
        <tr>
          <td>Gamma Mode</td>
          {[...Array(classCount)].map((item, i) => {
            return <td>{calculateClassMode(wineData, i + 1, "gamma")}</td>;
          })}
        </tr>
      </table>
    </div>
  );
}
