import { router } from 'expo-router';
import { ColorPicker } from 'react-native-color-picker';
import ColorWheel from 'react-native-wheel-color-picker';
import chroma from 'chroma-js';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAvatar } from '../context/AvatarContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen() {
  const avatars = [
    require("@/assets/images/logo-1.png"),
    require("@/assets/images/logo-2.png"),
    require("@/assets/images/logo-3.png"),
    require("@/assets/images/logo-4.png"),
    require("@/assets/images/logo-5.png"),
    require("@/assets/images/logo-6.png"),
    require("@/assets/images/logo-7.png"),
    require("@/assets/images/logo-8.png"),
  ];

  const { selectedAvatar, setSelectedAvatar, userNameColor, setUserNameColor } = useAvatar();
  const [localSelectedAvatar, setLocalSelectedAvatar] = useState(selectedAvatar || avatars[0]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['0']); // O primeiro avatar está desbloqueado por padrão

  useEffect(() => {
    loadTotalCoins();
    loadUnlockedAvatars();
  }, []);

  const loadTotalCoins = async () => {
    const savedCoins = await AsyncStorage.getItem('totalCoins');
    if (savedCoins) {
      setTotalCoins(JSON.parse(savedCoins));
    }
  };

  const loadUnlockedAvatars = async () => {
    const savedUnlockedAvatars = await AsyncStorage.getItem('unlockedAvatars');
    if (savedUnlockedAvatars) {
      setUnlockedAvatars(JSON.parse(savedUnlockedAvatars));
    }
  };

  const purchaseAvatar = async (index: number) => {
    const avatarCost = 100;
    if (totalCoins >= avatarCost) {
      const newTotalCoins = totalCoins - avatarCost;
      setTotalCoins(newTotalCoins);
      await AsyncStorage.setItem('totalCoins', JSON.stringify(newTotalCoins));

      const updatedUnlockedAvatars = [...unlockedAvatars, index.toString()];
      setUnlockedAvatars(updatedUnlockedAvatars);
      await AsyncStorage.setItem('unlockedAvatars', JSON.stringify(updatedUnlockedAvatars));
    } else {
      alert("Moedas insuficientes para comprar este avatar.");
    }
  };

  const selectAvatar = (avatar: any, index: number) => {
    if (index === 0 || unlockedAvatars.includes(index.toString())) {
      setLocalSelectedAvatar(avatar);
    } else {
      purchaseAvatar(index);
    }
  };

  const handleColorChange = (selectedColor: string) => {
    setUserNameColor(selectedColor);
    setColorPickerVisible(true);
  };

  const handleSelectColor = () => {
    setColorPickerVisible(true);
  };

  const handleCloseColorPicker = () => {
    setColorPickerVisible(false);
  };

  const handleSave = () => {
    setSelectedAvatar(localSelectedAvatar);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.profileSection}>
        <Image source={localSelectedAvatar} style={styles.logo2}></Image>
        <Text style={[styles.userName, { color: userNameColor || '#000000' }]}>
          Henrique Souza
        </Text>
      </View>

      <View style={styles.coinsSection}>
        <Text style={styles.coinsText}>{totalCoins}🪙</Text>
      </View>

      <TouchableOpacity onPress={handleSelectColor} style={styles.colorButton}>
        <Text style={styles.colorButtonText}>Selecionar Cor</Text>
      </TouchableOpacity>

      {colorPickerVisible && (
        <View style={styles.colorPicker}>
          <ColorWheel
            color={userNameColor}
            onColorChange={handleColorChange}
          />
          <TouchableOpacity onPress={handleCloseColorPicker} style={styles.closeColorPickerButton}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={avatars}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => selectAvatar(item, index)}>
            <Image
              source={item}
              style={[
                styles.avatarOption,
                !unlockedAvatars.includes(index.toString()) && { opacity: 0.5 },
              ]}
            />
            {!unlockedAvatars.includes(index.toString()) && (
              <Text style={styles.priceTag}>50🪙</Text>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.avatarList}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#F5F5F5"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  coinsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coinsText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveText: {
    color: '#FFF',
    fontSize: 18,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo2: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  avatarList: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: 'center',
  },
  avatarOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  colorButton: {
    marginTop: 20,
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  colorButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  colorPicker: {
    marginTop: 20,
    width: 300,
    height: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  closeColorPickerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  priceTag: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFD700',
    color: '#333',
    padding: 3,
    borderRadius: 5,
    fontSize: 12,
  },
});
