import styled from 'styled-components'

export const BreadcrumbContainer = styled.div`
  a {
    color: ${({ theme }) => theme.colors.white[500]};

    &:hover {
      color: ${({ theme }) => theme.colors.white[600]};
    }
  }

  span {
    padding: 0 0.5rem;
  }
`
