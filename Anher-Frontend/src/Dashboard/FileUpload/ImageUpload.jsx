import { useEffect, useRef, useState } from 'react'
import { faCircleXmark, faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Generic image picker kept for legacy admin forms. Uploading is handled by
// the parent form; this component only provides a safe local preview.
export const ImageUpload = ({ onChange }) => {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState('')

  useEffect(() => () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview) }, [preview])

  const select = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onChange?.(file)
  }

  const clear = () => {
    setPreview('')
    if (inputRef.current) inputRef.current.value = ''
    onChange?.(null)
  }

  return (
    <div className="rounded-xl border border-brand-border bg-white p-4">
      {preview && <div className="relative mb-4 w-36 overflow-hidden rounded-xl"><img src={preview} alt="Selected preview" className="aspect-square w-full object-cover" /><button type="button" onClick={clear} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white text-red-600 shadow" aria-label="Remove selected image"><FontAwesomeIcon icon={faCircleXmark} /></button></div>}
      <input ref={inputRef} type="file" accept="image/*" onChange={select} className="hidden" />
      <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-brand-border px-4 text-xs font-bold text-brand-primary"><FontAwesomeIcon icon={faImage} /> Choose image</button>
    </div>
  )
}
