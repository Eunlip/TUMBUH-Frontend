import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, BackHandler, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export default function withAuthProtection<P>(WrappedComponent: React.ComponentType<P>) {
	return function ProtectedComponent(props: P) {
		const { authState } = useAuth();
		const router = useRouter();

		// Redirect to login if user is not authenticated
		useEffect(() => {
			if (!authState?.authenticated) {
				router.replace('../auth/signIn');
			}
		}, [authState, router]);

		// Prevent back navigation
		useFocusEffect(
			useCallback(() => {
				const onBackPress = () => true; // Disable back gesture
				BackHandler.addEventListener('hardwareBackPress', onBackPress);

				return () => {
					BackHandler.removeEventListener('hardwareBackPress', onBackPress);
				};
			}, []),
		);

		// Render the wrapped component if user is authenticated
		if (!authState?.authenticated) {
			return (
				<View>
					<ActivityIndicator size='large' color='#1cb55e' />
				</View>
			);
		}

		return <WrappedComponent {...(props as P & React.Attributes)} />;
	};
}
