# Day Two - UI Framework

## O que aprenderemos hoje?

- As UI Framework e o Chakra UI
- Estrutura de pasta
- Sobre import e export
- Desenvolvendo o Header, Box de ações e o card de post.

## UI Framework e o Chakra UI

Uma framework é um pacote de códigos pré-prontos, bastando ao desenvolvedor adaptar àquilo ao seu programa. As UI Frameworks, ou frameworks de Front-End, são pacotes de códigos de componentes prontos para serem utilizados.

Vamos utilizar o Chakra UI, uma ótima opção de framework para React. Acessando a documentação do Chakra UI ([clique aqui](https://chakra-ui.com/docs/getting-started)) já teremos um tutorial de instalação da framework em nosso projeto.

Dentro do diretório do projeto, instale o Chakra UI com o seguinte comando:

```bash
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

Agora temos que adicionar o ChakraProvider na raiz de nossa aplicação, podemos adicionar no `app.js`:

```jsx
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ChakraProvider>
      {...}
    </ChakraProvider>
  )
}

export default App
```

Agora o Chakra UI está configurado e pronto para ser utilizado em nosso projeto.

## Estrutura de Pasta

A estrutura de pasta do seu projeto é muito importante para termos uma boa organização e facilitar a navegação dentro do projeto. O importante não é termos a melhor estrutura do mundo, mas sim seguirmos um padrão em todos os projetos. 

Utilizaremos a estrutura de pastas abaixo. Tudo que desenvolveremos ficará na pasta `src`, isolado dos outros arquivos e pastas que são gerados pelo próprio React.

![Untitled](https://user-images.githubusercontent.com/60199944/126218524-b8850f37-24a7-4808-8f96-7b3d588d8bd5.png)

Ao desenvolver uma página, sempre crio uma pasta com o nome da página e o seu conteúdo no `index.js` da pasta. Por que faço assim? Pois podemos organizar melhor o nosso código da página, isolando elementos que são usados nesta página. 

Veja este exemplo abaixo. Na página `Home` eu tenho dois modais, um para criar posts e outro para deletar. Ao invés de eu deixar o código deles dentro do `index.js`, eu isolei eles em pastas separadas dentro da pasta Home, assim tenho uma organização melhor e todo o conteúdo de cada modal, está isolado em sua própria pasta. 

![Untitled 1](https://user-images.githubusercontent.com/60199944/126218536-ec17d4d8-3524-4b2b-a271-896de569c7a2.png)

Assim como a primeira imagem, vamos criar as pastas assets, components, pages e services. Utilizaremos estas pastas ao decorrer das aulas.

Em `assets` já adicionei a imagem para carregamento de foto e a logo de nosso projeto. Ambas então em `src/assets` desta branch.

![Untitled 2](https://user-images.githubusercontent.com/60199944/126218549-78747500-0174-4cd5-aaa6-525e4b4dfe73.png)

Na pasta `components` armazenaremos os componentes de nosso projeto. Por enquanto manteremos apenas com um arquivo `index.js` vazio. A pasta `services` armazena configurações de serviços utilizados por nossa aplicação, como é a conexão com API que utilizaremos.

A pasta `pages` armazena todas as páginas de nossa aplicação. Vamos iniciar criando uma página chamada `Home`, onde será a única página de nosso projeto. Crie uma pasta `Home` dentro de pages e adicione um `index.js` com o seguinte código:

```jsx
import React from 'react'
import { Text } from '@chakra-ui/react'

export const Home = () => {
  return (
    <Text>Página Home</Text>
  )
}
```

Em `pages/index.js` vamos exportar a nova página `Home`.

```jsx
import { Home } from './Home'

export { Home }
```

Agora temos a nossa página `Home` com um texto e já está sendo exportada pela pasta `pages`. Vamos alterar o `src/App.js` para utilizarmos a nossa página `Home`.  

```jsx
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Home } from './pages'

const App = () => {
  return (
    <ChakraProvider>
      <Home/>
    </ChakraProvider>
  )
}

export default App
```

Dentro do terminal e no diretório do projeto, execute o comando `yarn start` para inicar a aplicação e verá a tela com o texto **Página Home**.

 Neste ponto já podemos excluir os arquivos `index.css` e `App.css` da pasta src e remover o import do `index.css` em `index.js`.

## Sobre import e export

A ECMAScript criou o conceito de módulos na ES6. Um módulo é uma unidade independente de código, auto contida, normalmente um arquivo de código. Um módulo pode disponibilizar seus conteúdos para outros módulos usando a diretiva `export`. Pode também consumir conteúdos de outros módulos usando a diretiva `import`. Em React usamos essas diretivas para passar conteúdos de um componente para outro.

Vamos analisar o código abaixo de um arquivo `App.js`.

```jsx
export default App
```

Aqui estamos exportando os conteúdos de `App` para outros módulos que importarem este arquivo. Note que está sendo utilizado a palavra-chave `default`, um dos tipos de exports na ES6 o qual informa que está sendo exportado todos os conteúdos do módulo.

Agora vamos utilizar este módulo em algum outro arquivo. Como o módulo está exportando tudo de `App`, pois está utilizando o `export default`, devemos nomear os conteúdos a serem importando:

```jsx
import App from './App'
```

Essa é a sintaxe para importarmos o `export default` de um módulo. Já que em `App.js` está exportando tudo de `App`, devemos atribuir um nome ao conteúdo de `App` para utilizar no módulo onde ocorre a importação.

Ou seja, você não especificou um conteúdo de `.App` então eu vou mandar os conteúdo exportado por default e nomeá-lo com o propósito de criar uma referência para ele.  

E se desejarmos exportar separadamente diferentes conteúdos de um módulo? Há dois métodos para fazer isso:

```jsx
import React from 'react'
import { Text } from '@chakra-ui/react'

