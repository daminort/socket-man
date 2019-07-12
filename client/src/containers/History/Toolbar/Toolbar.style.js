import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { height } = THEME;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${height.historyToolbar}px;
  
  .left {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		form {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			
			.form-field, .ant-btn {
				margin-right: 8px;
			}
		}
	}
	
	.right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
`;
