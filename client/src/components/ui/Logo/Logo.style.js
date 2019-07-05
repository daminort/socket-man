import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { height, bg, text } = THEME;

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
  height: ${height.header}px;
  background-color: ${bg.sidebar};
  color: ${text.inverted};
  font-family: Georgia, Times, 'Times New Roman', serif;
  font-size: 24px;
  font-weight: bold;
`;
