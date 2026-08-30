import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'contactPage',
	title: 'Contact Page',
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
					name: 'email',
					title: 'Email Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'telp',
					title: 'Phone Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'whatsapp',
					title: 'WhatsApp Label',
					type: 'localizedString'
				})
			]
		}),
		defineField({
			name: 'form',
			title: 'Contact Form',
			type: 'object',
			fields: [
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
					name: 'name',
					title: 'Name Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'email',
					title: 'Email Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'phone',
					title: 'Phone Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'type',
					title: 'Type Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'inquiryTypeItems',
					title: 'Inquiry Type Items',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									name: 'value',
									title: 'Value',
									type: 'string'
								}),
								defineField({
									name: 'label',
									title: 'Label',
									type: 'localizedString'
								}),
								defineField({
									name: 'description',
									title: 'Description',
									type: 'localizedString'
								}),
								defineField({
									name: 'detailLabel',
									title: 'Detail Label',
									type: 'localizedString'
								}),
								defineField({
									name: 'detailPlaceholder',
									title: 'Detail Placeholder',
									type: 'localizedString'
								}),
								defineField({
									name: 'detailItems',
									title: 'Detail Items',
									type: 'array',
									of: [
										{
											type: 'object',
											fields: [
												defineField({
													name: 'value',
													title: 'Value',
													type: 'string'
												}),
												defineField({
													name: 'label',
													title: 'Label',
													type: 'localizedString'
												})
											]
										}
									]
								})
							]
						}
					]
				}),
				defineField({
					name: 'message',
					title: 'Message Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'verification',
					title: 'Verification Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'verified',
					title: 'Verified Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'send',
					title: 'Send Button',
					type: 'localizedString'
				}),
				defineField({
					name: 'namePlaceholder',
					title: 'Name Placeholder',
					type: 'localizedString'
				}),
				defineField({
					name: 'emailPlaceholder',
					title: 'Email Placeholder',
					type: 'localizedString'
				}),
				defineField({
					name: 'phonePlaceholder',
					title: 'Phone Placeholder',
					type: 'localizedString'
				}),
				defineField({
					name: 'messagePlaceholder',
					title: 'Message Placeholder',
					type: 'localizedString'
				}),
				defineField({
					name: 'sending',
					title: 'Sending State',
					type: 'localizedString'
				}),
				defineField({
					name: 'successTitle',
					title: 'Success Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'successDesc',
					title: 'Success Description',
					type: 'localizedText'
				}),
				defineField({
					name: 'errorTitle',
					title: 'Error Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'errorDesc',
					title: 'Error Description',
					type: 'localizedText'
				}),
				defineField({
					name: 'turnstileRequired',
					title: 'Turnstile Required',
					type: 'localizedString'
				}),
				defineField({
					name: 'turnstileComplete',
					title: 'Turnstile Complete',
					type: 'localizedString'
				})
			]
		}),
		defineField({
			name: 'info',
			title: 'Info Section',
			type: 'object',
			fields: [
				defineField({
					name: 'contactInfo',
					title: 'Contact Info Heading',
					type: 'localizedString'
				}),
				defineField({
					name: 'visit',
					title: 'Visit Us Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'emailUs',
					title: 'Email Us Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'callUs',
					title: 'Call Us Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'needHelp',
					title: 'Need Help Heading',
					type: 'localizedString'
				}),
				defineField({
					name: 'helpDesc',
					title: 'Help Description',
					type: 'localizedText'
				}),
				defineField({
					name: 'chatWhatsApp',
					title: 'Chat WhatsApp Label',
					type: 'localizedString'
				})
			]
		}),
		defineField({
			name: 'faq',
			title: 'FAQ Section',
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
					name: 'faqItems',
					title: 'FAQ Items',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									name: 'question',
									title: 'Question',
									type: 'localizedString'
								}),
								defineField({
									name: 'answer',
									title: 'Answer',
									type: 'localizedText'
								})
							]
						}
					]
				}),
				defineField({
					name: 'helpTitle',
					title: 'Help Title',
					type: 'localizedString'
				}),
				defineField({
					name: 'helpDesc',
					title: 'Help Description',
					type: 'localizedText'
				}),
				defineField({
					name: 'email',
					title: 'Email Label',
					type: 'localizedString'
				}),
				defineField({
					name: 'whatsapp',
					title: 'WhatsApp Label',
					type: 'localizedString'
				})
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Contact Page'
			};
		}
	}
});
