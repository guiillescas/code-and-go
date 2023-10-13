import styled from 'styled-components'

export const AdminNavBarContainer = styled.div`
  background: ${({ theme }) => theme.colors.neutral[700]};
  width: 100%;

  > .content {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    padding: 1rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .left-side-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .logo-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > a {
          font-size: 1.5rem;
          cursor: pointer;
          text-decoration: none;
          color: ${({ theme }) => theme.colors.white[500]};
        }

        > span {
          font-weight: bold;
          font-size: 0.75rem;
          margin-top: 0.25rem;

          background: ${({ theme }) => theme.colors.green[700]};

          padding: 0.125rem;
          border-radius: 4px;
        }
      }

      .burger-icon-wrapper {
        margin-left: 1rem;
      }

      > nav {
        margin-left: 2rem;

        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;

        > a {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.white[500]};

          &:hover {
            color: ${({ theme }) => theme.colors.white[600]};
          }
        }
      }
    }

    .right-side-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .profile-picture {
        position: relative;

        display: flex;
        flex-direction: center;
        align-items: center;

        cursor: pointer;

        &:hover {
          > img {
            opacity: 0.8;
          }

          .dropdown-menu {
            display: block;
          }
        }

        > img {
          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white[500]};

          display: inline-block;

          margin: 0.5rem;
        }

        .no-image-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white[500]};

          margin: 0.5rem;

          width: 40px;
          height: 40px;
        }

        .dropdown-menu {
          position: absolute;

          width: 100%;
          min-width: 150px;

          display: none;

          top: calc(40px + 0.5rem);

          background: ${({ theme }) => theme.colors.neutral[900]};

          > div {
            padding: 0.5rem;

            &:hover {
              opacity: 0.8;
            }

            a {
              text-decoration: none;
              color: ${({ theme }) => theme.colors.white[500]};
            }
          }
        }
      }
    }
  }
`
