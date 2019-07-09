import styled from 'styled-components';
import { THEME, MIN_HEIGHTS } from '../../../constants/theme';

const { bg, border, margin } = THEME;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - ${MIN_HEIGHTS.historyList}px);
  max-height: calc(100vh - ${MIN_HEIGHTS.historyList}px);
  background-color: ${bg.panel};
  margin-top: ${margin.historyList}px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${border.history};
  overflow-y: auto;
`;
