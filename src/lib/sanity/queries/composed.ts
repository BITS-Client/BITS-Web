import { sanityClient } from '../client';
import type { Locale } from '$lib/types';
import { sanityCache } from '$lib/utils/sanityCache';
import {
	homePageQuery,
	aboutPageQuery,
	portfolioPageQuery,
	blogPageQuery,
	servicesPageDataQuery
} from './pages';

export async function getGlobalLayoutData(locale: Locale) {
	const cacheKey = sanityCache.getGlobalKey(locale, 'layoutGlobal');
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	const query = `{
        "information": *[_type == "informationSettings"][0] {
            siteTitle,
            "siteDescription": siteDescription.${locale},
            siteTagline,
            "siteIcon": siteIcon { asset->{ url }, alt },
            "siteLogo": siteLogo { asset->{ url }, alt },
            siteURL,
            siteEmail,
            siteTelp,
            siteWhatsApp,
            siteAddress,
            googleMaps,
            instagram,
            tiktok,
            youtube,
            github
        },
        "navigation": *[_type == "menuSettings"][0] {
            "items": navigation | order(order asc) {
                href, 
                "label": label.${locale}, 
                isService, 
                order
            }
        },
        "general": *[_type == "generalSettings"][0] {
            "newsletterTitle": newsletterTitle.${locale},
            "newsletterSubtitle": newsletterSubtitle.${locale},
            "newsletterButton": newsletterButton.${locale},
            "newsletterBadge": newsletterBadge.${locale},
            "emailPlaceholder": emailPlaceholder.${locale},
            "subscribeSuccess": subscribeSuccess.${locale},
            "quickLinksTitle": quickLinksTitle.${locale},
            "servicesFooterTitle": servicesFooterTitle.${locale},
            "locationTitle": locationTitle.${locale},
            "connectWithUs": connectWithUs.${locale},
            "craftedWith": craftedWith.${locale},
            "inIndonesia": inIndonesia.${locale},
            "privacyPolicy": privacyPolicy.${locale},
            "termsOfService": termsOfService.${locale},
            "skipToContent": skipToContent.${locale},
            "closeMenu": closeMenu.${locale},
            "openMenu": openMenu.${locale},
            "socialLabels": {
                "email": socialLabels.email.${locale},
                "phone": socialLabels.phone.${locale},
                "whatsapp": socialLabels.whatsapp.${locale},
                "maps": socialLabels.maps.${locale},
                "github": socialLabels.github.${locale},
                "youtube": socialLabels.youtube.${locale},
                "instagram": socialLabels.instagram.${locale},
                "tiktok": socialLabels.tiktok.${locale}
            }
        },
        "clients": *[_type == "client"] | order(coalesce(orderRank, _createdAt) asc) {
            _id, name, "logoUrl": logo.asset->url, icon, url
        },
        "services": *[_type == "service"] | order(coalesce(order, 99999) asc) {
            _id,
            "title": title.${locale},
            "slug": slug.current,
            icon,
            "seo": { "description": seo.description.${locale} },
            order
        },
        "config": *[_type == "configuration"][0] {
            "homepage": {
                "featuredServices": homepage.featuredServices,
                "featuredProjects": homepage.featuredProjects,
                "latestPosts": homepage.latestPosts,
                "teamMembers": homepage.teamMembers
            },
            "listingPages": {
                "servicesPerPage": listingPages.servicesPerPage,
                "projectsPerPage": listingPages.projectsPerPage,
                "postsPerPage": listingPages.postsPerPage
            }
        },
        "servicesPage": *[_type == "servicesPage"][0] {
            "ctaSection": ctaSection {
                "headline1": headline1.${locale},
                "headline2": headline2.${locale},
                "subtitle": subtitle.${locale},
                "ctaText1": ctaText1.${locale},
                "ctaLink1": ctaLink1
            }
        }
    }`;

	try {
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // 1 hour
		return result;
	} catch (error) {
		console.error('Error fetching global layout data:', error);
		return null;
	}
}

// Helper to get localized field string without duplicating logic
function localizedField(parent: string, field: string, locale: Locale): string {
	const prefix = parent ? `${parent}.` : '';
	return `"${field}": ${prefix}${field}.${locale}`;
}

