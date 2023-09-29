import { Text, TextInput, View, TouchableOpacity, FlatList, Alert } from "react-native"

import { Participant } from "../../components/Participant"
import { styles } from "./styles"

export function Home() {
  const participants = ["Aron", "Diego", "Rodrigo", "Vini", "Biro", "Déia", "Lu", "Lola", "Will", "Zelda"]

  const handleParticipantAdd = () => {
    if (participants.includes("Aron")) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.")
    }
  }

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert("Deletado!")
      },
      {
        text: 'Não',
        style: 'cancel',
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <Participant key={item} name={item} onRemove={handleParticipantRemove} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (<Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Acidione participantes a sua lista de presença</Text>)}
      />

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map((name) => (
            <Participant key={name} name={name} onRemove={handleParticipantRemove} />
          ))
        }
      </ScrollView> */}
    </View>
  )
}