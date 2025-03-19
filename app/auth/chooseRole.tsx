import ImageInAuth from '@/assets/images/top-auth.png';
import Button from '@/components/Button';
import roles from '@/constants/roles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChooseRole() {
	const [selectedRole, setSelectedRole] = useState<string | null>(null);
	const router = useRouter();

	return (
		<SafeAreaView className='flex-1'>
			<Image source={ImageInAuth} resizeMode='cover' className='w-full h-72' />

			<View className='flex-1 items-center w-full p-10 bg-white rounded-t-[30px] absolute bottom-0 top-64'>
				<View className='flex-1 w-full gap-5 mb-8'>
					<Text
						className='mb-5 text-black-200 font-poppins-semiBold text-wrap'
						style={{ fontSize: 27, textAlign: 'center' }}
					>
						Masuk sebagai Penjual atau Pengguna?
					</Text>
					{roles.map((role) => (
						<TouchableOpacity
							key={role.value}
							className='flex-row p-5 px-8 items-center justify-between border-2 rounded-2xl bg-white border-[#DEDEDE]'
							style={selectedRole === role.value && styles.selectedOption}
							onPress={() => setSelectedRole(role.value)}
						>
							<Text
								className='text-xl font-poppins text-black-200'
								style={selectedRole === role.value && styles.textSelected}
							>
								{role.label}
							</Text>
							<View
								className={`w-6 h-6 rounded-full border-2 ${
									selectedRole === role.value ? ' border-green' : 'border-[#DEDEDE]'
								}  items-center justify-center`}
							>
								{selectedRole === role.value && <View className='w-4 h-4 rounded-full bg-green' />}
							</View>
						</TouchableOpacity>
					))}
				</View>
				{selectedRole && (
					<Button
						text='Lanjut Ke Aplikasi'
						onPress={() => router.replace('/(tabs)/edukasi')}
						color1='#49A18C'
						color2='#3D8D7A'
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	selectedOption: {
		borderColor: '#3D8D7A',
		backgroundColor: '#ECFFF4',
	},
	textSelected: {
		color: '#000',
		fontFamily: 'Poppins-Medium',
	},
	circleContainer: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#3D8D7A',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerCircle: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#3D8D7A',
	},
});
