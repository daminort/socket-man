import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { bg, border, height } = THEME;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - ${height.header}px - ${height.footer}px - 96px);
  max-height: calc(100vh - ${height.header}px - ${height.footer}px - 96px);
  background-color: ${bg.panel};
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${border.history};
  overflow-y: auto;
`;
