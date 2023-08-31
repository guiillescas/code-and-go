import styled from 'styled-components'

export const LoadingContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 4.75rem); // 4.75rem from NavBar

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
`
