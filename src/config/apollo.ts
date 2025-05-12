import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://api.pipefy.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwNjQxOTcsImVtYWlsIjoiYnJ1bm9qa3VydEBnbWFpbC5jb20iLCJhcHBsaWNhdGlvbiI6MzAwMTYwNTIwfX0.25eNqx06041fNPiJAt61CGcj2Czmbdy13LLVl-QPFPg-r0S1kJxZGT9Yhuds02dOXQqylm1If9Hun9TJ_Su3eA'

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
