import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import { Boogaloo } from '@next/font/google'
import { FiMenu, FiUser } from 'react-icons/fi'

import DayCounter from './components/DayCounter'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

const Font = Boogaloo({ subsets: ['latin'], weight: '400' })

export default function AdminNavBar(): ReactElement {
  const router = useRouter()

  const { user, logout } = useAuth()

  const [isMenuBarVisible, setIsMenuBarVisible] = useState(false)

  function handleToggleMenu() {
    setIsMenuBarVisible((prevState) => !prevState)
  }

  return (
    <Styles.AdminNavBarContainer>
      <div className="content">
        <div className="left-side-wrapper">
          <div className="logo-wrapper">
            <Link className={Font.className} href="/admin/dashboard">
              Code&go
            </Link>
            <span>Admin</span>
          </div>

          {isMenuBarVisible && (
            <div className="burger-icon-wrapper">
              <FiMenu size={24} role="button" onClick={handleToggleMenu} />
            </div>
          )}

          {!isMenuBarVisible && (
            <nav>
              <Link href="/admin/courses">Cursos</Link>
              <Link href="/admin/users">Usuários</Link>
            </nav>
          )}
        </div>

        <div className="right-side-wrapper">
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
    </Styles.AdminNavBarContainer>
  )
}
