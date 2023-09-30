import { Text, TextInput, View, TouchableOpacity, FlatList, Alert } from "react-native"
import { useState } from "react"

import { Participant } from "../../components/Participant"
import { styles } from "./styles"

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  const handleParticipantAdd = () => {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.")
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  const handleParticipantRemove = (name: string) => {
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants((prevState) => prevState.filter((value) => name !== value))
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
          value={participantName}
          onChangeText={setParticipantName}
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