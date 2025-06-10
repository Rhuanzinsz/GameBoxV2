import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GameCard = ({ game, onPress, onRemove }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: game.background_image }}
          style={styles.image}
        />
        <Text style={styles.title}>{game.name}</Text>
      </TouchableOpacity>

      {onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Ionicons name="trash-bin-outline" size={24} color="#ff4444" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 50,
  },
});

export default GameCard;