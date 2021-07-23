# Day Three - Forms

## O que aprenderemos hoje?

- Modal de criação de post
- Modal de exclusão
- Fazendo alterações de um post

## Modal de Criação de Post

Nesta aula vamos criar alguns modais para realizar ações referentes aos posts, como criação, edição e exclusão. O Chakra UI já possui um componente para construirmos modais eficientes ([clique aqui](https://chakra-ui.com/docs/overlay/modal)). Vamos começar com o modal de criação de um post.

Primeiramente criaremos uma pasta para o modal de criação dentro da pasta `Home`, assim isolando todo o código referente a este modal. Crie uma pasta `PostModal` e adicione um `index.js` a este.

![Untitled](https://user-images.githubusercontent.com/60199944/126249034-2edf4776-13e9-4d44-b604-ee1a341ac93c.png)

Em `src/pages/Home/PostModal/index.js`, adicione o seguinte código:

```jsx
import React from 'react'
import {
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton
} from '@chakra-ui/react'

const PostModal = ({
  isOpen,
  onClose
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>Novo Post</ModalHeader>
        <ModalCloseButton />
          <ModalBody pb={6}>
               

          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              width='70%'
              type='submit'
            >
              Criar Post
            </Button>
            <Button onClick={onClose} width='30%'>
              Fechar
            </Button>
          </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PostModal
```

Aqui criamos um componente chamado `PostModal`, onde usamos o componente modal de acordo com a documentação do Chakra UI. Este componente Modal espera duas props, `isOpen` e `onClose`, para controlar se o modal está aberto ou fechado. Portanto, quando utilizarmos este componente na página `Home`, teremos que criar um estado para o seu controle com valor booleano, `true` ou `false`. Como o componente `<Modal>` espera essas propriedades, também solicitamos essas mesmas props no `PostModal` e atribuímos em `<Modal>`.

Vamos adicionar esse novo componente `PostModal` em nossa `Home`. Vamos importar o `PostModal` da seguinte forma:

```jsx
import PostModal from './PostModal'
```

Vamos precisar de um estado para controlar se o modal será exibido (true) ou está fechado (false). Vamos importar o `useState` de react adicionando o destructuring no import existente:

```jsx
import React, { useState } from 'react'
```

Dentro do componente `Home`, criaremos a constante do estado para controlarmos o modal de criação:

```jsx
const [postModal, setPostModal] = useState(false)
```

Por padrão o seu valor será `false`, significando que o modal está fechado. Quando alteramos o seu valor para `true`, o Modal será aberto. Vamos adicionar o Modal em nosso JSX ao final do código existente, passando o estado `postModal` como valor de `isOpen` e uma função para fechar o modal em `onClose`:

```jsx
<PostModal
  isOpen={postModal}
  onClose={() => setPostModal(false)}
/>
```

Lembra que temos dois botões para abrir o modal de criação? Um no header e outro no box de ações. Vamos adicionar uma função para abrir este modal na prop `onClick` destes botões:

```jsx
onClick={() => setPostModal(true)}
```

Agora teste clicando em um dos botões para abrirmos o modal! O arquivo `src/pasges/Home/index.js` ficará da seguinte forma:

```jsx
import React, { useState } from 'react'
{...demais imports}
import PostModal from './PostModal'

export const Home = () => {
  const [postModal, setPostModal] = useState(false)

  const posts = [
    {...conteúdos de posts}
  ]

  return (
    <>
      <Flex
        flexDirection='column'
        justifyContent='space-between'
        minHeight='100vh'
        bg='#E5E5E5'
        paddingX={['5%', '15%', '15%', '15%']}
      >
        {/* Início do Header */}
        <Flex
          bg='#FFF'
          borderBottomRadius='20px'
          justifyContent='space-between'
          alignItems='center'
          paddingY={[2]}
        >
          <Image src={Logo} alt='Fanpics Logo' marginX={[4]}/>
          <IconButton
            icon={<AddIcon/>}
            variant='ghost'
            marginX={[4]}
            aria-label='Novo post'
            onClick={() => setPostModal(true)}
          />
        </Flex>
        {/* Início do Box de Ações */}
        <Flex
          flexDirection='row'
          flexWrap='wrap'
          minHeight='85vh'
        >
          <Box width={['100%', 1/4, 1/4, 1/4]}>
            <Flex
              borderRadius='20px'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              bg='#FFF'
              paddingY={[3]}
              marginY={[3]}
            >
              <Text fontSize='20px'>Ações</Text>
              <Divider marginY={[2]} />
              <Button
                rightIcon={<AddIcon/>}
                width='90%'
                onClick={() => setPostModal(true)}
              >
                Novo Post
              </Button>
            </Flex>
          </Box>
          {/* Início dos Posts */}
          <Box
            width={['100%', 3/4, 3/4, 3/4]}
            minHeight='85vh'
            justifyContent='center'
            alignItems='center'
          >
            <Flex flexDirection='column' ml={[0, 4, 4, 4]}>
              {posts.map(post => (
                <Post
                  key={post._id}
                  title={post.title}
                  author={`${post.author.firstName} ${post.author.lastName}`}
                  description={post.description}
                  postId={post._id}
                  url={post.url}
                  openDeleteModal={() => console.log('deletar')}
                  openEditModal={() => console.log('editar')}
                />
              ))}
            </Flex>
          </Box>
        </Flex>
        {/* Início do Footer */}
        <Box marginY={[4]}>
          <Text
            textAlign='center'
            fontSize='15px'
            color='gray'
          >
            Copyright © 2021 Feito com ❤ por Kazap Tecnologia - Todos os direitos reservados
          </Text>
        </Box>
      </Flex>
      <PostModal
        isOpen={postModal}
        onClose={() => setPostModal(false)}
      />
    </>
  )
}
```

Temos o nosso modal funcionando, agora vamos adicionar o formulário deste modal para podermos criar um post. Primeiramente vamos envolver o componente `<ModalBody>` e `<ModalFooter>` em um `<form>`, passando a prop `onSubmit` com a função `handleSubmit` que será criada posteriormente.

```jsx
<form onSubmit={handleSubmit}>
	<ModalBody pb={6}>
               
	</ModalBody>
	<ModalFooter>
		{...}
	</ModalFooter>
</form>
```

Em react, cada campo do formulário precisa controlar o seu valor com um estado que armazenará o seu valor. Senda assim, vamos criar um estado para cada campo para o formulário. No `index.js` do `PostModal`, importe o `useState` de react.

```jsx
import React, { useState } from 'react'
```

Dentro do componente, adicione os estados para cada campo:

```jsx
const [title, setTitle] = useState('')
const [authorId, setAuthorId] = useState('')
const [description, setDescription] = useState('')
const [url, setUrl] = useState('')
```

Temos todos os estados para nossos campos. Vamos importar todos componentes do Chakra UI que usaremos no formulário, adicionando ao import existente:

```jsx
import {
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea
} from '@chakra-ui/react'
```

Vamos adicionar os campos de nosso formulário, dentro do `<form>` do JSX de `PostModal`:

```jsx
{...}
<form onSubmit={handleSubmit}>
  <ModalBody pb={6}>
    <FormControl>
      <FormLabel>Autor</FormLabel>
      <Select
        placeholder="Selecione o autor"
        id='author'
        name='author'
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        isRequired
      >
        <option key={'1'} value={'1'}>
          Nicolas Garcia
        </option>
      </Select>
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Nome da Imagem</FormLabel>
      <Input
        placeholder="Nome descritivo da imagem"
        id='title'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        isRequired
      />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Url da Imagem</FormLabel>
      <Input
        placeholder="Link da sua imagem"
        id='url'
        name='url'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        isRequired
      />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Descrição da Imagem</FormLabel>
      <Textarea
        placeholder="Descrição"
        id='description'
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </FormControl>
  </ModalBody>
  <ModalFooter>
    <Button
      colorScheme="blue"
      mr={3}
      width='70%'
      type='submit'
    >
      Criar Post
    </Button>
    <Button onClick={onClose} width='30%'>
      Fechar
    </Button>
  </ModalFooter>
</form>
{...}
```

Por fim, temos que criar a função `handleSubmit`, a função para tratar todos os valores que foi enviado pelo formulário da forma que desejarmos. Por agora vamos apenas adicionar todos os campos em um `console.log` para visualizarmos o funcionamento.

Abaixo dos estados criados, adicione a seguinte função:

```jsx
const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      title,
      authorId,
      description,
      url
    })
  }
```

Agora clique em algum botão para abrir o modal, preencha os campos e envie para visualizar o log de todos os dados do formulário!

## Modal de exclusão

O modal de exclusão será mais fácil, pois terá apenas dois botões para confirmar a exclusão do post. Então vamos começar de forma semelhante ao `PostModal`, vamos criar a pasta `DeleteModal` dentro da pasta `Home`.

![Untitled 1](https://user-images.githubusercontent.com/60199944/126249069-cbd7dd60-41af-4654-bec5-f29fb1b1c71e.png)

Em `src/pages/Home/DeleteModal/index.js`, adicione o seguinte código:

```jsx
import React from 'react'
import {
  Button,
  ModalBody,
  Text,
  ModalFooter,
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'

const DeleteModal = ({
  isOpen,
  onClose,
}) => {
  const confirmDelete = () => {
    console.log('apagado')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb={6}>
          <Text textAlign='center' fontSize='30px'>
            <b>Deseja realmente excluir este post</b>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            width='70%'
            onClick={confirmDelete}
          >
            Deletar
          </Button>
          <Button onClick={onClose} width='30%'>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal
```

O `DeleteModal` também espera duas props, `isOpen` e `onClose`, para passar seus valores para o componente `<Modal>`, igual ao `PostModal`. Temos também um botão deletar, onde temos uma função no `onClick` para executar a axclusão. Por enquanto a função `confirmDelete` apenas exibe um `console.log` para confirmar o seu funcionamento.

Vamos adicionar este modal em nossa `Home`:

```jsx
import DeleteModal from './DeleteModal'
```

Dentro do componente `Home`, criaremos a constante do estado para controlarmos o modal de exclusão:

```jsx
const [deleteModal, setDeleteModal] = useState(false)
```

Vamos adicionar o `DeleteModal` em nosso JSX abaixo do `PostModal`, passando o estado e uma função para fechar o modal de exclusão:

```jsx
<DeleteModal
	isOpen={deleteModal}
  onClose={() => setDeleteModal(false)}
/>
```

Ainda na `Home`, lembra do componente `Post` que colocamos? Ele está passando a prop `openDeleteModal`, onde agora poderemos adicionar uma função para abrir o modal de exclusão.

```jsx
{posts.map(post => (
  <Post
    key={post._id}
    title={post.title}
    author={`${post.author.firstName} ${post.author.lastName}`}
    description={post.description}
    postId={post._id}
    url={post.url}
    openDeleteModal={() => setDeleteModal(true)}
    openEditModal={() => console.log('editar')}
  />
))}
```

Por fim podemos fazer um teste clicando em qualquer botão de excluir e teremos o modal em funcionamento. Mas temos um detalhe faltando, o modal precisa saber qual será o post a ser excluído. Precisamos salvar o ID do post que clicamos em um estado e passar este para o componente DeleteModal. No `index.js` de `Home` vamos adicionar um estado chamado `selectedPost`:

```jsx
const [selectedPost, setSelectedPost] = useState(null)
```

Vamos criar uma função que abra o modal de exclusão e adicione o ID do post clicado ao valor de `selectedPost`. Abaixo dos estados, adicione a função `handleOpenDeleteModal` e adicione esta na prop `openDeleteModal` passando o ID como parâmetro:

```jsx
const handleOpenDeleteModal = (id) => {
    setSelectedPost(id)
    setDeleteModal(true)
  }
```

```jsx
{posts.map(post => (
  <Post
    key={post._id}
    title={post.title}
    author={`${post.author.firstName} ${post.author.lastName}`}
    description={post.description}
    postId={post._id}
    url={post.url}
    openDeleteModal={() => handleOpenDeleteModal(post._id)}
    openEditModal={() => console.log('editar')}
  />
))}
```

Agora devemos passar qual o post selecionado para o `DeleteModal` com a prop `postId`. Vamos também adicionar o `setSelectedPost(null)` na prop `onClose` para sempre que o modal fechar, limpará o estado `selectedPost` já que nenhum post estará selecionado.

```jsx
<DeleteModal
  isOpen={deleteModal}
  onClose={() => {
     setDeleteModal(false)
     setSelectedPost(null)
  }}
	postId={selectedPost}
/>
```

No `index.js` da pasta `DeleteModal` vamos adicionar a nova prop `postId` e adicionar no `console.log` para vermos em funcionamento.

```jsx
const DeleteModal = ({
  isOpen,
  onClose,
  postId
}) => {
  const confirmDelete = () => {
    console.log('apagar', postId)
  }

{...}
```

Ao tentar apagar um post, verá no console do DevTools o log mostrando o ID do post selecionado. Assim temos o modal de exclusão funcionando corretamente!

## Fazendo Alterações de um Post

Para atualizarmos um post será necessário abrir um modal igual ao de criação de post, porém com os dados do post selecionado já preenchido nos campos. Assim podemos alterar o que queremos e atualizar o post selecionado. Mas não precisamos criar um novo modal para isso, pois visualmente seria idêntico ao de criação de post. Portando vamos aproveitar o `PostModal` para realizar atualizações quando ter algum post selecionado.

Para identificarmos quando será uma atualização, ao clicarmos em **Editar** deverá abrir o `PostModal` e atribuir o ID do post selecionado em `selectedPost`, igual ao modal de exclusão, passando esse estado para o `PostModal` com a prop `postId`. A lógica do `PostModal` funcionará na seguinte forma:

- Tem um post selecionado (`postId === true`): Será uma atualização.
- Não tem post selecionado (`postId === false`): Será um novo post.

No `index.js` da `Home` vamos adicionar a seguinte função abaixo da função `handleOpenDeleteModal`:

```jsx
const handleOpenEditModal = (id) => {
  setSelectedPost(id)
  setPostModal(true)
}
```

Vamos adicionar esta nova função na prop `openEditModal` do componente `<Post>` da `Home`:

```jsx
{posts.map(post => (
  <Post
    key={post._id}
    title={post.title}
    author={`${post.author.firstName} ${post.author.lastName}`}
    description={post.description}
    postId={post._id}
    url={post.url}
    openDeleteModal={() => handleOpenDeleteModal(post._id)}
    openEditModal={() => handleOpenEditModal(post._id)}
  />
))}
```

Assim como foi feito com o `DeleteModal` devemos passar qual o post selecionado para o `PostModal` com a prop `postId`. Vamos também adicionar o `setSelectedPost(null)` na prop `onCLose` para sempre que o modal fechar, limpará o estado `selectedPost` como já fizemos anteriormente.

```jsx
<PostModal
  isOpen={postModal}
  onClose={() => {
  setPostModal(false)
  setSelectedPost(null)
  }}
  postId={selectedPost}
/>
```

Recapitulando, ao clicarmos em **Editar** o `PostModal` será aberto e o ID do post selecionado será atribuido ao estado `selectedPost`, o qual é passado seu valor para o `PostModal` através da prop `postId`.

Vamos ao `index.js` do `PostModal` para adaptá-lo para poder realizar atualizações ao receber o `postId`. Adicione o `postId` como uma prop a ser recebida e altere a função `handleSubmit` para sabermos quando será uma atualização ou criação de um post a partir de uma condicional (if/else) com o `postId`.

```jsx
const PostModal = ({
  isOpen,
  onClose,
  postId
}) => {
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (postId) {
      console.log('Atualizando', postId)
      console.log({
        title,
        authorId,
        description,
        url
      })
    } else {
      console.log('Criando', {
        title,
        authorId,
        description,
        url
      })
    }
  }
```

 

Também devemos alterar alguns textos no JSX do `PostModal` para quando for uma atualização. Como sabemos que quando recebemos o `postId` é uma atualização, utilizaremos uma condicional no JSX. Comece alterando o `<ModalHeader>`:

```jsx
<ModalHeader textAlign='center'>
	{postId ? 'Editar Post' : 'Novo Post'}
</ModalHeader>
```

Agora atualize o texto do botão no `<ModalFooter>`:

```jsx
<Button
  colorScheme="blue"
  mr={3}
  width='70%'
  type='submit'
>
  {postId ? 'Atualizar post' : 'Criar post'}
</Button>
```

Pronto! Agora o `PostModal` tem a funcionalidade de criar e editar um post. Faça um teste e veja os textos e os logs sendo alterados de acordo com o seu uso na aplicação.
