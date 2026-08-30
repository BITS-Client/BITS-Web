import { C as escape_html, a as attr_class, d as ensure_array_like, g as stringify, l as derived, m as spread_props, o as attr_style, x as attr } from "../../../../chunks/index-server.js";
import { n as urlFor } from "../../../../chunks/client.js";
import { i as generateOrganizationSchema, s as generateWebPageSchema } from "../../../../chunks/seo.js";
import { r as resolvePath } from "../../../../chunks/routing.js";
import { a as Youtube, o as Instagram, s as Github } from "../../../../chunks/lucide.js";
import { d as Clock, f as Award, i as Users, t as getIconComponent } from "../../../../chunks/icons.js";
import { a as Heart, o as Globe } from "../../../../chunks/trending-up.js";
import { t as Arrow_right } from "../../../../chunks/arrow-right.js";
import { r as Circle_check_big } from "../../../../chunks/map-pin.js";
import { n as Star, t as Zap } from "../../../../chunks/zap.js";
import { t as Sparkles } from "../../../../chunks/sparkles.js";
import { t as SEO } from "../../../../chunks/SEO2.js";
import { t as Background } from "../../../../chunks/Background.js";
import { t as Breadcrumb } from "../../../../chunks/Breadcrumb.js";
import { t as WaveHeader } from "../../../../chunks/WaveHeader.js";
//#region src/lib/components/ui/hero/AboutHero.svelte
function AboutHero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { badge = "", title = "", subtitle = "", contactLabel = "Contact Us", portfolioLabel = "Portfolio", contactUrl = "/contact", portfolioUrl = "/portfolio", experienceLabel = "", experienceValue = "", clientLabel = "", clientValue = "", projectLabel = "", projectValue = "", breadcrumbs = [], locale = "id" } = $$props;
		const titleMain = derived(() => title.split(" ").slice(0, 2).join(" "));
		const titleAccent = derived(() => title.split(" ").slice(2).join(" "));
		const normalizedExperienceValue = derived(() => typeof experienceValue === "string" ? experienceValue : "");
		const experienceDigits = derived(() => normalizedExperienceValue().replace(/\D/g, ""));
		const experienceSuffix = derived(() => normalizedExperienceValue().replace(/\d/g, ""));
		$$renderer.push(`<section class="about-hero svelte-z2shut"><div class="hero-bg svelte-z2shut" aria-hidden="true"><div class="gradient-mesh svelte-z2shut"><div class="mesh-orb mesh-1 svelte-z2shut"></div> <div class="mesh-orb mesh-2 svelte-z2shut"></div> <div class="mesh-orb mesh-3 svelte-z2shut"></div> <div class="mesh-orb mesh-4 svelte-z2shut"></div></div> <div class="particles-container svelte-z2shut"><!--[-->`);
		const each_array = ensure_array_like(Array(30));
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			each_array[i];
			$$renderer.push(`<div${attr_class(`particle particle-${stringify(i % 3)}`, "svelte-z2shut")}${attr_style(`--i: ${stringify(i)}`)}></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="stars-container svelte-z2shut"><!--[-->`);
		const each_array_1 = ensure_array_like(Array(15));
		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			each_array_1[i];
			$$renderer.push(`<div class="star svelte-z2shut"${attr_style(`--star-i: ${stringify(i)}`)}></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="grid-pattern svelte-z2shut"></div> <div class="spotlight svelte-z2shut"></div></div> <div class="container-base relative z-10 py-10 lg:py-16 svelte-z2shut">`);
		Breadcrumb($$renderer, {
			items: breadcrumbs,
			class: "mb-8",
			locale
		});
		$$renderer.push(`<!----> <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center svelte-z2shut"><div class="hero-content svelte-z2shut"><div class="badge badge-animate svelte-z2shut">`);
		Sparkles($$renderer, { class: "w-4 h-4" });
		$$renderer.push(`<!----> <span class="text-sm font-medium svelte-z2shut">${escape_html(badge)}</span></div> <h1 class="hero-title svelte-z2shut"><span class="title-line-1 svelte-z2shut">${escape_html(titleMain())}</span> `);
		if (titleAccent()) $$renderer.push(`<!--[0--><span class="title-line-2 svelte-z2shut"><span class="text-gradient svelte-z2shut">${escape_html(titleAccent())}</span></span>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></h1> <p class="hero-subtitle svelte-z2shut">${escape_html(subtitle)}</p> <div class="hero-cta-wrapper svelte-z2shut"><a${attr("href", contactUrl)} class="hero-btn hero-btn-primary svelte-z2shut"><span class="btn-content svelte-z2shut"><span class="svelte-z2shut">${escape_html(contactLabel)}</span></span> <div class="btn-shimmer svelte-z2shut"></div></a> <a${attr("href", portfolioUrl)} class="hero-btn hero-btn-secondary svelte-z2shut"><span class="btn-content svelte-z2shut"><span class="svelte-z2shut">${escape_html(portfolioLabel)}</span></span></a></div></div> <div class="hidden lg:block relative hero-visual svelte-z2shut"><div class="hero-card-3d svelte-z2shut"><div class="card-glow svelte-z2shut"></div> <div class="card-inner svelte-z2shut"><div class="card-front svelte-z2shut"><div class="card-number svelte-z2shut"><!--[-->`);
		const each_array_2 = ensure_array_like(experienceDigits().split(""));
		for (let idx = 0, $$length = each_array_2.length; idx < $$length; idx++) {
			let digit = each_array_2[idx];
			$$renderer.push(`<span class="number-digit svelte-z2shut">${escape_html(digit)}</span>`);
		}
		$$renderer.push(`<!--]--> <span class="number-plus svelte-z2shut">${escape_html(experienceSuffix())}</span></div> <p class="card-label svelte-z2shut">${escape_html(experienceLabel)}</p> <div class="card-decoration svelte-z2shut"><div class="deco-line svelte-z2shut"></div> <div class="deco-circle svelte-z2shut"></div> <div class="deco-line svelte-z2shut"></div></div> <div class="card-stats svelte-z2shut"><div class="stat-mini svelte-z2shut"><span class="stat-value svelte-z2shut">${escape_html(clientValue)}</span> <span class="stat-label svelte-z2shut">${escape_html(clientLabel)}</span></div> <div class="stat-mini svelte-z2shut"><span class="stat-value svelte-z2shut">${escape_html(projectValue)}</span> <span class="stat-label svelte-z2shut">${escape_html(projectLabel)}</span></div></div></div></div></div> <div class="deco-rings svelte-z2shut"><div class="ring ring-1 svelte-z2shut"></div> <div class="ring ring-2 svelte-z2shut"></div> <div class="ring ring-3 svelte-z2shut"></div></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/card/VisionCard.svelte
function VisionCard($$renderer, $$props) {
	let { title = "", description = "", icon = "✦", index = 0, type = "vision" } = $$props;
	$$renderer.push(`<div${attr_class(`${stringify(type)}-card scroll-animate`, "svelte-1wppngw")}${attr_style(`--index: ${stringify(index)};`)}><div class="card-border svelte-1wppngw"></div> <h3 class="card-title text-gradient svelte-1wppngw">${escape_html(title)}</h3> <div class="card-decoration svelte-1wppngw"><span class="deco-line svelte-1wppngw"></span> <span class="deco-icon icon-gradient svelte-1wppngw">${escape_html(icon)}</span> <span class="deco-line svelte-1wppngw"></span></div> <p class="card-text svelte-1wppngw">${escape_html(description)}</p> <div class="card-shine-line svelte-1wppngw"></div></div>`);
}
//#endregion
//#region src/lib/components/ui/section/VisionSection.svelte
function VisionSection($$renderer, $$props) {
	let { badge = "", title = "", subtitle = "", visionTitle = "", visionDesc = "", missionTitle = "", missionDesc = "" } = $$props;
	$$renderer.push(`<section class="mission-vision-section svelte-19ujav2" aria-labelledby="mission-vision-heading">`);
	Background($$renderer, { gradientTheme: "teal" });
	$$renderer.push(`<!----> <div class="container-base relative z-10 py-10 lg:py-16">`);
	WaveHeader($$renderer, {
		badge,
		title,
		subtitle,
		headingId: "mission-vision-heading",
		badgeIcon: Heart
	});
	$$renderer.push(`<!----> <div class="grid md:grid-cols-2 gap-5 lg:gap-6">`);
	VisionCard($$renderer, {
		title: visionTitle,
		description: visionDesc,
		icon: "✦",
		index: 0,
		type: "vision"
	});
	$$renderer.push(`<!----> `);
	VisionCard($$renderer, {
		title: missionTitle,
		description: missionDesc,
		icon: "✦",
		index: 1,
		type: "mission"
	});
	$$renderer.push(`<!----></div></div></section>`);
}
//#endregion
//#region src/lib/components/ui/card/TimelineCard.svelte
function TimelineCard($$renderer, $$props) {
	let { year, title, description, icon: Icon } = $$props;
	$$renderer.push(`<div class="timeline-card scroll-animate svelte-zu66eh"><div class="card-hologram svelte-zu66eh"><div class="holo-grid svelte-zu66eh"></div> <div class="holo-scan svelte-zu66eh"></div></div> <div class="card-layout svelte-zu66eh"><div class="icon-year-group svelte-zu66eh"><div class="card-icon svelte-zu66eh"><div class="icon-energy-field svelte-zu66eh"><div class="energy-ring er-1 svelte-zu66eh"></div></div> <div class="icon-container svelte-zu66eh">`);
	if (Icon) {
		$$renderer.push("<!--[-->");
		Icon($$renderer, { class: "w-5 h-5" });
		$$renderer.push("<!--]-->");
	} else {
		$$renderer.push("<!--[!-->");
		$$renderer.push("<!--]-->");
	}
	$$renderer.push(`</div></div> <span class="card-year svelte-zu66eh">${escape_html(year)}</span></div> <div class="card-content svelte-zu66eh"><h3 class="card-title svelte-zu66eh">${escape_html(title)}</h3> <p class="card-desc svelte-zu66eh">${escape_html(description)}</p></div></div></div>`);
}
//#endregion
//#region src/lib/components/ui/section/TimelineSection.svelte
function TimelineSection($$renderer, $$props) {
	let { badge = "", title = "", subtitle = "", end = "", timeline = [] } = $$props;
	$$renderer.push(`<section class="journey-ultimate svelte-8644bl" aria-labelledby="timeline-heading">`);
	Background($$renderer, { gradientTheme: "coral" });
	$$renderer.push(`<!----> <div class="container-base relative z-10 py-10 lg:py-16 svelte-8644bl">`);
	WaveHeader($$renderer, {
		badge,
		title,
		subtitle,
		headingId: "timeline-heading",
		badgeIcon: Clock
	});
	$$renderer.push(`<!----> <div class="timeline-container svelte-8644bl"><div class="timeline-wrapper svelte-8644bl"><div class="timeline-line svelte-8644bl"></div> <!--[-->`);
	const each_array = ensure_array_like(timeline);
	for (let index = 0, $$length = each_array.length; index < $$length; index++) {
		let item = each_array[index];
		$$renderer.push(`<div${attr_class("timeline-row svelte-8644bl", void 0, { "timeline-row-left": index % 2 === 1 })}><div class="timeline-spacer svelte-8644bl"></div> <div class="timeline-line-dot svelte-8644bl"></div> <div class="timeline-spacer svelte-8644bl"></div> <div class="timeline-content-wrapper svelte-8644bl">`);
		TimelineCard($$renderer, {
			year: item.year,
			title: item.title,
			description: item.description,
			icon: item.icon
		});
		$$renderer.push(`<!----></div></div>`);
	}
	$$renderer.push(`<!--]--> `);
	if (end) {
		$$renderer.push(`<!--[0--><div class="timeline-end-section svelte-8644bl"><div class="timeline-end-glow-bg svelte-8644bl"></div> <div class="timeline-end-icon-wrapper svelte-8644bl"><div class="end-particles svelte-8644bl"><!--[-->`);
		const each_array_1 = ensure_array_like(Array(12));
		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			each_array_1[i];
			$$renderer.push(`<div${attr_class(`particle particle-${stringify(i)}`, "svelte-8644bl")}></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="end-icon-wrapper svelte-8644bl"><svg viewBox="0 0 64 64" class="end-icon svelte-8644bl"><defs class="svelte-8644bl"><linearGradient id="end-gradient-stunning" x1="0%" y1="0%" x2="100%" y2="100%" class="svelte-8644bl"><stop offset="0%" stop-color="#10b981" class="svelte-8644bl"></stop><stop offset="50%" stop-color="#8b5cf6" class="svelte-8644bl"></stop><stop offset="100%" stop-color="#ec4899" class="svelte-8644bl"></stop></linearGradient><filter id="end-glow" class="svelte-8644bl"><feGaussianBlur stdDeviation="2" result="coloredBlur" class="svelte-8644bl"></feGaussianBlur><feMerge class="svelte-8644bl"><feMergeNode in="coloredBlur" class="svelte-8644bl"></feMergeNode><feMergeNode in="SourceGraphic" class="svelte-8644bl"></feMergeNode></feMerge></filter></defs><circle cx="32" cy="32" r="28" fill="none" stroke="url(#end-gradient-stunning)" stroke-width="1.5" filter="url(#end-glow)" class="end-ring-orb svelte-8644bl"></circle><circle cx="32" cy="32" r="20" fill="none" stroke="url(#end-gradient-stunning)" stroke-width="1" opacity="0.6" class="end-ring-orb-2 svelte-8644bl"></circle><circle cx="32" cy="32" r="12" fill="url(#end-gradient-stunning)" class="end-core-stunning svelte-8644bl"></circle><circle cx="32" cy="32" r="7" fill="white" opacity="0.95" class="end-core-inner svelte-8644bl"></circle><path d="M32 6 L32 14 M32 50 L32 58 M6 32 L14 32 M50 32 L58 32" stroke="url(#end-gradient-stunning)" stroke-width="2.5" stroke-linecap="round" class="end-rays-stunning svelte-8644bl"></path><path d="M32 18 L32 23 M32 41 L32 46 M18 32 L23 32 M41 32 L46 32" stroke="url(#end-gradient-stunning)" stroke-width="1.5" stroke-linecap="round" opacity="0.7" class="end-rays-inner svelte-8644bl"></path></svg></div></div> <div class="timeline-end-text-wrapper svelte-8644bl"><div class="timeline-end-card-stunning svelte-8644bl"><div class="card-shine svelte-8644bl"></div> <div class="card-border-glow svelte-8644bl"></div> <span class="end-text-stunning svelte-8644bl">${escape_html(end)}</span> <div class="end-text-glow svelte-8644bl"></div></div></div></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div></div></div></section>`);
}
//#endregion
//#region src/lib/components/ui/card/ValueCard.svelte
function ValueCard($$renderer, $$props) {
	let { title, description, color, icon: Icon, index } = $$props;
	$$renderer.push(`<div class="value-card-new scroll-animate svelte-bj2t4d"${attr_style(`--card-index: ${stringify(index)}`)}><div class="value-border-glow svelte-bj2t4d"></div> <div class="value-glass-card svelte-bj2t4d"><div class="icon-wrapper svelte-bj2t4d"><div class="icon-float svelte-bj2t4d"><div${attr_class(`icon-glow-bg bg-gradient-to-br ${stringify(color)}`, "svelte-bj2t4d")}></div> <div${attr_class(`icon-container bg-gradient-to-br ${stringify(color)}`, "svelte-bj2t4d")}>`);
	if (Icon) {
		$$renderer.push("<!--[-->");
		Icon($$renderer, {
			class: "w-8 h-8 text-white",
			"aria-hidden": "true"
		});
		$$renderer.push("<!--]-->");
	} else {
		$$renderer.push("<!--[!-->");
		$$renderer.push("<!--]-->");
	}
	$$renderer.push(`</div> <div${attr_class(`icon-pulse-ring bg-gradient-to-br ${stringify(color)}`, "svelte-bj2t4d")}></div></div></div> <div class="value-content-new svelte-bj2t4d"><h3 class="value-title-new svelte-bj2t4d">${escape_html(title)}</h3> <p class="value-desc-new svelte-bj2t4d">${escape_html(description)}</p> <div class="value-progress svelte-bj2t4d"><div class="progress-track svelte-bj2t4d"><div${attr_class(`progress-fill bg-gradient-to-r ${stringify(color)}`, "svelte-bj2t4d")}></div></div></div></div> <div class="card-particles svelte-bj2t4d"><!--[-->`);
	const each_array = ensure_array_like(Array(6));
	for (let pi = 0, $$length = each_array.length; pi < $$length; pi++) {
		each_array[pi];
		$$renderer.push(`<div class="card-particle svelte-bj2t4d"${attr_style(`--cp-i: ${stringify(pi)}`)}></div>`);
	}
	$$renderer.push(`<!--]--></div> <div class="value-shine-sweep svelte-bj2t4d"></div></div> <div class="value-number svelte-bj2t4d" style="z-index: 10;">0${escape_html(index + 1)}</div></div>`);
}
//#endregion
//#region src/lib/components/ui/cta/GeneralCTA.svelte
function GeneralCTA($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title = "", subtitle = "", button = "", contactUrl = "/contact", icon = "" } = $$props;
		const CTAIcon = derived(() => getIconComponent(icon) || Users);
		$$renderer.push(`<div class="general-cta-section scroll-animate svelte-1tpedeq"><div class="cta-glass-card svelte-1tpedeq"><div class="cta-content svelte-1tpedeq"><div class="cta-icon-wrapper svelte-1tpedeq">`);
		if (CTAIcon()) {
			$$renderer.push("<!--[-->");
			CTAIcon()($$renderer, { class: "w-8 h-8" });
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(` <div class="cta-icon-ring svelte-1tpedeq"></div></div> <div class="cta-text svelte-1tpedeq"><h3 class="cta-title svelte-1tpedeq">${escape_html(title)}</h3> <p class="cta-desc svelte-1tpedeq">${escape_html(subtitle)}</p></div></div> <a${attr("href", contactUrl)} class="general-cta-btn-new svelte-1tpedeq"><span class="svelte-1tpedeq">${escape_html(button)}</span> `);
		Arrow_right($$renderer, {
			class: "w-5 h-5 cta-arrow",
			style: "transition: transform 0.3s ease"
		});
		$$renderer.push(`<!----> <div class="btn-glow-effect svelte-1tpedeq"></div></a></div></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/section/ValueSection.svelte
function ValueSection($$renderer, $$props) {
	let { badge = "", title = "", subtitle = "", ready = "", readySubtitle = "", connect = "", contactUrl = "/contact", principles = [] } = $$props;
	$$renderer.push(`<section class="values-section-new svelte-flmo9b" aria-labelledby="values-heading">`);
	Background($$renderer, { gradientTheme: "coral" });
	$$renderer.push(`<!----> <div class="container-base relative z-10 py-10 lg:py-16">`);
	WaveHeader($$renderer, {
		badge,
		title,
		subtitle,
		headingId: "values-heading",
		badgeIcon: Sparkles
	});
	$$renderer.push(`<!----> <div class="values-bento-grid svelte-flmo9b"><!--[-->`);
	const each_array = ensure_array_like(principles);
	for (let index = 0, $$length = each_array.length; index < $$length; index++) {
		let item = each_array[index];
		ValueCard($$renderer, {
			title: item.title,
			description: item.description,
			color: item.color,
			icon: item.icon,
			index
		});
	}
	$$renderer.push(`<!--]--></div> `);
	if (ready || connect) {
		$$renderer.push("<!--[0-->");
		GeneralCTA($$renderer, {
			title: ready,
			subtitle: readySubtitle,
			button: connect,
			contactUrl
		});
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div></section>`);
}
//#endregion
//#region src/lib/components/ui/card/TeamCard.svelte
function TeamCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { name = "", role = "", bio = "", image = "", initials = "", index = 0, social = {} } = $$props;
		let isHovered = false;
		$$renderer.push(`<div class="member-card svelte-1a3yqsr"${attr_style(`--index: ${stringify(index)}`)} role="group"><div class="card-inner svelte-1a3yqsr"><div class="avatar-wrapper svelte-1a3yqsr"><div class="avatar-ring svelte-1a3yqsr"></div> <div class="avatar-glow svelte-1a3yqsr"></div> <div class="avatar svelte-1a3yqsr">`);
		if (image) $$renderer.push(`<!--[0--><img${attr("src", image)}${attr("alt", name)} class="avatar-img svelte-1a3yqsr"/>`);
		else $$renderer.push(`<!--[-1--><span class="avatar-fallback svelte-1a3yqsr">${escape_html(initials)}</span>`);
		$$renderer.push(`<!--]--></div></div> <div class="info svelte-1a3yqsr"><h3 class="name svelte-1a3yqsr">${escape_html(name)}</h3> <p class="role svelte-1a3yqsr">${escape_html(role)}</p> `);
		if (bio) $$renderer.push(`<!--[0--><p${attr_class("bio svelte-1a3yqsr", void 0, { "visible": isHovered })}>${escape_html(bio)}</p>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div${attr_class("social-row svelte-1a3yqsr", void 0, { "expanded": isHovered })}>`);
		if (social?.instagram) {
			$$renderer.push(`<!--[0--><a${attr("href", social.instagram)} target="_blank" rel="noopener noreferrer" class="social-btn svelte-1a3yqsr" aria-label="Instagram">`);
			Instagram($$renderer, { size: 16 });
			$$renderer.push(`<!----></a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (social?.github) {
			$$renderer.push(`<!--[0--><a${attr("href", social.github)} target="_blank" rel="noopener noreferrer" class="social-btn svelte-1a3yqsr" aria-label="GitHub">`);
			Github($$renderer, { size: 16 });
			$$renderer.push(`<!----></a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (social?.youtube) {
			$$renderer.push(`<!--[0--><a${attr("href", social.youtube)} target="_blank" rel="noopener noreferrer" class="social-btn svelte-1a3yqsr" aria-label="YouTube">`);
			Youtube($$renderer, { size: 16 });
			$$renderer.push(`<!----></a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="decoration top-left svelte-1a3yqsr"></div> <div class="decoration top-right svelte-1a3yqsr"></div> <div class="decoration bottom-left svelte-1a3yqsr"></div> <div class="decoration bottom-right svelte-1a3yqsr"></div></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/section/TeamSection.svelte
function TeamSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { badge = "", title = "", subtitle = "", teamMembers = [], cta = {} } = $$props;
		$$renderer.push(`<section class="team-section-new svelte-1htj3yr" aria-labelledby="team-heading">`);
		Background($$renderer, { gradientTheme: "monochrome" });
		$$renderer.push(`<!----> <div class="container-base relative z-10 py-10 lg:py-16">`);
		WaveHeader($$renderer, {
			badge,
			title,
			subtitle,
			headingId: "team-heading",
			badgeIcon: Users
		});
		$$renderer.push(`<!----> `);
		if (teamMembers.length > 0) {
			$$renderer.push(`<!--[0--><div class="team-members-grid svelte-1htj3yr"><!--[-->`);
			const each_array = ensure_array_like(teamMembers);
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let member = each_array[index];
				TeamCard($$renderer, spread_props([member, { index }]));
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (cta && (cta.title || cta.button)) {
			$$renderer.push("<!--[0-->");
			GeneralCTA($$renderer, {
				title: cta.title || "",
				subtitle: cta.subtitle || "",
				button: cta.button || "",
				contactUrl: cta.contactUrl || "/contact",
				icon: cta.icon || ""
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section>`);
	});
}
//#endregion
//#region src/routes/[lang]/about/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		const timeline = derived(() => (data.aboutPage?.timeline?.stories || []).map((item) => {
			const iconMap = {
				Star,
				Award,
				Users,
				Zap,
				CheckCircle: Circle_check_big,
				Globe
			};
			return {
				year: item.year,
				title: item.title,
				description: item.description,
				icon: iconMap[item.icon] || Star
			};
		}));
		const principles = derived(() => (data.aboutPage?.principles?.keys || []).map((item, index) => {
			return {
				icon: getIconComponent(item.icon) || Sparkles,
				title: item.title,
				description: item.description,
				color: [
					"from-rose-500 to-pink-500",
					"from-amber-500 to-orange-500",
					"from-cyan-500 to-blue-500",
					"from-emerald-500 to-green-500"
				][index] || "from-gray-500 to-gray-600"
			};
		}));
		const teamMembers = derived(() => (data.teamMembers || []).map((member) => ({
			name: member.name,
			role: member.role,
			bio: member.bio,
			image: member.image ? urlFor(member.image).width(400).height(400).url() : "",
			initials: (member.name || "?").split(" ").map((n) => n[0]).join("").slice(0, 2),
			social: member.social
		})));
		const pageTitle = derived(() => {
			return data.aboutPage?.seo?.title || "About Us";
		});
		const pageDescription = derived(() => {
			return data.aboutPage?.seo?.description || "";
		});
		const breadcrumbs = derived(() => {
			const homeLabel = data.navigation?.items?.find((item) => item.href === "/")?.label || "Home";
			const title = data.aboutPage?.seo?.title || "About Us";
			return [{
				name: homeLabel,
				url: "/"
			}, {
				name: title,
				url: "/about"
			}];
		});
		const organizationSchema = derived(() => generateOrganizationSchema({ logo: data.information?.siteLogo?.asset?.url }));
		const webPageSchema = derived(() => generateWebPageSchema(pageTitle(), pageDescription(), "/about"));
		SEO($$renderer, {
			title: pageTitle(),
			description: pageDescription(),
			image: data.information?.siteLogo?.asset?.url,
			imageAlt: data.information?.siteLogo?.alt || pageTitle(),
			siteIcon: data.information?.siteIcon?.asset?.url,
			locale: data.locale,
			breadcrumbs: breadcrumbs(),
			jsonLd: [organizationSchema(), webPageSchema()]
		});
		$$renderer.push(`<!----> `);
		AboutHero($$renderer, {
			badge: data.aboutPage?.hero?.badge,
			title: data.aboutPage?.hero?.title,
			subtitle: data.aboutPage?.hero?.subtitle,
			contactLabel: data.aboutPage?.hero?.contact,
			portfolioLabel: data.aboutPage?.hero?.portfolio,
			contactUrl: resolve("/contact"),
			portfolioUrl: resolve("/portfolio"),
			experienceLabel: data.aboutPage?.hero?.experience,
			experienceValue: data.aboutPage?.hero?.experienceValue,
			clientLabel: data.aboutPage?.hero?.client,
			clientValue: data.aboutPage?.hero?.clientValue,
			projectLabel: data.aboutPage?.hero?.project,
			projectValue: data.aboutPage?.hero?.projectValue,
			breadcrumbs: breadcrumbs(),
			locale: data.locale
		});
		$$renderer.push(`<!----> `);
		VisionSection($$renderer, {
			badge: data.aboutPage?.vision?.badge,
			title: data.aboutPage?.vision?.title,
			subtitle: data.aboutPage?.vision?.subtitle,
			visionTitle: data.aboutPage?.vision?.visionTitle,
			visionDesc: data.aboutPage?.vision?.visionDesc,
			missionTitle: data.aboutPage?.vision?.missionTitle,
			missionDesc: data.aboutPage?.vision?.missionDesc
		});
		$$renderer.push(`<!----> `);
		TimelineSection($$renderer, {
			badge: data.aboutPage?.timeline?.badge,
			title: data.aboutPage?.timeline?.title,
			subtitle: data.aboutPage?.timeline?.subtitle,
			end: data.aboutPage?.timeline?.end,
			timeline: timeline()
		});
		$$renderer.push(`<!----> `);
		ValueSection($$renderer, {
			badge: data.aboutPage?.principles?.badge,
			title: data.aboutPage?.principles?.title,
			subtitle: data.aboutPage?.principles?.subtitle,
			ready: data.aboutPage?.principles?.ready,
			readySubtitle: data.aboutPage?.principles?.readySubtitle,
			connect: data.aboutPage?.principles?.connect,
			contactUrl: resolve("/contact"),
			principles: principles()
		});
		$$renderer.push(`<!----> `);
		TeamSection($$renderer, {
			badge: data.aboutPage?.teams?.badge,
			title: data.aboutPage?.teams?.title,
			subtitle: data.aboutPage?.teams?.subtitle,
			teamMembers: teamMembers(),
			cta: {
				title: data.aboutPage?.teams?.ctaTitle,
				subtitle: data.aboutPage?.teams?.ctaSubtitle,
				button: data.aboutPage?.teams?.ctaButton,
				icon: data.aboutPage?.teams?.ctaIcon,
				contactUrl: resolve("/contact")
			}
		});
		$$renderer.push(`<!---->`);
	});
}
//#endregion
export { _page as default };
