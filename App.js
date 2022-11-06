import React, {Component} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TaskList from "./src/screens/TaskList";

export default function App(){
        return (
            <View style={styles.container}>
              <TaskList/>
            </View>
          );
    }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
