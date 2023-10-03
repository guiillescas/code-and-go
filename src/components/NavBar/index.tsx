import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { Boogaloo } from '@next/font/google'
import { FiMenu, FiUser } from 'react-icons/fi'

import CoffeeCounter from './components/CoffeeCounter'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

const Font = Boogaloo({ subsets: ['latin'], weight: '400' })

export default function NavBar(): ReactElement {
  const router = useRouter()

  const { user, logout } = useAuth()

  const [isMenuBarVisible, setIsMenuBarVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  function handleToggleMenu() {
    setIsMenuBarVisible((prevState) => !prevState)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Styles.NavBarContainer>
      <div className="content">
        <div className="left-side-wrapper">
          <Link className={Font.className} href="/">
            Code&go
          </Link>

          {isMenuBarVisible && (
            <div className="burger-icon-wrapper">
              <FiMenu size={24} role="button" onClick={handleToggleMenu} />
            </div>
          )}

          {!isMenuBarVisible && (
            <nav>
              <Link href="/">Home</Link>
              <Link href="/courses">Meus cursos</Link>
              <Link href="/community">Comunidade</Link>
            </nav>
          )}
        </div>

        <div className="right-side-wrapper">
          <CoffeeCounter couter={isClient ? user.streakCount : 0} />

          <div className="profile-picture">
            {user.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt={`Imagem de ${user.firstName}`}
                width={40}
                height={40}
              />
            ) : (
              <div className="no-image-wrapper">
                <FiUser size={18} />
              </div>
            )}

            <div className="dropdown-menu">
              <div onClick={() => router.push('/profile')} role="button">
                Meu perfil
              </div>

              <div onClick={logout} role="button">
                Sair
              </div>
            </div>
          </div>
        </div>
      </div>
    </Styles.NavBarContainer>
  )
}
