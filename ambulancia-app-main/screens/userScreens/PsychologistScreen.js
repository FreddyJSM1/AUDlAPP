import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';

export default function ChatScreen() {
  const psychologistMessages = [
    "Hola, ¿en qué puedo ayudarte hoy?",
    "Estoy aquí para escucharte.",
    "Entiendo cómo te sientes.",
    "Recuerda que siempre hay una salida.",
    "Cuéntame más sobre eso.",
    "¿Qué te hace sentir así?",
    "Gracias por compartirlo conmigo.",
    "¿Hay algo más que quieras decirme?",
  ];

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessages = [...messages, { sender: "user", text: inputText }];
      setMessages(newMessages);
      setInputText("");

      setTimeout(() => {
        if (messageIndex < psychologistMessages.length) {
          const reply = psychologistMessages[messageIndex];
          setMessages((prevMessages) => [...prevMessages, { sender: "psychologist", text: reply }]);
          setMessageIndex((prevIndex) => prevIndex + 1);
        } else {
          setMessageIndex(0);
        }
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === "user" ? styles.userMessage : styles.psychologistMessage]}>
            <Text style={[styles.messageText, item.sender === "user" ? styles.userText : styles.psychologistText]}>
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: "#4A90E2",
    alignSelf: "flex-end",
  },
  psychologistMessage: {
    backgroundColor: "#E6E6E6",
    alignSelf: "flex-start",
  },
  userText: {
    color: "white",
  },
  psychologistText: {
    color: "#333333",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "white",
  },
});
