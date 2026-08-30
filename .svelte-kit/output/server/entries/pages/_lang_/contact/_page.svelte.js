import { C as escape_html, S as clsx, a as attr_class, c as bind_props, d as ensure_array_like, g as stringify, l as derived, n as onDestroy, o as attr_style, x as attr } from "../../../../chunks/index-server.js";
import { s as PUBLIC_TURNSTILE_SITE_KEY } from "../../../../chunks/public.js";
import { s as generateWebPageSchema } from "../../../../chunks/seo.js";
import "../../../../chunks/lucide.js";
import { n as Cloud, r as Calendar, t as Palette } from "../../../../chunks/palette.js";
import { n as Message_square, r as Check, t as Send } from "../../../../chunks/send.js";
import { a as Cpu, i as Headphones, n as Server, o as Chevron_down, r as Megaphone, t as Shield_check } from "../../../../chunks/shield-check.js";
import { t as Chevron_left } from "../../../../chunks/chevron-left.js";
import { t as Chevron_right } from "../../../../chunks/chevron-right.js";
import { i as Circle_alert, r as Circle_check_big } from "../../../../chunks/map-pin.js";
import { n as Code } from "../../../../chunks/search.js";
import { t as Mail } from "../../../../chunks/mail.js";
import { t as Message_circle } from "../../../../chunks/message-circle.js";
import { t as SEO } from "../../../../chunks/SEO2.js";
import { t as ScrollReveal } from "../../../../chunks/ScrollReveal.js";
import { t as PageHero } from "../../../../chunks/PageHero.js";
import { t as ContactCard } from "../../../../chunks/ContactCard.js";
//#region src/lib/components/ui/form/Turnstile.svelte
function Turnstile($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { sitekey, theme = "auto", size = "normal", onVerify, onError, onExpire } = $$props;
		function reset() {}
		function getResponse() {}
		$$renderer.push(`<div${attr_class("turnstile-container svelte-gt59yq", void 0, { "turnstile-compact": size === "compact" })}></div>`);
		bind_props($$props, {
			reset,
			getResponse
		});
	});
}
//#endregion
//#region src/lib/components/ui/form/CustomSelect.svelte
function CustomSelect($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id = "", value = "", options = [], placeholder = "", _required = false, onchange, class: className = "" } = $$props;
		let isOpen = false;
		function handleClickOutside(event) {}
		function handleKeydown(event) {
			if (event.key === "Escape") isOpen = false;
		}
		onDestroy(() => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKeydown);
		});
		const selectedOption = derived(() => options.find((opt) => opt.value === value));
		const displayLabel = derived(() => selectedOption()?.label || placeholder || "");
		$$renderer.push(`<div${attr_class(`custom-select ${stringify(className)}`, "svelte-fmfs17")}><button type="button"${attr("id", id)}${attr_class("select-trigger svelte-fmfs17", void 0, {
			"open": isOpen,
			"has-value": value !== ""
		})}${attr("aria-expanded", isOpen)} aria-haspopup="listbox"><span${attr_class("select-value svelte-fmfs17", void 0, { "placeholder": !value })}>${escape_html(displayLabel())}</span> <span${attr_class("select-arrow-wrapper svelte-fmfs17", void 0, { "open": isOpen })}>`);
		Chevron_down($$renderer, { class: "select-arrow" });
		$$renderer.push(`<!----></span></button> `);
		if (isOpen) {
			$$renderer.push(`<!--[0--><div class="select-dropdown svelte-fmfs17" role="listbox">`);
			if (placeholder) $$renderer.push(`<!--[0--><button type="button" class="select-option placeholder-option svelte-fmfs17">${escape_html(placeholder)}</button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array = ensure_array_like(options);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let option = each_array[$$index];
				$$renderer.push(`<button type="button"${attr_class("select-option svelte-fmfs17", void 0, { "selected": value === option.value })} role="option"${attr("aria-selected", value === option.value)}><span class="option-label svelte-fmfs17">${escape_html(option.label)}</span> `);
				if (value === option.value) {
					$$renderer.push("<!--[0-->");
					Check($$renderer, { class: "option-check" });
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></button>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/form/CustomDatePicker.svelte
function CustomDatePicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id = "", value = "", _required = false, onchange, class: className = "" } = $$props;
		let isOpen = false;
		const today = /* @__PURE__ */ new Date();
		let currentMonth = today.getMonth();
		let currentYear = today.getFullYear();
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		const dayNames = [
			"Su",
			"Mo",
			"Tu",
			"We",
			"Th",
			"Fr",
			"Sa"
		];
		let daysInMonth = derived(() => getDaysInMonth(currentMonth, currentYear));
		let firstDayOfWeek = derived(() => new Date(currentYear, currentMonth, 1).getDay());
		function getDaysInMonth(month, year) {
			return new Date(year, month + 1, 0).getDate();
		}
		function formatDate(day) {
			const month = (currentMonth + 1).toString().padStart(2, "0");
			const dayStr = day.toString().padStart(2, "0");
			return `${currentYear}-${month}-${dayStr}`;
		}
		function formatDisplayDate(dateStr) {
			if (!dateStr) return "";
			return new Date(dateStr).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		}
		function handleClickOutside(event) {}
		function handleKeydown(event) {
			if (event.key === "Escape") isOpen = false;
		}
		onDestroy(() => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKeydown);
		});
		function getDayClass(day) {
			const dateStr = formatDate(day);
			const isSelected = value === dateStr;
			const isToday = formatDate(day) === formatDate(today.getDate());
			return isSelected ? "calendar-day selected" : isToday ? "calendar-day today" : "calendar-day";
		}
		$$renderer.push(`<div${attr_class(`date-picker-wrapper ${stringify(className)}`, "svelte-1q9t83l")}><button type="button"${attr("id", id)}${attr_class("date-trigger svelte-1q9t83l", void 0, {
			"open": isOpen,
			"has-value": value !== ""
		})}${attr("aria-expanded", isOpen)} aria-haspopup="dialog"><span class="date-icon-wrapper svelte-1q9t83l">`);
		Calendar($$renderer, { class: "date-icon" });
		$$renderer.push(`<!----></span> <span${attr_class("date-value svelte-1q9t83l", void 0, { "placeholder": !value })}>${escape_html(value ? formatDisplayDate(value) : "Select date")}</span> <span${attr_class("date-arrow-wrapper svelte-1q9t83l", void 0, { "open": isOpen })}>`);
		Chevron_down($$renderer, { class: "date-arrow" });
		$$renderer.push(`<!----></span></button> `);
		if (isOpen) {
			$$renderer.push(`<!--[0--><div class="date-dropdown svelte-1q9t83l" role="dialog" aria-label="Date picker"><div class="calendar-header svelte-1q9t83l"><button type="button" class="nav-btn svelte-1q9t83l" aria-label="Previous month">`);
			Chevron_left($$renderer, { class: "nav-icon" });
			$$renderer.push(`<!----></button> <span class="month-year svelte-1q9t83l">${escape_html(monthNames[currentMonth])}
					${escape_html(currentYear)}</span> <button type="button" class="nav-btn svelte-1q9t83l" aria-label="Next month">`);
			Chevron_right($$renderer, { class: "nav-icon" });
			$$renderer.push(`<!----></button></div> <div class="calendar-weekdays svelte-1q9t83l"><!--[-->`);
			const each_array = ensure_array_like(dayNames);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let day = each_array[$$index];
				$$renderer.push(`<span class="weekday svelte-1q9t83l">${escape_html(day)}</span>`);
			}
			$$renderer.push(`<!--]--></div> <div class="calendar-grid svelte-1q9t83l"><!--[-->`);
			const each_array_1 = ensure_array_like(Array(firstDayOfWeek()));
			for (let idx = 0, $$length = each_array_1.length; idx < $$length; idx++) {
				each_array_1[idx];
				$$renderer.push(`<span class="calendar-day empty svelte-1q9t83l"></span>`);
			}
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array_2 = ensure_array_like(Array(daysInMonth()));
			for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
				each_array_2[i];
				const day = i + 1;
				$$renderer.push(`<button type="button"${attr_class(clsx(getDayClass(day)), "svelte-1q9t83l")}>${escape_html(day)}</button>`);
			}
			$$renderer.push(`<!--]--></div> <div class="calendar-footer svelte-1q9t83l"><button type="button" class="today-btn svelte-1q9t83l">Today</button></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/form/ContactForm.svelte
function ContactForm($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { formTitle = "Get in Touch", formSubtitle = "", nameLabel = "Name", namePlaceholder = "Your name", emailLabel = "Email", emailPlaceholder = "your@email.com", phoneLabel = "Phone", phonePlaceholder = "+62 812 3456 7890", typeLabel = "Inquiry Type", inquiryTypes = [], consultationTopicLabel = "Topic", consultationTopicPlaceholder = "Select consultation topic", messageLabel = "Message", messagePlaceholder = "Tell us about your project...", verificationLabel = "Verification", verifiedLabel = "Verified", turnstileRequiredLabel = "Please complete the verification", sendingLabel = "Sending...", sendLabel = "Send Message", successTitle = "Message Sent!", successDesc = "Thank you for reaching out. We'll get back to you soon.", errorTitle = "Error", turnstileSiteKey = "", locale: _locale = "id", onSubmit } = $$props;
		let formData = {
			name: "",
			email: "",
			phone: "",
			inquiryType: "",
			consultationTopic: "",
			preferredDate: "",
			message: ""
		};
		let turnstileVerified = false;
		let turnstileError = "";
		let turnstileTheme = "auto";
		let turnstileSize = "normal";
		const selectedInquiryType = derived(() => inquiryTypes.find((type) => type.value === formData.inquiryType) || null);
		const selectedDetailItems = derived(() => selectedInquiryType()?.detailItems || []);
		const selectedDetailLabel = derived(() => selectedInquiryType()?.detailLabel || consultationTopicLabel);
		const selectedDetailPlaceholder = derived(() => selectedInquiryType()?.detailPlaceholder || consultationTopicPlaceholder);
		function handleTurnstileVerify(token) {
			turnstileVerified = true;
			turnstileError = "";
		}
		function handleTurnstileError(error) {
			turnstileVerified = false;
			turnstileError = error || "";
		}
		function handleTurnstileExpire() {
			turnstileVerified = false;
			turnstileError = "Verification expired. Please verify again.";
		}
		$$renderer.push(`<div class="form-container svelte-19snr28"><div class="form-header svelte-19snr28"><h2 class="form-title svelte-19snr28">${escape_html(formTitle)}</h2> `);
		if (formSubtitle) $$renderer.push(`<!--[0--><p class="form-subtitle svelte-19snr28">${escape_html(formSubtitle)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="form-header-underline svelte-19snr28"></div></div> <form class="contact-form svelte-19snr28"><div class="form-grid svelte-19snr28"><div class="form-group svelte-19snr28"><label for="name" class="form-label svelte-19snr28">${escape_html(nameLabel)} <span class="required svelte-19snr28">*</span></label> <input type="text" id="name"${attr("value", formData.name)} required="" class="form-input svelte-19snr28"${attr("placeholder", namePlaceholder)}/></div> <div class="form-group svelte-19snr28"><label for="email" class="form-label svelte-19snr28">${escape_html(emailLabel)} <span class="required svelte-19snr28">*</span></label> <input type="email" id="email"${attr("value", formData.email)} required="" class="form-input svelte-19snr28"${attr("placeholder", emailPlaceholder)}/></div></div> <div class="form-group svelte-19snr28"><label for="phone" class="form-label svelte-19snr28">${escape_html(phoneLabel)}</label> <input type="tel" id="phone"${attr("value", formData.phone)} class="form-input svelte-19snr28"${attr("placeholder", phonePlaceholder)}/></div> `);
		if (inquiryTypes.length > 0) {
			$$renderer.push(`<!--[0--><div class="form-group svelte-19snr28"><label class="form-label svelte-19snr28" for="inquiry-type-select">${escape_html(typeLabel)} <span class="required svelte-19snr28">*</span></label> <div class="inquiry-type-grid svelte-19snr28"><!--[-->`);
			const each_array = ensure_array_like(inquiryTypes);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let type = each_array[$$index];
				$$renderer.push(`<label${attr_class(`inquiry-type-card ${formData.inquiryType === type.value ? "selected" : ""}`, "svelte-19snr28")}${attr("data-type", type.value)}><input type="radio" name="inquiryType"${attr("id", type.value === inquiryTypes[0]?.value ? "inquiry-type-select" : void 0)}${attr("value", type.value)}${attr("checked", formData.inquiryType === type.value, true)} required="" class="sr-only svelte-19snr28"/> <div class="inquiry-icon-wrapper svelte-19snr28"><div${attr_class(`inquiry-icon bg-gradient-to-br ${stringify(type.gradient)}`, "svelte-19snr28")}>`);
				if (type.icon) {
					$$renderer.push("<!--[-->");
					type.icon($$renderer, { class: "w-6 h-6" });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(`</div></div> <div class="inquiry-info svelte-19snr28"><span class="inquiry-label svelte-19snr28">${escape_html(type.label)}</span> <span class="inquiry-desc svelte-19snr28">${escape_html(type.description)}</span></div> <div class="check-indicator svelte-19snr28">`);
				Circle_check_big($$renderer, { class: "w-5 h-5" });
				$$renderer.push(`<!----></div></label>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (formData.inquiryType && selectedDetailItems().length > 0) {
			$$renderer.push(`<!--[0--><div class="dynamic-fields svelte-19snr28"><h3 class="fields-title svelte-19snr28">`);
			Code($$renderer, { class: "w-5 h-5" });
			$$renderer.push(`<!----> ${escape_html(selectedDetailLabel())}</h3> `);
			if (formData.inquiryType === "consultation") {
				$$renderer.push(`<!--[0--><div class="form-grid svelte-19snr28"><div class="form-group svelte-19snr28">`);
				CustomSelect($$renderer, {
					id: "consultationTopic",
					value: formData.consultationTopic,
					options: selectedDetailItems(),
					placeholder: selectedDetailPlaceholder(),
					onchange: (v) => formData.consultationTopic = v
				});
				$$renderer.push(`<!----></div> <div class="form-group svelte-19snr28">`);
				CustomDatePicker($$renderer, {
					id: "preferredDate",
					value: formData.preferredDate,
					onchange: (v) => formData.preferredDate = v
				});
				$$renderer.push(`<!----></div></div>`);
			} else {
				$$renderer.push(`<!--[-1--><div class="form-group svelte-19snr28">`);
				CustomSelect($$renderer, {
					id: "consultationTopic",
					value: formData.consultationTopic,
					options: selectedDetailItems(),
					placeholder: selectedDetailPlaceholder(),
					onchange: (v) => formData.consultationTopic = v
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="form-group svelte-19snr28"><label for="message" class="form-label svelte-19snr28">${escape_html(messageLabel)} <span class="required svelte-19snr28">*</span></label> <textarea id="message" required="" rows="5" class="form-textarea svelte-19snr28"${attr("placeholder", messagePlaceholder)}>`);
		const $$body = escape_html(formData.message);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></div> `);
		if (turnstileSiteKey) {
			$$renderer.push(`<!--[0--><div class="turnstile-section svelte-19snr28"><div class="turnstile-header svelte-19snr28">`);
			Shield_check($$renderer, { class: "w-5 h-5 text-[var(--color-gray-500)]" });
			$$renderer.push(`<!----> <span class="turnstile-label svelte-19snr28">${escape_html(verificationLabel)}</span></div> <div${attr_class(`turnstile-wrapper ${turnstileVerified ? "verified" : ""} ${turnstileError ? "error" : ""}`, "svelte-19snr28")}>`);
			Turnstile($$renderer, {
				sitekey: turnstileSiteKey,
				theme: turnstileTheme,
				size: turnstileSize,
				onVerify: handleTurnstileVerify,
				onError: handleTurnstileError,
				onExpire: handleTurnstileExpire
			});
			$$renderer.push(`<!----> `);
			if (turnstileVerified) {
				$$renderer.push(`<!--[0--><p class="turnstile-status verified svelte-19snr28">`);
				Shield_check($$renderer, { class: "w-4 h-4" });
				$$renderer.push(`<!----> ${escape_html(verifiedLabel)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (turnstileError) {
				$$renderer.push(`<!--[0--><p class="turnstile-status error svelte-19snr28">`);
				Circle_alert($$renderer, { class: "w-4 h-4" });
				$$renderer.push(`<!----> ${escape_html(turnstileError)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="form-footer svelte-19snr28"><button type="submit"${attr("disabled", !turnstileVerified, true)} class="submit-btn svelte-19snr28">`);
		$$renderer.push(`<!--[-1-->${escape_html(sendLabel)} `);
		Send($$renderer, {
			class: "w-5 h-5",
			"aria-hidden": "true"
		});
		$$renderer.push(`<!---->`);
		$$renderer.push(`<!--]--></button> `);
		if (!turnstileVerified && true) $$renderer.push(`<!--[0--><p class="verification-hint svelte-19snr28">${escape_html(turnstileRequiredLabel)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></form></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/content/ContactFAQ.svelte
function ContactFAQ($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { badge = "FAQ", title = "Frequently Asked Questions", subtitle = "", faqItems = [], helpTitle = "Still have questions?", helpDesc = "Our team is here to help you with any inquiries.", emailLabel = "Send us an email", whatsappLabel = "Chat on WhatsApp", siteEmail = "", siteWhatsApp = "" } = $$props;
		let openFaqIndex = null;
		$$renderer.push(`<section class="py-10 lg:py-16 faq-section svelte-syrf7p" aria-labelledby="faq-heading"><div class="faq-bg svelte-syrf7p" aria-hidden="true"><div class="gradient-orb orb-1 svelte-syrf7p"></div> <div class="gradient-orb orb-2 svelte-syrf7p"></div> <div class="gradient-orb orb-3 svelte-syrf7p"></div> <div class="faq-grid-pattern svelte-syrf7p"></div></div> <div class="container-base relative z-10 svelte-syrf7p"><div class="text-center max-w-3xl mx-auto mb-16 svelte-syrf7p">`);
		ScrollReveal($$renderer, {
			animation: "fly-up",
			delay: 100,
			children: ($$renderer) => {
				$$renderer.push(`<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-[var(--color-secondary)]/50 mb-6 badge-animate svelte-syrf7p">`);
				Message_circle($$renderer, { class: "w-4 h-4 text-[var(--color-secondary)]" });
				$$renderer.push(`<!----> <span class="text-sm font-medium text-[#ffffff] svelte-syrf7p">${escape_html(badge)}</span></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			animation: "fly-up",
			delay: 200,
			children: ($$renderer) => {
				$$renderer.push(`<h2 id="faq-heading" class="faq-heading svelte-syrf7p"><span class="svelte-syrf7p">${escape_html(title.split(" ").slice(0, 2).join(" "))}</span> <span class="faq-heading-gradient svelte-syrf7p">${escape_html(title.split(" ").slice(2).join(" "))}</span></h2>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		if (subtitle) {
			$$renderer.push("<!--[0-->");
			ScrollReveal($$renderer, {
				animation: "fly-up",
				delay: 300,
				children: ($$renderer) => {
					$$renderer.push(`<p class="faq-description svelte-syrf7p">${escape_html(subtitle)}</p>`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="faq-container svelte-syrf7p"><!--[-->`);
		const each_array = ensure_array_like(faqItems);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let faq = each_array[index];
			ScrollReveal($$renderer, {
				animation: "fly-up",
				delay: 100 * (index + 1),
				children: ($$renderer) => {
					$$renderer.push(`<div${attr_class("faq-item svelte-syrf7p", void 0, { "open": openFaqIndex === index })}${attr_style(`--index: ${stringify(index)}`)}><button${attr_class("faq-question svelte-syrf7p", void 0, { "open": openFaqIndex === index })}${attr("aria-expanded", openFaqIndex === index)}><div class="faq-question-content svelte-syrf7p"><div class="faq-number svelte-syrf7p">${escape_html(String(index + 1).padStart(2, "0"))}</div> <span class="faq-question-text svelte-syrf7p">${escape_html(faq.question)}</span></div> <div class="faq-icon-wrapper svelte-syrf7p">`);
					Chevron_down($$renderer, { class: "w-5 h-5" });
					$$renderer.push(`<!----></div></button> <div${attr_class("faq-answer-wrapper svelte-syrf7p", void 0, { "open": openFaqIndex === index })}><div class="faq-answer svelte-syrf7p"><div class="faq-answer-indicator svelte-syrf7p"></div> <p class="faq-answer-text svelte-syrf7p">${escape_html(faq.answer)}</p></div></div></div>`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div> `);
		ScrollReveal($$renderer, {
			animation: "fly-up",
			delay: 400,
			children: ($$renderer) => {
				$$renderer.push(`<div class="text-center mt-16 faq-cta svelte-syrf7p"><div class="faq-cta-card svelte-syrf7p"><div class="faq-cta-icon svelte-syrf7p">`);
				Headphones($$renderer, { class: "w-8 h-8" });
				$$renderer.push(`<!----></div> <h3 class="faq-cta-title svelte-syrf7p">${escape_html(helpTitle)}</h3> <p class="faq-cta-text svelte-syrf7p">${escape_html(helpDesc)}</p> <div class="faq-cta-buttons svelte-syrf7p">`);
				if (siteEmail) {
					$$renderer.push(`<!--[0--><a${attr("href", `mailto:${stringify(siteEmail)}`)} class="faq-cta-btn primary svelte-syrf7p">`);
					Mail($$renderer, { class: "w-5 h-5" });
					$$renderer.push(`<!----> ${escape_html(emailLabel)}</a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (siteWhatsApp) {
					$$renderer.push(`<!--[0--><a${attr("href", `https://wa.me/${stringify(siteWhatsApp)}`)} target="_blank" rel="noopener noreferrer" class="faq-cta-btn secondary svelte-syrf7p">`);
					Message_circle($$renderer, { class: "w-5 h-5" });
					$$renderer.push(`<!----> ${escape_html(whatsappLabel)}</a>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></section>`);
	});
}
//#endregion
//#region src/routes/[lang]/contact/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const TURNSTILE_SITE_KEY = PUBLIC_TURNSTILE_SITE_KEY;
		const webPageSchema = derived(() => generateWebPageSchema(data.contactPage?.seo?.title?.[data.locale] || data.contactPage?.seo?.title?.en || "Contact", data.contactPage?.seo?.description?.[data.locale] || data.contactPage?.seo?.description?.en || "", "/contact"));
		const breadcrumbs = derived(() => [{
			name: data.homeLabel || "Home",
			url: "/"
		}, {
			name: data.contactPage?.seo?.title || "Contact",
			url: "/contact"
		}]);
		const inquiryTypes = derived(() => {
			const defaultTypes = [
				{
					value: "hardware",
					label: "Infrastructure & Networking",
					icon: Cpu,
					description: "Server, network, CCTV, and hardware",
					gradient: "from-blue-500 to-cyan-500"
				},
				{
					value: "software",
					label: "Software Development",
					icon: Code,
					description: "Web, mobile, ERP, and custom software",
					gradient: "from-purple-500 to-pink-500"
				},
				{
					value: "consultation",
					label: "IT Consulting & Training",
					icon: Message_square,
					description: "IT strategy, training, and advisory",
					gradient: "from-emerald-500 to-teal-500"
				}
			];
			const iconMap = {
				software: Code,
				infrastructure: Server,
				cloud: Cloud,
				design: Palette,
				printing: Megaphone,
				consultation: Headphones,
				hardware: Cpu
			};
			const gradientMap = {
				software: "from-purple-500 to-pink-500",
				infrastructure: "from-blue-500 to-cyan-500",
				cloud: "from-indigo-500 to-blue-500",
				design: "from-fuchsia-500 to-rose-500",
				printing: "from-orange-500 to-amber-500",
				consultation: "from-emerald-500 to-teal-500",
				hardware: "from-blue-500 to-cyan-500"
			};
			const fromCms = (data.contactPage?.form?.inquiryTypeItems || []).map((item) => ({
				value: item.value,
				label: item.label,
				icon: iconMap[item.value] || Message_square,
				description: item.description || item.label,
				gradient: gradientMap[item.value] || "from-gray-500 to-slate-500",
				detailLabel: item.detailLabel,
				detailPlaceholder: item.detailPlaceholder,
				detailItems: item.detailItems || []
			}));
			return fromCms.length > 0 ? fromCms : defaultTypes;
		});
		const faqItems = derived(() => (data.contactPage?.faq?.faqItems || []).map((item) => ({
			_key: item._key,
			question: item.question,
			answer: item.answer
		})));
		async function handleFormSubmit(formData, token) {
			const inquiryTypeMap = {
				hardware: "Hardware",
				software: "Software",
				infrastructure: "Infrastructure",
				cloud: "Cloud",
				design: "Design",
				printing: "Printing",
				consultation: "Consultation"
			};
			function getSelectedLabel(value, options) {
				return options.find((opt) => opt.value === value)?.label || value;
			}
			const selectedDetailItems = inquiryTypes().find((type) => type.value === formData.inquiryType)?.detailItems || [];
			const payload = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone || void 0,
				inquiryType: inquiryTypeMap[formData.inquiryType] || "Consultation",
				message: formData.message,
				...formData.inquiryType === "consultation" && {
					timeline: formData.preferredDate || void 0,
					consultationTopic: formData.consultationTopic ? getSelectedLabel(formData.consultationTopic, selectedDetailItems) : void 0
				},
				...formData.inquiryType !== "consultation" && { consultationTopic: formData.consultationTopic ? getSelectedLabel(formData.consultationTopic, selectedDetailItems) : void 0 },
				turnstile_token: token
			};
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			if (!response.ok || !result.success) throw new Error(result.message || "Failed to submit form");
			return result;
		}
		SEO($$renderer, {
			title: data.contactPage?.seo?.title,
			description: data.contactPage?.seo?.description,
			image: data.information?.siteLogo?.asset?.url,
			imageAlt: data.information?.siteLogo?.alt || data.contactPage?.seo?.title,
			siteIcon: data.information?.siteIcon?.asset?.url,
			locale: data.locale,
			breadcrumbs: breadcrumbs(),
			jsonLd: [webPageSchema()]
		});
		$$renderer.push(`<!----> `);
		PageHero($$renderer, {
			badge: data.contactPage?.hero?.badge,
			title: data.contactPage?.hero?.title,
			subtitle: data.contactPage?.hero?.subtitle,
			email: data.information?.siteEmail,
			telp: data.information?.siteTelp,
			whatsapp: data.information?.siteWhatsApp,
			emailLabel: data.contactPage?.hero?.email,
			telpLabel: data.contactPage?.hero?.telp,
			whatsappLabel: data.contactPage?.hero?.whatsapp,
			locale: data.locale,
			breadcrumbs: breadcrumbs()
		});
		$$renderer.push(`<!----> <section class="py-10 lg:py-16 bg-white contact-main svelte-1h69t8k" aria-labelledby="contact-form-heading"><div class="container-base svelte-1h69t8k"><div class="grid lg:grid-cols-5 gap-12 lg:gap-16 svelte-1h69t8k"><div class="lg:col-span-3 svelte-1h69t8k">`);
		ContactForm($$renderer, {
			formTitle: data.contactPage?.form?.title,
			formSubtitle: data.contactPage?.form?.subtitle,
			nameLabel: data.contactPage?.form?.name,
			namePlaceholder: data.contactPage?.form?.namePlaceholder,
			emailLabel: data.contactPage?.form?.email,
			emailPlaceholder: data.contactPage?.form?.emailPlaceholder,
			phoneLabel: data.contactPage?.form?.phone,
			phonePlaceholder: data.contactPage?.form?.phonePlaceholder,
			typeLabel: data.contactPage?.form?.type,
			inquiryTypes: inquiryTypes(),
			consultationTopicLabel: data.contactPage?.form?.type,
			consultationTopicPlaceholder: data.contactPage?.form?.type,
			messageLabel: data.contactPage?.form?.message,
			messagePlaceholder: data.contactPage?.form?.messagePlaceholder,
			verificationLabel: data.contactPage?.form?.verification,
			verifiedLabel: data.contactPage?.form?.verified,
			turnstileRequiredLabel: data.contactPage?.form?.turnstileRequired,
			sendingLabel: data.contactPage?.form?.sending,
			sendLabel: data.contactPage?.form?.send,
			successTitle: data.contactPage?.form?.successTitle,
			successDesc: data.contactPage?.form?.successDesc,
			errorTitle: data.contactPage?.form?.errorTitle,
			turnstileSiteKey: TURNSTILE_SITE_KEY,
			locale: data.locale,
			onSubmit: handleFormSubmit
		});
		$$renderer.push(`<!----></div> <aside class="lg:col-span-2 svelte-1h69t8k"><div class="sidebar-content svelte-1h69t8k">`);
		ContactCard($$renderer, {
			email: data.information?.siteEmail,
			phone: data.information?.siteTelp,
			address: data.information?.siteAddress,
			emailLabel: data.contactPage?.info?.emailUs,
			phoneLabel: data.contactPage?.info?.callUs,
			addressLabel: data.contactPage?.info?.visit,
			title: data.contactPage?.info?.contactInfo
		});
		$$renderer.push(`<!----> <div class="support-card svelte-1h69t8k"><div class="support-icon-wrapper svelte-1h69t8k"><div class="support-icon-bg svelte-1h69t8k"></div> <div class="support-icon svelte-1h69t8k"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 svelte-1h69t8k"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" class="svelte-1h69t8k"></path></svg></div></div> <h4 class="support-title svelte-1h69t8k">${escape_html(data.contactPage?.info?.needHelp)}</h4> <p class="support-text svelte-1h69t8k">${escape_html(data.contactPage?.info?.helpDesc)}</p> <a${attr("href", `https://wa.me/${stringify(data.information?.siteWhatsApp)}`)} target="_blank" rel="noopener noreferrer" class="support-btn svelte-1h69t8k"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 svelte-1h69t8k"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" class="svelte-1h69t8k"></path></svg> <span class="svelte-1h69t8k">${escape_html(data.contactPage?.info?.chatWhatsApp)}</span></a></div></div></aside></div></div></section> `);
		ContactFAQ($$renderer, {
			badge: data.contactPage?.faq?.badge,
			title: data.contactPage?.faq?.title,
			subtitle: data.contactPage?.faq?.subtitle,
			faqItems: faqItems(),
			helpTitle: data.contactPage?.faq?.helpTitle,
			helpDesc: data.contactPage?.faq?.helpDesc,
			emailLabel: data.contactPage?.faq?.email,
			whatsappLabel: data.contactPage?.faq?.whatsapp,
			siteEmail: data.information?.siteEmail,
			siteWhatsApp: data.information?.siteWhatsApp
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
