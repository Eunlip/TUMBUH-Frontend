import GoogleIcon from '@/assets/icons/Google.png';
import ImageInAuth from '@/assets/images/top-auth.png';
import Button from '@/components/Button';
import Input from '@/components/Input';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
	const router = useRouter();

	return (
		<SafeAreaView className='flex-1'>
			<Image source={ImageInAuth} resizeMode='cover' className='w-full h-72' />
			<View className='flex-1 w-full p-10 bg-white rounded-t-[30px] absolute bottom-0 top-64'>
				<View className='flex gap-5'>
					<Input
						label='Email Address'
						placeholder='Email Address'
						keyboardType='email-address'
						onChangeText={() => {}}
						icon={<MaterialIcons name='email' size={24} color='#4F6F52' />}
						clsnm='px-5 py-1'
						iconClsnm='mr-3'
					/>
					<Input
						label='Password'
						placeholder='Password'
						onChangeText={() => {}}
						icon={<FontAwesome name='lock' size={25} color='#4F6F52' />}
						clsnm='px-6 py-1'
						secureTextEntry={true}
						iconClsnm='mr-4'
					/>
					<Pressable
						onPress={() => router.push('./forgotPassword/forgotPassword')}
						className='self-end'
					>
						<Text className='text-right text-black-300 font-poppins-medium'>Lupa Password?</Text>
					</Pressable>
				</View>
				<View className='flex gap-5 mt-6'>
					<Button
						text='Masuk'
						onPress={() => router.push('./chooseRole')}
						color1='#49A18C'
						color2='#3D8D7A'
					/>
					<View className='flex-row items-center justify-center gap-3'>
						<View style={styles.line} />
						<Text className='text-black-100 font-poppins-medium'>atau</Text>
						<View style={styles.line} />
					</View>
					<Button
						text='Masuk dengan Google'
						onPress={() => {}}
						color1='transparent'
						color2='transparent'
						textColor='text-black-200'
						border='border-2 border-[#DEDEDE]'
						opacity={0.6}
						icon={<Image source={GoogleIcon} resizeMode='contain' className='w-7 h-7' />}
					/>
				</View>
				<View className='flex-row items-end justify-center flex-1'>
					<Text className='font-poppins-medium'>Belum punya akun? </Text>
					<Pressable onPress={() => router.push('./signUp')}>
						<Text className='text-[#3D8D7A] font-poppins-semiBold'>Daftar</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	line: {
		flex: 1,
		height: 1,
		backgroundColor: '#DCDCDC',
	},
});
