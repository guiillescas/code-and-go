import { ReactElement } from 'react'

import { FiCoffee } from 'react-icons/fi'
import { useTheme } from 'styled-components'

import * as Styles from './styles'

import { CoffeeCounterProps } from './types'

export default function CoffeeCounter(props: CoffeeCounterProps): ReactElement {
  const theme = useTheme()

  return (
    <Styles.CoffeeCounterContainer>
      <p>{props.couter}</p>

      <FiCoffee color={theme?.colors.green[500]} />
    </Styles.CoffeeCounterContainer>
  )
}
