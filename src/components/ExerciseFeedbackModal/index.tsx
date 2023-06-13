import { ReactElement } from 'react'

import { ExerciseFeedbackModalProps } from './types'

import * as Styles from './styles'
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import { useTheme } from 'styled-components'
import Button from '../Button'
import { ButtonVariantsEnum } from '../Button/types'
import BaseModal from '../BaseModal'

export default function ExerciseFeedbackModal(props: ExerciseFeedbackModalProps): ReactElement {
  const theme = useTheme()

  return (
    <BaseModal
      {...props}
      title={props.isSuccess ? 'Parabêns!' : 'Que pena...'}
      maxWidth={450}
    >
      <Styles.ExerciseFeedbackModalContainer>
        {props.isSuccess ? (
          <>
            <h4>Você acertou todas as questões!</h4>
            <p>O próximo módulo está liberado :)</p>

            <FiThumbsUp size={48} color={theme?.colors.green[500]} />
          </>
        ) : (
          <>
            <h4>Você errou alguma questão...</h4>
            <p>Refaça os itens que você errou para seguir para o próximo módulo.</p>

            <FiThumbsDown size={48} color={theme?.colors.error[500]} />
          </>
        )}

        <Button variant={ButtonVariantsEnum.PRIMARY} onClick={props.onRequestClose}>Fechar</Button>
      </Styles.ExerciseFeedbackModalContainer>
    </BaseModal>
  )
}
