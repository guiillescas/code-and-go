import styled from 'styled-components'

export const LeftBarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  width: 100%;
  max-width: 280px;
  height: 100vh;

  background: ${({ theme }) => theme.colors.neutral[800]};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .logo-wrapper {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    margin-top: 1rem;

    .logo {
      font-size: 2.5rem;
      cursor: pointer;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.white[500]};
    }
  }

  .links-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;

    width: 100%;

    padding: 2rem;

    &.main {
      flex: 1;
    }

    .link {
      color: ${({ theme }) => theme.colors.white[500]};
      text-decoration: none;
      font-weight: bold;
      text-align: left;
      font-size: 1.25rem;

      width: 100%;

      transition: opacity 0.2s;

      border: none;
      background: transparent;

      &:hover {
        opacity: 0.7;
        cursor: pointer;
      }
    }
  }
`
