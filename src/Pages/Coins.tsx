import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100%;
  padding: 20px;
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 64px;
  color: ${(props) => props.theme.accentColor};
`;

const CoinsList = styled.ul`
  width: 50%;
  margin: 0 auto;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 24px;
  font-weight: 700;
  transition: 300ms ease-in;
`;

export const CoinImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 8px;
  transition: 300ms all;
`;

const CoinsItem = styled.li`
  list-style: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  font-size: 18px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.textColor};
  &:hover {
    ${CoinImg} {
      transform: scale(1.05) rotate(15deg);
    }
  }
  a {
    height: 50px;
  }
`;

const Loader = styled.span`
  color: white;
  font-size: 48px;
  text-align: center;
  display: block;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Crypto Tracker</Title>
      </Header>
      {isLoading ? (
        <Loader>'Loading...'</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((item) => {
            return (
              <CoinsItem key={item.id}>
                <StyledLink to={`/${item.id}`} state={item}>
                  <CoinImg
                    src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}
                  />
                  <span>{item.name} &rarr;</span>
                </StyledLink>
              </CoinsItem>
            );
          })}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
