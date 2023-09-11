import styled from 'styled-components'

export const FriendshipRequestCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.25rem;

  border-radius: 6px;

  background: ${({ theme }) => theme.colors.neutral[700]};

  &:hover {
    > img {
      opacity: 0.8;
    }

    .dropdown-menu {
      display: block;
    }
  }

  > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: flex-start;

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
      border: 1px solid ${({ theme }) => theme.colors.white[500]};

      margin: 0.5rem;

      width: 40px;
      height: 40px;
    }
  }

  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.25rem;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;

      background: none;

      padding: 0.5rem;

      border: none;
      border-radius: 50%;

      cursor: pointer;

      &.confirm:hover {
        background: rgba(59, 196, 169, 0.5);
      }
      &.cancel:hover {
        background: rgba(239, 68, 68, 0.5);
      }
    }
  }
`
