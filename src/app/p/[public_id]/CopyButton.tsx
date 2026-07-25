'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ textToCopy, label = 'Copiar' }: { textToCopy: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    
    if (!textToCopy) return

    const fallbackCopyTextToClipboard = (text: string) => {
      const textArea = document.createElement("textarea")
      textArea.value = text
      
      // Evitar scroll
      textArea.style.top = "0"
      textArea.style.left = "0"
      textArea.style.position = "fixed"

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const successful = document.execCommand('copy')
        if (successful) {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
      } catch (err) {
        console.error('Fallback: Oops, não foi possível copiar', err)
      }

      document.body.removeChild(textArea)
    }

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(textToCopy)
      return
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error('Falha ao copiar:', err)
      fallbackCopyTextToClipboard(textToCopy)
    })
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
