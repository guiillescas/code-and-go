import styled from 'styled-components'

export const HomeContainer = styled.main`
  #intro {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    .welcome {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  #courses {
    margin-top: 5rem;
  }
`

export const HomeIntroCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.neutral[700]};

  border-radius: 6px;

  padding: 1rem;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    border: 0;
    border-radius: 6px;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    background-color: ${({ theme }) => theme.colors.green[500]};

    padding: 0.5rem;

    transition: opacity 0.2s;

    cursor: pointer;

    font-weight: bold;

    &:hover {
      opacity: 0.8;
    }

    > svg {
      margin-left: 2px;
    }
  }
`

export const CoursesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 340fr));
  gap: 2rem;

  margin-top: 1.5rem;
`
