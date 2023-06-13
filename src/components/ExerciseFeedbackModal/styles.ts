import styled from 'styled-components';

import BaseModal from '../BaseModal';

export const ExerciseFeedbackModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: 100%;

  text-align: center;

  svg {
    margin: 1rem 0;
  }

  > h4 {
    font-size: 1.25rem;
  }
`;