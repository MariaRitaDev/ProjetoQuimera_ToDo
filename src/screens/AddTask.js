import React, {Component} from "react";
import {Platform, Modal, View, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Text} from 'react-native';

import commonStyles from "../commonStyles";

import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import  Icon from "react-native-vector-icons/FontAwesome";

const initialState = {desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component {

    state = {
        ...initialState
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }
        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initialState})
    }

    getDatePicker = () => {
        let datePicker =  <DateTimePicker value={this.state.date} onChange={(_, date) => this.setState({date, showDatePicker: false})} mode='date'/>

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity>
                        <View style={styles.row}>
                       
                        <Icon style={styles.date} name="calendar" onPress={()=> this.setState({showDatePicker: true})}/>
                        <Text style={styles.dateText}>
                            {dateString}
                        </Text>
                        </View>
                        </TouchableOpacity>
                        {this.state.showDatePicker && datePicker}
                </View>
            )
        }


        return datePicker
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
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}> Cancelar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
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
    },
    date:{
        marginTop: 10,
        marginLeft: 50,
      
        fontSize:30,
        color: '#888888',
        

    },
    dateText:{
        fontSize: 12,
        color: '#888888',
        padding: 15,
        paddingLeft:40,
    },
    row:{
        flexDirection:'row'

    }
})