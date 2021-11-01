import { createGlobalStyle, css } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  ${({ theme }) => {
    return css`
      body {
        background: ${theme.colors.theme.background};
        color: ${theme.colors.primary};
        font-family: ${theme.fonts.family.base};
      }
    `;
  }}
`;

export default GlobalStyle;