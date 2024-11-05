import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput } from "react-native";

export default function SignUp() {
    const[form,setForm] = useState({
        nome:'',
        sobrenome:'',
        email:'',
        idade:'',
        senha:'',
        confirmarsenha:''

    })
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
                            <Text style={styles.inputLabel}>Nome:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.nome}
                                onChangeText={nome => setForm({...form,nome})}
                                />
                                
                            <Text style={styles.inputLabel}>Sobrenome:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.sobrenome}
                                onChangeText={sobrenome => setForm({...form,sobrenome})}
                                />

                            <Text style={styles.inputLabel}>Email do Responsável:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.email}
                                onChangeText={email => setForm({...form,email})}
                                />

                            <Text style={styles.inputLabel}>Senha:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.senha}
                                onChangeText={senha => setForm({...form,senha})}
                                />

                            <Text style={styles.inputLabel}>Confirmar Senha:</Text>
                            <TextInput
                                style={styles.inputControl}
                                value={form.confirmarsenha}
                                onChangeText={confirmarsenha => setForm({...form,confirmarsenha})}
                                />

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
        borderWidth: 2,        // Adiciona espessura da borda
        borderColor: '#000', 
    }
    

});
