import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { Boogaloo } from '@next/font/google'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

const Font = Boogaloo({ subsets: ['latin'], weight: '400' })

export default function LeftBar(): ReactElement {
  const { logout } = useAuth()

  return (
    <Styles.LeftBarContainer>
      <div className="logo-wrapper">
        <Image src="/logo.png" alt="Logo de Code & Go" width={32} height={36} />

        <Link className={`${Font.className} logo`} href="/">
          Code&go
        </Link>
      </div>

      <div className="links-wrapper main">
        <Link href="/" className="link">
          &#127968; Aprender
        </Link>
        <Link href="/courses" className="link">
          &#x1F4DA; Meus cursos
        </Link>
        <Link href="/community" className="link">
          &#x1F4AC; Comunidade
        </Link>
        <Link href="/ranking" className="link">
          &#x1F3C6; Ranking
        </Link>
        <Link href="/profile" className="link">
          &#x1F916; Meu perfil
        </Link>
      </div>

      <div className="links-wrapper">
        <button type="button" onClick={logout} className="link">
          &#x1F4A4; Sair
        </button>
      </div>
    </Styles.LeftBarContainer>
  )
}
