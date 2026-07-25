'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ textToCopy, label = 'Copiar' }: { textToCopy: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    
    if (!textToCopy) return

    // Safest approach for mobile (iOS/Android):
    // 1. Only use navigator.clipboard if it exists.
    // 2. Do not use textarea/execCommand hacks asynchronously as they can crash WebViews.
    if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch(err => {
          console.error('Falha na cópia nativa:', err)
        })
    } else {
      // Very simple synchronous fallback if clipboard API is not available
      try {
        const textArea = document.createElement("textarea")
        textArea.value = textToCopy
        textArea.style.position = "fixed"
        textArea.style.opacity = "0"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Falha no fallback:', err)
      }
    }
  }

  if (!textToCopy) return null

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-600">Copiado!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  )
}
