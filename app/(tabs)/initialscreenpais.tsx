import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';


export default function InitialScreenPais() {
  const [users, setUsers] = useState([]);



  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/kids-helper-logo.png')} // Altere o caminho conforme a localização do logo
        style={styles.title2}
      />
      <Image
      source={require('@/assets/images/coracao-verde.png')}
      style={styles.image3}
      />
      <Image
      source={require('@/assets/images/simbolo-primeiro.png')}
      style={styles.image4}
      />
      <Text style={styles.title}>Entre e acompanhe o desempenho de seu filho!!!</Text>
      <Text style={styles.subtitle}>
        Incentive a organização, responsabilidade e autonomia de forma divertida!!!{'\n'}
        Venha fazer parte, faça o cadastro aqui
      </Text>
      <Image
        source = {require('@/assets/images/seta-laranja.png')}
        style={styles.image2}
      />

      <View style={styles.buttonContainer}>
        <Link href={"/(tabs)/loginpais"} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>
        </Link>

        <Link href ={"/(tabs)/signuppais"} asChild>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playIcon}>➔</Text>
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom:100,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#67C77D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  arrow: {
    color: '#FFA500',
    fontSize: 18,
  },
  playButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 30,    
    borderRadius: 25,
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  playIcon: {
    fontSize: 18,
    color: '#007FFF',
  },
  title2:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: -80,
  },
  image2:{
    marginLeft:250

  },
  image3:{
    marginLeft:200
  },
  image4:{
    marginLeft:310

  }

});
