import BGHeader from '@/assets/images/edukasi_header.png';
import EmptyModul from '@/assets/images/Empty_modul.png';
import UserAvatar from '@/components/Avatar';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import withAuthProtection from '@/components/withAuthProtection';
import { dummyMateri } from '@/constants/materi';
import useUserDetail from '@/hooks/useUser';
import { MateriBelajar } from '@/types/materi';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
	Dimensions,
	Image,
	Modal,
	Pressable,
	ScrollView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Input from '@/components/Input';

function Edukasi() {
	const [materi, setMateri] = useState<MateriBelajar[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [textInput, setTextInput] = useState<string>('');

	const { userDetail, loading, error } = useUserDetail();
	const router = useRouter();
	const inputRef = useRef<TextInput>(null);

	useEffect(() => {
		if (isModalVisible) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
			textInput.length > 0 && setTextInput('');
		}
	}, [isModalVisible]);

	if (error) {
		Dialog.show({
			type: ALERT_TYPE.DANGER,
			title: 'Error',
			textBody: 'Error fetching user details:\n\n ' + error,
			button: 'OK',
			onPressButton: () => Dialog.hide(),
		});
	}

	console.log('userDetail', userDetail);

	return (
		<View className='flex-1 bg-white'>
			{/* Status Bar */}
			<StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

			{/* Header */}
			<ImageBackground
				source={BGHeader}
				style={{ width: '100%', height: 180 }}
				// style={materi.length > 0 ? { width: '100%', height: 180 } : { width: '100%', height: 115 }}
				imageStyle={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
			>
				<SafeAreaView className='px-5 py-5'>
					<View className='flex-row items-center justify-between'>
						<View className='flex-row items-center gap-3'>
							<UserAvatar
								navigateToAkunScreen
								username={userDetail?.username ?? ''}
								imageUrl={userDetail?.photo}
							/>
							{loading ? (
								<Text className='text-white'>Loading user details...</Text>
							) : (
								<View>
									<Text className='text-xl text-white font-poppins-semiBold max-w-60'>
										Hai, {userDetail?.username}
									</Text>
									<Text className='text-base text-white font-poppins'>Selamat Datang !</Text>
								</View>
							)}
						</View>
						<Icon variant={<Ionicons name='notifications-sharp' size={24} color='white' />} />
					</View>
					<Pressable
						onPress={() => router.push('../../Search')}
						className='flex-row items-center gap-4 px-5 py-3.5 mt-5 bg-white rounded-xl'
					>
						<MaterialCommunityIcons name='book-search-outline' size={24} color='#4d4d4d' />
						<Text className='text-xl text-black-100/80'>Cari Materi Belajar</Text>
					</Pressable>
				</SafeAreaView>
			</ImageBackground>

			{/* Main Content */}
			<View className='flex-1'>
				{materi.length > 0 ? (
					<View className='flex-row items-center justify-between px-5 mt-5'>
						<Text className='text-2xl font-poppins-bold'>Materi Belajar</Text>
						<TouchableOpacity activeOpacity={0.7}>
							<Text className='text-base font-poppins text-[#FFC001]'>Lihat Semua</Text>
						</TouchableOpacity>
					</View>
				) : (
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 100,
							paddingHorizontal: 20,
							paddingTop: Dimensions.get('window').height > 800 ? 40 : 0,
						}}
					>
						<Text className='mt-10 -mb-10 text-2xl leading-normal text-center text-black-400 font-poppins-bold'>
							Yahh!! kamu belum punya materi belajar nih
						</Text>
						<Image source={EmptyModul} resizeMode='contain' className='w-full h-[24rem] ' />

						<Button
							color1='#FFC001'
							color2='#E4AC00'
							onPress={() => setIsModalVisible(true)}
							text='Tambah Materi Belajar'
							clsnm='px-5 -mt-2'
						/>
					</ScrollView>
				)}

				{/*  Modal */}
				<Modal
					animationType='slide'
					transparent={true}
					visible={isModalVisible}
					onRequestClose={() => setIsModalVisible(false)}
				>
					<TouchableWithoutFeedback
						onPress={() => setIsModalVisible(false)} // Close modal when clicking outside
						className='flex-1 w-full h-full'
					>
						<View
							className={`${
								!isModalVisible
									? 'hidden'
									: 'absolute top-0 bottom-0 items-center justify-center flex-1 w-full h-full bg-black/70'
							} `}
						>
							<TouchableWithoutFeedback>
								<View className='absolute items-center bottom-0 w-full px-10 p-5 bg-white rounded-t-[26px]'>
									<Text className='mb-2 text-[24px] text-center font-poppins-bold text-black-200'>
										Buat Materi Belajar
									</Text>
									<Text
										className='text-lg leading-normal text-center font-poppins text-black-100'
										style={{ maxWidth: Dimensions.get('window').width - 100 }}
									>
										Masukkan judul atau scan tanaman, biarkan AI menyusunnya otomatis.
									</Text>
									<View className='w-full mt-10 mb-20'>
										<Input
											placeholder='Judul Materi'
											keyboardType='default'
											onChangeText={(text: string) => setTextInput(text)}
											value={textInput}
											clsnm='px-5 py-4 border-[#CFCFCF] bg-[#FAFAFA] mb-2'
											selectionColor='#288A53'
											textColor='text-black-200'
											textSize='text-2xl'
										/>
										<Text className='font-poppins text-[#909090]'>
											Contoh: Selada, Bayam, Kangkung, dll...
										</Text>
									</View>
									<View className='w-full gap-3 '>
										<Button
											text='Generate'
											onPress={() => {}}
											color1='#49A18C'
											color2='#3D8D7A'
											border='border-2 border-[##3D8D7A]'
											textSize='text-xl'
										/>
										<Button
											text='Batal'
											onPress={() => setIsModalVisible(false)}
											color1='transparent'
											color2='transparent'
											textColor='text-[##3D8D7A]'
											border='border-2 border-[##3D8D7A]'
											opacity={0.6}
											textSize='text-xl'
										/>
									</View>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		</View>
	);
}

export default withAuthProtection(Edukasi);
