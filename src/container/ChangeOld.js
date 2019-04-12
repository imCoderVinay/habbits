import React,{Component,Fragment} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from "../utilities/deviceDimensions";
 class ChangeOld extends Component{
     render(){
         return(
             <View style={styles.container}>
                 <Text>Hello ChangeOld</Text>
             </View>
         )
     }
 }

 const styles =StyleSheet.create({
     container:{
        paddingHorizontal:widthPercentageToDP(5),
     }
 })
 export default ChangeOld;