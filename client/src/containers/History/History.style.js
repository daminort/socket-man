import styled from 'styled-components';
import { THEME } from '../../constants/theme';
import { Layout } from '../../components/lib';

const { bg } = THEME;

export const Wrapper = styled(Layout)`
	&.ant-layout {
  	background-color: ${bg.mainContent};
  }
`;
