import React from 'react';
import styled from 'react-emotion';

import { Selector } from '..';

const Header = styled.header`
  flex: 0 0 auto;
  height: 40px;
  background-color: red;
`;

function HeaderComponent({ algorithms, defaultAlgorithm, handleAlgorithmChange }) {
  return (
    <Header>
      <Selector defaultValue={defaultAlgorithm} items={algorithms} onAlgorithmChange={handleAlgorithmChange} />
    </Header>
  );
}

export { HeaderComponent as Header };
