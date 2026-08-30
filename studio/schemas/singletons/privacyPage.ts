import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'privacyPage',
	title: 'Privacy Page',
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
				{ name: 'lastUpdated', title: 'Last Updated', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'content',
			title: 'Content Section',
			type: 'object',
			fields: [
				{ name: 'tocLabel', title: 'TOC Label', type: 'localizedString' },
				{ name: 'sectionLabel', title: 'Section Label', type: 'localizedString' },
				{ name: 'noticeTitle', title: 'Notice Title', type: 'localizedString' },
				{ name: 'noticeSubtitle', title: 'Notice Subtitle', type: 'localizedText' }
			]
		}),
		defineField({
			name: 'contact',
			title: 'Contact Section',
			type: 'object',
			fields: [{ name: 'title', title: 'Title', type: 'localizedString' }]
		}),
		defineField({
			name: 'sections',
			title: 'Privacy Sections',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'key', title: 'Section Key', type: 'string' },
						{ name: 'title', title: 'Title', type: 'localizedString' },
						{
							name: 'items',
							title: 'Items',
							type: 'array',
							of: [
								{
									type: 'object',
									fields: [
										{ name: 'key', title: 'Item Key', type: 'string' },
										{ name: 'subtitle', title: 'Subtitle', type: 'localizedString' },
										{ name: 'text', title: 'Text', type: 'localizedText' }
									]
								}
							]
						}
					]
				}
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Privacy Page'
			};
		}
	}
});
