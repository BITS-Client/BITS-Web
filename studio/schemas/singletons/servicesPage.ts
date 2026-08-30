import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'servicesPage',
	title: 'Services Page',
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
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'ctaText1', title: 'CTA Text 1', type: 'localizedString' },
				{ name: 'ctaLink1', title: 'CTA Link 1', type: 'string' },
				{ name: 'ctaText2', title: 'CTA Text 2', type: 'localizedString' },
				{ name: 'ctaLink2', title: 'CTA Link 2', type: 'string' }
			]
		}),
		defineField({
			name: 'servicesSection',
			title: 'Services Section',
			type: 'object',
			fields: [
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' }
			]
		}),
		defineField({
			name: 'processSection',
			title: 'Process Section',
			type: 'object',
			fields: [
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{
					name: 'processItems',
					title: 'Process Items',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{ name: 'icon', title: 'Icon', type: 'string' },
								{ name: 'title', title: 'Title', type: 'localizedString' },
								{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' }
							]
						}
					]
				}
			]
		}),
		defineField({
			name: 'whySection',
			title: 'Why Choose Us Section',
			type: 'object',
			fields: [
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{
					name: 'whyItems',
					title: 'Why Items',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{ name: 'icon', title: 'Icon', type: 'string' },
								{ name: 'title', title: 'Title', type: 'localizedString' },
								{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' }
							]
						}
					]
				}
			]
		}),
		defineField({
			name: 'ctaSection',
			title: 'CTA Section',
			type: 'object',
			fields: [
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'ctaText1', title: 'CTA Text 1', type: 'localizedString' },
				{ name: 'ctaLink1', title: 'CTA Link 1', type: 'string' },
				{ name: 'ctaText2', title: 'CTA Text 2', type: 'localizedString' },
				{ name: 'ctaLink2', title: 'CTA Link 2', type: 'string' }
			]
		}),
		defineField({
			name: 'serviceDetail',
			title: 'Service Detail Labels',
			type: 'object',
			fields: [
				defineField({
					name: 'hero',
					title: 'Hero Section',
					type: 'object',
					fields: [
						{ name: 'badge', title: 'Badge', type: 'localizedString' },
						{ name: 'buttonCta', title: 'Button CTA', type: 'localizedString' }
					]
				}),
				defineField({
					name: 'subService',
					title: 'Sub Service Section',
					type: 'object',
					fields: [
						{ name: 'badge', title: 'Badge', type: 'localizedString' },
						{ name: 'title', title: 'Title', type: 'localizedString' },
						{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' }
					]
				}),
				defineField({
					name: 'benefits',
					title: 'Benefits Section',
					type: 'object',
					fields: [
						{ name: 'badge', title: 'Badge', type: 'localizedString' },
						{ name: 'title', title: 'Title', type: 'localizedString' },
						{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
						{
							name: 'stats',
							title: 'Stats Items',
							type: 'array',
							of: [
								{
									type: 'object',
									fields: [
										{ name: 'value', title: 'Value', type: 'string' },
										{ name: 'label', title: 'Label', type: 'localizedString' }
									]
								}
							]
						}
					]
				}),
				defineField({
					name: 'cta',
					title: 'CTA Section',
					type: 'object',
					fields: [
						{ name: 'title', title: 'Title', type: 'localizedString' },
						{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
						{ name: 'btnCta', title: 'Button CTA', type: 'localizedString' },
						{ name: 'linkCta', title: 'Link CTA', type: 'string' }
					]
				})
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Services Page'
			};
		}
	}
});
