import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { height } = THEME;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${height.historyToolbar}px;
  
  .right {
  	display: flex;
  	justify-content: flex-end;
  }
`;
