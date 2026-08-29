import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'blogPage',
	title: 'Blog Page',
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
				{ name: 'badge', title: 'Badge', type: 'localizedString' },
				{ name: 'title', title: 'Title', type: 'localizedString' },
				{ name: 'subtitle', title: 'Subtitle', type: 'localizedText' },
				{ name: 'searchArticle', title: 'Search Article', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'content',
			title: 'Content Section',
			type: 'object',
			fields: [
				{ name: 'allCategories', title: 'All Categories', type: 'localizedString' },
				{ name: 'categories', title: 'Categories Label', type: 'localizedString' },
				{ name: 'latestArticles', title: 'Latest Articles', type: 'localizedString' },
				{ name: 'articlesCount', title: 'Articles Count', type: 'localizedString' },
				{ name: 'clearFilters', title: 'Clear Filters', type: 'localizedString' },
				{ name: 'adjustSearchFilter', title: 'Adjust Search Filter', type: 'localizedText' },
				{ name: 'viewAllArticles', title: 'View All Articles', type: 'localizedString' },
				{ name: 'loadMore', title: 'Load More', type: 'localizedString' },
				{ name: 'comingSoon', title: 'Coming Soon', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'searchModal',
			title: 'Search Modal Section',
			type: 'object',
			fields: [
				{ name: 'trendingTags', title: 'Trending Tags', type: 'localizedString' },
				{ name: 'noArticlesFound', title: 'No Articles Found', type: 'localizedString' },
				{ name: 'quickLinks', title: 'Quick Links', type: 'localizedString' },
				{ name: 'resultsFor', title: 'Results For', type: 'localizedString' },
				{ name: 'toSelect', title: 'To Select', type: 'localizedString' },
				{ name: 'toClose', title: 'To Close', type: 'localizedString' },
				{ name: 'noResults', title: 'No Results', type: 'localizedString' }
			]
		}),
		defineField({
			name: 'detail',
			title: 'Blog Detail Labels',
			type: 'object',
			fields: [
				{ name: 'readArticle', title: 'Read Article', type: 'localizedString' },
				{ name: 'writtenBy', title: 'Written By', type: 'localizedString' },
				{ name: 'inThisArticle', title: 'In This Article', type: 'localizedString' },
				{ name: 'relatedBadge', title: 'Related Badge', type: 'localizedString' },
				{ name: 'shareArticle', title: 'Share Article', type: 'localizedString' },
				{ name: 'postNotFound', title: 'Post Not Found', type: 'localizedString' },
				{ name: 'postNotFoundDesc', title: 'Post Not Found Description', type: 'localizedText' },
				{ name: 'goHome', title: 'Go Home', type: 'localizedString' }
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Blog Page'
			};
		}
	}
});
