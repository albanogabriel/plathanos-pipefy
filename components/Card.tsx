// src/components/Card.tsx
import { Link } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CardProps {
  data: {
    id: string
    title: string
    current_phase?: {
      name: string
    }
    createdAt: string
    url: string
  }
}

export function Card({ data }: CardProps) {
  return (
    <Link href={`/card/${data.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{data.title}</Text>
          <Text style={styles.cardDescription}>
            Fase: {data.current_phase?.name || 'Não especificada'}
          </Text>
          <Text style={styles.cardDescription}>
            Criado em: {new Date(data.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.cardDescription}>URL: {data.url}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  cardDescription: {
    fontWeight: 'normal',
    fontSize: 14,
    marginBottom: 2,
    color: 'black',
  },
})
