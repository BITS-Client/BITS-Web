import { t as sanityClient } from "./client.js";
import groq from "groq";
//#region src/lib/utils/sanityCache.ts
var SanityDataCache = class {
	cache = {};
	timers = {};
	set(key, data, ttl = 3e5) {
		if (this.timers[key]) clearTimeout(this.timers[key]);
		this.cache[key] = data;
		if (ttl > 0) this.timers[key] = setTimeout(() => {
			this.delete(key);
		}, ttl);
	}
	get(key) {
		return this.cache[key] || null;
	}
	has(key) {
		return key in this.cache;
	}
	delete(key) {
		delete this.cache[key];
		if (this.timers[key]) {
			clearTimeout(this.timers[key]);
			delete this.timers[key];
		}
	}
	clear() {
		Object.keys(this.timers).forEach((key) => clearTimeout(this.timers[key]));
		this.cache = {};
		this.timers = {};
	}
	getGlobalKey(locale, dataType) {
		return `global_${dataType}_${locale}`;
	}
	getPageKey(locale, pageType, slug) {
		return `page_${pageType}_${locale}${slug ? `_${slug}` : ""}`;
	}
};
var sanityCache = new SanityDataCache();
//#endregion
//#region src/lib/sanity/queries/information.ts
async function getInformationSettings(locale = "id") {
	const cacheKey = sanityCache.getGlobalKey(locale, "information");
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	try {
		const query = `*[_type == "informationSettings"][0] {
      "siteTitle": siteTitle,
      "siteDescription": siteDescription.${locale},
      "siteTagline": siteTagline,
      "siteIcon": siteIcon { asset->{url}, alt },
      "siteLogo": siteLogo { asset->{url}, alt },
      "siteURL": siteURL,
      "siteEmail": siteEmail,
      "siteTelp": siteTelp,
      "siteWhatsApp": siteWhatsApp,
      "siteAddress": siteAddress,
      "googleMaps": googleMaps,
      "instagram": instagram,
      "tiktok": tiktok,
      "youtube": youtube,
      "github": github
    }`;
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error(`Error fetching information settings for locale ${locale}:`, error);
		return null;
	}
}
//#endregion
//#region src/lib/sanity/queries/pages.ts
var homePageQuery = (locale) => groq`
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
var portfolioPageQuery = (locale) => groq`
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
var servicesPageDataQuery = (locale) => groq`
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
async function getContactPage(locale) {
	const cacheKey = sanityCache.getGlobalKey(locale, "contactPage");
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	try {
		const query = contactPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error(`Error fetching contact page for locale ${locale}:`, error);
		return null;
	}
}
var privacyPageQuery = (locale) => groq`
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
var termsPageQuery = (locale) => groq`
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
async function getPrivacyPage(locale) {
	const cacheKey = sanityCache.getGlobalKey(locale, "privacyPage");
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	try {
		const query = privacyPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error(`Error fetching privacy page for locale ${locale}:`, error);
		return null;
	}
}
async function getTermsPage(locale) {
	const cacheKey = sanityCache.getGlobalKey(locale, "termsPage");
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	try {
		const query = termsPageQuery(locale);
		const result = await sanityClient.fetch(query);
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error(`Error fetching terms page for locale ${locale}:`, error);
		return null;
	}
}
var blogPageQuery = (locale) => groq`
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
var aboutPageQuery = (locale) => groq`
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
var contactPageQuery = (locale) => groq`
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
//#endregion
//#region src/lib/sanity/queries/composed.ts
async function getGlobalLayoutData(locale) {
	const cacheKey = sanityCache.getGlobalKey(locale, "layoutGlobal");
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
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error("Error fetching global layout data:", error);
		return null;
	}
}
function localizedField(parent, field, locale) {
	return `"${field}": ${parent ? `${parent}.` : ""}${field}.${locale}`;
}
async function getHomePageData(locale, projectsLimit, postsLimit) {
	const cacheKey = sanityCache.getPageKey(locale, "homePageDetailed", `p${projectsLimit}_post${postsLimit}`);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	const query = `{
        "homePage": ${homePageQuery(locale)},
        "projects": *[_type == "project"] | order(publishedAt desc) [0...$projectsLimit] {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            "client": client-> { name, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${localizedField("", "title", locale)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "testimonials": *[_type == "project" && defined(testimonial)] | order(_createdAt desc) [0...3] {
            "testimonial": testimonial {
                name,
                ${localizedField("", "content", locale)}
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
            ${localizedField("", "title", locale)},
            slug,
            "imageUrl": image.asset->url,
            "seo": {
                ${localizedField("seo", "description", locale)}
            },
            "author": author-> { 
                name, 
                "avatarUrl": image.asset->url 
            },
            "category": category-> { 
                _id, 
                ${localizedField("", "title", locale)}, 
                slug, 
                color 
            },
            tags,
            publishedAt
        }
    }`;
	try {
		const result = await sanityClient.fetch(query, {
			locale,
			projectsLimit,
			postsLimit
		});
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined home page data:", error);
		return null;
	}
}
async function getAboutPageData(locale) {
	const cacheKey = sanityCache.getPageKey(locale, "aboutPageDetailed");
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	const query = `{
        "aboutPage": ${aboutPageQuery(locale)},
        "teamMembers": *[_type == "team"] | order(order asc) {
            _id,
            name,
            slug,
            ${localizedField("", "role", locale)},
            ${localizedField("", "bio", locale)},
            image,
            "social": social { instagram, github, youtube },
            order
        }
    }`;
	try {
		const result = await sanityClient.fetch(query, { locale });
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined about page data:", error);
		return null;
	}
}
async function getPortfolioPageData(locale, limit, page = 1) {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * limit;
	const end = start + limit;
	const cacheKey = sanityCache.getPageKey(locale, "portfolioPageDetailed", `lim${limit}-page${safePage}`);
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
            ${localizedField("", "title", locale)},
            slug,
            "client": client-> { name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${localizedField("", "title", locale)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "allProjects": *[_type == "project"] | order(publishedAt desc) {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            "client": client-> { name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            "imageUrl": image.asset->url,
            "category": category-> { _id, ${localizedField("", "title", locale)}, slug, color },
            techStack,
            featured,
            publishedAt
        },
        "categories": *[_type == "category" && (type == "portfolio" || type == "both")] | order(title.${locale} asc) {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            color,
            icon,
            type
        }
    }`;
	try {
		const result = await sanityClient.fetch(query, {
			locale,
			limit,
			start,
			end
		});
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined portfolio page data:", error);
		return null;
	}
}
async function getBlogPageData(locale, limit = 12, page = 1) {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * limit;
	const end = start + limit;
	const cacheKey = sanityCache.getPageKey(locale, "blogPageDetailed", `limit_${limit}-page${safePage}`);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	const query = `{
        "blogPage": ${blogPageQuery(locale)},
        "totalPosts": count(*[_type == "post"]),
        "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "seo": {
                ${localizedField("seo", "description", locale)}
            },
            "author": author-> { 
                name, 
                "avatarUrl": image.asset->url,
                ${localizedField("", "role", locale)}
            },
            "category": category-> { 
                _id, 
                ${localizedField("", "title", locale)}, 
                slug, 
                color 
            },
            tags,
            featured
        },
        "allPosts": *[_type == "post"] | order(publishedAt desc) {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "seo": {
                ${localizedField("seo", "description", locale)}
            },
            "author": author-> {
                name,
                "avatarUrl": image.asset->url,
                ${localizedField("", "role", locale)}
            },
            "category": category-> {
                _id,
                ${localizedField("", "title", locale)},
                slug,
                color
            },
            tags,
            featured
        },
        "categories": *[_type == "category" && (type == "blog" || type == "both")] | order(title.${locale} asc) {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            color
        },
        "allTags": array::unique(*[_type == "post" && defined(tags)].tags[])
    }`;
	try {
		const result = await sanityClient.fetch(query, {
			locale,
			limit,
			start,
			end
		});
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined blog page data:", error);
		return null;
	}
}
async function getServicesPageDetailedData(locale, limit) {
	const cacheKey = sanityCache.getPageKey(locale, "servicesPageDetailed", `lim${limit}`);
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
		const result = await sanityClient.fetch(query, {
			locale,
			limit
		});
		sanityCache.set(cacheKey, result, 36e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined services page data:", error);
		return null;
	}
}
async function getProjectDetailData(slug, locale) {
	const cacheKey = sanityCache.getPageKey(locale, "projectDetail", slug);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
        "project": {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            "client": client-> { _id, name, website, "logoUrl": logo.asset->url, "iconUrl": icon.asset->url },
            "description": seo.description.${locale},
            ${localizedField("", "challenge", locale)},
            ${localizedField("", "solution", locale)},
            ${localizedField("", "result", locale)},
            "imageUrl": image.asset->url,
            "gallery": gallery[] { _key, "url": asset->url },
            "category": category-> { _id, ${localizedField("", "title", locale)}, slug, color },
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
		const projectResult = await sanityClient.fetch(projectQuery, {
			slug,
			locale
		});
		if (!projectResult?.project) return projectResult;
		const { categoryRef, clientRef } = projectResult.project;
		const techStack = projectResult.project.techStack || [];
		const relatedQuery = `*[_type == "project" && slug.current != $slug] {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            "imageUrl": image.asset->url,
            "category": category-> {
                ${localizedField("", "title", locale)},
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
			categoryRef: categoryRef || "",
			clientRef: clientRef || "",
			techStack
		});
		const cleanProject = { ...projectResult.project };
		delete cleanProject.categoryRef;
		delete cleanProject.clientRef;
		const result = {
			project: cleanProject,
			portfolioPage: projectResult.portfolioPage,
			relatedProjects: relatedProjects || []
		};
		sanityCache.set(cacheKey, result, 18e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined project detail data:", error);
		return null;
	}
}
async function getPostDetailData(slug, locale) {
	const cacheKey = sanityCache.getPageKey(locale, "postDetail", slug);
	if (sanityCache.has(cacheKey)) return sanityCache.get(cacheKey);
	const postQuery = `*[_type == "post" && slug.current == $slug][0] {
        "post": {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            publishedAt,
            "imageUrl": image.asset->url,
            "body": body.${locale},
            "author": author-> { 
                _id,
                name, 
                "avatarUrl": image.asset->url, 
                ${localizedField("", "role", locale)},
                ${localizedField("", "bio", locale)} 
            },
            "category": category-> { 
                _id, 
                ${localizedField("", "title", locale)}, 
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
		const postResult = await sanityClient.fetch(postQuery, {
			slug,
			locale
		});
		if (!postResult?.post) return postResult;
		const { categoryRef, authorRef } = postResult.post;
		const tags = postResult.post.tags || [];
		const relatedQuery = `*[_type == "post" && slug.current != $slug] {
            _id,
            ${localizedField("", "title", locale)},
            slug,
            "imageUrl": image.asset->url,
            "category": category-> {
                ${localizedField("", "title", locale)},
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
			categoryRef: categoryRef || "",
			authorRef: authorRef || "",
			tags
		});
		const cleanPost = { ...postResult.post };
		delete cleanPost.categoryRef;
		delete cleanPost.authorRef;
		const result = {
			post: cleanPost,
			blogPage: postResult.blogPage,
			relatedPosts: relatedPosts || []
		};
		sanityCache.set(cacheKey, result, 18e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined post detail data:", error);
		return null;
	}
}
async function getServiceDetailData(slug, locale) {
	const cacheKey = sanityCache.getPageKey(locale, "serviceDetail", slug);
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
		const result = await sanityClient.fetch(query, {
			slug,
			locale
		});
		sanityCache.set(cacheKey, result, 18e5);
		return result;
	} catch (error) {
		console.error("Error fetching combined service detail data:", error);
		return null;
	}
}
//#endregion
//#region src/lib/sanity/queries/sitemap.ts
async function getSitemapData() {
	return sanityClient.fetch(`{
    "services": *[_type == "service"] { slug, _updatedAt },
    "projects": *[_type == "project"] { slug, _updatedAt },
    "posts": *[_type == "post"] { slug, _updatedAt }
  }`);
}
//#endregion
export { getHomePageData as a, getProjectDetailData as c, getContactPage as d, getPrivacyPage as f, getGlobalLayoutData as i, getServiceDetailData as l, getInformationSettings as m, getAboutPageData as n, getPortfolioPageData as o, getTermsPage as p, getBlogPageData as r, getPostDetailData as s, getSitemapData as t, getServicesPageDetailedData as u };
