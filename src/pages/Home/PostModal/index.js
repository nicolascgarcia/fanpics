import React, { useState } from 'react'
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react'

const PostModal = (props) => {

  const [authorId, setAuthorId] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      authorId,
      title,
      url,
      description
    })
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center' >Novo Post</ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Autor</FormLabel>
              <Select
                placeholder='Selecione o autor'
                id='author'
                name='author'
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option key='1' value='1'>
                  Nicolas Garcia
                </option>
              </Select>
            </FormControl>
            <FormControl mt='4'>
              <FormLabel>Nome da Imagem</FormLabel>
              <Input
                placeholder='Nome descritivo da imagem'
                id='title'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl mt='4'>
              <FormLabel>Url da Imagem</FormLabel>
              <Input
                placeholder='Link da sua imagem'
                id='url'
                name='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </FormControl>
            <FormControl mt='4'>
              <FormLabel>Descrição da Imagem</FormLabel>
              <Textarea
                placeholder='Descrição'
                id='description'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              width='70%'
              marginRight='3'
              type='submit'
            >Criar Post</Button>
            <Button
              onClick={props.onClose}
              width='30%'
            >
              Fechar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PostModal