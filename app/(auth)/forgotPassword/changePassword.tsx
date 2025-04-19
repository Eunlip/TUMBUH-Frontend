import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ChangePassword() {
	const router = useRouter();

	return (
		<SafeAreaView className='flex-1 p-10 bg-white'>
			<View className='items-center flex-1 gap-3'>
				<Text
					style={{ fontSize: 26 }}
					className='text-center capitalize font-poppins-bold text-black-200'
				>
					Ubah Password
				</Text>
				<Text
					style={{ fontSize: 16, color: '#7A7A7A' }}
					className='leading-normal text-center font-poppins'
				>
					Masukkan password baru untuk mengubah password lama anda
				</Text>
				<View style={{ width: '100%', marginTop: 30, gap: 20 }}>
					<Input
						label='Password'
						placeholder='Password'
						value={''}
						onChangeText={() => {}}
						leftIcon={<FontAwesome name='lock' size={25} color='#4F6F52' />}
						clsnm='px-6 py-1'
						secureTextEntry={true}
						iconClsnm='mr-4'
					/>
					<Input
						label='Password'
						placeholder='Konfirmasi Password'
						value={''}
						onChangeText={() => {}}
						leftIcon={<FontAwesome name='lock' size={25} color='#4F6F52' />}
						clsnm='px-6 py-1'
						secureTextEntry={true}
						iconClsnm='mr-4'
					/>
				</View>
			</View>
			<View className='w-full gap-3'>
				<Button
					text='Ubah'
					onPress={() => router.push('../signIn')}
					color1='#49A18C'
					color2='#3D8D7A'
				/>
			</View>
		</SafeAreaView>
	);
}
