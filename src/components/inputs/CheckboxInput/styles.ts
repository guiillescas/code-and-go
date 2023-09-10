import { lighten } from 'polished'
import styled from 'styled-components'

interface IContainerProps {
  isDisabled?: boolean
  error?: boolean
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    height: 24px;

    font-size: 1.15rem;
    font-weight: 500;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover input ~ .checkmark {
      background-color: ${({ theme, isDisabled }) =>
        !isDisabled && lighten(0.8, theme.colors.neutral[900])};
    }

    a {
      text-decoration: underline;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;

      &:checked ~ .checkmark {
        background-color: ${({ theme }) => theme.colors.neutral[900]};
      }

      &:checked ~ .checkmark:after {
        display: block;
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
      border-radius: 4px;

      border: ${({ theme, error }) =>
        error ? `1px solid ${theme.colors.primary[500]}` : ''};

      transition: background-color 0.1s;

      &:after {
        content: '';
        position: absolute;
        display: none;
      }

      &:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }

  p {
    height: 14px;
    margin-top: 0.25rem;
    color: ${({ theme, error }) =>
      error ? theme.colors.primary[500] : 'transparent'};

    transition: color 0.1s;
  }
`
