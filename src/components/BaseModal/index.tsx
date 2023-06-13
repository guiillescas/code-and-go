import { ReactElement } from 'react'

import { BaseModalProps } from './types'

import * as Styles from './styles'
import { FiX } from 'react-icons/fi'
import { primary } from '@/styles/fonts'

const BaseModal = (props: BaseModalProps): ReactElement => {
  return (
    <Styles.Container
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
      className={primary.className}
    >
      <div className="header">
        <h1>{props.title}</h1>

        <button type="button" onClick={props.onRequestClose}>
          <FiX size={20} />
        </button>
      </div>

      <div className="children">{props.children}</div>
    </Styles.Container>
  )
}

export default BaseModal
