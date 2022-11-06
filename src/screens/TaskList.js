import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import Task from "../components/Task";
import commonStyles from "../commonStyles";
import todayImage from '../../assets/imgs/today.jpg';
//import Moment from 'react-moment';
//import Moment from 'moment/min/moment-with-locales';



export default class TaskList extends Component{
    render(){
      
      //const today = Moment().globalTimezone = 'pt-br'.globalFormat = 'D MMM YYYY'
      //https://www.npmjs.com/package/react-moment
      //https://attacomsian.com/blog/nodejs-get-current-date-month-year#:~:text=js,-%E2%9C%8D%EF%B8%8F%20October%2001&text=Since%20Node.,and%20year%20in%20a%20Node.
        return (
            <View style={styles.container}>
              
              <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                      <Text style={styles.title}>Hoje</Text>
                      <Text style={styles.subtitle}></Text>
                    </View>
              </ImageBackground>
             

              
              <View style={styles.taskList}>
              <Task desc="Comprar um livro" estimateAt={new Date()} doneAt={new Date()}></Task>
              </View>
              <StatusBar style="auto" />
            </View>
          );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%'
  },
  background:{
    flex:3,
    resizeMode:"cover",
  },
  taskList:{
    flex:7,
  },
  titleBar:{
    flex:1,
    justifyContent:'flex-end',
    
  },
  title:{
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft:20,
    marginBottom:20,
  },
  subtitle:{
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft:20,
    marginBottom:30,
  }
});
