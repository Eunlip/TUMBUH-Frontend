import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
	onPress: () => void;
	text: string;
	textColor?: string;
	textSize?: string;
	clsnm?: string;
	color1: string;
	color2: string;
	border?: string;
	opacity?: number;
	icon?: React.ReactNode;
	isLoading?: boolean;
};

export default function Button({
	onPress,
	text,
	textColor,
	textSize,
	clsnm,
	color1,
	color2,
	border,
	opacity,
	icon,
	isLoading,
}: Readonly<ButtonProps>) {
	return (
		<TouchableOpacity
			className={`w-full ${clsnm} ${isLoading ? 'opacity-70' : ''}`}
			activeOpacity={opacity ?? 0.8}
			onPress={onPress}
			disabled={isLoading}
		>
			<LinearGradient
				className={`p-5 items-center justify-center ${border} flex-row w-full`}
				style={{ borderRadius: 99 }}
				colors={[color1, color2]}
				start={{ x: 1, y: 0.5 }}
				end={{ x: 1, y: 1 }}
			>
				{isLoading ? (
					<ActivityIndicator size='small' color='#fff' className='self-center' />
				) : (
					<View className='flex-row items-center justify-center'>
						<View className={`mr-4 ${!icon && 'hidden'}`}>{icon}</View>
						<Text
							className={`${textColor ?? 'text-white'} ${textSize ?? 'text-2xl'} font-semibold `}
						>
							{text}
						</Text>
					</View>
				)}
			</LinearGradient>
		</TouchableOpacity>
	);
}
