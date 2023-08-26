import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { log } from "console";

const Containter = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-itmes: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor}
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
}
  &:hover {
    a {
        color: ${(props) => props.theme.accentColor}
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Containter>
      <Header>
        <Title>Coin</Title>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
              ;
            </Coin>
          ))}
        </CoinsList>
      )}
    </Containter>
  );
}

export default Coins;
