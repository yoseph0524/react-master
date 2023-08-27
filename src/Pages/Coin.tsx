import { useParams, useLocation, Outlet, useMatch } from "react-router-dom";
import { styled, keyframes } from "styled-components";
import { StyledLink } from "./Coins";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface infoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface priceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
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

const CoinWrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  padding: 24px 128px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

const TitleImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;

  justify-content: space-evenly;
  margin-top: 5rem;
`;

const OverViewBox = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-right: 25px;
`;

const OverView = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px;
  margin: 12px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  span:first-child {
    margin-bottom: 12px;
    font-size: 18px;
  }
`;

const Description = styled.div`
  width: 100%;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px;
  margin: 12px;
  font-size: 20px;
  line-height: 1.5;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const PriceAndChart = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  border-radius: 50%;
`;

const LinkTo = styled(StyledLink)<{ isActive: boolean }>`
  display: block;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  border-radius: 20px;
  padding: 12px 24px;
  margin: 4px;
  &: hover {
    border: 1px solid ${(props) => props.theme.textColor};
  }
`;

const titleAnimation = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
  transform: scale(1.2);
}
100% {
opacity: 0;

}
`;

const LinkTitle = styled(StyledLink)`
  margin-left: 10px;
  animation: ${titleAnimation} 2s linear infinite;
`;

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch(`${coinId}/price`);
  const chartMatch = useMatch(`${coinId}/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<infoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<priceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    { refetchInterval: 5000 }
  );

  if (infoLoading || tickersLoading) {
    return <div>Loading...</div>;
  }

  const loading = infoLoading || tickersLoading;

  const newLocal = "none";
  return (
    <CoinWrapper>
      <HelmetProvider>
        <Helmet>
          <title>{state?.name}</title>
        </Helmet>
      </HelmetProvider>
      <TitleContainer>
        <TitleImg
          src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
        />
        <LinkTitle to="/BuyNow!!" style={{ textDecoration: "none" }}>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </LinkTitle>
      </TitleContainer>
      <ContentWrapper>
        <OverViewBox>
          <OverView>
            <OverViewItem>
              <span>Name: </span>
              <span>{tickersData?.name}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Symbol: </span>
              <span>{infoData?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Rank: </span>
              <span>{infoData?.rank}</span>
            </OverViewItem>
          </OverView>
          <Description>{infoData?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>Total Supply: </span>
              <span>{tickersData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply: </span>
              <span>{tickersData?.max_supply}</span>
            </OverViewItem>
          </OverView>
        </OverViewBox>

        <PriceAndChart>
          <LinkBox>
            <LinkTo to="price" isActive={priceMatch !== null ? true : false}>
              Price
            </LinkTo>
            <LinkTo to="chart" isActive={chartMatch !== null ? true : false}>
              Chart
            </LinkTo>
          </LinkBox>
          <Outlet context={{ coinId }}></Outlet>
        </PriceAndChart>
      </ContentWrapper>
    </CoinWrapper>
  );
}

export default Coin;
