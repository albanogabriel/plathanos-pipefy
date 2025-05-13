import { gql } from '@apollo/client'

export const GET_ALL_CARDS = gql`
  query GetAllCards($pipeId: ID!, $first: Int, $after: String, $filter: AdvancedSearch) {
    allCards(pipeId: $pipeId, first: $first, after: $after, filter: $filter) {
      edges {
        node {
          id
          title
          createdAt
          current_phase {
            name
          }
          fields {
            name
            value
          }
          url
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`

export const GET_CARDS = gql`
  query GetCards($pipeId: ID!) {
    cards(pipe_id: $pipeId, first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

export const CREATE_CARD = gql`
  mutation CreateCard($input: CreateCardInput!) {
    createCard(input: $input) {
      card {
        id
        title
        createdAt
        url
        due_date
        current_phase {
          name
        }
        fields {
          name
          value
        }
      }
    }
  }
`

export const GET_CARD_DETAILS = gql`
  query GetCardDetails($id: ID!) {
    card(id: $id) {
      id
      title
      current_phase {
        name
      }
      createdAt
      url
      # Adicione outros campos que você precisa
    }
  }
`

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(input: { id: $id }) {
      success
    }
  }
`
