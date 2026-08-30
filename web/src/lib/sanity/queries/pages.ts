// Page-specific queries
import groq from 'groq';

// Query for home page data
export const homePageQuery = (locale: string) => groq`
  *[_type == "homePage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "cta": hero.cta.${locale},
      "ctaLink": hero.ctaLink,
      "viewWork": hero.viewWork.${locale},
      "viewWorkLink": hero.viewWorkLink
    },
    "servicesSection": {
      "title": servicesSection.title.${locale},
      "subtitle": servicesSection.subtitle.${locale},
      "badge": servicesSection.badge.${locale}
    },
    "portfolioSection": {
      "title": portfolioSection.title.${locale},
      "subtitle": portfolioSection.subtitle.${locale},
      "badge": portfolioSection.badge.${locale},
      "viewAllProject": portfolioSection.viewAllProject.${locale},
      "viewAllProjectLink": portfolioSection.viewAllProjectLink
    },
    "blogSection": {
      "title": blogSection.title.${locale},
      "subtitle": blogSection.subtitle.${locale},
      "badge": blogSection.badge.${locale},
      "viewAllPosts": blogSection.viewAllPosts.${locale},
      "viewAllPostsLink": blogSection.viewAllPostsLink
    },
    "testimonialsSection": {
      "title": testimonialsSection.title.${locale},
      "subtitle": testimonialsSection.subtitle.${locale},
      "badge": testimonialsSection.badge.${locale}
    },
    "companyStatsSection": {
      "title": companyStatsSection.title.${locale},
      "subtitle": companyStatsSection.subtitle.${locale},
      "badge": companyStatsSection.badge.${locale},
      "items": companyStatsSection.items[] {
        _key,
        "value": value,
        "label": label.${locale}
      }
    },
    "servicesPage": {
      "ctaSection": {
        "title": pages.services.ctaSection.title.${locale},
        "subtitle": pages.services.ctaSection.subtitle.${locale},
        "ctaText1": pages.services.ctaSection.ctaText1.${locale},
        "ctaLink1": pages.services.ctaSection.ctaLink1
      }
    }
  }
`;

// Query for services page CTA section (used in header dropdown)
export const servicesPageCtaQuery = (locale: string) => groq`
  *[_type == "servicesPage"][0] {
    "ctaSection": ctaSection {
      "title": title.${locale},
      "subtitle": subtitle.${locale},
      "ctaText1": ctaText1.${locale},
      "ctaLink1": ctaLink1
    }
  }
`;

// Query for portfolio page data
export const portfolioPageQuery = (locale: string) => groq`
  *[_type == "portfolioPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale}
    },
    "itemLabels": {
      "challenge": itemLabels.challenge.${locale},
      "solution": itemLabels.solution.${locale},
      "result": itemLabels.result.${locale},
      "notFound": itemLabels.notFound.${locale},
      "notFoundDesc": itemLabels.notFoundDesc.${locale},
      "viewAllProjects": itemLabels.viewAllProjects.${locale},
      "galleryImage": itemLabels.galleryImage.${locale}
    },
    "cta": {
      "heading": cta.heading.${locale},
      "text": cta.text.${locale},
      "getStarted": cta.getStarted.${locale},
      "getStartedLink": cta.getStartedLink,
      "exploreServices": cta.exploreServices.${locale},
      "exploreLink": cta.exploreLink
    }
  }
`;

// Query for single project data
export const projectQuery = (slug: string, locale: string) => groq`
  *[_type == "project" && slug.current == "${slug}" && locale == "${locale}"][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    image,
    imageUrl,
    client,
    category,
    techStack[],
    featured,
    publishedAt,
    seo,
    hero,
    content,
    gallery[]
  }
`;

