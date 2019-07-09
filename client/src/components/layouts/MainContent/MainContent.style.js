import styled from 'styled-components';
import { Content as AntContent } from '../../lib';
import { THEME, MIN_HEIGHTS } from '../../../constants/theme';

const { bg, margin, padding } = THEME;

export const Content = styled(AntContent)`
  margin: ${margin.mainContent}px;
  .main-content {
  	background-color: ${bg.mainContent};
  	min-height: calc(100vh - ${MIN_HEIGHTS.mainContent}px);
  	padding: ${padding.mainContent}px;
  }
`;
