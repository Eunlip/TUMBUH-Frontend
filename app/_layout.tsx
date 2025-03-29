import { AuthProvider } from '@/context/AuthContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import './global.css';

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

	// If the user is authenticated, show the main app
	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</AuthProvider>
	);
}