// Query for services page data
export const servicesPageDataQuery = (locale: string) => groq`
  *[_type == "servicesPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "ctaText1": hero.ctaText1.${locale},
      "ctaText2": hero.ctaText2.${locale},
      "ctaLink1": hero.ctaLink1,
      "ctaLink2": hero.ctaLink2
    },
    "servicesSection": servicesSection {
      "badge": badge.${locale},
      "title": title.${locale},
      "subtitle": subtitle.${locale}
    },
    "processSection": processSection {
      "badge": badge.${locale},
      "title": title.${locale},
      "subtitle": subtitle.${locale},
      "processItems": processItems[] {
        _key,
        "icon": icon,
        "title": title.${locale},
        "subtitle": subtitle.${locale}
      }
    },
    "whySection": whySection {
      "badge": badge.${locale},
      "title": title.${locale},
      "subtitle": subtitle.${locale},
      "whyItems": whyItems[] {
        _key,
        "icon": icon,
        "title": title.${locale},
        "subtitle": subtitle.${locale}
      }
    },
    "ctaSection": ctaSection {
      "badge": badge.${locale},
      "title": title.${locale},
      "subtitle": subtitle.${locale},
      "ctaText1": ctaText1.${locale},
      "ctaText2": ctaText2.${locale},
      "ctaLink1": ctaLink1,
      "ctaLink2": ctaLink2
    },
    "serviceDetail": {
      "hero": {
        "badge": serviceDetail.hero.badge.${locale},
        "buttonCta": serviceDetail.hero.buttonCta.${locale},
        "stats": serviceDetail.hero.stats[] {
          _key,
          "value": value,
          "label": label.${locale}
        }
      },
      "subService": {
        "badge": serviceDetail.subService.badge.${locale},
        "title": serviceDetail.subService.title.${locale},
        "subtitle": serviceDetail.subService.subtitle.${locale}
      },
      "benefits": {
        "badge": serviceDetail.benefits.badge.${locale},
        "title": serviceDetail.benefits.title.${locale},
        "subtitle": serviceDetail.benefits.subtitle.${locale},
        "stats": serviceDetail.benefits.stats[] {
          _key,
          "value": value,
          "label": label.${locale}
        }
      },
      "cta": {
        "badge": serviceDetail.cta.badge.${locale},
        "title": serviceDetail.cta.title.${locale},
        "subtitle": serviceDetail.cta.subtitle.${locale},
        "btnCta": serviceDetail.cta.btnCta.${locale},
        "linkCta": serviceDetail.cta.linkCta
      }
    }
  }
`;

import { sanityClient } from '../client';
import { sanityCache } from '$lib/utils/sanityCache';

export async function getServicesPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'servicesPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = servicesPageDataQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching services page for locale ${locale}:`, error);
		return null;
	}
}

export async function getHomePage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'homePage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = homePageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching home page for locale ${locale}:`, error);
		return null;
	}
}

export async function getServicesPageCta(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'servicesPageCta');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = servicesPageCtaQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching services page CTA for locale ${locale}:`, error);
		return null;
	}
}

export async function getHomePageStats(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'homePageStats');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		// Get just the company stats section from the home page
		const query = groq`*[_type == "homePage"][0] {
      companyStatsSection
    }`;
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result?.companyStatsSection || null, 3600000); // Cache for 1 hour
		return result?.companyStatsSection || null;
	} catch (error) {
		console.error(`Error fetching home page stats for locale ${locale}:`, error);
		return null;
	}
}

export async function getPortfolioPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'portfolioPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = portfolioPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching portfolio page for locale ${locale}:`, error);
		return null;
	}
}

export async function getContactPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'contactPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = contactPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching contact page for locale ${locale}:`, error);
		return null;
	}
}

export async function getAboutPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'aboutPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = aboutPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching about page for locale ${locale}:`, error);
		return null;
	}
}

// Query for privacy page
export const privacyPageQuery = (locale: string) => groq`
  *[_type == "privacyPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "lastUpdated": hero.lastUpdated.${locale}
    },
    "content": {
      "tocLabel": content.tocLabel.${locale},
      "sectionLabel": content.sectionLabel.${locale},
      "noticeTitle": content.noticeTitle.${locale},
      "noticeSubtitle": content.noticeSubtitle.${locale}
    },
    "contact": {
      "title": contact.title.${locale}
    },
    "sections": sections[] {
      _key,
      "title": title.${locale},
      "items": items[] {
        _key,
        "subtitle": subtitle.${locale},
        "text": text.${locale}
      }
    }
  }
`;

