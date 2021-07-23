import React, { useState, useEffect } from 'react'
import {
  Flex,
  Image,
  IconButton,
  Box,
  Text,
  Divider,
  Button,
  Spinner
} from "@chakra-ui/react"
import Logo from '../../assets/logo.svg'
import { AddIcon } from '@chakra-ui/icons'
import { Post } from '../../components'
import PostModal from './PostModal'
import DeleteModal from './DeleteModal'
import api from '../../services/api' 

export const Home = () => {

  const [postModal, setPostModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const [selectedPost, setSelectedPost] = useState(null)

  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(false)

  const loadPosts = () => {
    setLoading(true)

    api.get('/posts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleOpenDeleteModal = (id) => {
    setSelectedPost(id)
    setDeleteModal(true)
  }

  const handleOpenEditModal = (id) => {
    setSelectedPost(id)
    setPostModal(true)
  }

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <>
      <Flex
        bg='#E5E5E5'
        flexDirection='column'
        justifyContent='space-between'
        minHeight='100vh'
        paddingX={['5%', '15%', '15%', '15%']}
      >
        {/* Início do Header */}
        <Flex
          bg='#FFF'
          paddingY='2'
          borderBottomRadius='20px'
          justifyContent='space-between'
          alignItems='center'
        >
          <Image src={Logo} alt='Fanpics Logo' marginX='4'/>
          <IconButton
            aria-label='Novo post'
            icon={<AddIcon/>}
            marginX='4'
            variant='ghost'
            onClick={() => setPostModal(true)}
          />
        </Flex>
        {/* Início do Box de Ações */}
        <Flex flexDirection='row' flexWrap='wrap' minHeight='85vh'>
          <Box width={['100%', '25%', '25%', '25%']}>
            <Flex
              bg='#FFF'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              paddingY='3'
              marginY='3'
              borderRadius='20px'
            >
              <Text fontSize='20px'>Ações</Text>
              <Divider marginY='2' />
              <Button
                width='90%'
                rightIcon={<AddIcon/>}
                onClick={() => setPostModal(true)}
              >Novo Post</Button>
            </Flex>
          </Box>
          {/* Início dos Posts */}
          <Box 
            width={['100%', 3/4, 3/4, 3/4]}
            minHeight='85vh'
            justifyContent='center'
            alignItems='center'
          >
            {loading ? (
              <Flex justifyContent='center' alignItems='center' height='50vh'>
                <Spinner color='blue.500'/>
              </Flex>
            ) : (
              <Flex 
              flexDirection='column'
              ml={['0', '4', '4', '4']}
              >
                {posts.map(post => (
                  <Post
                    key={post?._id}
                    title={post?.title}
                    author={`${post?.author?.firstName} ${post?.author?.lastName}`}
                    description={post?.description}
                    url={post?.url}
                    openEditModal={() => handleOpenEditModal(post?._id)}
                    openDeleteModal={() => handleOpenDeleteModal(post?._id)}
                  />
                ))}
              </Flex>
            )}
          </Box>
        </Flex>
        {/* Início do Footer */}
        <Box marginY='4'>
          <Text textAlign='center' fontSize='15px' color='gray'>
            Copyright © 2021 Feito com ❤ por Kazap Tecnologia - Todos os direitos reservados
          </Text>
        </Box>
      </Flex>
      <PostModal 
        isOpen={postModal}
        onClose={() => {
          setPostModal(false)
          setSelectedPost(null)
        }}
        postId={selectedPost}
        loadPosts={loadPosts}
      />
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => {
          setDeleteModal(false)
          setSelectedPost(null)
        }}
        postId={selectedPost}
        loadPosts={loadPosts}
      />
    </>
  )
}