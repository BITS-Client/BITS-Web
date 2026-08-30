import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes, singletonTypes } from './schemas';

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID || 'j996ej4v';

export default defineConfig({
	name: 'default',
	title: 'BITS Corporate Platform',

	projectId,
	dataset: 'production',
	deployment: {
		appId: 'u7xaaz8xs2citixbv7ts55uv'
	},

	plugins: [
		codeInput(),
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						S.listItem()
							.title('📄 Pages')
							.child(
								S.list()
									.title('Pages')
									.items([
										S.listItem()
											.title('Home Page')
											.id('homePage')
											.child(S.document().schemaType('homePage').documentId('homePage')),
										S.listItem()
											.title('About Page')
											.id('aboutPage')
											.child(S.document().schemaType('aboutPage').documentId('aboutPage')),
										S.listItem()
											.title('Services Page')
											.id('servicesPage')
											.child(S.document().schemaType('servicesPage').documentId('servicesPage')),
										S.listItem()
											.title('Portfolio Page')
											.id('portfolioPage')
											.child(S.document().schemaType('portfolioPage').documentId('portfolioPage')),
										S.listItem()
											.title('Blog Page')
											.id('blogPage')
											.child(S.document().schemaType('blogPage').documentId('blogPage')),
										S.listItem()
											.title('Contact Page')
											.id('contactPage')
											.child(S.document().schemaType('contactPage').documentId('contactPage')),
										S.divider(),
										S.listItem()
											.title('Terms of Service')
											.id('termsPage')
											.child(S.document().schemaType('termsPage').documentId('termsPage')),
										S.listItem()
											.title('Privacy Policy')
											.id('privacyPage')
											.child(S.document().schemaType('privacyPage').documentId('privacyPage'))
									])
							),
						S.divider(),
						S.listItem()
							.title('📝 Posts')
							.child(
								S.documentTypeList('post')
									.title('Blog Posts')
									.defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
							),
						S.listItem()
							.title('🏷️ Categories')
							.child(S.documentTypeList('category').title('Categories')),
						S.divider(),
						S.listItem()
							.title('🎨 Projects')
							.child(
								S.documentTypeList('project')
									.title('Projects')
									.defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
							),
						S.listItem()
							.title('🏢 Clients')
							.child(
								S.documentTypeList('client')
									.title('Clients')
									.defaultOrdering([{ field: 'order', direction: 'asc' }])
							),
						S.divider(),
						S.listItem()
							.title('💼 Services')
							.child(
								S.documentTypeList('service')
									.title('Services')
									.defaultOrdering([{ field: 'order', direction: 'asc' }])
							),
						S.listItem()
							.title('👥 Teams')
							.child(
								S.documentTypeList('team')
									.title('Team Members')
									.defaultOrdering([{ field: 'order', direction: 'asc' }])
							),
						S.divider(),
						S.listItem()
							.title('⚙️ Settings')
							.child(
								S.list()
									.title('Settings')
									.items([
										S.listItem()
											.title('General')
											.id('settings-general')
											.child(
												S.document().schemaType('generalSettings').documentId('generalSettings')
											),
										S.listItem()
											.title('Information')
											.id('settings-information')
											.child(
												S.document()
													.schemaType('informationSettings')
													.documentId('informationSettings')
											),
										S.listItem()
											.title('Configuration')
											.id('settings-configuration')
											.child(S.document().schemaType('configuration').documentId('configuration')),
										S.listItem()
											.title('Menu')
											.id('settings-menu')
											.child(S.document().schemaType('menuSettings').documentId('menuSettings'))
									])
							)
					])
		}),
		visionTool()
	],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType))
	}
});
