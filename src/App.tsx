import "./CSS/index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Coins from "./Pages/Coins";
import Coin from "./Pages/Coin";
import Price from "./Pages/Price";
import Chart from "./Pages/Chart";
import BuyNow from "./Pages/BuyNow";
import { ThemeProvider, keyframes, styled } from "styled-components";
import { FaBackward, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const backBtnAnimation = keyframes`
    0% {
        transform: translate(0);
    }
    50% {
        transform: translateX(-10px);
    }    
    100% {
      transform: translate(0);
    }
`;

const BackBtn = styled.button`
  position: fixed;
  top: 50px;
  left: 50px;
  border-radius: 50%;
  font-size: 18px;
  padding: 12px;
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  &:hover {
    animation: ${backBtnAnimation} 1s linear infinite;
  }
`;

const ThemeAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const ThemeBtn = styled.button`
  position: fixed;
  color: ${(props) => props.theme.textColor};
  background: none;
  outline: none;
  border: none;
  bottom: 50px;
  left: 50px;
  font-size: 32px;
  cursor: pointer;
  &:hover {
    animation: ${ThemeAnimation} 5s linear infinite;
  }
`;

function App() {
  const navigate = useNavigate();

  const isDark = useRecoilValue(isDarkAtom);
  const setterFn = useSetRecoilState(isDarkAtom);

  const toggleTheme = () => {
    setterFn((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDark ? lightTheme : darkTheme}>
      <div className="App">
        <BackBtn onClick={() => navigate("")}>
          <FaBackward />
        </BackBtn>
        <ThemeBtn onClick={toggleTheme}>
          {isDark ? <FaSun /> : <FaMoon />}
        </ThemeBtn>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId" element={<Coin />}>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Route>
          <Route path="BuyNow!!" element={<BuyNow />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
