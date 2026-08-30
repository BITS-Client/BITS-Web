// Contact Page Types
// Used across contact page and its components

export interface ContactPageData {
	seo?: {
		title?: string | Record<string, string>;
		description?: string | Record<string, string>;
	};
	hero?: {
		badge?: string;
		title?: string;
		subtitle?: string;
		email?: string;
		telp?: string;
		whatsapp?: string;
	};
	form?: {
		title?: string;
		subtitle?: string;
		name?: string;
		namePlaceholder?: string;
		email?: string;
		emailPlaceholder?: string;
		phone?: string;
		phonePlaceholder?: string;
		type?: string;
		inquiryTypeItems?: Array<{
			value: string;
			label: string;
			description?: string;
			detailLabel?: string;
			detailPlaceholder?: string;
			detailItems?: Array<{ value: string; label: string }>;
		}>;
		consultantTopic?: string;
		message?: string;
		messagePlaceholder?: string;
		verification?: string;
		verified?: string;
		turnstileRequired?: string;
		sending?: string;
		send?: string;
		successTitle?: string;
		successDesc?: string;
		errorTitle?: string;
	};
	info?: {
		contactInfo?: string;
		emailUs?: string;
		callUs?: string;
		visit?: string;
		needHelp?: string;
		helpDesc?: string;
		chatWhatsApp?: string;
	};
	faq?: {
		badge?: string;
		title?: string;
		subtitle?: string;
		faqItems?: Array<{
			_key: string;
			question: string;
			answer: string;
		}>;
		helpTitle?: string;
		helpDesc?: string;
		email?: string;
		whatsapp?: string;
	};
}

export interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	inquiryType: string;
	consultationTopic: string;
	preferredDate: string;
	message: string;
}

export interface InquiryType {
	value: string;
	label: string;
	icon: string;
	description: string;
	gradient: string;
	bgColor: string;
	iconColor: string;
}

export interface FormFieldOption {
	value: string;
	label: string;
}
