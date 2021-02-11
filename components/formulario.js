import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';


export default function  Formulario ({navigation}){

    const [value, onChangeText] = useState('');
    const [value2, onChangeText2] = useState('');
    const [image, setImage] = useState(null);
    
    const [ datos, setDatos ] = useState('');


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
          quality: 1,
        });
    
       // console.log(result.base64);
    
        if (!result.cancelled) {
          setImage(result);
          setDatos(result.base64);
        //  console.log(image.base64);
        }
      };

      const enviar = async () => {
        var picture = "data:image/jpeg;base64,"+image.base64;
        
        let data = {
            name : value,
            phone : value2,
            photo : picture
        }

        const prueba = await  axios.post('http://192.168.1.7:4000/api/person', data)
            .then(res => {
                console.log('Si se jue :v ')
                navigation.navigate('Lista')
            }).catch(error => {
                console.log(error)
            })
      }


      const lista = async () => {
        navigation.navigate('Lista')
      }

  return (

  

    <View style={styles.container}  >
        <Text style={{
            position: 'absolute', top: 30, fontSize: 20
            
        }} >Formulario</Text>
        <Text style={{ 
            position: 'absolute', top: 80, fontSize: 15,
            left: 30
        }} > Nombre :  </Text>
        <TextInput placeholder="Tu nombre" style={{
             height: 40, width: 150, borderColor: 'gray',
              borderRadius: 10, textAlign: 'center', borderWidth: 1,
             position: 'absolute', top: 105, left: 25
            }}
            onChangeText={text => onChangeText(text)}
            value={value}
        />
        
        <Text style={{ 
            position: 'absolute', top: 80, fontSize: 15,
           right: 90
        }} > Celular :  </Text>
        <TextInput placeholder="0987654123" style={{
             height: 40, width: 150, borderColor: 'gray',
              borderRadius: 10, textAlign: 'center', borderWidth: 1,
             position: 'absolute' , top: 105, right: 20
            }}
            onChangeText={text => onChangeText2(text)}
            value={value2}
        />    
        
        
            <View style={{ position: 'absolute', top: 180}} >
            <Button  title="Subir Imagen" onPress={pickImage} />
            {image && <Image source={{ uri: image.uri }} style={{  position: 'absolute',  
            top: 50, width: 250, height: 250, 
           left: -70
        }} />}
        </View>

        <View style={{ position: 'absolute', top: 500, left: 100}} >
        <Button title="Enviar" 
      
        onPress={enviar}
          
        />
        </View>
       
        <View style={{ position: 'absolute', top: 500, right: 100  }}>
        <Button title="Lista" 
         
        onPress={lista}

           
       />
            </View>

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
