import { Stack } from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'index',
};

export default function BelanjaLayout() {
	return <Stack screenOptions={{ headerShown: false }} />;
}
