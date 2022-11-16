import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br';


import commonStyles from "../commonStyles";






export default props => {

    const doneOrNotStyle = props.doneAt != null ?
    { textDecorationLine: 'line-through'}: {}

    const date = moment(props.estimateAt).format('L')

    return(


        <View style={styles.container}> 
        <TouchableWithoutFeedback
            onPress={()=> props.toggleTask(props.id)}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)} 
            </View>
            </TouchableWithoutFeedback>
            <View> 
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={[styles.date, doneOrNotStyle]}>{date+ ""}</Text>
            </View>



        </View>
    )
       

}

function getCheckView(doneAt){
    if(doneAt != null){
    return (
        <View style={styles.done}>
            <Icon name="check" size={20} color='#fff'> </Icon>

        </View>
    )
} else {
    return (
        <View style={styles.pending}></View>
    )
}
} 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        padding: 10,
        },

        checkContainer: {
            width: '12%',
            alignItems:'center',
        },
        pending:{
            height:25,
            width:25,
            borderRadius: 13,
            borderWidth: 1,
            borderColor: '#555',
            
        },
        done:{
            height:25,
            width:25,
            borderRadius: 13,
            borderWidth: 1,
            backgroundColor:'#4D7031',
            borderColor: '#555',
            alignItems: 'center',
            alignContent:'center'
        },
        desc:{
            color: commonStyles.colors.mainText,
            fontSize: 16,

        },
        date:{
            color: commonStyles.colors.subText,
        }


})