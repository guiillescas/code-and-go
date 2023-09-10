import styled from 'styled-components'

export const ProfileContainer = styled.main`
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  padding: 4rem 0 2rem;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;

  .profile-picture-wrapper {
    width: 150px;
    height: 150px;
    background: ${({ theme }) => theme.colors.neutral[700]};

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
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
