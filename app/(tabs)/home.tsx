import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import axios from "axios";
import { Stack } from "expo-router";
import { useAvatar } from '../context/AvatarContext';





export default function UserProfileScreen() {
    const router = useRouter();
    const { selectedAvatar,userNameColor} = useAvatar();
    const initialColor = userNameColor || '#000000'; // Cor padrão preta

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    if (isDropdownVisible) {
        setIsDropdownVisible(false);
    }
};


  const menuOptions = [
    { label: 'Pais', action: () => router.push("/(tabs)/initialscreenpais") },
    { label: 'Sair', action: () => router.push("/") },
];


  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href={'/'}>
        <Image source={require('@/assets/images/kids-helper-logo.png')} style={styles.logo} />
        </Link>
        <Text style={styles.coins}>500 <FontAwesome name="dollar" size={18} color="orange" /></Text>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleDropdown}>
          <MaterialIcons name="menu" size={28} color="black" />
        </TouchableOpacity>
      </View>
                  {/* Dropdown Menu */}
                  {isDropdownVisible && (
                <View style={styles.dropdownMenu}>
                    <FlatList
                        data={menuOptions}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.dropdownItem} onPress={item.action}>
                                <Text style={styles.dropdownItemText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}


      {/* Profile Section */}
      <View style={styles.profileSection}>
      <Image source={selectedAvatar || require('@/assets/images/logo-1.png')}   style={styles.logo2}/>
        <View style={styles.profilePicContainer}>
        <TouchableOpacity style={styles.editIcon} onPress={() => router.push("/(tabs)/editprofile")}>
        <FontAwesome name="pencil" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.userName, { color: initialColor  }]}>Henrique Souza</Text>
      </View>
      

      {/* Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, styles.rewardCard]}>
          <FontAwesome name="dollar" size={24} color="orange" />
          <Text style={styles.cardText}>Recompensas</Text>
          <Text style={styles.cardPoints}>500 Pontos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.pointsCard]}>
          <FontAwesome name="tasks" size={24} color="blue" />
          <Text style={styles.cardText}>Ganhar Pontos</Text>
          <Text style={styles.cardDescription}>3 Atividades Novas!!!</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  coins: {
    fontSize: 16,
    color: '#000',
    marginLeft:100,
    marginBottom:-1
  },
  menuIcon: {
    padding: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePicContainer: {
    position: 'relative',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    left: -10,
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  cardContainer: {
    width: '90%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  rewardCard: {
    backgroundColor: '#D6EFCA',
  },
  pointsCard: {
    backgroundColor: '#B3E5FC',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardPoints: {
    fontSize: 16,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  logo2:{
    width: 250,  // Define a largura da logo
    height: 250,  // Define a altura da logo
    resizeMode: 'contain', 
    
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
    elevation: 5,  // For shadow effect
    zIndex: 1,  // To make sure it appears above other content
    padding: 10,
},
dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
},
dropdownItemText: {
    fontSize: 16,
    color: '#333',
},
});
