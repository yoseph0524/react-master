import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Pages/Coin";
import Coins from "./Pages/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
