import React,{Component,Fragment} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from "../utilities/deviceDimensions";
 class Edit extends Component{
     render(){
         return(
             <View style={styles.container}>
                 <Text>Hello Edit</Text>
             </View>
         )
     }
 }

 const styles =StyleSheet.create({
     container:{
        paddingHorizontal:widthPercentageToDP(5),
     }
 })
 export default Edit;