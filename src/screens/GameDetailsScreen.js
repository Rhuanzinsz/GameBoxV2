import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  ActivityIndicator, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  Alert
} from 'react-native';
import { getGameDetails } from '../services/api';

// Imports do Firestore e Auth
import { doc, setDoc, getDocs, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';

const GameDetailsScreen = ({ route }) => {
  const { gameId } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true); 
      try {
        const response = await getGameDetails(gameId);
        setDetails(response.data);
      } catch (error) { 
        console.error("Erro ao buscar detalhes:", error);
      } finally { 
        setLoading(false); 
      }
    };
    fetchDetails();
  }, [gameId]);

  const handleFavorite = async () => {
    if (user && details) {
      try {
        const gameRef = doc(db, 'users', user.uid, 'favorites', details.id.toString());
        await setDoc(gameRef, { name: details.name, background_image: details.background_image, rating: details.rating, addedAt: new Date() });
        alert(`'${details.name}' foi adicionado aos seus favoritos!`);
      } catch (error) {
        console.error("Erro ao favoritar o jogo:", error);
        alert("Ocorreu um erro ao favoritar o jogo.");
      }
    }
  };

  const handleOpenListSelector = async () => {
    if (user) {
      const listsRef = collection(db, 'users', user.uid, 'gameLists');
      const querySnapshot = await getDocs(listsRef);
      const lists = [];
      querySnapshot.forEach(doc => lists.push({ id: doc.id, ...doc.data() }));
      
      if (lists.length === 0) {
        alert("Você precisa criar uma lista primeiro!");
        return;
      }
      
      setUserLists(lists);
      setModalVisible(true);
    }
  };

  const handleAddToList = async (listId, listName) => {
    if (user && details) {
      try {
        const listRef = doc(db, 'users', user.uid, 'gameLists', listId);
        await updateDoc(listRef, {
          games: arrayUnion({ id: details.id, name: details.name, background_image: details.background_image })
        });
        setModalVisible(false);
        alert(`'${details.name}' adicionado à lista '${listName}'!`);
      } catch (error) {
        console.error("Erro ao adicionar jogo à lista:", error);
        alert("Não foi possível adicionar o jogo à lista.");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.description}>Não foi possível carregar os detalhes.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: details.background_image }} style={styles.image} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}><Text style={styles.actionButtonText}>Favoritar ⭐</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleOpenListSelector}><Text style={styles.actionButtonText}>Adicionar à Lista ➕</Text></TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{details.name}</Text>
          <Text style={styles.description}>{details.description_raw}</Text>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Selecione uma lista</Text>
            <FlatList
              data={userLists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => handleAddToList(item.id, item.listName)}
                >
                  <Text style={styles.modalItemText}>{item.listName}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },

  image: {
    width: '100%',
    height: 250,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    lineHeight: 24,
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  actionButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  modalItem: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalItemText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#aa2222',
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    width: '100%',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameDetailsScreen;