import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
	name: 'localizedBlockContent',
	title: 'Localized Block Content',
	type: 'object',
	fields: [
		defineField({
			name: 'en',
			title: 'English',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'H4', value: 'h4' },
						{ title: 'Quote', value: 'blockquote' }
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Numbered', value: 'number' }
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Code', value: 'code' }
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
										validation: (Rule) =>
											Rule.uri({
												allowRelative: true,
												scheme: ['http', 'https', 'mailto', 'tel']
											})
									}
								]
							}
						]
					}
				}),
				defineArrayMember({
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alt Text'
						},
						{
							name: 'caption',
							type: 'string',
							title: 'Caption'
						}
					]
				}),
				defineArrayMember({
					type: 'code',
					options: {
						withFilename: true
					}
				})
			]
		}),
		defineField({
			name: 'id',
			title: 'Indonesian',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'H4', value: 'h4' },
						{ title: 'Quote', value: 'blockquote' }
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Numbered', value: 'number' }
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Code', value: 'code' }
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL',
										validation: (Rule) =>
											Rule.uri({
												allowRelative: true,
												scheme: ['http', 'https', 'mailto', 'tel']
											})
									}
								]
							}
						]
					}
				}),
				defineArrayMember({
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alt Text'
						},
						{
							name: 'caption',
							type: 'string',
							title: 'Caption'
						}
					]
				}),
				defineArrayMember({
					type: 'code',
					options: {
						withFilename: true
					}
				})
			]
		})
	]
});
