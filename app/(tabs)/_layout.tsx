import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableWithoutFeedback, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarButton: (props) => (
					<TouchableWithoutFeedback onPress={props.onPress} onPressIn={(e) => e.preventDefault()}>
						<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							{props.children}
						</View>
					</TouchableWithoutFeedback>
				),
				tabBarActiveTintColor: '#1A4D2E',
				tabBarInactiveTintColor: 'gray',
				tabBarStyle: {
					position: 'absolute',

					backgroundColor: 'white',
					height: 72,
					paddingTop: 10,
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
				tabBarHideOnKeyboard: true,
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
						<LinearGradient
							style={{ borderRadius: 99 }}
							colors={['#1A4D2E', '#137f3e']}
							start={{ x: 1, y: 0.5 }}
							end={{ x: 1, y: 1 }}
							className='items-center justify-center w-20 h-20 rounded-full bottom-4'
						>
							<Ionicons name={focused ? 'camera' : 'camera-outline'} size={36} color='#fff' />
						</LinearGradient>
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
