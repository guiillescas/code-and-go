import styled from 'styled-components'

export const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  min-height: 100vh;
  width: 100%;
  min-width: 100vw;

  > div {
    background: ${({ theme }) => theme.colors.neutral[700]};

    border-radius: 10px;

    padding: 1rem;

    > h1 {
      margin-bottom: 1.5rem;
    }

    > a {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      color: ${({ theme }) => theme.colors.white[500]};

      svg {
        margin-right: 0.25rem;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      min-width: 450px;

      margin-top: 1rem;

      .recover-password {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        width: 100%;

        > a {
          color: ${({ theme }) => theme.colors.primary[500]};

          animation: opacity 0.2s;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      > button {
        margin-top: 1rem;
      }
    }

    .or {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      width: fit-content;
      margin: 0 auto;

      margin-top: 1rem;

      > span {
        width: 100%;
        max-width: 100px;
        min-width: 50px;
        height: 3px;

        &:first-child {
          background: ${({ theme }) =>
            `linear-gradient(to right, ${theme.colors.neutral[700]}, #3388ff)`};
        }
        &:last-child {
          background: ${({ theme }) =>
            `linear-gradient(to left, ${theme.colors.neutral[700]}, #3388ff)`};
        }
      }
    }

    .social-medias-buttons {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 1rem;

      > button {
        background: #fff;
        border: none;

        padding: 0.25rem;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 6px;

        animation: opacity 0.2s;

        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .register-wrapper {
      margin-top: 2rem;

      text-align: center;

      > p {
        a {
          color: ${({ theme }) => theme.colors.primary[500]};

          animation: opacity 0.2s;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
`
