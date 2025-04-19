interface Video {
	id: number;
	title: string;
	url: string;
	thumbnail: string;
}

interface Article {
	id: number;
	author: string;
	date: Date;
	title: string;
	content: string;
}

interface Quiz {
	id: number;
	title: string;
	url: string;
}

export interface MateriBelajar {
	id: number;
	title: string;
	image: string;
	description: string;
	video: Video[];
	article: Article[];
	quiz?: Quiz[];
}
