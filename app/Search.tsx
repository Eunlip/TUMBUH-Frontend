// app/Search.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

export default function SearchScreen() {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500, // durasi fade
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<Animated.View style={[styles.container, { opacity: fadeAnim }]}>
			<Text style={styles.text}>Halaman Search</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
