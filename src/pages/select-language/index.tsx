import Image from 'next/image'
import { ReactElement } from 'react'

import * as Styles from './styles'

const languages = [
  {
    id: 1,
    title: 'JavaScript',
    imageScr: '/js.jpeg',
    description:
      'Desperte a magia nos seus sites: domine a interatividade com JavaScript.',
  },
  {
    id: 2,
    title: 'C#',
    imageScr: '/ts.png',
    description:
      'Codificação refinada e eficiente: descubra o potencial da linguagem C#.',
  },
]

export default function ConstName(): ReactElement {
  return (
    <Styles.SelectLanguageContainer>
      <h1>
        Escolha uma <span>linguagem</span>
      </h1>

      <div className="languages">
        {languages.map((language) => (
          <Styles.LanguageCard key={language.id} type="button">
            <Image
              src={language.imageScr}
              alt={`Imagem ilustrativa da linguagem de ${language.title}`}
              width={80}
              height={80}
            />

            <h2>{language.title}</h2>
            <p>{language.description}</p>
          </Styles.LanguageCard>
        ))}
      </div>
    </Styles.SelectLanguageContainer>
  )
}
