import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "./deviceDimensions";
import * as globalColors from "./globalColors";
export default (style = StyleSheet.create({
	inputContainer: {
		borderBottomWidth: 1,
		marginBottom: heightPercentageToDP(2),
		borderBottomColor: "#d6d7da"
	},
	customButton: {
		backgroundColor: globalColors.themeColor,
		borderRadius: 5,
		width: widthPercentageToDP(40),
		justifyContent: "center"
	},
	buttonText:{
		color:"#fff"
	},
	habbitCard: {
		paddingVertical: heightPercentageToDP(2.5),
		paddingHorizontal: widthPercentageToDP(4),
		borderRadius: 5,
		backgroundColor: "white",
		marginBottom: 20,
		minHeight:heightPercentageToDP(31)
	},
}));
