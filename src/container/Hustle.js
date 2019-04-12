import React, { Component } from "react";
import { View, Text, Picker,TextInput } from "react-native";
import { Content ,Button} from "native-base";
import * as globalColors from "../utilities/globalColors";
import globalStyles from "../utilities/globalStyles";
import {getData,saveData} from "../utils"
import { widthPercentageToDP, heightPercentageToDP } from "../utilities/deviceDimensions";
import * as _ from "lodash";

class Hustle extends Component {
	state = {
		data: new Date().toLocaleDateString(),
		note: "",
		isTodaySuccess: true
	};

	componentDidMount() {
		let data = this.props.navigation.getParam("data");
		console.log(data, "the data");
    }
    
	onInputChange = value => {
		this.setState({ note: value });
	};

	onSubmit = () => {
        let {note,isTodaySuccess} =this.state;
        let data = this.props.navigation.getParam("data");
		   data.hustle[new Date().toLocaleDateString()]={success:isTodaySuccess,note};
           getData("newHabbit").then(res=>{
               let index=_.findIndex(res,{habbitId:data.habbitId});
               res[index]=data;
               saveData("newHabbit",res).then(val=>{
                   this.props.navigation.navigate("Home");
               })
           })
        
    };
    
    dropdownSelector = (value)=>{
        this.setState({isTodaySuccess:value})
    }

	render() {
		console.log(this.state.date,'tyhe')
		let { isTodaySuccess, note } = this.state;

		return (
			<View style={{flex:1}}>
            <Content style={{flex:1,paddingHorizontal:widthPercentageToDP(5),marginBottom:heightPercentageToDP(2)}}>
				<View style={{marginVertical:heightPercentageToDP(2)}}>
					<Text style={{marginBottom:heightPercentageToDP(1)}}>Today's Target achived</Text>

					<View
						style={{ borderWidth: 1, borderColor: "#d6d7da", borderRadius: 5}}
						borderBottomColor={"#d6d7da"}>
						<Picker
							style={{
								border: 3,
								borderRadius: 5
							}}
							mode="dropdown"
							selectedValue={isTodaySuccess}
							onValueChange={this.dropdownSelector}>
							<Picker.Item label="Yes" value={true} />
							<Picker.Item label="No" value={false} />
						</Picker>
					</View>
				</View>
				<View
					style={{...globalStyles.inputContainer}}
					borderBottomColor={"#d6d7da"}>
					<Text>Note</Text>
					<TextInput
						value={note}
						onChangeText={this.onInputChange}
						multiline={true}
					/>
				</View>
				<Button onPress={this.onSubmit} style={globalStyles.customButton}>
					<Text style={globalStyles.buttonText}>Submit</Text>
				</Button>
                </Content>
			</View>
		);
	}
}

export default Hustle;
