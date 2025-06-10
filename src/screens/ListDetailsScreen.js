import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';
import GameCard from '../components/GameCard';

const ListDetailsScreen = ({ route, navigation }) => {
  const { listId } = route.params;
  const [listData, setListData] = useState({ games: [] });
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const listRef = doc(db, 'users', user.uid, 'gameLists', listId);
      const unsubscribe = onSnapshot(listRef, (docSnap) => {
        if (docSnap.exists()) {
          setListData(docSnap.data());
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [listId, user]);

  const handleRemoveGame = async (gameToRemove) => {
    if (user) {
      const listRef = doc(db, 'users', user.uid, 'gameLists', listId);
      try {
        await updateDoc(listRef, {
          games: arrayRemove(gameToRemove)
        });
        alert(`'${gameToRemove.name}' removido da lista.`);
      } catch (error) {
        console.error("Erro ao remover o jogo:", error);
        alert("Não foi possível remover o jogo.");
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, backgroundColor: '#121212' }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listData.games}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => navigation.navigate('GameDetails', { gameId: item.id })}
            onRemove={() => handleRemoveGame(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Esta lista ainda não tem jogos.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  emptyText: { 
    color: 'grey', 
    textAlign: 'center', 
    marginTop: 50, 
    fontSize: 16 
  }
});

export default ListDetailsScreen;