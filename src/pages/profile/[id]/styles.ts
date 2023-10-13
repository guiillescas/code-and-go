import styled from 'styled-components'

export const ProfileContainer = styled.main`
  width: 100%;
  margin: 0 auto;

  padding: 2rem 0;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;

  .profile-picture-wrapper {
    position: relative;

    width: 150px;
    height: 150px;
    background: ${({ theme }) => theme.colors.neutral[700]};

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

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
  }
`
