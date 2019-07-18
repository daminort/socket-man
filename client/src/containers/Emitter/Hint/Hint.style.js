import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { text, border } = THEME;

export const Wrapper = styled.div`
  display: block;
  padding: 4px 8px;
  color: ${text.hint};
  border: 1px solid ${border.history};
  border-left: 6px solid ${border.hint};
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: 8px;
`;
