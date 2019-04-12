import React, { Component, Fragment } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	Alert
} from "react-native";
import { Container, Content, Card, Fab, Icon, Button } from "native-base";
import { widthPercentageToDP, heightPercentageToDP } from "../utilities/deviceDimensions";
import { CustomModal } from "../component";
import * as globalColors from "../utilities/globalColors";
import globalStyles from "../utilities/globalStyles";
import { saveData, getData } from "../utils";
import Validator from "../utilities/validations/New";
import * as _ from "lodash";
class EditHabbit extends Component {
	constructor(props) {
		super(props);
		props.navigation.setParams({ onDeleteClick: this.onDeleteClick });
	}

	state = {
		habbitData: {
			title: "",
			clue: "",
			routine: "",
			reward: ""
		},
		errors: {}
	};

	onDeleteClick = () => {
		Alert.alert("Delete Habbit", "Are you sure you want to delete this habbit?", [
			{ text: "NO", style: "cancel" },
			{ text: "YES", onPress: this.deleteHabbit }
		]);
	};
	deleteHabbit = () => {
		let habitData = { ...this.state.habbitData };
		getData("newHabbit").then(res => {
            _.remove(res, { habbitId: habitData.habbitId });
			saveData("newHabbit", res).then(value => {
				this.props.navigation.navigate("Home", { alter: true });
			});
		});
	};
	componentDidMount() {
		let habbitData = this.props.navigation.getParam("data");
		console.log(habbitData, "the habbvit data");
		this.setState({ habbitData });
	}

	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;
		return {
			headerStyle: {
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
				backgroundColor: globalColors.themeBackgroundColor
			},
			headerRight: (
				<TouchableOpacity
					style={{ marginRight: 18 }}
					onPress={() => {
						navigation.navigate("Settings");
					}}>
					<Icon type="MaterialIcons" name="delete" onPress={params.onDeleteClick} />
				</TouchableOpacity>
			)
		};
	};
	onSubmit = () => {
		if (this.isValidData()) {
			let habitData = { ...this.state.habbitData };
			getData("newHabbit").then(res => {
				let index = _.findIndex(res, { habbitId: habitData.habbitId });
				res[index] = habitData;
				saveData("newHabbit", res).then(value => {
					this.props.navigation.navigate("Home", { alter: true });
				});
			});
		}
	};
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
	render() {
		const { habbitData, errors } = this.state;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.title ? "#F44336" : "#d6d7da"}>
						<Text>Title</Text>
						<TextInput value={habbitData.title} onChangeText={this.onInputChange("title")} />
					</View>
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.clue ? "#F44336" : "#d6d7da"}>
						<Text>Clue</Text>
						<TextInput
							value={habbitData.clue}
							onChangeText={this.onInputChange("clue")}
							multiline={true}
							style={{}}
						/>
					</View>
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.routine ? "#F44336" : "#d6d7da"}>
						<Text>Routine</Text>
						<TextInput
							value={habbitData.routine}
							onChangeText={this.onInputChange("routine")}
							multiline={true}
							style={{}}
						/>
					</View>
					<View
						style={globalStyles.inputContainer}
						borderBottomColor={errors.reward ? "#F44336" : "#d6d7da"}>
						<Text>Reward</Text>
						<TextInput
							value={habbitData.reward}
							onChangeText={this.onInputChange("reward")}
							multiline={true}
							style={{}}
						/>
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

export default EditHabbit;
