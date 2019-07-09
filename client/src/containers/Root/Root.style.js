import styled from 'styled-components';
import { MIN_HEIGHTS } from '../../constants/theme';

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  min-height: calc(100vh - ${MIN_HEIGHTS.leftContainer}px);
`;
