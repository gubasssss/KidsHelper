import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";



export default function SignUp() {
    const[form,setForm] = useState({
        email_pai:'',
        senha:'',
        })

    const router = useRouter();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F5F3' }}>
            <View style={styles.container}/>
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("@/assets/images/kids-helper-logo.png")}
                            style={styles.headerImg}
                            alt="logo"
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.input}>
    

                            <Text style={styles.inputLabel}>Email do Responsável:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.email_pai}
                                onChangeText={email_pai => setForm({...form,email_pai})}
                                />

                            <Text style={styles.inputLabel}>Senha:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.senha}
                                onChangeText={senha => setForm({...form,senha})}
                                />


<Link href="/(tabs)/home?user=Henrique" asChild>
<TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Entrar</Text>
          <Text style={styles.arrow}>➔</Text>
        </TouchableOpacity>
        </Link>

        <Link href ={"/"} asChild>
        <TouchableOpacity style={styles.button2} >
          <Text style={styles.buttonText}></Text>
          <Text style={styles.arrow2}>←</Text>
        </TouchableOpacity>
        </Link>



                        </View>
                        </View>
                    </View>
        </SafeAreaView>
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
    header: {
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: -650, // Ajuste a posição da imagem
    },
    headerImg: {
        width: 500, // Ajuste o tamanho conforme necessário
        height: 150,
    },
    textContainer: {
        position: 'absolute',
        top:-490, // Posição do texto em relação à imagem
    },
    input:{},
    inputLabel:{
        fontSize:17,
        marginLeft:1,
        fontWeight:'500',
        color:'#000'

    },
    inputControl:{
        backgroundColor:'#FFFF',
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:12,
        fontSize:15,
        fontWeight:'500',
        color:'#222',
        borderWidth: 1,        // Adiciona espessura da borda
        borderColor: '#000', 
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#67C77D',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop:25,
        height:55,
        width:150,
        marginLeft:10
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 5,
      },
      arrow: {
        color: '#FFA500',
        fontSize: 18,
      },
      arrow2:{
        color: '#FFA500',
        fontSize: 40,
        marginLeft:-20,
        marginTop:-15
      },
      button2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#67C77D',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop:50,
        height:55,
        width:70,
        marginLeft:-70
      },
    

});