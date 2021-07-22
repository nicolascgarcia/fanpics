import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Text,
  Button
} from '@chakra-ui/react'

const DeleteModal = (props) => {

  const confirmDelete = () => {
    console.log('apagar', props.postId)
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb='6'>
          <Text textAlign='center' fontSize='30px' >
            <b>Deseja realmente excluir este post?</b>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='red'
            mr='3'
            width='70%'
            onClick={confirmDelete}
          >Excluir</Button>
          <Button
            onClick={props.onClose}
            width='30%'
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal