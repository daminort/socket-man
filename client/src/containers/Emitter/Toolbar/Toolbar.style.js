import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { height } = THEME;

export const Wrapper = styled.div`
	display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${height.emitterToolbar}px;
  
  .ant-btn {
  	margin-left: 8px;
  }
  
  .left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		form {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	
	.visible {
		opacity: 1;
		transition: opacity .3s ease-in-out;
	}
	
	.non-visible {
		opacity: 0;
		transition: opacity .3s ease-in-out;
	}
`;
