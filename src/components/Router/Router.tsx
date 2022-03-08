import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import Play from '../../pages/Play/Play';
import WelcomeScreen from '../../pages/WelcomeScreen/WelcomeScreen';

const Router: FunctionComponent = () => {

  return (
    <Routes>
      <Route path="/" element={ <WelcomeScreen/> }/>
      <Route path="/play" element={ <Play/> }/>
      <Route path="*" element={ <WelcomeScreen /> }/>
    </Routes>
  );

};

export default Router;
