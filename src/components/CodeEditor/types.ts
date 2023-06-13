import { OnChange, Theme } from "@monaco-editor/react"

export interface CodeEditorWindowProps {
  onChange: OnChange
  language: string
  code: string
  theme: Theme | string
}