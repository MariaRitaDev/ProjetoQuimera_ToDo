import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, {Component} from "react";
import {ImageBackground, Text, StyleSheet,View, TextInput, Alert, TouchableOpacity} from 'react-native'


import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from "../components/AuthInput";

export default class Auth extends Component{ 

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword:'',
        stageNew: false
    }
    signinOrSignup = () => {
        if(this.state.stageNew){
            Alert.alert('Sucesso!', 'Criar conta')
        }else{
            Alert.alert('Sucesso!', 'Logar')
        }
    }


    render(){
        return(
                <ImageBackground source={backgroundImage} style={styles.background}>
                    <Text style={styles.title}>Tasks</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.subtitle}>
                            {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                        </Text>

                        {this.state.stageNew &&
                            <AuthInput icon='user' placeholder="Nome" value={this.state.name} style={styles.input} onChangeText={name => this.setState({name})}/>
                        }
                        <AuthInput icon='at' placeholder="E-mail" value={this.state.email} style={styles.input} onChangeText={email => this.setState({email})}/>
                        <AuthInput icon='lock' placeholder="Senha" value={this.state.password} style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({password})}/>
                        {this.state.stageNew &&
                            <AuthInput icon='asterisk' placeholder="Confirmação de Senha" value={this.state.confirmPassword} style={styles.input} secureTextEntry={true} onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                        }
                        <TouchableOpacity onPress={this.signinOrSignup}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {this.state.stageNew ? 'Registrar':'Entrar' }

                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{padding:10}} onPress= {
                        () => this.setState({stageNew: !this.state.stageNew})}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui conta?':'Ainda não possui conta?' }

                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
                
           
        )
    }
}


const styles = StyleSheet.create({
    background: {
        flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom:10
    },
    formContainer:{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding:40,
        width: '90%',
        borderRadius: 10
    
    },

    input:{

        marginTop:10,
        backgroundColor: '#fff'
    },
    button:{
        backgroundColor: '#080',
        marginTop:10,
        padding:10,
        alignItems: 'center',
        borderRadius: 8
    },
    buttonText:{
        color: '#fff',
        fontSize: 15

    },
    subtitle:{
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 14
    }


})