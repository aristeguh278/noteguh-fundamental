import {
    Box,
    Button,
    Input,
    Modal,
    Text,
    TextInput,
    useMantineColorScheme,
    useMantineTheme,
  } from '@mantine/core'
  import { useMediaQuery } from '@mantine/hooks'
  import { openConfirmModal } from '@mantine/modals'
  import { showNotification } from '@mantine/notifications'
  import RichTextEditor from '@mantine/rte'
  import NoteCard from '../components/NoteCard'
  import MainLayout from '../components/MainLayout'
  import NoteList from '../components/NoteList'
  import React, { useCallback, useEffect, useState } from 'react'
  import { useLocation, useSearchParams,Link } from 'react-router-dom'
  import {
    addNote,
    archiveNote,
    deleteNote,
    editNote,
    getActiveNotes,
    getSearchedNotes,
  } from '../utils/localData'
  const HomePage = () => {
    const { colorScheme } = useMantineColorScheme()
    const theme = useMantineTheme()
  
    const [filteredNotes, setFilteredNotes] = useState(getActiveNotes())
    const { search, pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
  
    const updateFilteredNotes = useCallback(() => {
      if (keyword) {
        setFilteredNotes(getSearchedNotes(getActiveNotes(), keyword))
      } else {
        setFilteredNotes(getActiveNotes())
      }
    }, [keyword])
    useEffect(
      () => updateFilteredNotes(),
      [pathname, search, updateFilteredNotes]
    )
  
    const isMobile = useMediaQuery('(max-width: 640px)')
  
    const [createOrEditNoteModalOpened, setCreateOrEditModalOpened] =
      useState(false)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [isFormValid, setIsFormValid] = useState({
      title: false,
      body: false,
    })
    const [selectedNoteId, setSelectedNoteId] = useState()
  
    const handleCloseCreateOrEditNoteModal = () => {
      setCreateOrEditModalOpened(false)
      setTitle('')
      setBody('')
      setSelectedNoteId(undefined)
      setIsFormValid({ body: false, title: false })
    }

    const myBreadCrumb = {
      name: 'Tambahkan Data',
      
    }
    
    return (
      <MainLayout
        isArchived={false}
        breadCrumbItems={[
          { title: 'Noteguh', href: '/', active: false },
          { title: 'Active Notes', href: '#', active: true },
        ]}
      >
       <Link  to="/CreateorEdit" state={myBreadCrumb}>
       <Button
          sx={{
            marginBottom: '16px',
          }}
        >
          Tambahkan Catatan
        </Button>
       </Link>
        <NoteList
          allNotesLength={getActiveNotes().length}
          filteredNotesLength={filteredNotes.length}
          isArchive={false}
          keyword={keyword ?? ''}
        >
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              isArchive={false}
              onArchive={() => {
                openConfirmModal({
                  title: 'Archive your note',
                  centered: true,
                  children: (
                    <Text size="sm">
                      Are you sure you want to archive <b>{note.title}</b> note ?
                    </Text>
                  ),
                  labels: {
                    confirm: 'Archive note',
                    cancel: "No don't archive it",
                  },
                  confirmProps: { color: 'indigo' },
                  onConfirm: () => {
                    archiveNote(note.id)
                    showNotification({
                      title: 'Success Archive Note',
                      message: 'Your note successfully archived',
                      color: 'teal',
                    })
                    updateFilteredNotes()
                  },
                })
              }}
              onDelete={() => {
                openConfirmModal({
                  title: 'Delete your note',
                  centered: true,
                  children: (
                    <Text size="sm">
                      Are you sure you want to delete <b>{note.title}</b> note ?
                      This action will permanently delete your note!
                    </Text>
                  ),
                  labels: {
                    confirm: 'Delete note',
                    cancel: "No don't delete it",
                  },
                  confirmProps: { color: 'red' },
                  onConfirm: () => {
                    deleteNote(note.id)
                    showNotification({
                      title: 'Success Delete Note',
                      message: 'Your note successfully deleted',
                      color: 'teal',
                    })
                    updateFilteredNotes()
                  },
                })
              }}
              onEdit={() => {
                setSelectedNoteId(note.id)
                setTitle(note.title)
                setBody(note.body)
                setIsFormValid({ title: true, body: true })
                setCreateOrEditModalOpened(true)
              }}
              previewHref={`/notes/${note.id}`}
            />
          ))}
        </NoteList>
       
      </MainLayout>
    )
  }
  
  export default HomePage
  