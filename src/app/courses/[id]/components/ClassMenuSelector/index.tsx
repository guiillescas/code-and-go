import { ReactElement } from 'react'

import { FiChevronDown } from 'react-icons/fi'

import * as Styles from './styles'

export default function ClassMenuSelector(): ReactElement {
  return (
    <Styles.ClassMenuSelectorContainer>
      <div className="header" role="button">
        <h2>Module 01</h2>

        <FiChevronDown />
      </div>

      <div className="content">
        <p>Exercício 01</p>
      </div>
    </Styles.ClassMenuSelectorContainer>
  )
}
