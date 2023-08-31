import React from 'react'

import { customStyles } from '@/constants/customStyles'
import monacoThemes from 'monaco-themes/themes/themelist.json'
import Select from 'react-select'

const ThemeDropdown = ({ handleThemeChange, theme }: any) => {
  return (
    <Select
      placeholder={`Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  )
}

export default ThemeDropdown
