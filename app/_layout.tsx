import { AuthProvider } from '@/context/AuthContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import './global.css';
import { AlertNotificationRoot } from 'react-native-alert-notification';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('@/assets/fonts/Poppins-Thin.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) return null;

	// If the user is authenticated, show the main app
	return (
		<AlertNotificationRoot>
			<AuthProvider>
				<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
					<Stack.Screen
						name='(tabs)'
						options={{
							animation: 'slide_from_right',
							gestureDirection: 'horizontal',
						}}
					/>
					<Stack.Screen
						name='(auth)'
						options={{
							animation: 'slide_from_bottom',
							gestureDirection: 'vertical',
						}}
					/>
					<Stack.Screen
						name='Search'
						options={{
							animation: 'fade',
							gestureDirection: 'horizontal',
						}}
					/>
				</Stack>
			</AuthProvider>
		</AlertNotificationRoot>
	);
}
