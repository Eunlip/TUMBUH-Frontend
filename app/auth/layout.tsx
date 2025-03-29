import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
	const { authState } = useAuth(); // Pastikan ada state `user`
	const router = useRouter();

	useEffect(() => {
		if (!authState?.token) {
			router.replace('/'); // ✅ Redirect jika tidak ada user
		}
	}, [authState]);

	return <>{children}</>; // Tetap render children jika user login
}
