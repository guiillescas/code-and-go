import styled from 'styled-components'

export const ProfileContainer = styled.main`
  width: 100%;
  margin: 0 auto;

  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;

  .profile-picture-wrapper {
    position: relative;

    width: 150px;
    height: 150px;
    background: ${({ theme }) => theme.colors.neutral[800]};

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    /* &:hover {
      background: ${({ theme }) =>
      `linear-gradient(${theme.colors.neutral[700]} 70%, ${theme.colors.neutral[700]} 50%, #000)`};

      cursor: pointer;

      label {
        opacity: 1;
      }
    } */

    img {
      border-radius: 50%;
    }

    label {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 0.75rem;

      position: absolute;

      width: 150px;
      height: 150px;

      border-radius: 50%;

      cursor: pointer;
      opacity: 0;
    }

    #upload-photo {
      opacity: 0;
      position: absolute;
      z-index: -1;
    }
  }

  > p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }

  .box {
    background: ${({ theme }) => theme.colors.neutral[900]};

    border: 3px solid ${({ theme }) => theme.colors.neutral[700]};
    border-radius: 10px;

    padding: 1rem;
    margin-bottom: 1rem;

    width: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  > form {
    width: 100%;
    max-width: 500px;

    > h2 {
      margin-bottom: 1rem;
    }

    > p {
      margin-bottom: 1.25rem;
    }
  }
`
