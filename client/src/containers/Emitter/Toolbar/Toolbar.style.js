import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { height } = THEME;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${height.emitterToolbar}px;
  
  .right {
  	display: flex;
  	justify-content: flex-end;
  }
`;
