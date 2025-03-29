import { useAuth } from '@/context/AuthContext';
import { Redirect, useSegments, useRootNavigationState } from 'expo-router';
import React, { useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { readonly children: React.ReactNode }) {
	const { authState } = useAuth();
	const segments = useSegments(); // Mendapatkan path saat ini
	const navigationState = useRootNavigationState(); // Cek status navigasi
	const [isAuthChecked, setIsAuthChecked] = useState(false);

	// Tunggu sampai `authState` terinisialisasi
	useEffect(() => {
		if (authState !== undefined) {
			setIsAuthChecked(true);
		}
	}, [authState]);

	// Pastikan navigasi sudah siap sebelum melakukan redirect
	if (!isAuthChecked || !navigationState?.key) {
		return null; // Jangan render apapun sampai navigasi siap
	}

	// Jika belum login dan bukan di halaman auth, redirect ke login
	if (!authState?.authenticated && segments[0] !== 'auth') {
		return <Redirect href='/auth/signIn' />;
	}

	// Jika sudah login dan berada di halaman auth, redirect ke halaman utama (Tabs)
	if (authState?.authenticated && segments[0] === 'auth') {
		return <Redirect href='/(tabs)/edukasi' />;
	}

	return children;
}