export async function getHomePageData(locale: Locale, projectsLimit: number, postsLimit: number) {
	const cacheKey = sanityCache.getPageKey(
		locale,
		'homePageDetailed',
		`p${projectsLimit}_post${postsLimit}`
	);

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	const query = `{
        "homePage": ${homePageQuery(locale)},
        "projects": *[_type == "project"] | order(publishedAt desc) [0...$projectsLimit] {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "client": client-> { name, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${localizedField('', 'title', locale)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "testimonials": *[_type == "project" && defined(testimonial)] | order(_createdAt desc) [0...3] {
            "testimonial": testimonial {
                name,
                ${localizedField('', 'content', locale)}
            },
            "client": client-> {
                name,
                "logoUrl": logo.asset->url,
                "iconUrl": icon.asset->url
            },
            "projectTitle": title.${locale},
            "projectSlug": slug.current,
            "projectCategory": category->title.${locale}
        },
        "posts": *[_type == "post"] | order(publishedAt desc) [0...$postsLimit] {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "imageUrl": image.asset->url,
            "seo": {
                ${localizedField('seo', 'description', locale)}
            },
            "author": author-> { 
                name, 
                "avatarUrl": image.asset->url 
            },
            "category": category-> { 
                _id, 
                ${localizedField('', 'title', locale)}, 
                slug, 
                color 
            },
            tags,
            publishedAt
        }
    }`;

	try {
		const result = await sanityClient.fetch(query, { locale, projectsLimit, postsLimit });
		sanityCache.set(cacheKey, result, 3600000);
		return result;
	} catch (error) {
		console.error('Error fetching combined home page data:', error);
		return null;
	}
}

export async function getAboutPageData(locale: Locale) {
	const cacheKey = sanityCache.getPageKey(locale, 'aboutPageDetailed');
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	const query = `{
        "aboutPage": ${aboutPageQuery(locale)},
        "teamMembers": *[_type == "team"] | order(order asc) {
            _id,
            name,
            slug,
            ${localizedField('', 'role', locale)},
            ${localizedField('', 'bio', locale)},
            image,
            "social": social { instagram, github, youtube },
            order
        }
    }`;

	try {
		const result = await sanityClient.fetch(query, { locale });
		sanityCache.set(cacheKey, result, 3600000);
		return result;
	} catch (error) {
		console.error('Error fetching combined about page data:', error);
		return null;
	}
}

export async function getPortfolioPageData(locale: Locale, limit: number, page: number = 1) {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * limit;
	const end = start + limit;
	const cacheKey = sanityCache.getPageKey(
		locale,
		'portfolioPageDetailed',
		`lim${limit}-page${safePage}`
	);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	const query = `{
        "portfolioPage": ${portfolioPageQuery(locale)},
        "homePageStats": *[_type == "homePage"][0] { 
            "items": companyStatsSection.items[] {
                _key,
                value,
                "label": label.${locale}
            }
        },
        "totalProjects": count(*[_type == "project"]),
        "projects": *[_type == "project"] | order(publishedAt desc) [$start...$end] {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "client": client-> { name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${localizedField('', 'title', locale)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "allProjects": *[_type == "project"] | order(publishedAt desc) {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "client": client-> { name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${localizedField('', 'title', locale)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "categories": *[_type == "category" && (type == "portfolio" || type == "both")] | order(title.${locale} asc) {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            color,
            icon,
            type
        }
    }`;

	try {
		const result = await sanityClient.fetch(query, { locale, limit, start, end });
		sanityCache.set(cacheKey, result, 3600000);
		return result;
	} catch (error) {
		console.error('Error fetching combined portfolio page data:', error);
		return null;
	}
}

export async function getBlogPageData(locale: Locale, limit: number = 12, page: number = 1) {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * limit;
	const end = start + limit;
	const cacheKey = sanityCache.getPageKey(
		locale,
		'blogPageDetailed',
		`limit_${limit}-page${safePage}`
	);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	const query = `{
        "blogPage": ${blogPageQuery(locale)},
        "totalPosts": count(*[_type == "post"]),
        "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "seo": {
                ${localizedField('seo', 'description', locale)}
            },
            "author": author-> { 
                name, 
                "avatarUrl": image.asset->url,
                ${localizedField('', 'role', locale)}
            },
            "category": category-> { 
                _id, 
                ${localizedField('', 'title', locale)}, 
                slug, 
                color 
            },
            tags,
            featured
        },
        "allPosts": *[_type == "post"] | order(publishedAt desc) {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "seo": {
                ${localizedField('seo', 'description', locale)}
            },
            "author": author-> {
                name,
                "avatarUrl": image.asset->url,
                ${localizedField('', 'role', locale)}
            },
            "category": category-> {
                _id,
                ${localizedField('', 'title', locale)},
                slug,
                color
            },
            tags,
            featured
        },
        "categories": *[_type == "category" && (type == "blog" || type == "both")] | order(title.${locale} asc) {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            color
        },
        "allTags": array::unique(*[_type == "post" && defined(tags)].tags[])
    }`;

	try {
		const result = await sanityClient.fetch(query, { locale, limit, start, end });
		sanityCache.set(cacheKey, result, 3600000);
		return result;
	} catch (error) {
		console.error('Error fetching combined blog page data:', error);
		return null;
	}
}