export const Home = () => {
  return (
    <Text>Página Home</Text>
  )
}
```

```jsx
import React from 'react'
import { Text } from '@chakra-ui/react'

const Home = () => {
  return (
    <Text>Página Home</Text>
  )
}

export { Home }
```

Podemos atribuir o `export` antes da declaração do que desejamos exportar ou podemos exporar no final do arquivo, utilizando o `export` e um objeto contendo o que desejamos exportar. Neste caso podemos ter mais de um `export` em um módulo.

Para utilizar um ou mais conteúdos de um módulo com `export`, utilizamos a senguinte sintaxe:

```jsx
import { Home } from './pages'
```

Utilizamos a funcionalidade de destructuring para dizermos que queremos importar tais conteúdos de um módulo. Por termos especificamente o que está sendo exportado, não podemos nomeá-los.

## Desenvolvendo o Header, Box de ações e o card de post

Vamos começar desenvolvendo o header da nossa aplicação. No header utilizaremos um icone do Chakra UI, para isso devemos instalar a lib do Chakra UI para ícones ([clique aqui](https://chakra-ui.com/docs/media-and-icons/icon)). Instale com o seguinte comando:

```bash
yarn add @chakra-ui/icons
```

 Em `src/pages/Home/index.js` vamos adicionar o seguinte código:

```jsx
import React from 'react'
import {
  Flex,
  IconButton,
  Image
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo.svg'

export const Home = () => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      minHeight='100vh'
      bg='#E5E5E5'
      paddingX={['5%', '15%', '15%', '15%']}
    >
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
          onClick={() => console.log('abrir modal')}
        />
      </Flex>
    </Flex>
  )
}
```

O primeiro bloco de `<Flex>` será para posicionarmos todo o conteúdo da página. Note que os componentes do Chakra UI aceitam props de CSS. Isso é resultado do uso da lib [Styled System](https://styled-system.com/), uma lib muito interessante para atribuirmos CSS com facilidade nos componentes. Depois atribuimos outro `<Flex>` com a logo e um botão com ícone para abrirmos um modal de criação de post.

Outro fator interesante do Styled System é a forma de lidarmos com responsividade. Ao adicionarmos um array com os valores da prop, cada item do array serve para um breakpoint (tamanho de tela) diferente, seguindo a ordem `[sm, md, lg, xl]`.

Agora vamos desenvolver o box de ações e já adicionaremos o rodapé. Abaixo do `<Flex>` do header, vamos adicionaremos o código do box de ações, num arquivo com o seguinte código:

 

```jsx
import React from 'react'
import {
  Flex,
  IconButton,
  Image,
  Box,
  Text,
  Divider,
  Button
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo.svg'

export const Home = () => {
  return (
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
          onClick={() => console.log('abrir modal')}
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
              onClick={() => console.log('abrir modal')}
            >
              Novo Post
            </Button>
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
  )
}
```

Primeiramente adicionamos um `<Flex>` para conter todo conteúdo do meio da página, que terá o box de ações e os posts. Dentro adicionamos outro `<Flex>` com props CSS transformando em uma caixa com borda contendo um botão para adicionarmos um novo post.

O Footer é apenar um `<Box>` com o texto de copyright centralizado ao fim da página.

Para finalizar o dia, vamos desenvolver o card de post do nosso projeto. Para isso, vamos criar uma pasta para este card na pasta `components`. Crie a pasta para o componente `Post`:

![Untitled 3](https://user-images.githubusercontent.com/60199944/126218570-27b5dd00-632e-4bf8-afa6-2bb092b37b1a.png)

Dentro do `index.js` de `Post`, vamos adicionar o seguinte código:

```jsx
import React from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import {
  Button,
  Image,
  Flex,
  Box,
  Text
} from '@chakra-ui/react'
import ImageNotFound from '../../assets/image-not-found.jpg'

const Post = ({
  title = '',
  author = '',
  url = '',
  description = '',
  postId = '',
  openDeleteModal,
  openEditModal
}) => {

  return (
    <>
      <Flex
        key={postId}
        flexWrap='wrap'
        bg='#FFF'
        borderRadius='20px'
        mb={[3]}
        mt={[0, 0, 3, 3]}
        boxShadow={'rgb(0, 0, 0, 0.3) 10px 10px 30px 1px'}
      >
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          width={['100%', '100%', '100%', 3/10]}
          paddingY={[5]}
          paddingX={[3]}
        >
          <Box>
            <Text fontSize='xl'><b>Título</b></Text>
            <Text fontSize='sm' isTruncated>{title}</Text>
          </Box>
          <Box>
            <Text fontSize='xl'><b>Autor</b></Text>
            <Text fontSize='sm' isTruncated>{author}</Text>
          </Box>
          <Box>
            <Text fontSize='xl'><b>Descrição</b></Text>
            <Text fontSize='sm' noOfLines={4}>
              {description}
            </Text>
          </Box>
          <Flex flexWrap='wrap' justifyContent='center'>
            <Button
              rightIcon={<EditIcon/>}
              variant='ghost'
              onClick={() => openEditModal(postId)}
            >
              Editar
            </Button>
            <Button
              rightIcon={<DeleteIcon/>}
              colorScheme='red'
              variant='ghost'
              onClick={() => openDeleteModal(postId)}
            >
              Excluir
            </Button>
          </Flex> 
        </Flex>
        <Image
          src={url}
          fallbackSrc={ImageNotFound}
          alt='Imagem tal'
          width={['100%', '100%', '100%', 7/10]}
          height='35vh'
          objectFit='cover'
          borderTopRightRadius={['0', '0px', '0px', '20px']}
          borderBottomLeftRadius={['20px', '20px', '20px', '0px']}
          borderBottomRightRadius={['20px']}
        />
      </Flex>
    </>
  )
}

export default Post
```

Dentro do `index.js` da pasta `components`, vamos exportar o componente `Post`:

```jsx
import Post from './Post'

export { Post }
```

Com o nosso componente de `Post` criado, vamos utilizarmos na página `Home`. Vamos criar um array de objetos com dados aleatórios para testarmos enquanto não integramos com a API. 

```jsx
const posts = [
    {
      id: '1',
      title: 'Teste 1',
      author: {
        firstName: 'Nicolas',
        lastName: 'Garcia',
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat tincidunt orci sit amet hendrerit. Donec a efficitur felis, non semper tellus. Proin vitae elit nec magna sollicitudin commodo ut at leo. Pellentesque scelerisque mi eu elit porttitor hendrerit. ',
      url: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '2',
      title: 'Teste 2',
      author: {
        firstName: 'Nicolas',
        lastName: 'Garcia',
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat tincidunt orci sit amet hendrerit. Donec a efficitur felis, non semper tellus. Proin vitae elit nec magna sollicitudin commodo ut at leo. Pellentesque scelerisque mi eu elit porttitor hendrerit. ',
      url: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ]
```

Em nosso JSX, vamos adicionar uma função de JavaScript para listar todos os itens de um array, o `.map`. Criaremos um `<Box>` para conter a lista de posts e percorreremos o array de posts com o `.map` retornando o componente post para cada objeto contido na constante `posts`. Por fim, nosso arquivo `Home` ficará assim:

```jsx
import React from 'react'
import {
  Flex,
  IconButton,
  Image,
  Box,
  Text,
  Divider,
  Button
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo.svg'
import { Post } from '../../components'

export const Home = () => {

  const posts = [
    {
      id: '1',
      title: 'Teste 1',
      author: {
        firstName: 'Nicolas',
        lastName: 'Garcia',
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat tincidunt orci sit amet hendrerit. Donec a efficitur felis, non semper tellus. Proin vitae elit nec magna sollicitudin commodo ut at leo. Pellentesque scelerisque mi eu elit porttitor hendrerit. ',
      url: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: '2',
      title: 'Teste 2',
      author: {
        firstName: 'Nicolas',
        lastName: 'Garcia',
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat tincidunt orci sit amet hendrerit. Donec a efficitur felis, non semper tellus. Proin vitae elit nec magna sollicitudin commodo ut at leo. Pellentesque scelerisque mi eu elit porttitor hendrerit. ',
      url: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
  ]

  return (
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
          onClick={() => console.log('abrir modal')}
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
              onClick={() => console.log('abrir modal')}
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
  )
}
```

Perfeito! Já temos uma ótima estrutura da nossa aplicação. Na próxima aula vamos criar os modais com formulários para criar, editar e excluir um post.

## Bônus

Vamos deixar o nosso componente `Post` mais interessante? Vamos adicionar uma estilização para se destacar ao passar o mouse acima. Vamos utilizar uma lib chamada [Styled Components](https://styled-components.com/). Esta lib nos permite criar componentes que sejam elementos HTML estilizados com CSS ou estilizar outro componente existente. Vamos utilizar esta lib para podermos adicionar uma estilização ao acontecer um hover em nosso componente. 

Instale a lib com o comando:

```bash
yarn add styled-components
```

Vamos importar a lib nova e criar um componente chamado Wrapper, o qual é o componente `<Flex>` estilizado, dentro do arquivo de `Post`.

```jsx
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  transition: transform .5s;
  &:hover {
    -ms-transform: scale(1.1); /* IE 9 */
    -webkit-transform: scale(1.1); /* Safari 3-8 */
    transform: scale(1.1); 
  }
`
```

Agora, substitua o primeiro `<Flex>` do componente por este novo `<Wrapper>` e veja o que acontece ao passar o mouse pelos posts!
