import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage } from "react-native";
import { Container, Content, Card, Fab, Icon, Button } from "native-base";
import { widthPercentageToDP, heightPercentageToDP } from "../utilities/deviceDimensions";
import { CustomModal } from "../component";
import * as globalColors from "../utilities/globalColors";
import globalStyles from "../utilities/globalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { saveData, getData } from "../utils";

class Home extends Component {
	state = {
		visible: false,
		newHabbits: [],
		onFocusChange: {}
	};

	componentDidMount() {
		const WillFocusSubscription = this.props.navigation.addListener("willFocus", payload => {
			let data = payload.action.params;
			if (data && data.alter) {
				this.fetchData();
			}
		});
		this.setState({ onFocusChange: WillFocusSubscription });
		this.fetchData();
	}

	fetchData = () => {
		getData("newHabbit").then(res => {
			console.log(res, "the response");
			if (res) {
				this.setState({
					newHabbits: res
				});
			}
		});
	};

	onClose = () => {
		this.setState({ visible: false });
	};

	openModal = () => {
		this.setState({ visible: true });
	};

	moveToNewScreen = (id, data) => () => {
		console.log(id, data);
		this.setState({ visible: false });
		this.props.navigation.navigate(id, { data: data || {} });
	};

	onEdit = data => () => {
		this.props.navigation.navigate("EditHabbit", { data });
	};

	componentWillUnmount() {
		this.state.onFocusChange.remove();
	}

	render() {
		const { visible, newHabbits } = this.state;
		return (
			<Container style={styles.container}>
				<Content showsVerticalScrollIndicator={false} style={styles.contentStyle}>
					{newHabbits.map((value, index) => (
						<Card key={index} style={globalStyles.habbitCard}>
							<View
								style={{
									borderBottomColor: "#d6d7da",
									borderBottomWidth: 1,
									flex: 1,
									alignItems: "space-between",
									flexDirection: "row",
									paddingBottom: heightPercentageToDP(1.7)
								}}>
								<View style={{ flex: 1 }} />
								<Text
									style={{
										textAlign: "center",
										textAlignVertical: "center",
										color: "#000",
										flex: 8,
										fontSize: 20,
									}}>
									{value.title}
								</Text>
								<Icon
									type="MaterialIcons"
									name="edit"
									onPress={this.onEdit(value)}
									style={{ color: globalColors.themeColor, flex: 1, width: widthPercentageToDP(5) }}
								/>
							</View>
							<View
								style={{
									flexDirection: "row",
									borderBottomColor: "#d6d7da",
									borderBottomWidth: 1,
									padding: 10,
									flex: 2
								}}>
								<View
									style={{
										flex: 1,
										borderRightColor: "#d6d7da",
										borderRightWidth: 2
									}}>
									<Image
										style={{ width: 60, height: 40, alignSelf: "center" }}
										source={require("../assets/clue.png")}
									/>
									<Text>{value.clue}</Text>
								</View>
								<View style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
									<Icon type="MaterialIcons" name="loop" />
									<Text style={{ textAlign: "right" }}>{value.routine}</Text>
								</View>
							</View>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									flex: 1,
									alignItems: "center",
									paddingTop: heightPercentageToDP(1.7)
								}}>
								<Text onPress={this.moveToNewScreen("Hustle", value)}>Today's Hustle</Text>
								<Button
									onPress={this.moveToNewScreen("HabbitDetails",value)}
									style={{ ...globalStyles.customButton, width: widthPercentageToDP(28) }}>
									<Text style={globalStyles.buttonText}>Details</Text>
								</Button>
							</View>
						</Card>
					))}
					<Text>Hello Home</Text>
				</Content>
				<Fab
					position="bottomRight"
					onPress={this.openModal}
					style={{ backgroundColor: globalColors.themeColor }}>
					<Icon name="add" />
				</Fab>
				<CustomModal visible={visible} onClose={this.onClose}>
					<View style={{ backgroundColor: globalColors.themeColor, flex: 1 }}>
						<View
							style={{
								flex: 2,
								justifyContent: "center",
								alignItems: "center",
								borderBottomColor: globalColors.themeBackgroundColor,
								borderBottomWidth: 2
							}}>
							<Text style={{ color: "#fff", fontSize: 25, textAlign: "center" }}>
								What you want to do with the habbit?
							</Text>
						</View>
						<View style={{ flexDirection: "row", flex: 1, paddingVertical: 10 }}>
							<Text
								style={{
									...styles.modalButtonText,
									borderRightColor: globalColors.themeBackgroundColor,
									borderRightWidth: 2
								}}
								onPress={this.moveToNewScreen("New")}>
								Create New
							</Text>

							<Text style={styles.modalButtonText} onPress={this.moveToNewScreen("ChangeOld")}>
								Change Old
							</Text>
						</View>
					</View>
				</CustomModal>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: widthPercentageToDP(5),
		backgroundColor: globalColors.themeBackgroundColor
	},
	contentStyle: {
		flex: 1
	},
	modalButtonContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	modalButtonText: {
		flex: 1,
		alignItems: "center",
		textAlignVertical: "center",
		textAlign: "center",
		color: "#fff",
		fontSize: 18
	}
});
export default Home;
