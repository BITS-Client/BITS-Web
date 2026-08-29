import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'homePage',
	title: 'Home Page',
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
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'cta', title: 'CTA Button', type: 'localizedString' },
				{
					name: 'ctaLink',
					title: 'CTA Link',
					type: 'string',
					description: 'URL for the CTA button (e.g., /contact, /services)'
				},
				{ name: 'viewWork', title: 'View Work', type: 'localizedString' },
				{
					name: 'viewWorkLink',
					title: 'View Work Link',
					type: 'string',
					description: 'URL for the View Work button (e.g., /portfolio)'
				}
			]
		}),
		defineField({
			name: 'servicesSection',
			title: 'Services Section',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'badge', title: 'Badge', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'portfolioSection',
			title: 'Portfolio Section',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'viewAllProject', title: 'View All Project Button', type: 'localizedString' },
				{
					name: 'viewAllProjectLink',
					title: 'View All Project Link',
					type: 'string',
					description: 'URL for the View All Project button (e.g., /portfolio, /contact)'
				}
			]
		}),
		defineField({
			name: 'blogSection',
			title: 'Blog Section',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'viewAllPosts', title: 'View All Posts Button', type: 'localizedString' },
				{
					name: 'viewAllPostsLink',
					title: 'View All Posts Link',
					type: 'string',
					description: 'URL for the View All Posts button (e.g., /blog)'
				}
			]
		}),
		defineField({
			name: 'testimonialsSection',
			title: 'Testimonials Section',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'badge', title: 'Badge', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'companyStatsSection',
			title: 'Company Statistics Section',
			type: 'object',
			fields: [
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{
					name: 'items',
					title: 'Stat Items',
					type: 'array',
					of: [{ type: 'stat' }],
					validation: (Rule) => Rule.max(6)
				}
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Home Page'
			};
		}
	}
});
