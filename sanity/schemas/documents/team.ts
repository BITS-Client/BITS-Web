import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'team',
	title: 'Team Member',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Full Name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96
			}
		}),
		defineField({
			name: 'role',
			title: 'Role / Position',
			type: 'localizedString',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'bio',
			title: 'Biography',
			type: 'localizedText'
		}),
		defineField({
			name: 'image',
			title: 'Photo',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string'
		}),
		defineField({
			name: 'social',
			title: 'Social Links',
			type: 'object',
			fields: [
				{ name: 'instagram', title: 'Instagram URL', type: 'url' },
				{ name: 'github', title: 'GitHub URL', type: 'url' },
				{ name: 'youtube', title: 'YouTube URL', type: 'url' }
			]
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
			initialValue: 0
		})
	],
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		}
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role.en',
			media: 'image'
		}
	}
});
