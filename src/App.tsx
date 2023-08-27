import "./CSS/index.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Coins from "./Pages/Coins";
import Coin from "./Pages/Coin";
import Price from "./Pages/Price";
import Chart from "./Pages/Chart";
import { ThemeProvider, keyframes, styled } from "styled-components";
import { FaBackward, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme";

const backBtnAnimation = keyframes`
    from {
        transform: translate(0);
    }
    to {
        transform: translateX(-10px);
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
    animation: ${backBtnAnimation} 700ms linear infinite;
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
  bottom: 24px;
  left: 24px;
  font-size: 48px;
  cursor: pointer;
  &:hover {
    animation: ${ThemeAnimation} 5s linear;
  }
`;

function App() {
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState("lightTheme"); // 현재 테마 모드를 상태로 관리

  const toggleTheme = () => {
    setThemeMode(themeMode === "lightTheme" ? "darkTheme" : "lightTheme"); // 테마 모드 토글
  };

  return (
    <ThemeProvider theme={themeMode === "lightTheme" ? lightTheme : darkTheme}>
      <div className="App">
        <BackBtn onClick={() => navigate("")}>
          <FaBackward />
        </BackBtn>
        <ThemeBtn onClick={toggleTheme}>
          {themeMode === "lightTheme" ? <FaMoon /> : <FaSun />}
        </ThemeBtn>
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/:coinId" element={<Coin />}>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
