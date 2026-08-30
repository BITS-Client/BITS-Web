import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'portfolioPage',
	title: 'Portfolio Page',
	type: 'document',
	fields: [
		defineField({
			name: 'seo',
			title: 'SEO Settings',
			type: 'seoSettings'
		}),
		defineField({
			name: 'hero',
			title: 'Hero Section',
			type: 'object',
			fields: [
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' }
			]
		}),
		defineField({
			name: 'itemLabels',
			title: 'Item Labels',
			type: 'object',
			fields: [
				{ name: 'challenge', title: 'Challenge', type: 'localizedString' },
				{ name: 'solution', title: 'Solution', type: 'localizedString' },
				{ name: 'result', title: 'Result', type: 'localizedString' },
				{ name: 'notFound', title: 'Not Found', type: 'localizedString' },
				{ name: 'notFoundDesc', title: 'Not Found Description', type: 'localizedText' },
				{ name: 'viewAllProjects', title: 'View All Projects', type: 'localizedString' },
				{ name: 'galleryImage', title: 'Gallery Image', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'cta',
			title: 'CTA Section',
			type: 'object',
			fields: [
				{ name: 'heading', title: 'Heading', type: 'localizedString' },
				{ name: 'text', title: 'Text', type: 'localizedText' },
				{ name: 'getStarted', title: 'Get Started', type: 'localizedString' },
				{
					name: 'getStartedLink',
					title: 'Get Started Link',
					type: 'string',
					initialValue: '/contact'
				},
				{ name: 'exploreServices', title: 'Explore Services', type: 'localizedString' },
				{
					name: 'exploreLink',
					title: 'Explore Link',
					type: 'string',
					initialValue: '/services'
				}
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Portfolio Page'
			};
		}
	}
});
