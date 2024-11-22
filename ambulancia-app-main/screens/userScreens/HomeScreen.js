import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Card style={styles.card} onPress={() => navigation.navigate('Ambulancia')}>
        <Card.Title 
          title="Pedir Ambulancia" 
          left={(props) => <Avatar.Icon {...props} icon="ambulance" />}
          titleStyle={styles.cardTitle}
        />
      </Card>
      
      <Card style={styles.card} onPress={() => navigation.navigate('Psicologo')}>
        <Card.Title 
          title="Hablar con Psicólogo" 
          left={(props) => <Avatar.Icon {...props} icon="message" />}
          titleStyle={styles.cardTitle}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: 300,
    marginVertical: 15,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
});

export default HomeScreen;
