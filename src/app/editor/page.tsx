'use client'
import Modal from '@/components/common/modal'
import ImageEditor from '@/components/editor/image-editor'

export default function EditorPage() {
  return (
    <main className="pt-3">
      <Modal />
      <ImageEditor />
    </main>
  )
}
