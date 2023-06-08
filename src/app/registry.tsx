'use client'

import { useServerInsertedHTML } from 'next/navigation'
import React, { useState } from 'react'

import { getCssText } from 'styles'

export default function StitchesRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [isRendered, setIsRendered] = useState(false)

  useServerInsertedHTML(() => {
    if (!isRendered) {
      setIsRendered(true)
      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      )
    }
  })

  return <>{children}</>
}
