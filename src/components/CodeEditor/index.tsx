import React, { useState } from 'react'

import Editor from '@monaco-editor/react'

import { CodeEditorWindowProps } from './types'

const CodeEditorWindow = (props: CodeEditorWindowProps) => {
  const [value, setValue] = useState(props.code || '')

  function handleEditorChange(value: string | undefined) {
    setValue(value || '')

    props.onChange('code', value)
  }

  return (
    <div>
      <Editor
        height="350px"
        width={`100%`}
        language={props.language || 'javascript'}
        value={value}
        theme={props.theme}
        // defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  )
}
export default CodeEditorWindow
