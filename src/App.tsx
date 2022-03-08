import React, { FunctionComponent } from 'react';
import Router from './components/Router/Router';
import styled from 'styled-components';
import DefaultCursor from './assets/images/cursor-default.png';

const App: FunctionComponent = () => {

  return (
    <AppContainer>
      <Router/>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  cursor: url(${ DefaultCursor }), auto;
`;
