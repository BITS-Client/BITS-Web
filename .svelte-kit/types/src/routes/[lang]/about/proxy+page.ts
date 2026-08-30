// @ts-nocheck
import type { PageLoad } from './$types';
import { getAboutPageData } from '$lib/sanity/queries';
import type { Locale } from '$lib/types';

interface SiteLogo {
	asset?: {
		url: string;
	};
	alt?: string;
}

interface InformationSettings {
	siteTitle?: string;
	siteDescription?: string;
	siteTagline?: string;
	siteIcon?: SiteLogo;
	siteLogo?: SiteLogo;
	siteURL?: string;
	siteEmail?: string;
	siteTelp?: string;
	siteWhatsApp?: string;
	siteAddress?: string;
	googleMaps?: string;
	instagram?: string;
	tiktok?: string;
	youtube?: string;
	github?: string;
}

interface TeamMember {
	_id: string;
	name: string;
	slug: { current: string };
	role: string;
	bio: string;
	image: unknown; // Sanity image
	social: {
		instagram?: string;
		github?: string;
		youtube?: string;
	};
	order: number;
}

interface AboutPageContent {
	_id: string;
	seo: {
		title: string;
		description: string;
		keywords: string[];
	};
	hero: {
		badge?: string;
		title?: string;
		subtitle?: string;
		contact?: string;
		portfolio?: string;
		experience?: string;
		experienceValue?: string;
		client?: string;
		clientValue?: string;
		project?: string;
		projectValue?: string;
	};
	vision: {
		badge?: string;
		title?: string;
		subtitle?: string;
		visionTitle?: string;
		visionDesc?: string;
		missionTitle?: string;
		missionDesc?: string;
	};
	timeline: {
		badge?: string;
		title?: string;
		subtitle?: string;
		end?: string;
		stories?: Array<{
			_key: string;
			title: string;
			description: string;
			icon: string;
			year: string;
		}>;
	};
	principles: {
		badge?: string;
		title?: string;
		subtitle?: string;
		ready?: string;
		readySubtitle?: string;
		connect?: string;
		keys?: Array<{
			_key: string;
			title: string;
			description: string;
			icon: string;
		}>;
	};
	teams: {
		badge?: string;
		title?: string;
		subtitle?: string;
		ctaIcon?: string;
		ctaTitle?: string;
		ctaSubtitle?: string;
		ctaButton?: string;
	};
}

interface _AboutPageData {
	aboutPage: AboutPageContent | null;
	teamMembers: TeamMember[];
	information: InformationSettings | null;
	navigation: { items: Array<{ href: string; label?: string }> } | null;
	locale: Locale;
}

export const prerender = true;
export const load = async ({ params, parent }: Parameters<PageLoad>[0]) => {
	const locale = (params.lang as Locale) || 'id';

	try {
		const layoutData = await parent();
		const data = (await getAboutPageData(locale)) as {
			aboutPage: AboutPageContent | null;
			teamMembers: TeamMember[];
		} | null;

		return {
			aboutPage: data?.aboutPage ?? null,
			teamMembers: data?.teamMembers ?? [],
			information: layoutData.information ?? null,
			navigation: layoutData.navigation ?? null,
			locale
		};
	} catch (error) {
		console.error('Error in about page load:', error);
		const layoutData = await parent();
		return {
			aboutPage: null as AboutPageContent | null,
			teamMembers: [] as TeamMember[],
			information: layoutData.information ?? null,
			navigation: layoutData.navigation ?? null,
			locale
		};
	}
};
