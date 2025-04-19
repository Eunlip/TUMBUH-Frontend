import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface IconProps {
	variant: React.ReactNode;
}

export default function Icon({ variant }: Readonly<IconProps>) {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<TouchableOpacity
			style={[styles.container, isPressed && styles.pressed]}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			activeOpacity={0.5}
		>
			{variant}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderRadius: 50,
		backgroundColor: 'transparent',
	},
	pressed: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
	},
});
