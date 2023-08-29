import { styled } from "styled-components";
import { Link } from "react-router-dom";

const H1 = styled.div`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
`;

function BuyNow() {
  return (
    <div>
      <H1>Buy Now!! Now Is The Time!! </H1>
      <H1>
        Click&nbsp; <Link to="https://www.coinbase.com/"> Here</Link> &nbsp;to
        Buy Now
      </H1>
    </div>
  );
}

export default BuyNow;
