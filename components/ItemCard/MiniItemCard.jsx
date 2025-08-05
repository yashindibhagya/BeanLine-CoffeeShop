import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const MiniItemCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.rating}>
          <Icon name="star" size={13} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.42,
    backgroundColor: 'rgba(40,40,40,0.82)',
    borderRadius: 18,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 7,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(210,105,30,0.13)',
  },
  imageWrapper: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pricePill: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(210,105,30,0.92)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    zIndex: 2,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  name: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(33,33,31,0.88)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 2,
  },
});

export default MiniItemCard;
