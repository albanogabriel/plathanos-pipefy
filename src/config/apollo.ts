import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://app.pipefy.com/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJQaXBlZnkiLCJpYXQiOjE3NDcwODc0MTgsImp0aSI6IjVjMjM4ZDAyLTVjOGQtNGRmMC1hNzg2LWUzMGY4NWJjY2Y0MyIsInN1YiI6MzA2NjQ4OTA0LCJ1c2VyIjp7ImlkIjozMDY2NDg5MDQsImVtYWlsIjoiYWxiYW5vZ2FicmllbDMzQGdtYWlsLmNvbSJ9fQ.q1T5dE5_sUgqvJRbygYFX3EPlLO9GFHNgShZuJnmTSaRM0KPAovdf_LqZPvFQMXmXWpXzgKUfyERw3TyAf1u4A'

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
