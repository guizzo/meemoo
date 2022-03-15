import React, { FunctionComponent, useEffect } from 'react';
import Router from './components/Router/Router';
import styled from 'styled-components';
import DefaultCursor from './assets/images/cursor-default.png';
import useAudio from './hooks/useAudio';
import useGame from './hooks/useGame';

const App: FunctionComponent = () => {

  const { touched, startPlayMusic, stopPlayMusic, startWowEffect, startGoodEffect, startPoorEffect, effectIsPlaying } = useAudio();

  const { isScoreStored, score } = useGame();

  useEffect(() => {
    if (touched) {
      startPlayMusic();
    }
  }, [ touched, startPlayMusic ]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isScoreStored) {
      stopPlayMusic();
      if (!effectIsPlaying) {
        timeout = setTimeout(() => {
          if (score > 1000) {
            startWowEffect();
          } else if (score > 400) {
            startGoodEffect();
          } else {
            startPoorEffect();
          }
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [ isScoreStored, stopPlayMusic, score, startWowEffect, startGoodEffect, startPoorEffect, effectIsPlaying ]);

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
