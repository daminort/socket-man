import styled from 'styled-components';
import { THEME } from '../../constants/theme';

const { text } = THEME;

export const Wrapper = styled.div`
  display: block;
  
  .ant-menu-inline > .ant-menu-item {
  	height: auto;
		min-height: 40px;
  }
  
  .menu-item {
  	position: relative;
  	display: flex;
  	justify-content: flex-start;
  	align-items: center;
  	
		.type {
			width: 40px;
			color: ${text.sidebarType};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 8px;
		}
		
		.remove {
			position: absolute;
			right: 1px;
			opacity: 0;
			transition: opacity .3s linear;
		}
		
		&:hover {
			.remove {
				opacity: 1;
			}
		}
  }
  
  .ant-menu-item-selected {
  	.menu-item {
  		.type {
  			color: ${text.inverted};
  		}
  		.remove {
				opacity: 1;
			}
  	}
  }
  
  .ant-menu-inline-collapsed > .ant-menu-item {
  	padding: 0 8px!important;
  	.menu-item {
  		justify-content: center;
  		.type {
  			text-align: center;
  		} 
  	}
  }
`;
