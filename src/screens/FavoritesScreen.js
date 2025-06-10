import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';
import GameCard from '../components/GameCard';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const favoritesRef = collection(db, 'users', user.uid, 'favorites');
      const unsubscribe = onSnapshot(favoritesRef, (querySnapshot) => {
        const favs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favs);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" style={styles.center} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => navigation.navigate('GameDetails', { gameId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={<Text style={styles.header}>Meus Favoritos</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum jogo favoritado ainda.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  header: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, paddingHorizontal: 16, paddingTop: 16 },
  emptyText: { color: 'grey', textAlign: 'center', marginTop: 50, fontSize: 16 }
});

export default FavoritesScreen;