import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'seoSettings',
	title: 'SEO Settings',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Meta Title',
			type: 'localizedString',
			description: 'Page title for search engines (50-60 characters recommended)'
		}),
		defineField({
			name: 'description',
			title: 'Meta Description',
			type: 'localizedText',
			description: 'Page description for search engines (150-160 characters recommended)'
		}),
		defineField({
			name: 'keywords',
			title: 'Keywords',
			type: 'array',
			of: [{ type: 'string' }],
			description: 'Target keywords for this page (comma separated or tags)'
		}),
		defineField({
			name: 'ogImage',
			title: 'Open Graph Image',
			type: 'image',
			description: 'Image for social media sharing (1200x630px recommended)',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'noIndex',
			title: 'No Index',
			type: 'boolean',
			description: 'Hide this page from search engines',
			initialValue: false
		}),
		defineField({
			name: 'noFollow',
			title: 'No Follow',
			type: 'boolean',
			description: 'Tell search engines not to follow links on this page',
			initialValue: false
		}),
		defineField({
			name: 'excludeFromSitemap',
			title: 'Exclude from Sitemap',
			type: 'boolean',
			description: 'Exclude this page from the XML sitemap',
			initialValue: false
		})
	]
});