// Query for terms page
export const termsPageQuery = (locale: string) => groq`
  *[_type == "termsPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "lastUpdated": hero.lastUpdated.${locale}
    },
    "content": {
      "tocLabel": content.tocLabel.${locale},
      "sectionLabel": content.sectionLabel.${locale},
      "noticeTitle": content.noticeTitle.${locale},
      "noticeSubtitle": content.noticeSubtitle.${locale}
    },
    "contact": {
      "title": contact.title.${locale}
    },
    "sections": sections[] {
      _key,
      "title": title.${locale},
      "items": items[] {
        _key,
        "subtitle": subtitle.${locale},
        "text": text.${locale}
      }
    }
  }
`;

export async function getPrivacyPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'privacyPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = privacyPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching privacy page for locale ${locale}:`, error);
		return null;
	}
}

export async function getTermsPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'termsPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = termsPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching terms page for locale ${locale}:`, error);
		return null;
	}
}

// Query for single service data
export const serviceQuery = (slug: string, locale: string) => groq`
  *[_type == "service" && slug.current == "${slug}" && locale == "${locale}"][0] {
    _id,
    title,
    slug,
    icon,
    description,
    longDescription,
    image,
    imageUrl,
    seo,
    hero,
    features[],
    content,
    "subServices": subServices[] {
      title,
      description,
      icon
    },
    "benefits": benefits[] {
      title
    },
    relatedServices[]->
  }
`;

// Query for blog page
export const blogPageQuery = (locale: string) => groq`
  *[_type == "blogPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "searchArticle": hero.searchArticle.${locale}
    },
    "content": {
      "allCategories": content.allCategories.${locale},
      "categories": content.categories.${locale},
      "latestArticles": content.latestArticles.${locale},
      "articlesCount": content.articlesCount.${locale},
      "clearFilters": content.clearFilters.${locale},
      "adjustSearchFilter": content.adjustSearchFilter.${locale},
      "viewAllArticles": content.viewAllArticles.${locale},
      "loadMore": content.loadMore.${locale},
      "comingSoon": content.comingSoon.${locale}
    },
    "searchModal": {
      "trendingTags": searchModal.trendingTags.${locale},
      "noArticlesFound": searchModal.noArticlesFound.${locale},
      "quickLinks": searchModal.quickLinks.${locale},
      "resultsFor": searchModal.resultsFor.${locale},
      "toSelect": searchModal.toSelect.${locale},
      "toClose": searchModal.toClose.${locale},
      "noResults": searchModal.noResults.${locale}
    },
    "detail": {
      "readArticle": detail.readArticle.${locale},
      "writtenBy": detail.writtenBy.${locale},
      "inThisArticle": detail.inThisArticle.${locale},
      "relatedBadge": detail.relatedBadge.${locale},
      "shareArticle": detail.shareArticle.${locale},
      "postNotFound": detail.postNotFound.${locale},
      "postNotFoundDesc": detail.postNotFoundDesc.${locale},
      "goHome": detail.goHome.${locale}
    }
  }
`;

// Query for posts
export const postsQuery = (locale: string) => groq`
  *[_type == "post" && locale == "${locale}" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    author->{
      name,
      avatar
    },
    seo,
    category->
  }
`;

// Query for single post
export const postQuery = (slug: string, locale: string) => groq`
  *[_type == "post" && slug.current == "${slug}" && locale == "${locale}"][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    coverImage,
    content,
    author->,
    seo,
    category->
  }
`;

// Get blog page data
export async function getBlogPage(locale: string) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cacheKey = sanityCache.getGlobalKey(locale as any, 'blogPage');

	if (sanityCache.has(cacheKey)) {
		return sanityCache.get(cacheKey);
	}

	try {
		const query = blogPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 3600000); // Cache for 1 hour
		return result;
	} catch (error) {
		console.error(`Error fetching blog page for locale ${locale}:`, error);
		return null;
	}
}

