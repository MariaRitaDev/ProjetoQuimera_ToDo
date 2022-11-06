import React from "react";
import { View, Text, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'


import commonStyles from "../commonStyles";



export default props => {
    return(


        <View style={styles.container}> 
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)} 

            </View>
            <View> 
                <Text>{props.desc}</Text>
                <Text>{props.estimateAt+ ""}</Text>
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
        }


})