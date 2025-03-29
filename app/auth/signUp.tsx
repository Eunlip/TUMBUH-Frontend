import ImageInAuth from '@/assets/images/top-auth.png';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/context/AuthContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
	const [formData, setFormData] = useState<{
		username: string;
		email: string;
		password: string;
	}>({
		username: '',
		email: '',
		password: '',
	});
	const { onSignup } = useAuth();

	const [isChecked, setIsChecked] = useState(false);
	const router = useRouter();

	const handleSignup = async () => {
		const { username, email, password } = formData;

		if (!username || !email || !password) {
			alert('Username, email, dan password harus diisi');
			return;
		}

		if (password.length < 6) {
			alert('Password harus minimal 6 karakter');
			return;
		}

		if (!isChecked) {
			alert('Anda harus menyetujui syarat dan ketentuan');
			return;
		}

		try {
			const result = await onSignup!(username, email, password);

			if (result.error) {
				alert(result.message);
			} else {
				router.push('/(tabs)/edukasi');
			}
		} catch (error) {
			console.error('Error during sign up:', error);
			alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
		}
	};

	return (
		<SafeAreaView className='flex-1'>
			<Image source={ImageInAuth} resizeMode='cover' className='w-full h-72' />
			<View className='flex-1 w-full p-10 bg-white rounded-t-[30px] absolute bottom-0 top-64'>
				<View className='flex gap-5 mb-8'>
					<Input
						label='Username'
						placeholder='Username'
						onChangeText={(text: string) => {
							setFormData({ ...formData, username: text });
						}}
						icon={<FontAwesome name='user' size={24} color='#4F6F52' />}
						clsnm='px-6 py-1'
						iconClsnm='mr-4'
						value={formData.username}
					/>
					<Input
						label='Email Address'
						placeholder='Email Address'
						keyboardType='email-address'
						onChangeText={(text: string) => {
							setFormData({ ...formData, email: text });
						}}
						icon={<MaterialIcons name='email' size={24} color='#4F6F52' />}
						clsnm='px-5 py-1'
						iconClsnm='mr-3'
						value={formData.email}
					/>
					<Input
						label='Password'
						placeholder='Password'
						onChangeText={(text: string) => {
							setFormData({ ...formData, password: text });
						}}
						icon={<FontAwesome name='lock' size={25} color='#4F6F52' />}
						clsnm='px-6 py-1'
						secureTextEntry={true}
						iconClsnm='mr-4'
						value={formData.password}
					/>
					<View className='flex-row gap-3' style={{ marginTop: 10 }}>
						<Checkbox
							style={{ marginTop: 3, borderRadius: 5 }}
							color='#686868'
							value={isChecked}
							onValueChange={setIsChecked}
						/>
						<View className='flex-row flex-wrap items-center w-full'>
							<Text className='text-sm text-right text-black-300 font-poppins text-wrap'>
								Saya setuju dengan{' '}
							</Text>
							<Text className='text-sm text-right text-[#328BF0] font-poppins-medium text-wrap'>
								Syarat & Ketentuan{' '}
							</Text>
							<Text className='text-sm text-right text-black-300 font-poppins'>dan </Text>
							<Text className='text-sm text-right text-[#328BF0] font-poppins-medium text-wrap'>
								Kebijakan Privasi
							</Text>
						</View>
					</View>
				</View>
				<Button text='Daftar' onPress={handleSignup} color1='#49A18C' color2='#3D8D7A' />
				<View className='flex-row items-end justify-center flex-1'>
					<Text className='font-poppins-medium'>Sudah punya akun? </Text>
					<Pressable onPress={() => router.push('./signIn')}>
						<Text className='text-[#3D8D7A] font-poppins-semiBold'>Masuk</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}
