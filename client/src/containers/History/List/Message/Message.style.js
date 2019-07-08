import styled from 'styled-components';
import { THEME } from '../../../../constants/theme';

const { bg, border } = THEME;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 8px;
			
	&.right {
		flex-direction: row-reverse;
	}
	
	.content {
		position: relative;
		padding: 8px 16px;
		background-color: ${bg.mainContent};
		border-radius: 8px;
		border: 1px solid ${border.history};
		
		&::before {
			content: '';
			position: absolute;
			top: 14px;
			width: 12px;
			height: 12px;
			transform: rotate(45deg);
			background-color: ${bg.mainContent};
			border: 1px solid transparent;
		}
		
		.tags {
			margin-top: 8px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
		}
		
		&.left {
			margin-left: 8px;
			margin-right: 0px;
			
			&::before {
				left: -6px;
				border-left-color: ${border.history};
				border-bottom-color: ${border.history};
			}
		}
		
		&.right {
			margin-left: 0px;
			margin-right: 8px;
			
			&::before {
				right: -6px;
				border-right-color: ${border.history};
				border-top-color: ${border.history};
			}
			
			.tags {
				flex-direction: row-reverse;
			}
		}
	}
`;
