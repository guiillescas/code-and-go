import styled from 'styled-components'

export const SelectLanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    margin-top: 2rem;

    font-size: 3rem;

    > span {
      color: ${({ theme }) => theme.colors.primary[500]};
    }
  }

  .languages {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    margin-top: 1rem;
  }
`

export const LanguageCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  width: 100%;
  max-width: 230px;
  height: 220px;

  background: ${({ theme }) => theme.colors.neutral[700]};

  padding: 1rem;

  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 20px 0px;
  border: 1px solid transparent;

  transition: transform 0.1s ease-out, border 0.1s ease-out;

  cursor: pointer;

  &:hover {
    transform: scale(102%);
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }

  > img {
    object-fit: contain;

    width: 80px;
    height: 80px;
  }

  > h2 {
    font-size: 2rem;
  }
`
