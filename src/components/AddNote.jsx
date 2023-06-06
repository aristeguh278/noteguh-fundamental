import {useState} from 'react';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';

function AddNote() {
const [email,setEmail]= useState('');
const [description,setDescription]=useState('');
const handleClick=()=>{
  console.log(email)

  console.log(description)
}
  return (
    <Box maw={800} mx="auto">
        <span style={{height:'21px'}}><b>Name</b></span>  
        <TextInput
          withAsterisk
         
          placeholder="your@email.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <span style={{height:'25px !important'}}>&nbsp;</span>
        <span style={{height:'21px'}}><b>Description</b></span>
          <RichTextEditor label="Description" style={{minHeight:'350px'}} value={description} onChange={setDescription    } />
        <Group position="right" mt="md">
        <Button onClick={handleClick}>Submit</Button>
        </Group>
    
    </Box>
  );
}
export default AddNote;