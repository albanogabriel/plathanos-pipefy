import CreateCardForm from '@/components/CreateCardForm'
import { View } from 'react-native'

export default function CreateCardScreen() {
  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <CreateCardForm pipeId="306389432" />
    </View>
  )
}
