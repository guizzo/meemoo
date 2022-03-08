import { ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (name: string) => any;
}

const SetPlayer: FunctionComponent<Props> = ({ name, onChange, onClick }) => {

  const onClickHandler = (name: string) => onClick(name);

  return (
    <Container>
      <input
        type="text"
        value={ name }
        onChange={ onChange }/>
      <button
        onClick={ onClickHandler(name) }>Gioca!</button>
    </Container>
  );

};

export default SetPlayer;

const Container = styled.div`
  
`;
