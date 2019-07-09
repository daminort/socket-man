import styled from 'styled-components';
import { THEME, MIN_HEIGHTS } from '../../constants/theme';
import { Layout } from '../../components/lib';

const { bg } = THEME;

export const Wrapper = styled(Layout)`
	&.ant-layout {
  	background-color: ${bg.mainContent};
  	min-height: calc(100vh - ${MIN_HEIGHTS.historyContainer}px);
  }
`;
