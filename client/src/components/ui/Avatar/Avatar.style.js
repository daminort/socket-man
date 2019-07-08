import styled from 'styled-components';

import { Avatar } from '../../lib';
import { THEME } from '../../../constants/theme';

const { bg, text, border } = THEME;

export const StyledWrapper = styled(Avatar)`
  &.ant-avatar {
  	min-width: 40px;
  	background-color: ${bg.mainContent};
  	color: ${text.main};
  	border: 1px solid ${border.history};
  }
  
  &.left {
  	margin-right: 8px;
  }
  &.right {
  	margin-left: 8px;
  }
`;
