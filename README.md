# Day One - The Basics

## O que aprenderemos hoje?

- O que é o React?
- Iniciando um projeto
- O JSX e componentes
- React Hooks

## O que é o React?

O React surgiu em 2011 no Facebook para uso interno da empresa, porém em 2012 o código foi aberto para a comunidade. Esta biblioteca front-end de Javascript tem o objetivo de desenvolver interfaces de usuário (UI), permitindo compor interfaces complexas a partir de pequenos e isolados códigos chamados **componentes**.

Componentes são como elementos HTML reutilizáveis e customizáveis desenvolvidos para construir interfaces rápidamente e com eficiência, sem a necessidade de reescrever o mesmo código em diferentes lugares.

Veja o exemplo a seguir do uso do componente **MyButton**. Temos dois botões diferentes para uso distinto, mas ambos são o mesmo componente e suas caracteristicas são definidas por suas propriedades, referidas como **props** (neste exemplo a prop utilizada é color, para definir a cor do componente).

```jsx
<MyButton color="gray">
	Editar
</MyButton>

<MyButton color="red">
	Excluir
</MyButton>
```

![Button](https://user-images.githubusercontent.com/60199944/126087903-8f0b4326-ce46-442b-bf2b-b37a5aff9a1b.png)
![Button-1](https://user-images.githubusercontent.com/60199944/126087907-b55066f2-5f24-4fb2-9b2f-ce5d9513dfbd.png)

## Iniciando um Projeto

Para iniciarmos o nosso projeto acompanharemos a documentação do React ([clique aqui](https://pt-br.reactjs.org/docs/create-a-new-react-app.html#create-react-app)). Há algumas maneiras para iniciarmos uma aplicação React, mas utilizaremos o ambiente **[Create React App](https://github.com/facebook/create-react-app)**, um ambiente pré configurado com tudo que precisamos para criar uma aplicação React. Basta digitar o seguinte comando no terminal:

```bash
npx create-react-app fanpics-app
```

Nota: NPX é um package runner que acompanha o npm 5.2+.

Após finalizar toda instalação, vamos acessar a pasta criada e iniciar o projeto:

```bash
cd fanpics-app && yarn start
```

Nota: Caso deseje, pode utilizar `npm` no lugar de `yarn`.

Vamos adicionar esse projeto em um repositório no GitHub. Crie um repositório com o nome que deseje e copie o SSH:

![Untitled](https://user-images.githubusercontent.com/60199944/126087939-098166b4-8a7e-400f-b7dc-212675dd26e5.png)

No terminal, dentro da pasta do projeto, digite:

```bash
git remote add origin git@github.com:nicolascgarcia/fanpics.git
git branch -M main
git push -u origin main
```

Nota: No primeiro código, utilize o seu SSH do seu repositório.

Agora temos a aplicação React criada, com o repositório pronto para iniciarmos o desenvolvimento.

## O JSX e Componentes

Como você viu, estamos utilizando o que parece ser HTML em nosso código, mas não é exatamente HTML. Isto é **JSX**, **JavaScript XML**.

No JSX podemos escrever com HTML, mas também podemos criar nossas próprias tags, como é o caso de um componente.

Para entendermos melhor o uso do JSX, no exemplo abaixo atribuímos um JSX para a constante `heading`.

```jsx
const heading = <h1 className="title">Academy 2021!</h1>
```

O JSX converte o código em JavaScript  com a função `createElement`, pegando a tag, as propriedades e o filho (children) e renderiza a mesma informação. Portando, o código acima é a mesma coisa que este:

```jsx
const heading = React.createElement('h1', {className: 'title'}, 'Academy 2021!')
```

O JSX possui algumas diferenças do HTML, como:

- Enquanto em HTML utilizamos `class` para adicionar classes CSS, no JSX usamos `className`, pois `class` é uma palavra reservada (palavras utilizadas para se referirem a alguma propriedade existente da linguagem e não pode ser redefinida) em JavaScript;
- Props e métodos são [camelCase](https://celsokitamura.com.br/pascal-case-e-camel-case/), portanto `onclick` (HTML) se torna `onClick`;
- Tags sem children devem ser fechadas com "/". Ex: `<img />`.

Expressões de JavaScript também podem ser inseridas no JSX utilizando chaves.

```jsx
const myName = 'Nicolas Garcia'
const heading = <h1>Bem vindo ao Academy 2021, {myName}!</h1>
```

Agora que entendemos como é utilizado o JSX, vamos aprender como funcionam os componentes.

Um componente é um conjunto de código independente e reutilizável que resulta em um elemento da interface do usuário. Os componentes são como funções JavaScript o quais recebem entradas arbitrárias (as props) e resultam em elementos React.

A função abaixo pode ser considerada um componente React pois aceita um único argumento de objeto (props) com dados e retorna um JSX. Esses componentes são chamados de componentes de função, pois são uma função JavaScript.

```jsx
function Title(props) {
	const name = props.name
	return <h1>Olá, {name}!</h1>
}

```

Como foi dito anteriormente, o JSX aceita "tags" criadas pelo usuário, que seriam os componentes. Portanto o código abaixo resultaria em `Olá, Nicolas!`.

```jsx
const element = <Title name="Nicolas" />
```

Vale lembrar que todos os componentes possuem por padrão uma propriedade chamada children (filho). O children é todo o conteúdo passado dentro do componente, seguindo a hierarquia pai-filho de HTML.

```jsx
function Box(props) {
	return (
		<div className={"Box"}>
			{props.children}
		</div>
	)
}
```

Usando este componente, podemos passar outros elementos como filho:

```jsx
const element = (
	<Box>
		<Title name="Nicolas" />
		<img src={MyProfilePicture} />
	</Box>
)
```

Nota: Os nomes dos componentes devem ser **PascalCase**.

As propriedades (props) são informações imutáveis de um componente, portanto o componente não pode mudar o seu valor internamente. Para esses casos existem os **estados, ou states**, os quais são variáveis privadas e totalmente controladas pelo componente.

Vale lembrar que uma das premissas do React é que cada componente pode ser renderizado individualmente, sem que a página toda seja recarregada. Assim temos um resultado imediato na interface. Um componente é renderizado novamente sempre que suas propriedades ou estados sofrem alterações. Quando isso ocorre, o retorno visual do componente é alterado na página.

## React Hooks

Mas afinal, como podemos utilizar um estado de componente? Com o uso dos **[React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)**, funções que permitem a você utilizar recursos de estados e executar efeitos colaterais em componentes funcionais.

Vamos exemplificar desenvolvendo um componente onde teremos um botão para somar mais um a um número e exibir este número.

```jsx
function Counter(props) {
	const [numeroAtual, setNumeroAtual] = useState(0)
 
	const soma = () => setNumeroAtual(numeroAtual + 1)

	return (
		<h1>Você clicou {numeroAtual} vezes</h1>
		<button onClick={soma}>Clique aqui</button>
	) 
}
```

Neste componente, sempre que clicarmos no botão será adicionado + 1 no numeroAtual e o componente atualizará automaticamente o número apresentado no texto em H1. Utilizamos o hook **useState()** para controlarmos um estado do componente, o qual atribuímos o nome de numeroAtual e a função para alterar o valor do estado chama setNumeroAtual (por padrão seguimos esta lógica nos nomes de um estado e sua função para a alteração).

Agora vamos melhorar este componente e alterar o título da página sempre que o valor de numeroAtual for alterado. A alteração do titulo da pagina será o "efeito colateral" de alterar o valor de numeroAtual. Assim, utilizaremos o React Hook **useEffect()**, um hook que permite executar efeitos colaterais em componentes funcionais.

```jsx
function Counter(props) {
	const [numeroAtual, setNumeroAtual] = useState(0)
 
	const soma = () => setNumeroAtual(numeroAtual + 1)

	useEffect(() => {
		document.title = `Você clicou ${numeroAtual} vezes`
	}, []) // Execute sempre que houver alguma alteração no componente.

	return (
		<h1>Você clicou {numeroAtual} vezes</h1>
		<button onClick={soma}>Clique aqui</button>
	) 
}
```

Podemos notar que o hook useEffect recebe dois parâmetros. O primeiro é a função a ser executada como efeito colateral e o segundo é uma array de variáveis que ele esperará uma alteração. Caso este array esteja vazio, sempre que houver qualquer renderização o useEffect será execudado. Caso haja alguma variável, como o numeroAtual, o efeito colateral será executado apenas ao haver uma alteração nesta variável declarada no array.

```jsx
useEffect(() => {
	document.title = `Você clicou ${numeroAtual} vezes`
}, [numeroAtual]) // Apenas execute quando o numeroAtual mudar.
```

Por fim, nosso componente ficou assim:

```jsx
function Counter(props) {
	const [numeroAtual, setNumeroAtual] = useState(0)
 
	const soma = () => setNumeroAtual(numeroAtual + 1)

	useEffect(() => {
		document.title = `Você clicou ${numeroAtual} vezes`
	}, [numeroAtual]) // Apenas execute quando o numeroAtual mudar.

	return (
		<h1>Você clicou {numeroAtual} vezes</h1>
		<button onClick={soma}>Clique aqui</button>
	) 
}
```
