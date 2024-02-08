/* eslint-disable prettier/prettier */
import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  data: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      data: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    localStorage.setItem('notes', JSON.stringify(notesArray))

    setNotes(notesArray)
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => note.id !== id)
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
        note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
      : notes

  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6 px-5">
      <img src={logo} alt="" />

      <form className="w-full">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Busque suas notas"
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  )
}
