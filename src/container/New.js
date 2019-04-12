import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, AsyncStorage } from "react-native";
import { widthPercentageToDP, heightPercentageToDP } from "../utilities/deviceDimensions";
import globalStyles from "../utilities/globalStyles";
import * as globalColors from "../utilities/globalColors";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "native-base";
import Validator from "../utilities/validations/New";
import { saveData, getData } from "../utils";
import uuid from "uuid";
const keyboardVerticalOffset = 0;

class New extends Component {
	state = {
		habbitData: {
			title: "",
			clue: "",
			routine: "",
			reward: ""
		},
		errors: {}
	};

	componentDidMount() {
		getData("newHabbit").then(res => {
			console.log(res, "the reposne");
		});
	}
	onInputChange = id => value => {
		let habbitData = { ...this.state.habbitData };
		habbitData[id] = value;
		this.setState({ habbitData });
	};

	isValidData = () => {
		let habbitData = { ...this.state.habbitData };
		let ValidTester = Validator(habbitData);
		this.setState({ errors: ValidTester.errors });
		return ValidTester.isValid;
	};
	onSubmit = () => {
		let habbitData = { ...this.state.habbitData, habbitId: uuid(new Date()),hustle:{} };
		if (this.isValidData()) {
			getData("newHabbit").then(res => {
				if (res) {
					console.log("he");
					let data;
					data = [...res, habbitData];
					saveData("newHabbit", data).then(value => {
						this.props.navigation.navigate("Home", { alter: true });
					});
					return;
				}
				saveData("newHabbit", [habbitData]).then(value => {
					this.props.navigation.navigate("Home", { alter: true });
				});
			});
		}
		console.log(habbitData, "the havit data");
	};

	render() {
		const { errors } = this.state;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.title ? "#F44336" : "#d6d7da"}>
						<Text>Title</Text>
						<TextInput onChangeText={this.onInputChange("title")} />
					</View>
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.clue ? "#F44336" : "#d6d7da"}>
						<Text>Clue</Text>
						<TextInput onChangeText={this.onInputChange("clue")} multiline={true} style={{}} />
					</View>
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.routine ? "#F44336" : "#d6d7da"}>
						<Text>Routine</Text>
						<TextInput onChangeText={this.onInputChange("routine")} multiline={true} style={{}} />
					</View>
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.reward ? "#F44336" : "#d6d7da"}>
						<Text>Reward</Text>
						<TextInput onChangeText={this.onInputChange("reward")} multiline={true} style={{}} />
					</View>
					<Button onPress={this.onSubmit} style={globalStyles.customButton}>
						<Text style={globalStyles.buttonText}>Submit</Text>
					</Button>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: widthPercentageToDP(5),
		flex: 1
	}
});
export default New;
