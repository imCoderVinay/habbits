import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Modal, TouchableOpacity, Button } from "react-native";

export default ModalScreen = props => {
	let { visible, onClose, children } = props;
	return (
		<Modal animated={false} visible={visible} transparent={true}>
			<TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={onClose}>
				<TouchableOpacity style={styles.modelContent} activeOpacity={1}>
					{children}
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: "rgba(0,0,0,0.5)",
		flex: 1,
		justifyContent: "center"
	},
	modelContent: {
		marginHorizontal: 20,
		minHeight: 180,
		backgroundColor: "white",
        marginVertical: 0,
	}
});
/**
    while using this componetn pass visible, onClose from parent
    Also write the code inside model as in view
*/