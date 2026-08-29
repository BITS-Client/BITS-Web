/**
 * Sanity Seed Data Type Definitions
 */

export interface LocalizedString {
	id?: string;
	en?: string;
}

export interface LocalizedText {
	id?: any[];
	en?: any[];
}

export interface SESettings {
	title?: LocalizedString;
	description?: LocalizedString;
	keywords?: string[];
}

export interface Slug {
	current: string;
	_type?: string;
}

export interface Service {
	_type: 'service';
	title: LocalizedString;
	slug: Slug;
	icon?: string;
	longDescription?: LocalizedText;
	subServices?: Array<{
		title: LocalizedString;
		description: LocalizedText;
		icon?: string;
		_key: string;
	}>;
	benefits?: LocalizedString[];
	order?: number;
	seo?: SESettings;
}

export interface Category {
	_type: 'category';
	title: LocalizedString;
	slug: Slug;
	description?: LocalizedString;
}

export interface Post {
	_type: 'post';
	title: string;
	slug: Slug;
	excerpt?: LocalizedString;
	publishedAt?: string;
	categories?: string[]; // References
	author?: string; // Reference
	featured?: boolean;
	content?: LocalizedText;
	seo?: SESettings;
}

export interface Project {
	_type: 'project';
	title: string;
	slug: Slug;
	description?: LocalizedString;
	publishedAt?: string;
	category?: string; // Reference
	client?: string; // Reference
	techStack?: string[];
	featured?: boolean;
	content?: LocalizedText;
	seo?: SESettings;
}

export interface Client {
	_type: 'client';
	name: string;
	website?: string;
	orderRank?: number;
}

export interface Team {
	_type: 'team';
	name: string;
	slug: Slug;
	position?: LocalizedString;
	bio?: LocalizedText;
	order?: number;
	socialLinks?: Array<{
		platform: string;
		url: string;
		_key: string;
	}>;
	seo?: SESettings;
}

export interface SeedData {
	services?: Service[];
	posts?: Post[];
	projects?: Project[];
	categories?: Category[];
	team?: Team[];
	clients?: Client[];
	homePage?: any;
	aboutPage?: any;
	servicesPage?: any;
	portfolioPage?: any;
	blogPage?: any;
	contactPage?: any;
	termsPage?: any;
	privacyPage?: any;
	generalSettings?: any;
	informationSettings?: any;
	configuration?: any;
	menuSettings?: any;
}
