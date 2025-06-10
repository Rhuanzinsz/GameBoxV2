import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Alert 
} from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const MyListsScreen = ({ navigation }) => {
  const [newListName, setNewListName] = useState('');
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const listsRef = collection(db, 'users', user.uid, 'gameLists');
      const q = query(listsRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userLists = [];
        querySnapshot.forEach((doc) => {
          userLists.push({ id: doc.id, ...doc.data() });
        });
        setLists(userLists);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleCreateList = async () => {
    if (newListName.trim() === '') {
      alert('Por favor, dê um nome para a sua lista.');
      return;
    }

    if (user) {
      try {
        const listsRef = collection(db, 'users', user.uid, 'gameLists');
        await addDoc(listsRef, {
          listName: newListName,
          createdAt: new Date(),
          games: [],
        });
        setNewListName('');
        alert(`Lista "${newListName}" criada com sucesso!`);
      } catch (error) {
        console.error("Erro ao criar a lista:", error);
        alert("Não foi possível criar a lista.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.createSection}>
        <Text style={styles.headerText}>Criar Nova Lista</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Jogos para zerar em 2025"
          placeholderTextColor="#888"
          value={newListName}
          onChangeText={setNewListName}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateList}>
          <Text style={styles.buttonText}>Criar Lista</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => navigation.navigate('ListDetails', { 
              listId: item.id, 
              listName: item.listName 
            })}
          >
            <Ionicons name="list" size={24} color="white" />
            <Text style={styles.listName}>{item.listName}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.headerText}>Minhas Listas</Text>}
        ListEmptyComponent={
          !loading && <Text style={styles.emptyText}>Você ainda não criou nenhuma lista.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  createSection: {
    marginBottom: 30,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listName: {
    color: 'white',
    fontSize: 18,
    marginLeft: 15,
  },
  emptyText: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 20,
  }
});

export default MyListsScreen;