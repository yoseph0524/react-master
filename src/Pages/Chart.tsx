import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { styled } from "styled-components";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CandlestickData {
  x: Date;
  y: [number, number, number, number];
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => {
      return fetchCoinHistory(coinId);
    },
    {
      refetchInterval: 10000,
    }
  );

  const series: CandlestickData[] = data
    ? data.map((item) => ({
        x: new Date(item.time_open * 1000),
        y: [
          parseFloat(item.open),
          parseFloat(item.high),
          parseFloat(item.low),
          parseFloat(item.close),
        ],
      }))
    : [];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <ChartContainer>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          style={{ width: "85%" }}
          options={options}
          series={[
            {
              data: series,
            },
          ]}
          type="candlestick"
        />
      )}
    </ChartContainer>
  );
}

export default Chart;
