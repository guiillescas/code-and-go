import styled from 'styled-components'

export const ModuleContainer = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  > .content {
    padding: 2rem 0;

    .breadcrumb {
      margin-bottom: 2rem;
    }

    .questions {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;
    }
  }
`
