// src/screens/CardsListScreen.tsx
import { Card } from '@/components/Card'
import { GET_ALL_CARDS } from '@/src/graphql/queries'
import { RootStackParamList } from '@/src/types/navigation'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

// const PAGE_SIZE = 20 // Número de cards por página

export default function CardsListScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_ALL_CARDS, {
    variables: {
      pipeId: '306389432', // Seu Pipe ID
      // first: PAGE_SIZE,
      // filter: {
      //   includeDone: true, // Inclui cards concluídos
      // },
    },
    notifyOnNetworkStatusChange: true,
  })

  const loadMore = () => {
    if (loadingMore || !data?.allCards?.pageInfo?.hasNextPage) return

    setLoadingMore(true)
    fetchMore({
      variables: {
        after: data.allCards.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return {
          allCards: {
            ...fetchMoreResult.allCards,
            edges: [...prev.allCards.edges, ...fetchMoreResult.allCards.edges],
          },
        }
      },
    }).finally(() => setLoadingMore(false))
  }

  const handleRefresh = () => {
    setRefreshing(true)
    refetch().finally(() => setRefreshing(false))
  }

  const handleCardPress = (card: any) => {
    navigation.navigate('CardDetail', { card: card.node })
  }

  if (loading && !refreshing && !loadingMore) {
    return <ActivityIndicator size="large" style={styles.loader} />
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar cards: {error.message}</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.allCards?.edges || []}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => <Card data={item.node} onPress={() => handleCardPress(item)} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" style={styles.loadingMore} /> : null
        }
        // ListEmptyComponent={
        //   !loading && (
        //     <Text style={styles.emptyText}>Nenhum card encontrado</Text>
        //   )
        // }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryText: {
    color: 'blue',
  },
  cardContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cardDescription: {
    fontWeight: 'normal',
    fontSize: 14,
    marginBottom: 2,
  },
  loadingMore: {
    marginVertical: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
})
