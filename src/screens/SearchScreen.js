import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { searchGames } from '../services/api';
import GameCard from '../components/GameCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Digite o nome de um jogo para buscar.');

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    setResults([]);
    try {
      const response = await searchGames(query);
      if (response.data.results.length === 0) {
        setMessage('Nenhum resultado encontrado para sua busca.');
      }
      setResults(response.data.results);
    } catch (error) {
      console.error("Erro na busca:", error);
      setMessage('Ocorreu um erro ao buscar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar jogos..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <GameCard
              game={item}
              onPress={() => navigation.navigate('GameDetails', { gameId: item.id })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 16 }}
        />
      ) : (
        <Text style={styles.messageText}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  messageText: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});

export default SearchScreen;