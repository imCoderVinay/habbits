import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, Icon, Content } from "native-base";
import { widthPercentageToDP, heightPercentageToDP } from "../utilities/deviceDimensions";
import * as globalColors from "../utilities/globalColors";
import globalStyles from "../utilities/globalStyles";
import * as _ from "lodash";

class HabbitDetails extends Component {
	state = {
		succesRate: "",
		hustleData: {},
		totalDays: ""
	};
	componentDidMount() {
		let data = this.props.navigation.getParam("data");
		console.log(data, "the data");
		console.log(_.isEmpty(data.hustle), "check if empty");
		if (!_.isEmpty(data.hustle)) {
			let totalDays = Object.keys(data.hustle).length || 0;
			let successFilter = _.filter(data.hustle, value => {
				return value.success == true;
			});
			let succesRate =
				(successFilter && (successFilter.length * 100) / Object.keys(data.hustle).length) || 0;
			this.setState({ succesRate, hustleData: data.hustle, totalDays });
			return;
		}
		this.setState({ succesRate: 0, totalDays: 0 });
	}

	render() {
		let { succesRate, hustleData, totalDays } = this.state;
		console.log(hustleData, "the hsu");

		return (
			<Content style={{ paddingHorizontal: widthPercentageToDP(4.5) }}>
				<Card
					style={{
						height: heightPercentageToDP(30),
						paddingHorizontal: widthPercentageToDP(4),
						borderRadius: 5,
						backgroundColor: globalColors.themeColor,
						justifyContent: "space-between"
					}}>
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>SUCCESS RATE</Text>
					</View>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<Icon
							type="Entypo"
							name="trophy"
							style={{
								borderRadius: 50,
								borderWidth: 2,
								borderColor: "#f2ddda",
								color: "white",
								padding: 12,
								textAlign: "center",
								textAlignVertical: "center"
							}}
						/>
						<Text style={{ fontSize: 20, color: "#fff" }}>{succesRate}</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: "space-between",
							flexDirection: "row",
							alignItems: "center"
						}}>
						<Text style={{ color: "white", fontSize: 18 }}>DAYS COUNT</Text>

						<Text style={{ color: "white", fontSize: 18 }}>{totalDays}</Text>
					</View>
				</Card>

				{Object.keys(hustleData).map((value, index) => (
					<Card
						style={{
							paddingVertical: heightPercentageToDP(2.5),
							paddingHorizontal: widthPercentageToDP(4)
						}}>
						<View>
							<Text>{hustleData[value].note}</Text>
						</View>
						<View
							style={{
								position: "absolute",
								bottom: heightPercentageToDP(2.5),
								right: widthPercentageToDP(4)
							}}>
							<Text>{value}</Text>
						</View>
					</Card>
				))}

				<Text>Hello</Text>
			</Content>
		);
	}
}
export default HabbitDetails;
