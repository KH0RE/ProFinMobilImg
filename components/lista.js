import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import axios from 'axios';

export default function Lista() {
    
 const [state, setState] = useState({});

    useEffect(() => {
        const prueba = axios.get('http://192.168.1.7:4000/api/person')
            .then(res => {
                console.log('Si llego :3')
               setState(res.data)
               // console.log(res.data)
            }).catch(error => {
                console.log(error)
            })
        
    }, [])
    

    //console.log(state[4].photo)

  return (
    <View style={styles.container}>
    
   { !state ? (
       <Text> Cargando..... </Text>
   ): (
    <View >
     
    { Object.values(state).map((items) => (
        <View key={items._id}>
             <Text> {items.name} </Text>
             <Text> {items.phone} </Text>
             <Image source={{ uri: items.photo   }} />
         </View>
    ))    
    } 
    </View>
   ) 

   }
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
