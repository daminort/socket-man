import styled from 'styled-components';

import { Header } from '../../components/lib';
import { THEME } from '../../constants/theme';

const { height, bg } = THEME;

export const Wrapper = styled(Header)`
  &.ant-layout-header {
  	display: flex;
  	justify-content: space-between;
  	align-items: stretch;
  	padding: 0 24px;
  	height: ${height.header}px;
  	background-color: ${bg.header};
  	
  	.left {
  		display: flex;
  		justify-content: flex-start;
  		align-items: center;
  		
  		span {
  			margin-right: 8px;
  		}
  	}
  	
  	.right {
  		display: flex;
  		justify-content: flex-end;
  		align-items: center;
  	}
  }
`;
