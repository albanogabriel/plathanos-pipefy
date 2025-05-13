export type RootStackParamList = {
  CardsList: undefined
  CardDetail: { card: CardDetail }
}

export interface CardDetail {
  title: string
  current_phase?: {
    name: string
  }
  createdAt: string
  url: string
  // Adicione outros campos conforme necessário
}
