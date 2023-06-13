import styled from 'styled-components'

export const NavBarContainer = styled.div`
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

      > a {
        font-size: 1.5rem;
        cursor: pointer;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.white[500]};
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
      .profile-picture {
        position: relative;
        border-radius: 50%;

        display: flex;
        flex-direction: center;
        align-items: center;

        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }

        > img {
          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white[500]};
        }
      }
    }
  }
`
