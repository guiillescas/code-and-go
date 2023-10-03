import { ReactElement, useState } from 'react'

import { FiChevronDown } from 'react-icons/fi'

import * as Styles from './styles'

import { AccordionProps } from './types'

export default function Accordion(props: AccordionProps): ReactElement {
  const [isOpen, setIsOpen] = useState(props.isOpen)

  function toggleAccordian() {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <Styles.AccordionContainer isOpen={isOpen}>
      <div
        className="header"
        role="button"
        onClick={() => {
          toggleAccordian()

          props.onAccordionOpen && props.onAccordionOpen()
        }}
      >
        <h2>{props.title}</h2>

        <FiChevronDown />
      </div>

      <div className="content" aria-hidden={!isOpen}>
        {props.children}
      </div>
    </Styles.AccordionContainer>
  )
}
