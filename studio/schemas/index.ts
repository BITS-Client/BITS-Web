// Object types (reusable)
import localizedString from './objects/localizedString';
import localizedText from './objects/localizedText';
import localizedBlockContent from './objects/localizedBlockContent';
import seoSettings from './objects/seoSettings';
import subService from './objects/subService';
import stat from './objects/stat';
import testimonial from './objects/testimonial';
import faqItem from './objects/faqItem';
import timelineEvent from './objects/timelineEvent';

// Singleton documents
import informationSettings from './singletons/information';
import menuSettings from './singletons/menu';
import generalSettings from './singletons/general';
import configuration from './singletons/configuration';
import homePage from './singletons/homePage';
import aboutPage from './singletons/aboutPage';
import contactPage from './singletons/contactPage';
import servicesPage from './singletons/servicesPage';
import portfolioPage from './singletons/portfolioPage';
import blogPage from './singletons/blogPage';
import termsPage from './singletons/termsPage';
import privacyPage from './singletons/privacyPage';

// Collection documents
import service from './documents/service';
import project from './documents/project';
import post from './documents/post';
import team from './documents/team';
import category from './documents/category';
import client from './documents/client';

export const schemaTypes = [
	// Objects
	localizedString,
	localizedText,
	localizedBlockContent,
	seoSettings,
	subService,
	stat,
	testimonial,
	faqItem,
	timelineEvent,
	// Settings singletons
	informationSettings,
	menuSettings,
	generalSettings,
	configuration,
	// Page singletons
	homePage,
	aboutPage,
	contactPage,
	servicesPage,
	portfolioPage,
	blogPage,
	termsPage,
	privacyPage,
	// Collections
	service,
	project,
	post,
	team,
	category,
	client
];

// Export singleton document IDs for structure tool
export const singletonTypes = [
	'informationSettings',
	'menuSettings',
	'generalSettings',
	'configuration',
	'homePage',
	'aboutPage',
	'contactPage',
	'servicesPage',
	'portfolioPage',
	'blogPage',
	'termsPage',
	'privacyPage'
];