export async function getServicesPageDetailedData(locale: Locale, limit: number) {
	const cacheKey = sanityCache.getPageKey(locale, 'servicesPageDetailed', `lim${limit}`);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	const query = `{
        "servicesPage": ${servicesPageDataQuery(locale)},
        "services": *[_type == "service"] | order(coalesce(order, 99999) asc) [0...$limit] {
            _id,
            "title": title.${locale},
            "slug": slug.current,
            icon,
            "longDescription": longDescription.${locale},
            "seo": {
                "description": seo.description.${locale}
            },
            "imageUrl": image.asset->url,
            order
        }
    }`;

	try {
		const result = await sanityClient.fetch(query, { locale, limit });
		sanityCache.set(cacheKey, result, 3600000);
		return result;
	} catch (error) {
		console.error('Error fetching combined services page data:', error);
		return null;
	}
}

export async function getProjectDetailData(slug: string, locale: Locale) {
	const cacheKey = sanityCache.getPageKey(locale, 'projectDetail', slug);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	// First, get the current project to use its data for related scoring
	const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
        "project": {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "client": client-> { _id, name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            ${localizedField('', 'challenge', locale)},
            ${localizedField('', 'solution', locale)},
            ${localizedField('', 'result', locale)},
            "imageUrl": image.asset->url,
            "gallery": gallery[] { _key, "url": asset->url },
            "category": category-> { _id, ${localizedField('', 'title', locale)}, slug, color },
            techStack,
            "stats": stats[] { _key, value, "label": label.${locale} },
            "testimonial": testimonial { name, "content": content.${locale} },
            publishedAt,
            "seo": { 
                "title": seo.title.${locale},
                "description": seo.description.${locale},
                "keywords": seo.keywords
            },
            "categoryRef": category._ref,
            "clientRef": client._ref
        },
        "portfolioPage": ${portfolioPageQuery(locale)}
    }`;

	try {
		const projectResult = await sanityClient.fetch(projectQuery, { slug, locale });

		if (!projectResult?.project) {
			return projectResult;
		}

		const { categoryRef, clientRef } = projectResult.project;
		const techStack = projectResult.project.techStack || [];

		// Smart related projects query with scoring:
		// - Same category: +3 points
		// - Same client: +5 points
		// - Each matching tech stack item: +1 point
		// Order by score descending, then by publishedAt
		const relatedQuery = `*[_type == "project" && slug.current != $slug] {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "imageUrl": image.asset->url,
            "category": category-> {
                ${localizedField('', 'title', locale)},
                slug,
                color
            },
            techStack,
            featured,
            publishedAt,
            "categoryMatch": category._ref == $categoryRef,
            "clientMatch": client._ref == $clientRef,
            "techStackMatches": count(techStack[@ in $techStack])
        } | order(
            select(
                clientMatch => 100,
                categoryMatch && techStackMatches > 0 => 50 + techStackMatches,
                categoryMatch => 30,
                techStackMatches > 2 => 20 + techStackMatches,
                techStackMatches > 0 => techStackMatches,
                featured => 5,
                0
            ) desc,
            publishedAt desc
        ) [0...6] {
            _id,
            title,
            slug,
            imageUrl,
            category,
            techStack,
            featured,
            publishedAt
        }`;

		const relatedProjects = await sanityClient.fetch(relatedQuery, {
			slug,
			locale,
			categoryRef: categoryRef || '',
			clientRef: clientRef || '',
			techStack
		});

		// Clean up internal refs from project object
		const cleanProject = { ...projectResult.project };
		delete cleanProject.categoryRef;
		delete cleanProject.clientRef;

		const result = {
			project: cleanProject,
			portfolioPage: projectResult.portfolioPage,
			relatedProjects: relatedProjects || []
		};

		sanityCache.set(cacheKey, result, 1800000);
		return result;
	} catch (error) {
		console.error('Error fetching combined project detail data:', error);
		return null;
	}
}

export async function getPostDetailData(slug: string, locale: Locale) {
	const cacheKey = sanityCache.getPageKey(locale, 'postDetail', slug);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	// First, get the current post to use its data for related scoring
	const postQuery = `*[_type == "post" && slug.current == $slug][0] {
        "post": {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "body": body.${locale},
            "author": author-> { 
                _id,
                name, 
                "avatarUrl": image.asset->url, 
                ${localizedField('', 'role', locale)},
                ${localizedField('', 'bio', locale)} 
            },
            "category": category-> { 
                _id, 
                ${localizedField('', 'title', locale)}, 
                slug, 
                color 
            },
            tags,
            featured,
            "seo": { 
                "title": seo.title.${locale},
                "description": seo.description.${locale},
                "keywords": seo.keywords
            },
            "categoryRef": category._ref,
            "authorRef": author._ref
        },
        "blogPage": *[_type == "blogPage"][0] {
            "detail": {
                "writtenBy": detail.writtenBy.${locale},
                "inThisArticle": detail.inThisArticle.${locale},
                "readArticle": detail.readArticle.${locale},
                "shareArticle": detail.shareArticle.${locale},
                "postNotFound": detail.postNotFound.${locale},
                "postNotFoundDesc": detail.postNotFoundDesc.${locale},
                "goHome": detail.goHome.${locale}
            }
        }
    }`;

	try {
		const postResult = await sanityClient.fetch(postQuery, { slug, locale });

		if (!postResult?.post) {
			return postResult;
		}

		const { categoryRef, authorRef } = postResult.post;
		const tags = postResult.post.tags || [];

		// Smart related posts query with scoring:
		// - Same author: +100 points (high priority)
		// - Same category + tag match: +50 + tag count
		// - Same category: +30 points
		// - 3+ tag matches: +20 + tag count
		// - Any tag match: +tag count
		// - Featured posts (fallback): +5 points
		// Order by score descending, then by publishedAt
		const relatedQuery = `*[_type == "post" && slug.current != $slug] {
            _id,
            ${localizedField('', 'title', locale)},
            slug,
            "imageUrl": image.asset->url,
            "category": category-> {
                ${localizedField('', 'title', locale)},
                slug,
                color
            },
            tags,
            featured,
            publishedAt,
            "categoryMatch": category._ref == $categoryRef,
            "authorMatch": author._ref == $authorRef,
            "tagMatches": count(tags[@ in $tags])
        } | order(
            select(
                authorMatch => 100,
                categoryMatch && tagMatches > 0 => 50 + tagMatches,
                categoryMatch => 30,
                tagMatches > 2 => 20 + tagMatches,
                tagMatches > 0 => tagMatches,
                featured => 5,
                0
            ) desc,
            publishedAt desc
        ) [0...6] {
            _id,
            title,
            slug,
            imageUrl,
            category,
            tags,
            featured,
            publishedAt
        }`;

		const relatedPosts = await sanityClient.fetch(relatedQuery, {
			slug,
			locale,
			categoryRef: categoryRef || '',
			authorRef: authorRef || '',
			tags
		});

		// Clean up internal refs from post object
		const cleanPost = { ...postResult.post };
		delete cleanPost.categoryRef;
		delete cleanPost.authorRef;

		const result = {
			post: cleanPost,
			blogPage: postResult.blogPage,
			relatedPosts: relatedPosts || []
		};

		sanityCache.set(cacheKey, result, 1800000);
		return result;
	} catch (error) {
		console.error('Error fetching combined post detail data:', error);
		return null;
	}
}

export async function getServiceDetailData(slug: string, locale: Locale) {
	const cacheKey = sanityCache.getPageKey(locale, 'serviceDetail', slug);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);

	const query = `{
        "service": *[_type == "service" && slug.current == $slug][0] {
            _id,
            "title": title.${locale},
            "slug": slug.current,
            icon,
            "longDescription": longDescription.${locale},
            "imageUrl": image.asset->url,
            "benefits": benefits[] { 
                _key, 
                "title": ${locale}
            },
            "subServices": subServices[] { 
                _key, 
                icon,
                "title": title.${locale}, 
                "description": description.${locale} 
            },
            "seo": { 
                "title": seo.title.${locale},
                "description": seo.description.${locale},
                "keywords": seo.keywords 
            }
        },
        "servicesPage": ${servicesPageDataQuery(locale)}
    }`;

	try {
		const result = await sanityClient.fetch(query, { slug, locale });
		sanityCache.set(cacheKey, result, 1800000);
		return result;
	} catch (error) {
		console.error('Error fetching combined service detail data:', error);
		return null;
	}
}
