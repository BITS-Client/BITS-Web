import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'project',
	title: 'Portfolio Project',
	type: 'document',
	fields: [
		defineField({
			name: 'seo',
			title: 'SEO Settings',
			type: 'seoSettings'
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'localizedString',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title.en',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'client',
			title: 'Client',
			type: 'reference',
			to: [{ type: 'client' }]
		}),
		defineField({
			name: 'challenge',
			title: 'Challenge',
			type: 'localizedText'
		}),
		defineField({
			name: 'solution',
			title: 'Solution',
			type: 'localizedText'
		}),
		defineField({
			name: 'result',
			title: 'Result',
			type: 'localizedText'
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'category' }],
			options: {
				filter: "type == 'portfolio' || type == 'both'"
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'techStack',
			title: 'Tech Stack',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			}
		}),
		defineField({
			name: 'image',
			title: 'Featured Image',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'gallery',
			title: 'Gallery',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true
					}
				}
			]
		}),
		defineField({
			name: 'stats',
			title: 'Project Stats',
			type: 'array',
			of: [{ type: 'stat' }]
		}),
		defineField({
			name: 'testimonial',
			title: 'Client Testimonial',
			type: 'testimonial'
		}),
		defineField({
			name: 'featured',
			title: 'Featured Project',
			type: 'boolean',
			initialValue: false
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published At',
			type: 'datetime'
		})
	],
	orderings: [
		{
			title: 'Published Date',
			name: 'publishedAtDesc',
			by: [{ field: 'publishedAt', direction: 'desc' }]
		},
		{
			title: 'Featured First',
			name: 'featuredFirst',
			by: [
				{ field: 'featured', direction: 'desc' },
				{ field: 'publishedAt', direction: 'desc' }
			]
		}
	],
	preview: {
		select: {
			title: 'title.en',
			subtitle: 'client.name',
			media: 'image'
		}
	}
});
