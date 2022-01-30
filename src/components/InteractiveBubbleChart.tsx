import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AbstractBubbleChart } from "./AbstractBubbleChart";

import dataList from "../data/sample.json";

export const InteractiveBubbleChart: React.VFC = () => {
  const div = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(window.innerWidth - 100);
  const [height, setHeight] = useState<number>(window.innerHeight - 100);
  const [bubbleSize, setBubbleSize] = useState("none");
  const [bubbleColor, setBubbleColor] = useState("none");
  const [xAxis, setXAxis] = useState("none");
  const [yAxis, setYAxis] = useState("none");

  useEffect(() => {
    if (!div.current) {
      return;
    }
    setWidth(div.current.offsetWidth);
    setHeight(div.current.offsetHeight);
  }, [div.current]);

  const onChangeBubbleSize = useCallback((e) => {
    setBubbleSize(e.currentTarget.value);
  }, []);

  const onChangeBubbleColor = useCallback((e) => {
    setBubbleColor(e.currentTarget.value);
  }, []);

  const onChangeXAxis = useCallback((e) => {
    setXAxis(e.currentTarget.value);
  }, []);

  const onChangeYAxis = useCallback((e) => {
    setYAxis(e.currentTarget.value);
  }, []);

  return (
    <div
      style={{
        height: "95%",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        <b>
          バブルの大きさ：
          <select name="bubbleSize" onChange={onChangeBubbleSize}>
            <option value="none">なし</option>
            <option value="income">所得</option>
          </select>
        </b>
        <b style={{ marginLeft: "1%" }}>
          バブルの色：
          <select name="bubbleColor" onChange={onChangeBubbleColor}>
            <option value="none">なし</option>
            <option value="sex">性別</option>
          </select>
        </b>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <div style={{ width: "5%" }}></div>
        {xAxis === "none" ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <b style={{ marginLeft: "1%" }}>
              横軸：
              <select name="xAxis" onChange={onChangeXAxis}>
                <option value="none">なし</option>
                <option value="sex">性別</option>
              </select>
            </b>
          </div>
        ) : (
          <>
            <div
              style={{
                marginLeft: "1%",
                width: "47%",
                textAlign: "center",
                backgroundColor: "lightgray",
              }}
            >
              男性
            </div>
            <div
              style={{
                marginLeft: "1%",
                marginRight: "1%",
                width: "47%",
                textAlign: "center",
                backgroundColor: "lightgray",
              }}
            >
              女性
            </div>
          </>
        )}
      </div>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <div
          style={{
            width: "5%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            writingMode: "vertical-rl",
            marginLeft: "2%",
          }}
        >
          {yAxis === "none" ? (
            <div style={{ height: "100%", textAlign: "center" }}>
              <b style={{ marginLeft: "1%" }}>
                縦軸：
                <select name="yAxis" onChange={onChangeYAxis}>
                  <option value="none">なし</option>
                  <option value="age">年齢</option>
                </select>
              </b>
            </div>
          ) : (
            <>
              <div
                style={{
                  marginTop: "1%",
                  height: "50%",
                  textAlign: "center",
                  backgroundColor: "lightgray",
                }}
              >
                年齢が低い
              </div>
              <div
                style={{
                  marginTop: "1%",
                  height: "50%",
                  textAlign: "center",
                  backgroundColor: "lightgray",
                }}
              >
                年齢が高い
              </div>
            </>
          )}
        </div>
        <div
          ref={div}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <AbstractBubbleChart
            width={width}
            height={height}
            rawData={dataList}
            bubbleSize={bubbleSize}
            bubbleColor={bubbleColor}
            xAxis={xAxis}
            yAxis={yAxis}
          />
        </div>
      </div>
    </div>
  );
};
