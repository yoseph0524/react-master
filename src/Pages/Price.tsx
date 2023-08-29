import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import { keyframes, styled } from "styled-components";
import { FaArrowDown, FaArrowUp, FaMinus } from "react-icons/fa";

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_priceData_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const PriceContainer = styled.div``;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const priceAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const CurrentPrice = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.accentColor};
  border-radius: 10px;
  padding: 12px 24px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
  animation: ${priceAnimation} 1s linear;
`;

const PercentChange = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const PercentItems = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  font-size: 20px;
  padding: 12px 24px;
  margin: 12px;
  animation: ${priceAnimation} 1.5s linear;
  transition: 300ms all;

  span:first-child {
    margin-right: 12px;
    font-size: 18px;
  }
  &:hover {
    transform: scale(1.15);
  }
  border: 1px solid black;
`;

function Price() {
  const { coinId } = useParams();

  const { isLoading: priceLoading, data: priceData } = useQuery<priceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    { refetchInterval: 5000 }
  );

  const getPriceColor = (val: number | undefined) => {
    if (val === undefined) {
      return "black";
    } else if (val > 0) {
      return "blue";
    } else if (val < 0) {
      return "red";
    } else if (val === 0) {
      return "black";
    }
  };

  const getPriceArrow = (val: number | undefined) => {
    if (val === undefined) {
      return <FaMinus />;
    } else if (val > 0) {
      return <FaArrowUp />;
    } else if (val < 0) {
      return <FaArrowDown />;
    } else if (val === 0) {
      return <FaMinus />;
    }
  };

  return (
    <PriceContainer>
      {priceLoading ? (
        "Loading..."
      ) : (
        <PriceWrapper>
          <CurrentPrice>
            <h1>
              Current Price: {priceData?.quotes.USD.price.toFixed(3) ?? 0} USD
            </h1>
          </CurrentPrice>
          <PercentChange>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_1y),
              }}
            >
              {" "}
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_1y)}
              </span>
              <span>1 Year: {priceData?.quotes.USD.percent_change_1y}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_30d),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_30d)}
              </span>
              <span>30 Days: {priceData?.quotes.USD.percent_change_30d}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_7d),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_7d)}
              </span>
              <span>7 Days: {priceData?.quotes.USD.percent_change_7d}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_24h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_24h)}
              </span>
              <span>24 Hours: {priceData?.quotes.USD.percent_change_24h}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_6h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_6h)}
              </span>
              <span>6 Hours: {priceData?.quotes.USD.percent_change_6h}%</span>
            </PercentItems>
            <PercentItems
              style={{
                color: getPriceColor(priceData?.quotes.USD.percent_change_1h),
              }}
            >
              <span>
                {getPriceArrow(priceData?.quotes.USD.percent_change_1h)}
              </span>
              <span>1 Hour: {priceData?.quotes.USD.percent_change_1h}%</span>
            </PercentItems>
          </PercentChange>
        </PriceWrapper>
      )}
    </PriceContainer>
  );
}

export default Price;
