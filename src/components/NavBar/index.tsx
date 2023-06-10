import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useState } from 'react'

import { Boogaloo } from '@next/font/google'
import { FiMenu } from 'react-icons/fi'

import * as Styles from './styles'

const Font = Boogaloo({ subsets: ['latin'], weight: '400' })

export default function NavBar(): ReactElement {
  const [isMenuBarVisible, setIsMenuBarVisible] = useState(false)

  function handleToggleMenu() {
    setIsMenuBarVisible((prevState) => !prevState)
  }

  return (
    <Styles.NavBarContainer>
      <div className="content">
        <div className="left-side-wrapper">
          <p className={Font.className}>Code&go</p>

          {isMenuBarVisible && (
            <div className="burger-icon-wrapper">
              <FiMenu size={24} role="button" onClick={handleToggleMenu} />
            </div>
          )}

          {!isMenuBarVisible && (
            <nav>
              <Link href="/">Home</Link>
              <Link href="/courses">Meus cursos</Link>
            </nav>
          )}
        </div>

        <div className="right-side-wrapper">
          <button className="profile-picture" type="button" title="Meu perfil">
            {/* TODO - Colocar nome da pessoa */}
            <Image src="/me.jpeg" alt={`Imagem de `} width={40} height={40} />
          </button>
        </div>
      </div>
    </Styles.NavBarContainer>
  )
}
