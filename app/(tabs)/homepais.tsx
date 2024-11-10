import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import axios from 'axios';




export default function UserProfileScreen() {
    const router = useRouter();

    const [completedTasks, setCompletedTasks] = useState(['Tarefa 1', 'Tarefa 2']); // Exemplo de tarefas
    const [money, setMoney] = useState(100); // Exemplo de dinheiro
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
    { label: 'Sair', action: () => router.push("/(tabs)/initialscreenpais") },
];


  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={'/(tabs)/initialscreenpais'}>
        <Image source={require('@/assets/images/kids-helper-logo.png')} style={styles.logo} />
        </Link>
        <TouchableOpacity style={styles.menuIcon} onPress={toggleDropdown}>
          <MaterialIcons name="menu" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profilePicContainer}>
        </View>
        <Text style={[styles.userName ]}> Pai de Henrique Souza</Text>
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

      

      {/* Cards */}
      <View style={styles.cardContainer}>
        <TouchableOpacity style={[styles.card, styles.rewardCard]}>
          <Text style={styles.cardText}>Receber E-Mail</Text>
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
    marginLeft: -4
  },
  cardContainer: {
    width: '25%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 5,
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
    marginLeft:101
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
