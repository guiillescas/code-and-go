import { ThemeInterface } from '../@types/styled-components'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle<{ theme: ThemeInterface }>`
  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  input[type="radio"]{
    accent-color: ${({ theme }) => theme.colors.green[700]};
  }

  body, html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  
  body {
    background: ${({ theme }) => theme.colors.neutral[900]};
  }

  html {
    font-size: 100%;

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.neutral[700]};
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.neutral[500]}; 
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.neutral[300]}; 
    }

    @media (max-width: 768px) {
      font-size: 97.5%;
    }
  }

  body,
  input,
  button {
    color: ${({ theme }) => theme.colors.white[500]};

    font-size: 1rem;

    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.green[500]};
    }
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
  }

  .react-modal-overlay-sidebar {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;

    border: 0;

    background: transparent;

    transition: background-color 0.1s;
    z-index: 1600;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.white[600]};
    }
  }

  /**
  * Dracula Theme originally by Zeno Rocha [@zenorocha]
  * https://draculatheme.com/
  *
  * Ported for PrismJS by Albert Vallverdu [@byverdu]
  */

  code[class*="language-"],
  pre[class*="language-"] {
    color: #f8f8f2;
    background: none;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #282a36;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6272a4;
  }

  .token.punctuation {
    color: #f8f8f2;
  }

  .namespace {
    opacity: .7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #ff79c6;
  }

  .token.boolean,
  .token.number {
    color: #bd93f9;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #50fa7b;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #f8f8f2;
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.class-name {
    color: #f1fa8c;
  }

  .token.keyword {
    color: #8be9fd;
  }

  .token.regex,
  .token.important {
    color: #ffb86c;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`
