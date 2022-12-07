import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform} from 'react-native';

import Axios from "axios";
import {server, showError } from "../common";


import { AsyncStorage } from 'react-native';
import Icon  from "react-native-vector-icons/FontAwesome";


import moment from 'moment';
import 'moment/locale/pt-br';


import commonStyles from "../commonStyles";
import todayImage from '../../assets/imgs/today.jpg';

import Task from "../components/Task";
import AddTask from "./AddTask";



const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks:[]

}
export default class TaskList extends Component{
    state = {
      ...initialState
    }

    componentDidMount = async () => {
      const stateString =  await AsyncStorage.getItem('tasksState')
      const saveState= JSON.parse(stateString) || initialState
      this.setState({
        showDoneTasks: saveState.showDoneTasks
      }, this.filterTasks)
      this.loadTasks()
  }

  loadTasks = async () => {
    try {
        const maxDate = moment()
       
            .add({ days: this.props.daysAhead})
            .format('YYYY-MM-DD 23:59:59')
        const res = await Axios.get(`${server}/tasks?date=${maxDate}`)
        this.setState({ tasks: res.data }, this.filterTasks)
    } catch(e) {
        showError(e)
    }
}


    toggleFilter = () => {
      this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    //Filtragem das tarefas
    filterTasks = () => {
      let visibleTasks = null
      if(this.state.showDoneTasks){
        visibleTasks = [...this.state.tasks]
      } else {
        const pending = task => task.doneAt === null
        visibleTasks = this.state.tasks.filter (pending)
      }

      this.setState({visibleTasks})
      AsyncStorage.setItem('tasksState',JSON.stringify({
        showDoneTasks: this.state.showDoneTasks

      }))
    }

    //Altera o estado das tarefas
    toggleTask = async taskId => {
      try {
          await Axios.put(`${server}/tasks/${taskId}/toggle`)
          this.loadTasks()
      } catch(e) {
          showError(e)
      }
  }


    //Adiciona nova tarefa
    addTask = async newTask => {
      if(!newTask.desc || !newTask.desc.trim()){
        Alert.alert('Dados Inválidos', 'Descrição não informada!')
        return
      }
      try {
        await Axios.post(`${server}/tasks`, {
           desc: newTask.desc,
           estimateAt: newTask.date 
        })

        this.setState({ showAddTask: false }, this.loadTasks)
    } catch(e) {
        showError(e)
    }
}
getImage = () => {
  switch(this.props.daysAhead) {
      case 0: return todayImage
      case 1: return tomorrowImage
      case 7: return weekImage
      default: return monthImage
  }
}

getColor = () => {
  switch(this.props.daysAhead) {
      case 0: return commonStyles.colors.today
      case 1: return commonStyles.colors.tomorrow
      case 7: return commonStyles.colors.week
      default: return commonStyles.colors.month
  }
}
    //Excluir uma task
    deleteTask = async taskId => {
      try {
          await Axios.delete(`${server}/tasks/${taskId}`)
          this.loadTasks()
      } catch(e) {
          showError(e)
      }
  }

    render(){
      
      const today = moment().format('ddd, LL');
           return (
            <View style={styles.container}>
              <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({showAddTask: false})}
              onSave={this.addTask}
              />
              <ImageBackground source={todayImage} style={styles.background}>
                    
                    <View style={styles.iconBar}>
                      <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                        size={20} color={commonStyles.colors.secondary}
                        />
                      </TouchableOpacity>
                    </View>



                    <View style={styles.titleBar}>
                      <Text style={styles.title}>Hoje</Text>
                      <Text style={styles.subtitle}>{today}</Text>
                    </View>
              </ImageBackground>
              
              <View style={styles.taskList}>
              <FlatList data={this.state.visibleTasks} //passando uma lista de objetos js puro - OBJ.CHAVE.VALOR
              keyExtractor={item =>`${item.id}`} // Pego o id de cada um dos objeto para que ele possa renderizar de forma correta a partir do keyextractor
              renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>} //recebo o item, desestruturando e tirando o item de dentro do objeto como parametro e no fim pego o item usando o operador spread, para pegar cada um dos objetos
              
              />
              <TouchableOpacity style={styles.addButton} activeOpacity={0.7}
                onPress={() => this.setState({showAddTask:true})}
              >
                  <Icon name="plus" size={20}
                  color={commonStyles.colors.secondary}
                  />
              </TouchableOpacity>

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
  },
  iconBar:{
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent:'flex-end',
    marginTop: 30,
  },
  addButton: {
    position: 'absolute',
    right:30,
    bottom:30,
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:commonStyles.colors.today,
    justifyContent:'center',
    alignItems:'center'
  }
});
