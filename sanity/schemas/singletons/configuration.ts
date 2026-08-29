import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'configuration',
	title: 'Configuration',
	type: 'document',
	fields: [
		defineField({
			name: 'homepage',
			title: 'Homepage Settings',
			type: 'object',
			fields: [
				{
					name: 'featuredServices',
					title: 'Featured Services Count',
					type: 'number',
					initialValue: 6,
					validation: (Rule) => Rule.min(1).max(12)
				},
				{
					name: 'featuredProjects',
					title: 'Featured Projects Count',
					type: 'number',
					initialValue: 6,
					validation: (Rule) => Rule.min(1).max(12)
				},
				{
					name: 'latestPosts',
					title: 'Latest Posts Count',
					type: 'number',
					initialValue: 3,
					validation: (Rule) => Rule.min(1).max(10)
				},
				{
					name: 'teamMembers',
					title: 'Team Members Count',
					type: 'number',
					initialValue: 4,
					validation: (Rule) => Rule.min(1).max(12)
				}
			]
		}),
		defineField({
			name: 'listingPages',
			title: 'Listing Pages Settings',
			type: 'object',
			fields: [
				{
					name: 'servicesPerPage',
					title: 'Services Per Page',
					type: 'number',
					initialValue: 9,
					validation: (Rule) => Rule.min(1).max(50)
				},
				{
					name: 'projectsPerPage',
					title: 'Projects Per Page',
					type: 'number',
					initialValue: 9,
					validation: (Rule) => Rule.min(1).max(50)
				},
				{
					name: 'postsPerPage',
					title: 'Posts Per Page',
					type: 'number',
					initialValue: 10,
					validation: (Rule) => Rule.min(1).max(50)
				}
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Configuration'
			};
		}
	}
});
