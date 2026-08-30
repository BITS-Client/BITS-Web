import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'aboutPage',
	title: 'About Page',
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
				defineField({
					name: 'badge',
					title: 'Badge',
					type: 'localizedString'
				}),
				defineField({
					name: 'title',
					title: 'Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'subtitle',
					title: 'Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'contact',
					title: 'Contact Button',
					type: 'localizedString'
				}),
				defineField({
					name: 'portfolio',
					title: 'Portfolio Button',
					type: 'localizedString'
				}),
				defineField({
					name: 'experience',
					title: 'Experience Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'experienceValue',
					title: 'Experience Value',
					type: 'string',
					description: 'e.g., 17+'
				}),
				defineField({
					name: 'client',
					title: 'Client Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'clientValue',
					title: 'Client Value',
					type: 'string',
					description: 'e.g., 70+'
				}),
				defineField({
					name: 'project',
					title: 'Project Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'projectValue',
					title: 'Project Value',
					type: 'string',
					description: 'e.g., 200+'
				})
			]
		}),
		defineField({
			name: 'vision',
			title: 'Vision Section',
			type: 'object',
			fields: [
				defineField({
					name: 'badge',
					title: 'Badge',
					type: 'localizedString'
				}),
				defineField({
					name: 'title',
					title: 'Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'subtitle',
					title: 'Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'missionTitle',
					title: 'Mission Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'missionDesc',
					title: 'Mission Description',
					type: 'localizedText'
				}),
				defineField({
					name: 'visionTitle',
					title: 'Vision Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'visionDesc',
					title: 'Vision Description',
					type: 'localizedText'
				})
			]
		}),
		defineField({
			name: 'timeline',
			title: 'Timeline Section',
			type: 'object',
			fields: [
				defineField({
					name: 'badge',
					title: 'Badge',
					type: 'localizedString'
				}),
				defineField({
					name: 'title',
					title: 'Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'subtitle',
					title: 'Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'stories',
					title: 'Timeline Stories',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									name: 'icon',
									title: 'Icon',
									type: 'string'
								}),
								defineField({
									name: 'year',
									title: 'Year',
									type: 'string'
								}),
								defineField({
									name: 'title',
									title: 'Title',
									type: 'localizedString'
								}),
								defineField({
									name: 'description',
									title: 'Description',
									type: 'localizedText'
								})
							]
						}
					]
				}),
				defineField({
					name: 'end',
					title: 'End Text',
					type: 'localizedString'
				})
			]
		}),
		defineField({
			name: 'principles',
			title: 'Principles Section',
			type: 'object',
			fields: [
				defineField({
					name: 'badge',
					title: 'Badge',
					type: 'localizedString'
				}),
				defineField({
					name: 'title',
					title: 'Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'subtitle',
					title: 'Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'keys',
					title: 'Key Principles',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									name: 'icon',
									title: 'Icon',
									type: 'string'
								}),
								defineField({
									name: 'title',
									title: 'Title',
									type: 'localizedString'
								}),
								defineField({
									name: 'description',
									title: 'Description',
									type: 'localizedText'
								})
							]
						}
					]
				}),
				defineField({
					name: 'ready',
					title: 'Ready Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'readySubtitle',
					title: 'Ready Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'connect',
					title: 'Connect Button',
					type: 'localizedString'
				})
			]
		}),
		defineField({
			name: 'teams',
			title: 'Teams Section',
			type: 'object',
			fields: [
				defineField({
					name: 'badge',
					title: 'Badge',
					type: 'localizedString'
				}),
				defineField({
					name: 'title',
					title: 'Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'subtitle',
					title: 'Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'ctaIcon',
					title: 'CTA Icon',
					type: 'string'
				}),
				defineField({
					name: 'ctaTitle',
					title: 'CTA Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'ctaSubtitle',
					title: 'CTA Subtitle',
					type: 'localizedText'
				}),
				defineField({
					name: 'ctaButton',
					title: 'CTA Button',
					type: 'localizedString'
				})
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'About Page'
			};
		}
	}
});
