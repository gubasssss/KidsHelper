import { router } from 'expo-router';
import { ColorPicker } from 'react-native-color-picker';
import  ColorWheel from 'react-native-wheel-color-picker';
import chroma from 'chroma-js'; // Para conversão HSV para Hex (opcional)
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Switch, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import axios from "axios";
import { Stack } from "expo-router";
import { useAvatar } from '../context/AvatarContext';




export default function EditProfileScreen() {
  // Lista de avatares disponíveis
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




  // Estado para armazenar o avatar selecionado
  const { selectedAvatar, setSelectedAvatar, userNameColor, setUserNameColor } = useAvatar();
    const [localSelectedAvatar, setLocalSelectedAvatar] = useState(selectedAvatar || avatars[0]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const initialColor = userNameColor || '#000000'; // Cor padrão preta




  // Função para atualizar o avatar ao selecionar
  const selectAvatar = (avatar: any) => {
    setLocalSelectedAvatar(avatar); // Atualiza o avatar selecionado localmente
  };

  const handleColorChange = (selectedColor: string) => {
    setUserNameColor(selectedColor); // Atualiza a cor diretamente com o valor hexadecimal
    setColorPickerVisible(true); // Fecha o seletor de cor após a seleção
  };

  const handleSelectColor = () => {
    setColorPickerVisible(true); // Mostra o seletor de cor
  };

  const handleCloseColorPicker = () => {
    setColorPickerVisible(false); // Fecha o seletor manualmente
  };
  

  const handleSave = () => {
    setSelectedAvatar(localSelectedAvatar);
    router.replace("/(tabs)/home")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.profileSection}>
        <Image source={localSelectedAvatar} style={styles.logo2}></Image>
        <Text style={[styles.userName, { color:initialColor }]}>
                    Henrique Souza
                </Text>          
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
              {/* Botão para fechar o seletor de cor */}
              <TouchableOpacity onPress={handleCloseColorPicker} style={styles.closeColorPickerButton}>
          <Text>Fechar</Text>
        </TouchableOpacity>
      </View>
    )}






      <FlatList
        data={avatars}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectAvatar(item)}>
            <Image source={item} style={styles.avatarOption} />
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
    backgroundColor:"#F5F5F5"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
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
  profilePicContainer: {
    position: 'relative',
  },
  logo2: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
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
  avatarList: {
    marginTop: 20,
    justifyContent:"center",
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
    backgroundColor: 'white',  // Garantindo fundo branco para visibilidade
    borderRadius: 10,  // Adicionando bordas arredondadas
    alignSelf: 'center',  // Centralizando o seletor de cor
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  closeColorPickerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 50,
    zIndex: 1, // Garante que o botão de fechar fique acima do seletor de cor
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
},
toggleText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
},
chromaButton: {
  backgroundColor: '#81b0ff',  // Cor de fundo para o botão
  paddingVertical: 12,  // Aumentando o padding para torná-lo mais visível
  paddingHorizontal: 25,  // Ajustando o padding horizontal
  borderRadius: 8,
  marginLeft: 10,
  justifyContent: 'center',  // Garantir que o conteúdo do botão esteja centralizado
  alignItems: 'center',  // Alinhar o conteúdo dentro do botão
  elevation: 5,  
},
buttonText: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},

});
