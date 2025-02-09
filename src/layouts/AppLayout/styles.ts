import styled from 'styled-components'

export const AppLayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .children {
    width: 100%;
    max-width: 1200px;

    margin: 0 auto;

    padding: 2rem 0;
  }
`
