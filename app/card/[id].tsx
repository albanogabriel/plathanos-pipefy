// app/card/[id].tsx
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal'
import { DELETE_CARD, GET_CARD_DETAILS } from '@/src/graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Entypo, Ionicons } from '@expo/vector-icons' // Importe o pacote de ícones
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CardDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const [isShowingConfirmModal, setIsShowingConfirmModal] = useState(false)

  const { loading, error, data } = useQuery(GET_CARD_DETAILS, {
    variables: { id },
  })

  const [deleteCard] = useMutation(DELETE_CARD, {
    variables: { id },
    onCompleted: () => {
      if (Platform.OS === 'web') return router.push('/(tabs)')

      Alert.alert('Sucesso', 'Card deletado com sucesso!', [
        {
          text: 'OK',
          onPress: () => router.back(), // Redireciona para a homepage
        },
      ])
    },
    onError: (error) => {
      Alert.alert('Erro', `Falha ao deletar card: ${error.message}`)
    },
    refetchQueries: ['allCards'],
  })

  const handleDelete = () => {
    setIsShowingConfirmModal(true)
  }

  const confirmDelete = () => {
    setIsShowingConfirmModal(false)
    deleteCard()
  }

  if (loading) return <Text>Carregando...</Text>
  // if (error) return <Text>Erro: {error.message}</Text>

  if (error)
    return (
      <View style={styles.errorScreenContainer}>
        <Text style={styles.errorText}>Infelizmente, não encontramos o Card</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )

  const card = data.card

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: card?.title || 'Detalhes do Card',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={{ marginLeft: 15 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => <Entypo name="pencil" size={24} color="red" />,
        }}
      />

      <ConfirmDeleteModal
        visible={isShowingConfirmModal}
        onConfirm={confirmDelete}
        onCancel={() => setIsShowingConfirmModal(false)}
        title="Confirmar"
        message="Tem certeza que deseja deletar este card?"
      />

      <View style={styles.detailContainer}>
        <Text style={styles.title}>{card?.title}</Text>
        <Text style={styles.detail}>Fase: {card?.current_phase?.name || 'Não especificada'}</Text>
        <Text style={styles.detail}>
          Criado em: {new Date(card?.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.detail}>URL: {card?.url}</Text>

        {/* Botão de deletar no corpo da tela também */}
        <TouchableOpacity style={styles.deleteButtonContainer} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Deletar Card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  errorScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '500',
    fontSize: 16,
  },
  detailContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  deleteButtonContainer: {
    marginTop: 20,
    backgroundColor: '#ff3b30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
