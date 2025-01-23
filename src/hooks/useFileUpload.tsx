import { ChangeEvent, useRef, useState } from 'react'

const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    if (!file) return

    setFile(file)
  }

  const deleteFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setFile(null)
  }

  const openFileSelectWindow = () => {
    fileInputRef.current?.click()
  }

  return { file, fileInputRef, deleteFile, changeFile, openFileSelectWindow }
}

export default useFileUpload
