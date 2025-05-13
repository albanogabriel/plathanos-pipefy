import { CREATE_CARD } from '@/src/graphql/queries'
import { useMutation } from '@apollo/client'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'

interface CreateCardFormProps {
  pipeId: string
}

export default function CreateCardForm({ pipeId }: CreateCardFormProps) {
  const router = useRouter()

  const [title, setTitle] = useState('')

  const [createCard, { loading }] = useMutation(CREATE_CARD, {
    onCompleted: () => {
      router.replace('/(tabs)')
    },
    onError: (error) => {
      Alert.alert('Erro', `Falha ao criar card: ${error.message}`)
    },
    refetchQueries: 'all',
  })

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'O título do card é obrigatório!')
      return
    }

    const fields = [
      {
        field_id: 'qual_o_assunto_do_seu_pedido', // Campo do título (obrigatório)
        field_value: title,
      },
    ]

    // if (tipo) {
    //   fields.push({
    //     field_id: 'Tipo', // Substitua pelo ID real do campo no Pipefy
    //     field_value: tipo,
    //   })
    // }

    createCard({
      variables: {
        input: {
          pipe_id: pipeId,
          fields_attributes: fields,
        },
      },
    })

    setTitle('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do card"
        value={title}
        onChangeText={setTitle}
      />

      <Button
        title={loading ? 'Criando...' : 'Criar Card'}
        onPress={handleSubmit}
        disabled={loading || !title.trim()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
})
