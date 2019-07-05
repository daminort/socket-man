import styled from 'styled-components';
import { Content as AntContent } from '../../lib';
import { THEME } from '../../../constants/theme';

const { bg, height } = THEME;

export const Content = styled(AntContent)`
  margin: 8px 8px;
  .main-content {
  	background-color: ${bg.mainContent};
  	min-height: calc(100vh - 16px - ${height.header}px - ${height.footer}px);
  	padding: 16px;
  }
`;
