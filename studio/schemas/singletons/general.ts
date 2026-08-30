import { defineType } from 'sanity';

export default defineType({
	name: 'generalSettings',
	title: 'General Settings',
	type: 'document',
	fields: [
		{
			name: 'newsletterTitle',
			title: 'Newsletter Title',
			type: 'localizedString',
			description: 'Title for newsletter section (e.g., "Stay Updated")'
		},
		{
			name: 'newsletterSubtitle',
			title: 'Newsletter Subtitle',
			type: 'localizedString',
			description: 'Description for newsletter section'
		},
		{
			name: 'newsletterButton',
			title: 'Newsletter Button Text',
			type: 'localizedString',
			description: 'Button text for newsletter subscription'
		},
		{
			name: 'quickLinksTitle',
			title: 'Quick Links Title',
			type: 'localizedString',
			description: 'Title for quick links section'
		},
		{
			name: 'servicesFooterTitle',
			title: 'Services Section Title',
			type: 'localizedString',
			description: 'Title for services section in footer'
		},
		{
			name: 'connectWithUs',
			title: 'Connect With Us Label',
			type: 'localizedString',
			description: 'Label for social media section'
		},
		{
			name: 'socialLabels',
			title: 'Social Media & Contact Labels',
			type: 'object',
			fields: [
				{
					name: 'email',
					title: 'Email Label',
					type: 'localizedString',
					description: 'Label for email contact button'
				},
				{
					name: 'phone',
					title: 'Phone Label',
					type: 'localizedString',
					description: 'Label for phone contact button'
				},
				{
					name: 'whatsapp',
					title: 'WhatsApp Label',
					type: 'localizedString',
					description: 'Label for WhatsApp contact button'
				},
				{
					name: 'maps',
					title: 'Maps Label',
					type: 'localizedString',
					description: 'Label for Google Maps link button'
				},
				{
					name: 'github',
					title: 'GitHub Label',
					type: 'localizedString'
				},
				{
					name: 'youtube',
					title: 'YouTube Label',
					type: 'localizedString'
				},
				{
					name: 'instagram',
					title: 'Instagram Label',
					type: 'localizedString'
				},
				{
					name: 'tiktok',
					title: 'TikTok Label',
					type: 'localizedString'
				}
			]
		},
		{
			name: 'craftedWith',
			title: 'Crafted With Text',
			type: 'localizedString',
			description: 'Text before heart icon in copyright'
		},
		{
			name: 'inIndonesia',
			title: 'In Indonesia Text',
			type: 'localizedString',
			description: 'Text after heart icon in copyright'
		},
		{
			name: 'privacyPolicy',
			title: 'Privacy Policy Label',
			type: 'localizedString'
		},
		{
			name: 'termsOfService',
			title: 'Terms of Service Label',
			type: 'localizedString'
		},
		{
			name: 'skipToContent',
			title: 'Skip to Content Label',
			type: 'localizedString',
			description: 'Accessibility label for skip link'
		},
		{
			name: 'newsletterBadge',
			title: 'Newsletter Badge Text',
			type: 'localizedString',
			description: 'Badge text for newsletter section (e.g., "Newsletter")'
		},
		{
			name: 'emailPlaceholder',
			title: 'Email Placeholder',
			type: 'localizedString',
			description: 'Placeholder text for email input'
		},
		{
			name: 'subscribeSuccess',
			title: 'Subscribe Success Message',
			type: 'localizedString',
			description: 'Message shown after successful subscription'
		},
		{
			name: 'locationTitle',
			title: 'Location Title',
			type: 'localizedString',
			description: 'Title for location section in footer'
		},
		{
			name: 'closeMenu',
			title: 'Close Menu Label',
			type: 'localizedString',
			description: 'Accessibility label for closing mobile menu'
		},
		{
			name: 'openMenu',
			title: 'Open Menu Label',
			type: 'localizedString',
			description: 'Accessibility label for opening mobile menu'
		}
	],
	preview: {
		prepare() {
			return { title: 'General Settings' };
		}
	}
});
