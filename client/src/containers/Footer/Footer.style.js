import styled from 'styled-components';

import { Footer } from '../../components/lib';
import { THEME } from '../../constants/theme';

const { height, bg } = THEME;

export const Wrapper = styled(Footer)`
  &.ant-layout-footer {
  	display: flex;
  	align-items: center;
  	height: ${height.footer}px;
  	background-color: ${bg.footer};
  	padding: 0 16px;
  	font-size: 12px;
  }
`;
