import styled from 'styled-components'

export const QuestionContainer = styled.div`
  padding: 0 1rem 1rem;

  p {
    margin-left: 0.75rem;
    margin-bottom: 0.5rem;
    font-weight: 400;

    margin-top: 0.25rem;
  }
  .option {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.25rem;
    margin: 0.25rem 0;

    > label {
      cursor: pointer;
      transition: opacity 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
