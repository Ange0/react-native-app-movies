import React from 'react'
import {Text,View,StyleSheet,ActivityIndicator,Platform} from 'react-native'
import HelloWorld from './HelloWorld';

export default class HelloWorld extends React.Component{
    render(){
        return (
           /*  <View style={mySytle.main_container}>
                <View style={mySytle.subview_container}></View>
                <HelloWorld/>
            </View> */
            <View style={mySytle.main_container}>
                <View style={mySytle.animated_container}></View>
              
            </View>
        )
    }

}

const mySytle=StyleSheet.create({
    main_container:{
       flex:1,
      justifyContent:'center' ,
      alignItems:'center'
    },
    subview_container:{
       //backgroundColor:Platform.OS==='ios'?'red':'blue',
       // oubien on peut utiliser cette syntaxe
       ...Platform.select({
           ios:{
               backgroundColor:'red',
           },
           android:{
            backgroundColor:'green',
           }
       }),
       height:50,
       width:50

    },
    animated_container:{
        backgroundColor:'red',
        width:100,
        height:100
    }
})