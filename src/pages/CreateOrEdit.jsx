import React,{useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import { TextInput,Input,Card,Box,Button } from '@mantine/core';
import RichTextEditor from '@mantine/rte'
import { showNotification } from '@mantine/notifications';
import { addNote } from '../utils/localData';

const CreateOrEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [isFormValid, setIsFormValid] = useState({
      title: false,
      body: false,
    });
    console.log(data)
  return (
    <MainLayout  isArchived={false}
    breadCrumbItems={[
      { title: 'Noteguh', href: '/', active: false },
      { title:data.name, href: '#', active: true },
    ]}>
        {data.name==='Tambahkan Data'?<>
        
       <Card>
       <TextInput
            label="Masukan Judul"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => {
              const currentValue = e.currentTarget.value
                .trimStart()
                .replace(/ +(?= )/g, '')
              setTitle(currentValue)
              if (currentValue.length >= 3) {
                setIsFormValid((prevState) => ({ ...prevState, title: true }))
              } else {
                setIsFormValid((prevState) => ({ ...prevState, title: false }))
              }
            }}
            withAsterisk
            sx={{ marginBottom: '8px' }}
          />
           <Input.Wrapper label="Body" withAsterisk sx={{ marginBottom: '8px' }}>
            <RichTextEditor
              controls={[
                ['bold', 'italic', 'underline', 'strike', 'clean'],
                ['sub', 'sup'],
                ['alignLeft', 'alignCenter', 'alignRight'],
                ['unorderedList', 'orderedList'],
                ['code', 'codeBlock', 'blockquote', 'link'],
              ]}
              value={body}
              placeholder="Enter note body here"
              onChange={(value, _delta, _sources, editor) => {
                setBody(value)
                const editorTextLength = editor
                  .getText()
                  .replaceAll(' ', '')
                  .trim().length
                if (editorTextLength >= 5) {
                  setIsFormValid((prevState) => ({ ...prevState, body: true }))
                } else {
                  setIsFormValid((prevState) => ({ ...prevState, body: false }))
                }
              }}
              sticky
              sx={{
                '& .ql-editor': {
                  minHeight: '300px',
                },
              }}
            />
          </Input.Wrapper>
          <Box
            sx={{
              position: 'sticky',
              bottom: '0px',
              left: '0px',
              paddingTop: '8px',
            }}
          >
            <Button
              fullWidth
              disabled={!(isFormValid.body && isFormValid.title)}
              onClick={() => {
                console.log(title,body)
                navigate('/')
                showNotification({
                    title: 'Berhasil Tambah Data',
                    message: 'Anda berhasil menambahkan data',
                    color: 'teal',
                  })
                  addNote({body,title})
              }}
            >
              Submit
            </Button>
          </Box>
       </Card>
        </>:<>Edit data
        
        <Card>
       <TextInput
            label="Masukan Judul"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => {
              const currentValue = e.currentTarget.value
                .trimStart()
                .replace(/ +(?= )/g, '')
              setTitle(currentValue)
              if (currentValue.length >= 3) {
                setIsFormValid((prevState) => ({ ...prevState, title: true }))
              } else {
                setIsFormValid((prevState) => ({ ...prevState, title: false }))
              }
            }}
            withAsterisk
            sx={{ marginBottom: '8px' }}
          />
           <Input.Wrapper label="Body" withAsterisk sx={{ marginBottom: '8px' }}>
            <RichTextEditor
              controls={[
                ['bold', 'italic', 'underline', 'strike', 'clean'],
                ['sub', 'sup'],
                ['alignLeft', 'alignCenter', 'alignRight'],
                ['unorderedList', 'orderedList'],
                ['code', 'codeBlock', 'blockquote', 'link'],
              ]}
              value={body}
              placeholder="Enter note body here"
              onChange={(value, _delta, _sources, editor) => {
                setBody(value)
                const editorTextLength = editor
                  .getText()
                  .replaceAll(' ', '')
                  .trim().length
                if (editorTextLength >= 5) {
                  setIsFormValid((prevState) => ({ ...prevState, body: true }))
                } else {
                  setIsFormValid((prevState) => ({ ...prevState, body: false }))
                }
              }}
              sticky
              sx={{
                '& .ql-editor': {
                  minHeight: '300px',
                },
              }}
            />
          </Input.Wrapper>
          <Box
            sx={{
              position: 'sticky',
              bottom: '0px',
              left: '0px',
              paddingTop: '8px',
            }}
          >
            <Button
              fullWidth
              disabled={!(isFormValid.body && isFormValid.title)}
              onClick={() => {
                console.log(title,body)
                navigate('/')
                showNotification({
                    title: 'Berhasil Tambah Data',
                    message: 'Anda berhasil menambahkan data',
                    color: 'teal',
                  })
                  addNote({body,title})
              }}
            >
              Edit Data
            </Button>
          </Box>
       </Card>
        </>}
    </MainLayout>
  )
}

export default CreateOrEdit