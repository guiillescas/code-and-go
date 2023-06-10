import { useState } from 'react'

import Editor from 'react-simple-code-editor'

export default function Home() {
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)

  function test(code: string) {
    console.log('a')

    return code
  }

  return (
    <>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => test(code)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </>
  )
}
