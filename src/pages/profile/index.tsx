import Image from 'next/image'
import { ReactElement } from 'react'

import * as Styles from './styles'

export default function Profile(): ReactElement {
  return (
    <Styles.ProfileContainer>
      <div className="profile-picture-wrapper">
        <div className="profile-picture">
          <Image src="" alt={`Imagem de perfil de `} />
        </div>
      </div>
    </Styles.ProfileContainer>
  )
}