// Query for about page
export const aboutPageQuery = (locale: string) => groq`
  *[_type == "aboutPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "contact": hero.contact.${locale},
      "portfolio": hero.portfolio.${locale},
      "experience": hero.experience.${locale},
      "experienceValue": hero.experienceValue,
      "client": hero.client.${locale},
      "clientValue": hero.clientValue,
      "project": hero.project.${locale},
      "projectValue": hero.projectValue
    },
    "vision": {
      "badge": vision.badge.${locale},
      "title": vision.title.${locale},
      "subtitle": vision.subtitle.${locale},
      "visionTitle": vision.visionTitle.${locale},
      "visionDesc": vision.visionDesc.${locale},
      "missionTitle": vision.missionTitle.${locale},
      "missionDesc": vision.missionDesc.${locale}
    },
    "timeline": {
      "badge": timeline.badge.${locale},
      "title": timeline.title.${locale},
      "subtitle": timeline.subtitle.${locale},
      "end": timeline.end.${locale},
      "stories": timeline.stories[] {
        _key,
        "title": title.${locale},
        "description": description.${locale},
        icon,
        year
      }
    },
    "principles": {
      "badge": principles.badge.${locale},
      "title": principles.title.${locale},
      "subtitle": principles.subtitle.${locale},
      "ready": principles.ready.${locale},
      "readySubtitle": principles.readySubtitle.${locale},
      "connect": principles.connect.${locale},
      "keys": principles.keys[] {
        _key,
        "title": title.${locale},
        "description": description.${locale},
        icon
      }
    },
    "teams": {
      "badge": teams.badge.${locale},
      "title": teams.title.${locale},
      "subtitle": teams.subtitle.${locale},
      "ctaTitle": teams.ctaTitle.${locale},
      "ctaSubtitle": teams.ctaSubtitle.${locale},
      "ctaButton": teams.ctaButton.${locale}
    }
  }
`;

// Query for contact page
export const contactPageQuery = (locale: string) => groq`
  *[_type == "contactPage"][0] {
    _id,
    "seo": {
      "title": seo.title.${locale},
      "description": seo.description.${locale},
      "keywords": seo.keywords
    },
    "hero": {
      "badge": hero.badge.${locale},
      "title": hero.title.${locale},
      "subtitle": hero.subtitle.${locale},
      "email": hero.email.${locale},
      "telp": hero.telp.${locale},
      "whatsapp": hero.whatsapp.${locale}
    },
    "form": {
      "title": form.title.${locale},
      "subtitle": form.subtitle.${locale},
      "name": form.name.${locale},
      "email": form.email.${locale},
      "phone": form.phone.${locale},
      "type": form.type.${locale},
      "inquiryTypeItems": form.inquiryTypeItems[]{
        value,
        "label": label.${locale},
        "description": description.${locale},
        "detailLabel": detailLabel.${locale},
        "detailPlaceholder": detailPlaceholder.${locale},
        "detailItems": detailItems[]{
          value,
          "label": label.${locale}
        }
      },
      "message": form.message.${locale},
      "verification": form.verification.${locale},
      "verified": form.verified.${locale},
      "send": form.send.${locale},
      "namePlaceholder": form.namePlaceholder.${locale},
      "emailPlaceholder": form.emailPlaceholder.${locale},
      "phonePlaceholder": form.phonePlaceholder.${locale},
      "messagePlaceholder": form.messagePlaceholder.${locale},
      "sending": form.sending.${locale},
      "successTitle": form.successTitle.${locale},
      "successDesc": form.successDesc.${locale},
      "errorTitle": form.errorTitle.${locale},
      "errorDesc": form.errorDesc.${locale},
      "turnstileRequired": form.turnstileRequired.${locale},
      "turnstileComplete": form.turnstileComplete.${locale}
    },
    "info": {
      "contactInfo": info.contactInfo.${locale},
      "visit": info.visit.${locale},
      "emailUs": info.emailUs.${locale},
      "callUs": info.callUs.${locale},
      "needHelp": info.needHelp.${locale},
      "helpDesc": info.helpDesc.${locale},
      "chatWhatsApp": info.chatWhatsApp.${locale}
    },
    "faq": {
      "badge": faq.badge.${locale},
      "title": faq.title.${locale},
      "subtitle": faq.subtitle.${locale},
      "faqItems": faq.faqItems[]{
        _key,
        "question": question.${locale},
        "answer": answer.${locale}
      },
      "helpTitle": faq.helpTitle.${locale},
      "helpDesc": faq.helpDesc.${locale},
      "email": faq.email.${locale},
      "whatsapp": faq.whatsapp.${locale}
    }
  }
`;
