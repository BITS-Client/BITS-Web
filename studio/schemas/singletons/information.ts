import { defineType } from 'sanity';

export default defineType({
	name: 'informationSettings',
	title: 'Information Settings',
	type: 'document',
	fields: [
		{
			name: 'siteTitle',
			title: 'Site Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'siteDescription',
			title: 'Site Description',
			type: 'localizedString'
		},
		{
			name: 'siteTagline',
			title: 'Site Tagline',
			type: 'string'
		},
		{
			name: 'siteIcon',
			title: 'Site Icon',
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					title: 'Alt Text',
					type: 'string'
				}
			]
		},
		{
			name: 'siteLogo',
			title: 'Site Logo',
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					title: 'Alt Text',
					type: 'string'
				}
			]
		},
		{
			name: 'siteURL',
			title: 'Site URL',
			type: 'url',
			validation: (Rule) => Rule.required()
		},
		{
			name: 'siteEmail',
			title: 'Site Email',
			type: 'string',
			validation: (Rule) => Rule.email()
		},
		{
			name: 'siteTelp',
			title: 'Site Telp',
			type: 'string'
		},
		{
			name: 'siteWhatsApp',
			title: 'Site WhatsApp',
			type: 'string'
		},
		{
			name: 'siteAddress',
			title: 'Site Address',
			type: 'text',
			rows: 3
		},
		{
			name: 'googleMaps',
			title: 'Google Maps Embed URL',
			type: 'url'
		},
		{
			name: 'instagram',
			title: 'Instagram',
			type: 'url'
		},
		{
			name: 'tiktok',
			title: 'Tiktok',
			type: 'url'
		},
		{
			name: 'youtube',
			title: 'YouTube',
			type: 'url'
		},
		{
			name: 'github',
			title: 'Github',
			type: 'url'
		}
	],
	preview: {
		prepare() {
			return { title: 'Information Settings' };
		}
	}
});
