import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'post',
	title: 'Blog Post',
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
			name: 'body',
			title: 'Body',
			type: 'localizedBlockContent'
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'team' }]
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'category' }],
			options: {
				filter: "type == 'blog' || type == 'both'"
			}
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
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
			name: 'featured',
			title: 'Featured Post',
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
			author: 'author.name',
			media: 'image'
		},
		prepare(selection) {
			const { title, author, media } = selection;
			return {
				title,
				subtitle: author ? `by ${author}` : undefined,
				media
			};
		}
	}
});
