import React from 'react'
import {Text,View,StyleSheet,ActivityIndicator} from 'react-native'

export default class About extends React.Component{
    render(){
        return (
            <View style={mySytle.bordure}>
                <Text style={mySytle.title}>A propos de moi</Text>
                <Text>
                    Android 
                </Text>  
            </View>
        )
    }

}

const mySytle=StyleSheet.create({
    bordure:{
        margin:40
    },
    title:{
        fontSize:22,
        marginBottom:20
    }
})