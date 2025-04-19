import { AuthProvider } from '@/context/AuthContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import './global.css';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import * as Linking from 'expo-linking';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('@/assets/fonts/Poppins-Thin.ttf'),
	});

	const router = useRouter();

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}

		// Handle incoming deep links
		const handleDeepLink = ({ url }: { url: string }) => {
			const { path, queryParams } = Linking.parse(url);
			if (path === 'resetPassword') {
				if (queryParams) {
					const { token, email } = queryParams;
					router.replace(`/resetPassword?token=${token}&email=${email}`);
				}
			}
		};

		const subscription = Linking.addEventListener('url', handleDeepLink);

		// Clean up the event listener on unmount
		return () => {
			subscription.remove();
		};
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
