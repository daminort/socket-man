import styled from 'styled-components';

export const Wrapper = styled.div`
	display: block;
	
	form {
		margin-top: 8px;
		
		.buttons {
			display: flex;
			justify-content: space-between;
			margin-top: 8px;
			
			.left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.ant-btn {
					margin-right: 8px;
				}
			}
			
			.right {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
`;
