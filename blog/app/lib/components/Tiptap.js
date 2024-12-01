'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'


const Tiptap = (editorContent, onChange) => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Heading.configure({
            HTMLAttributes: {
                class: "text-xl font-bold capitalize",
                levels: [6],
            },
        }),
    ],
    immediatelyRender: false,
    editorProps: {
        attributes: {
            class:
                "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
        },
    },
    content: editorContent,
    onUpdate: ({editor}) => {
        onChange(editor.getHTML())
    }
  })

  if(!editor){
    return null
  }

  return (
    <div className='flex flex-col justify-stretch min-h-[200px] border rounded border-b-0'>
        <div className='flex items-center gap-2 mb-2'>
            <button type='button' onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200" : ""}`} title='Bold (Ctrl+B)'>
                <b>B</b>
            </button>
        </div>
    </div>
  )
}
export default Tiptap
