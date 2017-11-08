import React from 'react';
import styled from 'react-emotion';

const Header = styled.header`
  flex: 0 0 auto;
  height: 40px;
  background-color: red;
`;

function HeaderComponent() {
  return (
    <Header>

    </Header>
  );
}

export { HeaderComponent as Header }