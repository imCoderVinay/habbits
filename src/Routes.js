import { createStackNavigator, createAppContainer } from "react-navigation";
import { Home, New, ChangeOld, EditHabbit, Hustle,HabbitDetails } from "./container";

const Navigation = createStackNavigator({
	Home: {
		screen: Home
	},
	EditHabbit: {
		screen: EditHabbit
	},
	New: {
		screen: New
	},
	ChangeOld: {
		screen: ChangeOld
	},
	Hustle: {
		screen: Hustle
	},
	HabbitDetails:{
		screen:HabbitDetails
	}
});

export default createAppContainer(Navigation);
