import styled from 'styled-components';
import { THEME } from '../../../constants/theme';

const { text, border } = THEME;

export const Wrapper = styled.div`
  display: block;
  color: ${text.hint};
  border: 1px solid ${border.history};
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: 8px;

  .ant-alert {
    display: flex;
    align-items: center;

    padding-left: 8px;

    .ant-alert-icon {
      position: unset;
      top: auto;
      left: auto;

      margin-right: 4px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
