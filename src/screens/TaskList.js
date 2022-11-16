import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform} from 'react-native';

import Task from "../components/Task";
import commonStyles from "../commonStyles";
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';

import Icon  from "react-native-vector-icons/FontAwesome";


export default class TaskList extends Component{
    state = {
      showDoneTasks: true,
      visibleTasks: [],
      tasks:[{
      id: Math.random(),
      desc: 'Comprar Livro',
      estimateAt: new Date(),
      doneAt: new Date(),
    },{
      id: Math.random(),
      desc: 'Ler Livro',
      estimateAt: new Date(),
      doneAt: null,

    },{
      id: Math.random(),
      desc: 'Ler Livro',
      estimateAt: new Date(),
      doneAt: null,

    }
    
  
  ]
    }

    componentDidMount = () => {
      this.filterTasks()
    }

    toggleFilter = () => {
      this.setState({showDoneTasks: !this.state.showDoneTasks},this.filterTasks)
    }
    filterTasks = () => {
      let visibleTasks = null
      if(this.state.showDoneTasks){
        visibleTasks = [...this.state.tasks]
      } else {
        const pending = task => task.doneAt === null
        visibleTasks = this.state.tasks.filter (pending)
      }

      this.setState({visibleTasks})
    }

    toggleTask = taskId => {
      const tasks =[...this.state.tasks]
      tasks.forEach(task => {
        if(task.id === taskId){
          task.doneAt = task.doneAt ? null : new Date()
        }
      })

      this.setState({tasks},this.filterTasks)
    }


    render(){
      
      const today = moment().format('ddd, LL');
           return (
            <View style={styles.container}>
              
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
              renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/>} //recebo o item, desestruturando e tirando o item de dentro do objeto como parametro e no fim pego o item usando o operador spread, para pegar cada um dos objetos
              
              />
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
  }
});
