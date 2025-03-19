import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '@/assets/icons/logo-in-onboarding.png';
import Button from '@/components/Button';
import PagerView from 'react-native-pager-view';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import slides from '@/constants/slides';

export default function Index() {
	const pagerRef = useRef<PagerView>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const router = useRouter();

	const handlePageChange = () => {
		if (currentIndex < slides.length - 1) {
			pagerRef.current?.setPage(currentIndex + 1);
		}
	};

	return (
		<SafeAreaView className='items-center justify-between flex-1 p-10 bg-white'>
			<View className='items-center'>
				<Image source={Logo} resizeMode='contain' className='w-auto h-16' />
			</View>
			<View style={styles.containerPager}>
				<PagerView
					style={styles.pagerView}
					initialPage={0}
					ref={pagerRef}
					onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
				>
					{slides.map((item, index) => (
						<View key={index} className='flex items-center h-fit'>
							<Image source={item.image} className='mb-3 w-72 h-72' resizeMode='contain' />
							<View className='flex items-center gap-3 '>
								<Text className='text-2xl uppercase font-poppins-bold text-black-200'>
									{item.title}
								</Text>
								<Text className='leading-normal text-center font-poppins text-black-100'>
									{item.description}
								</Text>
							</View>
						</View>
					))}
				</PagerView>

				<View className='flex-row justify-center'>
					{slides.map((_, dotIndex) => (
						<View
							key={dotIndex}
							style={[styles.dot, currentIndex === dotIndex && styles.activeDot]}
						/>
					))}
				</View>
			</View>
			{currentIndex === slides.length - 1 ? (
				<View className='w-full gap-3'>
					<Button
						text='Masuk'
						onPress={() => router.push('/auth/signIn')}
						color1='#49A18C'
						color2='#3D8D7A'
					/>
					<Button
						text='Daftar'
						onPress={() => router.push('/auth/signUp')}
						color1='transparent'
						color2='transparent'
						textColor='text-[##3D8D7A]'
						border='border-2 border-[##3D8D7A]'
						opacity={0.6}
					/>
				</View>
			) : (
				<Button text='Lanjut' onPress={handlePageChange} color1='#49A18C' color2='#3D8D7A' />
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerPager: {
		flex: 1,
		width: '100%',
		gap: 10,
		marginVertical: 50,
	},
	pagerView: {
		height: 390,
		width: '100%',
	},
	dot: {
		width: 10,
		height: 4,
		borderRadius: 2,
		marginHorizontal: 4,
		backgroundColor: '#C4C4C4',
	},
	activeDot: {
		backgroundColor: '#1A4D2E',
		width: 20,
	},
});
