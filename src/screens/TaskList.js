import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform} from 'react-native';


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
      const state= JSON.parse(stateString) || initialState
      this.setState(state, this.filterTasks)
  }

    toggleFilter = () => {
      this.setState({showDoneTasks: !this.state.showDoneTasks},this.filterTasks)
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
      AsyncStorage.setItem('tasksState',JSON.stringify(this.state))
    }

    //Altera o estado das tarefas
    toggleTask = taskId => {
      const tasks =[...this.state.tasks]
      tasks.forEach(task => {
        if(task.id === taskId){
          task.doneAt = task.doneAt ? null : new Date()
        }
      })

      this.setState({tasks},this.filterTasks)
    }


    //Adiciona nova tarefa
    addTask = newTask => {
      if(!newTask.desc || !newTask.desc.trim()){
        Alert.alert('Dados Inválidos', 'Descrição não informada!')
        return
      }
        const tasks = [...this.state.tasks]
        tasks.push({
          id: Math.random(),
          desc: newTask.desc,
          estimateAt:newTask.date,
          doneAt: null
        })
        this.setState({tasks,showAddTask:false}, this.filterTasks) //atualiza o estado da tela após a tarefa ser adicionada
    }
    //Excluir uma task
    deleteTask = id =>{
      const tasks = this.state.tasks.filter(task => task.id !== id)
      this.setState({tasks}, this.filterTasks)
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
