import { Avatar } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable } from 'react-native';

type AvatarProps = {
	readonly imageUrl?: string;
	readonly username: string;
	readonly navigateToAkunScreen?: boolean;
};

export default function UserAvatar({ imageUrl, username, navigateToAkunScreen }: AvatarProps) {
	const router = useRouter();

	const getInitials = (name: string) => {
		const words = name.split(' ');
		return words.length > 1
			? `${words[0][0]}${words[1][0]}`.toUpperCase()
			: `${words[0][0]}`.toUpperCase();
	};

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const randomBackgroundColor = useMemo(() => getRandomColor(), []);

	return (
		<Pressable onPress={navigateToAkunScreen ? () => router.push('../akun') : undefined}>
			<Avatar
				size={45}
				rounded
				title={getInitials(username)}
				source={imageUrl ? { uri: imageUrl } : undefined}
				containerStyle={{ backgroundColor: randomBackgroundColor }}
			/>
		</Pressable>
	);
}
