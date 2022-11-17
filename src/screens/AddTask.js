import React, {Component} from "react";
import {Modal, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Text} from 'react-native';

import commonStyles from "../commonStyles";

const initialState = {desc: ''}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide' >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style ={styles.header}>Nova tarefa</Text>
                    <TextInput style={styles.input} placeholder="   Descrição" onChangeText={desc => this.setState({desc})} value={this.state.desc} />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}> Cancelar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Text style={styles.button}> Salvar </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}>
                    </View>
                </TouchableWithoutFeedback>


            </Modal>



        )
    }
}


const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container:{
        flex: 1.5,
        backgroundColor:'#fff'
    },
    header:{
        backgroundColor: commonStyles.colors.today,
        color:commonStyles.colors.secondary,
        padding: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    input:{
        height: 50,
        margin:20,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 6,
      

    },
    buttons:{
        flexDirection:'row',
        justifyContent: 'flex-end',
    },
    button:{    
        margin: 20,
        marginRight: 30,
        color:commonStyles.colors.today
    }
})