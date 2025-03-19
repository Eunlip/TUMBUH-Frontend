import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#1A4D2E',
				tabBarInactiveTintColor: 'gray',
				tabBarStyle: {
					position: 'absolute',

					backgroundColor: 'white',
					height: 72,
					paddingTop: 5,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 16,
					elevation: 0,
				},
				freezeOnBlur: true,
				animation: 'shift',
				lazy: true,
				tabBarAllowFontScaling: true,
				sceneStyle: { backgroundColor: 'white' },
			}}
		>
			<Tabs.Screen
				name='edukasi'
				options={{
					tabBarIcon: ({ color, size }) => <FontAwesome5 name='book' size={22} color={color} />,
					tabBarLabel: 'Edukasi',
					tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins-SemiBold' },
				}}
			/>
			<Tabs.Screen
				name='belanja'
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'shopping' : 'shopping-outline'}
							size={26}
							color={color}
						/>
					),
					tabBarLabel: 'Belanja',
					tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins-SemiBold' },
				}}
			/>
			<Tabs.Screen
				name='detectionPlants'
				options={{
					title: '',
					tabBarIcon: ({ color, size, focused }) => (
						<View className='items-center justify-center w-20 h-20 rounded-full bottom-4 bg-[#1A4D2E]'>
							<Ionicons name={focused ? 'camera' : 'camera-outline'} size={36} color='#fff' />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name='forum'
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'forum' : 'forum-outline'}
							size={26}
							color={color}
						/>
					),
					tabBarLabel: 'Forum',
					tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins-SemiBold' },
				}}
			/>
			<Tabs.Screen
				name='akun'
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<FontAwesome name={focused ? 'user-circle' : 'user-circle-o'} size={26} color={color} />
					),
					tabBarLabel: 'Akun',
					tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins-SemiBold' },
				}}
			/>
		</Tabs>
	);
}
