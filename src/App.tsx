import styled from "styled-components";
import Circle from "./Circle";
import React, { useState } from "react";
import { log } from "console";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  const Contianer = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;

  const H1 = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  return (
    <div>
      <Contianer>
        <H1>Protected</H1>
      </Contianer>
    </div>
  );
}

export default App;
