import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import Button from '@/components/Button'
import { Boogaloo } from '@next/font/google'

import * as Styles from './styles'

const Font = Boogaloo({ subsets: ['latin'], weight: '400' })

export default function LP(): ReactElement {
  const router = useRouter()

  function redirectToRegisterPage() {
    router.push('/register')
  }

  return (
    <Styles.LPContainer>
      <main>
        <nav>
          <p className={Font.className}>Code&go</p>

          <div>
            <button
              type="button"
              className="secondary"
              onClick={() => router.push('/login')}
            >
              Entrar
            </button>
            <button
              type="button"
              className="primary"
              onClick={redirectToRegisterPage}
            >
              Cadastrar
            </button>
          </div>
        </nav>

        <section id="intro">
          <div className="background one" />
          <div className="background three" />
          <div className="background four" />

          <div className="left">
            <h1>
              Uma plataforma para você interagir com amigos enquanto aprende!
            </h1>
            <p>
              Aqui você pode aprender programação diariamente, de uma forma
              divertida. Ganhe pontos por exercícios finalizados corretamente e
              fique no topo do ranking.
            </p>

            <div className="button-wrapper">
              <Button onClick={redirectToRegisterPage}>
                Quero me cadastrar
              </Button>
            </div>
          </div>

          <div className="right">
            <Image
              src="/assets/tech_guy.svg"
              alt="Imagem de um boneco ilustrado mexendo em um computador"
              width={350}
              height={350}
            />
          </div>
        </section>

        <section id="benefits">
          <h2>No Code & Go, você vai:</h2>

          <div className="item left">
            <Image
              src="/assets/rocket.svg"
              alt="Ilustração de um foguete"
              width={210}
              height={210}
            />

            <div>
              <h3>Evoluir rápido</h3>
              <p>
                Aqui focamos em prática. Resolva exercícios de forma prática e
                objetiva. E melhor, os resultados saem na hora.
              </p>
            </div>
          </div>
          <div className="item right">
            <div>
              <h3>Interagir com amigos</h3>
              <p>
                Fique à frente de seus amigos acertando mais exercícios e
                subindo no ranking!
              </p>
            </div>

            <Image
              src="/assets/friends.svg"
              alt="Ilustração de amigos conversando"
              width={210}
              height={210}
            />
          </div>

          <div className="item left">
            <Image
              src="/assets/options.svg"
              alt="Ilustração de um foguete"
              width={210}
              height={210}
            />

            <div>
              <h3>Aprender diversas linguagens</h3>
              <p>
                Aqui você escolhe a linguagem que quer aprender e exercitar.
                Embarque nesse foguete e veja
              </p>
            </div>
          </div>

          <div className="callback-button-action">
            <Button onClick={redirectToRegisterPage}>Quero me cadastrar</Button>
          </div>
        </section>
      </main>
    </Styles.LPContainer>
  )
}
