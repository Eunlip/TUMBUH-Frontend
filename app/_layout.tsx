import { SplashScreen, Stack } from 'expo-router';
import './global.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export default function RootLayout() {
	const [fonstLoaded] = useFonts({
		'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('@/assets/fonts/Poppins-Thin.ttf'),
	});

	useEffect(() => {
		if (fonstLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fonstLoaded]);

	if (!fonstLoaded) return null;

	return <Stack screenOptions={{ headerShown: false }} />;
}
