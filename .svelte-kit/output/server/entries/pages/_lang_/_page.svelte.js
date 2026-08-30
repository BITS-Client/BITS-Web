import { C as escape_html, S as clsx, _ as unsubscribe_stores, a as attr_class, d as ensure_array_like, g as stringify, h as store_get, l as derived, o as attr_style, x as attr } from "../../../chunks/index-server.js";
import { i as generateOrganizationSchema, s as generateWebPageSchema } from "../../../chunks/seo.js";
import { r as resolvePath } from "../../../chunks/routing.js";
import { t as Slack } from "../../../chunks/lucide.js";
import { i as Users, l as Message_square_quote, r as Wallpaper, s as Quote } from "../../../chunks/icons.js";
import { a as Heart, t as Trending_up } from "../../../chunks/trending-up.js";
import { t as Arrow_right } from "../../../chunks/arrow-right.js";
import { t as Trophy } from "../../../chunks/trophy.js";
import { a as Cpu, i as Headphones } from "../../../chunks/shield-check.js";
import { n as Star } from "../../../chunks/zap.js";
import { r as File_text } from "../../../chunks/x.js";
import { t as Sparkles } from "../../../chunks/sparkles.js";
import { t as page } from "../../../chunks/stores.js";
import { t as SEO } from "../../../chunks/SEO2.js";
import { t as FloatingElement } from "../../../chunks/FloatingElement.js";
import { t as ScrollReveal } from "../../../chunks/ScrollReveal.js";
import { t as ServiceCard } from "../../../chunks/ServiceCard.js";
import { t as Background } from "../../../chunks/Background.js";
import { t as GeneralCard } from "../../../chunks/GeneralCard.js";
//#region src/lib/components/ui/header/ShineHeader.svelte
function ShineHeader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const colorMap = {
			primary: {
				bg: "rgba(255, 255, 255, 0.9)",
				border: "rgba(59, 130, 246, 0.3)",
				text: "#2563eb",
				glow: "rgba(59, 130, 246, 0.4)"
			},
			secondary: {
				bg: "rgba(255, 255, 255, 0.9)",
				border: "rgba(34, 197, 94, 0.3)",
				text: "#16a34a",
				glow: "rgba(34, 197, 94, 0.4)"
			},
			success: {
				bg: "rgba(255, 255, 255, 0.9)",
				border: "rgba(16, 185, 129, 0.3)",
				text: "#059669",
				glow: "rgba(16, 185, 129, 0.4)"
			},
			warning: {
				bg: "rgba(255, 255, 255, 0.9)",
				border: "rgba(245, 158, 11, 0.3)",
				text: "#d97706",
				glow: "rgba(245, 158, 11, 0.4)"
			},
			danger: {
				bg: "rgba(255, 255, 255, 0.9)",
				border: "rgba(239, 68, 68, 0.3)",
				text: "#dc2626",
				glow: "rgba(239, 68, 68, 0.4)"
			},
			purple: {
				bg: "rgba(255, 255, 255, 0.9)",
				border: "rgba(139, 92, 246, 0.3)",
				text: "#7c3aed",
				glow: "rgba(139, 92, 246, 0.4)"
			}
		};
		let { badge, badgeIconLeft, badgeIconRight, badgeColor = "primary", badgeTextColor, badgeIconLeftColor, badgeIconRightColor, title, subtitle, class: className = "", animation = "fly-up", animationDelay } = $$props;
		const BadgeIconLeft = derived(() => badgeIconLeft || Trophy);
		const BadgeIconRight = derived(() => badgeIconRight || Sparkles);
		const colors = derived(() => colorMap[badgeColor]);
		const textColor = derived(() => badgeTextColor || colors().text);
		const titleMain = derived(() => title?.split(" ").slice(0, 2).join(" ") || "");
		const titleAccent = derived(() => title?.split(" ").slice(2).join(" ") || "");
		ScrollReveal($$renderer, {
			animation,
			delay: animationDelay,
			children: ($$renderer) => {
				$$renderer.push(`<div${attr_class(`section-header text-center mb-10 lg:mb-16 ${stringify(className)}`, "svelte-1ogkgzb")}>`);
				if (badge) {
					$$renderer.push(`<!--[0--><div class="section-badge-wrapper svelte-1ogkgzb"><div class="section-badge group svelte-1ogkgzb"${attr_style(`--badge-bg: ${stringify(colors().bg)}; --badge-border: ${stringify(colors().border)}; --badge-text: ${stringify(textColor())}; --badge-glow: ${stringify(colors().glow)}`)}><div class="section-badge-ring svelte-1ogkgzb"></div> <div class="section-badge-glow svelte-1ogkgzb"></div> `);
					if (BadgeIconLeft()) {
						$$renderer.push("<!--[-->");
						BadgeIconLeft()($$renderer, {
							class: "w-4 h-4",
							style: `color: ${stringify(badgeIconLeftColor || colors().text)}`
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(` <span class="section-badge-text svelte-1ogkgzb">${escape_html(badge)}</span> `);
					if (BadgeIconRight()) {
						$$renderer.push("<!--[-->");
						BadgeIconRight()($$renderer, {
							class: "w-4 h-4 section-badge-icon",
							style: `color: ${stringify(badgeIconRightColor || colors().text)}`
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(` <div class="section-badge-sparkle section-badge-sparkle-1 svelte-1ogkgzb"></div> <div class="section-badge-sparkle section-badge-sparkle-2 svelte-1ogkgzb"></div> <div class="section-badge-sparkle section-badge-sparkle-3 svelte-1ogkgzb"></div></div></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (title) {
					$$renderer.push(`<!--[0--><h2 class="section-title svelte-1ogkgzb">`);
					if (titleMain()) $$renderer.push(`<!--[0--><span class="section-title-line section-title-line-1 svelte-1ogkgzb">${escape_html(titleMain())}</span>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (titleAccent()) $$renderer.push(`<!--[0--><span class="section-title-highlight svelte-1ogkgzb"><span class="section-title-gradient svelte-1ogkgzb">${escape_html(titleAccent())}</span> <span class="section-title-underline svelte-1ogkgzb"></span></span>`);
					else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></h2>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (subtitle) $$renderer.push(`<!--[0--><p class="section-subtitle svelte-1ogkgzb">${escape_html(subtitle)}</p>`);
				else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <div class="section-header-line svelte-1ogkgzb"><div class="section-header-line-inner svelte-1ogkgzb"></div></div></div>`);
			},
			$$slots: { default: true }
		});
	});
}
//#endregion
//#region src/lib/components/ui/hero/HomeHero.svelte
function HomeHero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { locale, homePage, information } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		$$renderer.push(`<section class="hero-section relative min-h-screen flex items-center justify-center overflow-hidden svelte-cg3z7t"><div class="hero-bg-container svelte-cg3z7t" aria-hidden="true"><div class="hero-base-gradient svelte-cg3z7t"></div> <div class="hero-noise-overlay svelte-cg3z7t"></div> <div class="hero-cyber-grid svelte-cg3z7t"></div> <div class="hero-aurora svelte-cg3z7t"><div class="hero-aurora-band hero-aurora-1 svelte-cg3z7t"></div> <div class="hero-aurora-band hero-aurora-2 svelte-cg3z7t"></div> <div class="hero-aurora-band hero-aurora-3 svelte-cg3z7t"></div> <div class="hero-aurora-band hero-aurora-4 svelte-cg3z7t"></div></div> <div class="hero-orb hero-orb-1 svelte-cg3z7t"></div> <div class="hero-orb hero-orb-2 svelte-cg3z7t"></div> <div class="hero-orb hero-orb-3 svelte-cg3z7t"></div> <div class="hero-orb hero-orb-4 svelte-cg3z7t"></div> <div class="hero-orb hero-orb-5 svelte-cg3z7t"></div> <div class="hero-blob hero-blob-1 svelte-cg3z7t"></div> <div class="hero-blob hero-blob-2 svelte-cg3z7t"></div> <div class="hero-blob hero-blob-3 svelte-cg3z7t"></div> <div class="hero-mesh-grid svelte-cg3z7t"></div> <div class="hero-light-rays svelte-cg3z7t"><div class="hero-ray hero-ray-1 svelte-cg3z7t"></div> <div class="hero-ray hero-ray-2 svelte-cg3z7t"></div> <div class="hero-ray hero-ray-3 svelte-cg3z7t"></div> <div class="hero-ray hero-ray-4 svelte-cg3z7t"></div></div> <div class="hero-particles svelte-cg3z7t"><!--[-->`);
		const each_array = ensure_array_like(Array.from({ length: 40 }, (_, i) => i));
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let i = each_array[$$index];
			$$renderer.push(`<div class="hero-particle svelte-cg3z7t"${attr_style(`--delay: ${stringify(i * .2)}s; --x: ${stringify(2 + Math.random() * 96)}%; --duration: ${stringify(3 + Math.random() * 5)}s; --size: ${stringify(1 + Math.random() * 4)}px; --drift: ${stringify(-40 + Math.random() * 80)}px; --opacity: ${stringify(.3 + Math.random() * .7)};`)}></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="hero-orbital-container svelte-cg3z7t"><div class="hero-orbital hero-orbital-1 svelte-cg3z7t"></div> <div class="hero-orbital hero-orbital-2 svelte-cg3z7t"></div> <div class="hero-orbital hero-orbital-3 svelte-cg3z7t"></div></div> `);
		FloatingElement($$renderer, {
			duration: 4e3,
			delay: 0,
			amplitude: 20,
			children: ($$renderer) => {
				$$renderer.push(`<div class="hero-shape hero-shape-triangle svelte-cg3z7t"></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		FloatingElement($$renderer, {
			duration: 5e3,
			delay: 500,
			amplitude: 25,
			children: ($$renderer) => {
				$$renderer.push(`<div class="hero-shape hero-shape-circle svelte-cg3z7t"></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		FloatingElement($$renderer, {
			duration: 4500,
			delay: 1e3,
			amplitude: 22,
			children: ($$renderer) => {
				$$renderer.push(`<div class="hero-shape hero-shape-square svelte-cg3z7t"></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		FloatingElement($$renderer, {
			duration: 3500,
			delay: 1500,
			amplitude: 15,
			children: ($$renderer) => {
				$$renderer.push(`<div class="hero-shape hero-shape-hexagon svelte-cg3z7t"></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		FloatingElement($$renderer, {
			duration: 6e3,
			delay: 800,
			amplitude: 30,
			children: ($$renderer) => {
				$$renderer.push(`<div class="hero-shape hero-shape-diamond svelte-cg3z7t"></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		FloatingElement($$renderer, {
			duration: 5500,
			delay: 1200,
			amplitude: 18,
			children: ($$renderer) => {
				$$renderer.push(`<div class="hero-shape hero-shape-cross svelte-cg3z7t"></div>`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <div class="hero-vignette svelte-cg3z7t"></div></div> <div class="container-base relative py-10 lg:py-16 z-10 svelte-cg3z7t"><div class="max-w-5xl mx-auto text-center svelte-cg3z7t">`);
		ShineHeader($$renderer, {
			badge: information?.siteTitle,
			badgeIconLeft: Slack,
			badgeIconRight: Sparkles,
			badgeColor: "success",
			title: homePage?.hero?.title,
			subtitle: homePage?.hero?.subtitle,
			class: "home-hero-header",
			animation: "fly-up",
			animationDelay: 100
		});
		$$renderer.push(`<!----> <div class="flex flex-col sm:flex-row items-center justify-center gap-6 svelte-cg3z7t"><a${attr("href", resolve(homePage?.hero?.ctaLink || "#"))} class="hero-cta-primary group svelte-cg3z7t"><span class="relative z-10 svelte-cg3z7t">${escape_html(homePage?.hero?.cta)}</span></a> <a${attr("href", resolve(homePage?.hero?.viewWorkLink || "#"))} class="hero-cta-secondary svelte-cg3z7t"><span class="relative z-10 svelte-cg3z7t">${escape_html(homePage?.hero?.viewWork)}</span></a></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/misc/FloatingIcon.svelte
function FloatingIcon($$renderer, $$props) {
	const colorMap = {
		primary: {
			bg: "rgba(59, 130, 246, 0.1)",
			border: "rgba(59, 130, 246, 0.2)",
			text: "#3b82f6"
		},
		secondary: {
			bg: "rgba(34, 197, 94, 0.1)",
			border: "rgba(34, 197, 94, 0.2)",
			text: "#22c55e"
		},
		success: {
			bg: "rgba(16, 185, 129, 0.1)",
			border: "rgba(16, 185, 129, 0.2)",
			text: "#10b981"
		},
		warning: {
			bg: "rgba(245, 158, 11, 0.1)",
			border: "rgba(245, 158, 11, 0.2)",
			text: "#f59e0b"
		},
		danger: {
			bg: "rgba(239, 68, 68, 0.1)",
			border: "rgba(239, 68, 68, 0.2)",
			text: "#ef4444"
		},
		purple: {
			bg: "rgba(139, 92, 246, 0.1)",
			border: "rgba(139, 92, 246, 0.2)",
			text: "#8b5cf6"
		}
	};
	let { class: className = "", icon: Icon, variant = "icon", color = "purple", duration = 4500, amplitude = 25 } = $$props;
	const colors = derived(() => colorMap[color]);
	FloatingElement($$renderer, {
		class: className,
		duration,
		amplitude,
		children: ($$renderer) => {
			if (variant === "icon" && Icon) {
				$$renderer.push(`<!--[0--><div class="section-float-icon svelte-9h98c5"${attr_style(`--float-bg: ${stringify(colors().bg)}; --float-border: ${stringify(colors().border)}; --float-color: ${stringify(colors().text)}`)}>`);
				if (Icon) {
					$$renderer.push("<!--[-->");
					Icon($$renderer, { class: "w-8 h-8" });
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(`</div>`);
			} else if (variant === "dots") $$renderer.push(`<!--[1--><div class="section-float-dots svelte-9h98c5"${attr_style(`--float-bg: ${stringify(colors().bg)}; --float-color: ${stringify(colors().text)}`)}><span class="svelte-9h98c5"></span> <span class="svelte-9h98c5"></span> <span class="svelte-9h98c5"></span></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		},
		$$slots: { default: true }
	});
}
//#endregion
//#region src/lib/components/ui/section/ServicesSection.svelte
function ServicesSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { locale, services, servicesSection } = $$props;
		$$renderer.push(`<section id="services-section" class="services-section relative py-10 lg:py-16 overflow-hidden svelte-1xuvmum" aria-labelledby="services-heading">`);
		Background($$renderer, { gradientTheme: "teal" });
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-20 left-[8%] hidden lg:block",
			icon: Wallpaper,
			variant: "icon",
			duration: 5e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-20 right-[8%] hidden lg:block",
			icon: Sparkles,
			variant: "icon",
			color: "success",
			duration: 5e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> <div class="services-container relative z-10 svelte-1xuvmum">`);
		ShineHeader($$renderer, {
			badge: servicesSection?.badge,
			badgeIconLeft: Wallpaper,
			badgeIconRight: Sparkles,
			badgeColor: "primary",
			title: servicesSection?.title,
			subtitle: servicesSection?.subtitle
		});
		$$renderer.push(`<!----> <div class="services-grid svelte-1xuvmum"><!--[-->`);
		const each_array = ensure_array_like(services);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let service = each_array[index];
			ScrollReveal($$renderer, {
				animation: "scale",
				delay: 200 + index * 80,
				children: ($$renderer) => {
					ServiceCard($$renderer, {
						service,
						index,
						locale
					});
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/cta/MoreCTA.svelte
function MoreCTA($$renderer, $$props) {
	let { linkText, href = "#", class: className = "", onclick } = $$props;
	if (linkText) {
		$$renderer.push(`<!--[0--><div${attr_class(`section-view-all ${stringify(className)}`, "svelte-a7byd3")}><a${attr("href", href)} class="section-view-all-link svelte-a7byd3">${escape_html(linkText)} `);
		Arrow_right($$renderer, { class: "w-4 h-4" });
		$$renderer.push(`<!----></a></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region src/lib/components/ui/section/PortfolioSection.svelte
function PortfolioSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { locale, portfolioItems, portfolioSection } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		function mapToProject(item, _index) {
			return {
				slug: item.href.split("/").pop() || "",
				title: item.title,
				client: item.client,
				clientIcon: item.clientIcon,
				description: item.description,
				image: item.image,
				category: item.category ? item.category.toLowerCase() : "",
				techStack: item.tech,
				featured: false,
				year: item.year
			};
		}
		$$renderer.push(`<section class="portfolio-section relative py-10 lg:py-16 overflow-hidden svelte-4sjz3s" aria-labelledby="portfolio-heading">`);
		Background($$renderer, { gradientTheme: "coral" });
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-20 left-[8%] hidden lg:block",
			icon: Trophy,
			variant: "icon",
			duration: 5e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-20 right-[8%] hidden lg:block",
			icon: Sparkles,
			variant: "icon",
			color: "purple",
			duration: 5e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> <div class="portfolio-container relative z-10 svelte-4sjz3s">`);
		ShineHeader($$renderer, {
			badge: portfolioSection?.badge,
			badgeIconLeft: Trophy,
			badgeIconRight: Sparkles,
			badgeColor: "success",
			title: portfolioSection?.title,
			subtitle: portfolioSection?.subtitle
		});
		$$renderer.push(`<!----> <div class="portfolio-grid svelte-4sjz3s">`);
		if (portfolioItems.length === 0) $$renderer.push(`<!--[0--><div class="text-center py-10 text-gray-500"><p>No projects found.</p></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <!--[-->`);
		const each_array = ensure_array_like(portfolioItems);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let item = each_array[index];
			ScrollReveal($$renderer, {
				animation: "scale",
				delay: 200 + index * 50,
				children: ($$renderer) => {
					GeneralCard($$renderer, {
						project: mapToProject(item, index),
						categoryLabel: item.category,
						index,
						locale,
						color: item.color,
						type: "portfolio"
					});
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div> `);
		MoreCTA($$renderer, {
			linkText: portfolioSection?.viewAllProject,
			href: resolve(portfolioSection?.viewAllProjectLink || "/portfolio")
		});
		$$renderer.push(`<!----></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/section/BlogSection.svelte
function BlogSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { locale, posts, blogSection } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		function mapPostToProject(post, _index) {
			return {
				slug: post.slug?.current || "",
				title: post.title || "",
				client: post.author?.name || "BITS",
				clientIcon: post.author?.avatarUrl || "",
				description: post.seo?.description || "",
				image: post.imageUrl || "",
				category: post.category?.slug?.current || "blog",
				techStack: post.tags || [],
				featured: false,
				year: post.publishedAt ? new Date(post.publishedAt).getFullYear().toString() : ""
			};
		}
		$$renderer.push(`<section class="blog-section relative py-10 lg:py-16 overflow-hidden svelte-1270se2" aria-labelledby="blog-heading">`);
		Background($$renderer, { gradientTheme: "violet" });
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-24 left-[5%] hidden lg:block",
			icon: File_text,
			variant: "icon",
			duration: 4500,
			amplitude: 25
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-32 right-[8%] hidden lg:block",
			icon: Sparkles,
			variant: "icon",
			color: "warning",
			duration: 5e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> <div class="blog-container relative z-10 svelte-1270se2">`);
		ShineHeader($$renderer, {
			badge: blogSection?.badge,
			badgeIconLeft: File_text,
			badgeIconRight: Sparkles,
			badgeColor: "warning",
			title: blogSection?.title,
			subtitle: blogSection?.subtitle
		});
		$$renderer.push(`<!----> <div class="blog-grid svelte-1270se2"><!--[-->`);
		const each_array = ensure_array_like(posts);
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let post = each_array[index];
			ScrollReveal($$renderer, {
				animation: "scale",
				delay: 200 + index * 50,
				children: ($$renderer) => {
					GeneralCard($$renderer, {
						project: mapPostToProject(post, index),
						categoryLabel: post.category && post.category.title ? (typeof post.category.title === "object" ? post.category.title[locale] : post.category.title) || "Blog" : "Blog",
						index,
						locale,
						color: "from-blue-500 to-purple-500",
						type: "blog"
					});
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--></div> `);
		MoreCTA($$renderer, {
			linkText: blogSection?.viewAllPosts,
			href: resolve(blogSection?.viewAllPostsLink || "/blog")
		});
		$$renderer.push(`<!----></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/card/TestimonialCard.svelte
function TestimonialCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { testimonial, locale, _index } = $$props;
		function resolve(path) {
			return resolvePath(path, locale);
		}
		$$renderer.push(`<div class="testimonial-card svelte-soltaz"><div class="testimonial-card-bg-glow"></div> <div class="testimonial-card-holographic"></div> <div class="testimonial-card-glow"></div> <div class="testimonial-card-border"></div> <div class="testimonial-card-shine"></div> <div class="testimonial-card-inner svelte-soltaz"><div class="testimonial-bubble-accent svelte-soltaz"></div> <div class="testimonial-content svelte-soltaz"><p class="testimonial-message svelte-soltaz">"${escape_html(testimonial.content)}"</p></div> <div class="testimonial-author svelte-soltaz">`);
		if (testimonial.clientIcon) $$renderer.push(`<!--[0--><img${attr("src", testimonial.clientIcon)}${attr("alt", testimonial.name)} class="testimonial-client-icon svelte-soltaz"/>`);
		else $$renderer.push(`<!--[-1--><div class="testimonial-avatar svelte-soltaz"><span class="testimonial-avatar-initial svelte-soltaz">${escape_html(testimonial.name.charAt(0))}</span></div>`);
		$$renderer.push(`<!--]--> <div class="testimonial-info svelte-soltaz"><span class="testimonial-name svelte-soltaz">${escape_html(testimonial.name)}</span> <div class="testimonial-meta svelte-soltaz"><span class="testimonial-project-name svelte-soltaz">${escape_html(testimonial.projectTitle)}</span></div></div> <a${attr("href", resolve(`/portfolio/${testimonial.projectSlug}`))} class="testimonial-arrow svelte-soltaz" aria-label="View project"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a></div></div></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/section/TestimonialsSection.svelte
function TestimonialsSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { locale, testimonials, testimonialsSection } = $$props;
		$$renderer.push(`<section class="testimonials-section relative py-10 lg:py-16 overflow-hidden svelte-yaveu" aria-labelledby="testimonials-heading">`);
		Background($$renderer, { gradientTheme: "ocean" });
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[15%] left-[8%] hidden lg:block",
			icon: Quote,
			variant: "icon",
			duration: 4500,
			amplitude: 20
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[25%] right-[15%] hidden lg:block",
			icon: Star,
			variant: "icon",
			color: "warning",
			duration: 5e3,
			amplitude: 25
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute bottom-[30%] left-[10%] hidden lg:block",
			variant: "dots",
			duration: 4500,
			amplitude: 18
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[60%] right-[8%] hidden lg:block",
			variant: "dots",
			color: "success",
			duration: 5500,
			amplitude: 22
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute bottom-[20%] right-[20%] hidden lg:block",
			icon: Sparkles,
			variant: "icon",
			color: "primary",
			duration: 4800,
			amplitude: 20
		});
		$$renderer.push(`<!----> <div class="testimonials-container relative z-10 svelte-yaveu">`);
		ShineHeader($$renderer, {
			badge: testimonialsSection?.badge,
			badgeIconLeft: Message_square_quote,
			badgeIconRight: Sparkles,
			badgeColor: "secondary",
			title: testimonialsSection?.title,
			subtitle: testimonialsSection?.subtitle,
			animation: "fade",
			animationDelay: 100
		});
		$$renderer.push(`<!----> `);
		if (testimonials.length > 0) {
			$$renderer.push(`<!--[0--><div class="testimonials-grid svelte-yaveu"><!--[-->`);
			const each_array = ensure_array_like(testimonials);
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let testimonial = each_array[index];
				ScrollReveal($$renderer, {
					animation: "scale",
					delay: 150 + testimonial.id * 50,
					children: ($$renderer) => {
						TestimonialCard($$renderer, {
							testimonial,
							locale,
							_index: index
						});
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section>`);
	});
}
//#endregion
//#region src/lib/components/ui/animation/AnimatedCounter.svelte
function AnimatedCounter($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value, duration = 2e3, suffix = "", prefix = "", decimals = 0, class: className = "" } = $$props;
		let displayValue = 0;
		const formattedValue = derived(() => prefix + displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix);
		$$renderer.push(`<span${attr_class(clsx(className))}>${escape_html(formattedValue())}</span>`);
	});
}
//#endregion
//#region src/lib/components/ui/card/StatsCard.svelte
function StatsCard($$renderer, $$props) {
	let { value, label, suffix = "", icon: Icon, variant = 1, duration = 2e3 } = $$props;
	$$renderer.push(`<div${attr_class(`stats-card stats-card-${stringify(variant)}`, "svelte-1k5xzmv")}${attr("aria-label", `${stringify(value)}${stringify(suffix)} ${stringify(label)}`)}><div class="stats-card-bg-glow svelte-1k5xzmv"></div> <div class="stats-card-holographic svelte-1k5xzmv"></div> <div class="stats-card-glow svelte-1k5xzmv"></div> <div class="stats-card-border svelte-1k5xzmv"></div> <div class="stats-card-shine svelte-1k5xzmv"></div> <div class="stats-card-inner svelte-1k5xzmv"><div class="stats-card-icon-container svelte-1k5xzmv"><div class="stats-card-icon-ring stats-card-icon-ring-outer svelte-1k5xzmv"></div> <div class="stats-card-icon-ring stats-card-icon-ring-inner svelte-1k5xzmv"></div> <div class="stats-card-icon svelte-1k5xzmv">`);
	if (Icon) {
		$$renderer.push("<!--[-->");
		Icon($$renderer, { class: "w-6 h-6" });
		$$renderer.push("<!--]-->");
	} else {
		$$renderer.push("<!--[!-->");
		$$renderer.push("<!--]-->");
	}
	$$renderer.push(`</div> <div class="stats-card-icon-pulse svelte-1k5xzmv"></div></div> <div class="stats-card-value svelte-1k5xzmv">`);
	AnimatedCounter($$renderer, {
		value,
		duration
	});
	$$renderer.push(`<!----> `);
	if (suffix) $$renderer.push(`<!--[0--><span class="stats-card-suffix svelte-1k5xzmv">${escape_html(suffix)}</span>`);
	else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div> <div class="stats-card-label svelte-1k5xzmv">${escape_html(label)}</div> <div class="stats-card-progress svelte-1k5xzmv"><div class="stats-card-progress-bar svelte-1k5xzmv"></div></div></div></div>`);
}
//#endregion
//#region src/lib/components/ui/section/StatsSection.svelte
function StatsSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { locale: _locale, companyStats, statsSection } = $$props;
		const icons = [
			Users,
			Trophy,
			Star,
			Heart,
			Cpu,
			Headphones
		];
		$$renderer.push(`<section class="stats-section relative py-10 lg:py-16 overflow-hidden svelte-trr0st" aria-labelledby="stats-heading">`);
		Background($$renderer, { gradientTheme: "monochrome" });
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[25%] left-[15%] hidden lg:block",
			variant: "dots",
			color: "success",
			duration: 4e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[25%] right-[12%] hidden lg:block",
			variant: "dots",
			color: "warning",
			duration: 4e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[15%] left-[15%] hidden lg:block",
			variant: "icon",
			color: "success",
			icon: Trending_up,
			duration: 4e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> `);
		FloatingIcon($$renderer, {
			class: "absolute top-[15%] right-[12%] hidden lg:block",
			variant: "icon",
			icon: Star,
			color: "warning",
			duration: 4e3,
			amplitude: 20
		});
		$$renderer.push(`<!----> <div class="stats-container relative z-10 svelte-trr0st">`);
		ShineHeader($$renderer, {
			badge: statsSection?.badge,
			badgeIconLeft: Trending_up,
			badgeColor: "warning",
			title: statsSection?.title,
			subtitle: statsSection?.subtitle,
			animation: "scale",
			animationDelay: 100
		});
		$$renderer.push(`<!----> <div class="stats-bento-grid svelte-trr0st">`);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 200,
			children: ($$renderer) => {
				StatsCard($$renderer, {
					value: companyStats[0]?.value,
					label: companyStats[0]?.label,
					suffix: companyStats[0]?.suffix,
					icon: Users,
					variant: 1,
					duration: 2e3
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 250,
			children: ($$renderer) => {
				StatsCard($$renderer, {
					value: companyStats[1]?.value,
					label: companyStats[1]?.label,
					suffix: companyStats[1]?.suffix,
					icon: Trophy,
					variant: 2,
					duration: 2200
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 300,
			children: ($$renderer) => {
				StatsCard($$renderer, {
					value: companyStats[2]?.value,
					label: companyStats[2]?.label,
					suffix: companyStats[2]?.suffix,
					icon: Star,
					variant: 3,
					duration: 1800
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 350,
			children: ($$renderer) => {
				StatsCard($$renderer, {
					value: companyStats[3]?.value,
					label: companyStats[3]?.label,
					suffix: companyStats[3]?.suffix,
					icon: Trending_up,
					variant: 4,
					duration: 2500
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 400,
			children: ($$renderer) => {
				StatsCard($$renderer, {
					value: companyStats[4]?.value,
					label: companyStats[4]?.label,
					suffix: companyStats[4]?.suffix,
					icon: icons[companyStats[4]?.iconIndex] || Users,
					variant: 5,
					duration: 2100
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> `);
		ScrollReveal($$renderer, {
			animation: "scale",
			delay: 450,
			children: ($$renderer) => {
				StatsCard($$renderer, {
					value: companyStats[5]?.value,
					label: companyStats[5]?.label,
					suffix: companyStats[5]?.suffix,
					icon: icons[companyStats[5]?.iconIndex] || Headphones,
					variant: 6,
					duration: 1600
				});
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div></div></section>`);
	});
}
//#endregion
//#region src/routes/[lang]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		const organizationSchema = derived(() => generateOrganizationSchema({ logo: data.information?.siteLogo?.asset?.url }));
		const webPageSchema = derived(() => generateWebPageSchema(data.homePage?.seo?.title, data.homePage?.seo?.description, store_get($$store_subs ??= {}, "$page", page).url.pathname));
		const homepageBreadcrumbs = derived(() => [{
			name: data.locale === "id" ? "Beranda" : "Home",
			url: resolve("/")
		}]);
		const services = derived(() => (data.services || []).map((service, index) => {
			return {
				id: service.slug || service._id,
				title: service.title,
				description: service.seo?.description || "",
				icon: service.icon,
				href: `/services/${service.slug || ""}`,
				color: [
					"from-pink-500 to-rose-500",
					"from-blue-500 to-cyan-500",
					"from-green-500 to-emerald-500",
					"from-purple-500 to-violet-500",
					"from-teal-500 to-cyan-500",
					"from-fuchsia-500 to-pink-500"
				][index]
			};
		}));
		const portfolioItems = derived(() => (data.projects || []).map((project, index) => {
			const colors = [
				"from-blue-500 to-purple-500",
				"from-green-500 to-teal-500",
				"from-purple-500 to-pink-500",
				"from-orange-500 to-red-500",
				"from-cyan-500 to-blue-500",
				"from-yellow-500 to-orange-500",
				"from-pink-500 to-rose-500",
				"from-indigo-500 to-purple-500"
			];
			return {
				id: index + 1,
				title: project.title,
				category: project.category?.title,
				description: project.description || "",
				image: project.imageUrl || project.image || "",
				color: colors[index % colors.length],
				tech: (project.techStack || []).filter(Boolean),
				year: project.publishedAt ? new Date(project.publishedAt).getFullYear().toString() : "",
				client: project.client?.name,
				clientIcon: project.client?.iconUrl || project.client?.logoUrl || "",
				href: `/portfolio/${project.slug?.current}`
			};
		}));
		const testimonials = derived(() => (data.testimonials || []).filter((item) => item.testimonial?.name).map((item, index) => ({
			id: index + 1,
			name: item.testimonial?.name,
			content: item.testimonial?.content,
			projectTitle: item.projectTitle,
			projectSlug: item.projectSlug,
			projectCategory: item.projectCategory,
			clientIcon: item.client?.iconUrl || item.client?.logoUrl || ""
		})));
		const companyStats = derived(() => (data.homePage?.companyStatsSection?.items || []).map((stat, index) => {
			const rawValue = (stat.value || "").trim();
			const match = rawValue.match(/^(\d+)(.*)$/);
			return {
				value: match ? Number(match[1]) : 0,
				label: stat.label,
				suffix: match ? match[2] : rawValue,
				iconIndex: index
			};
		}));
		SEO($$renderer, {
			title: data.homePage?.seo?.title,
			description: data.homePage?.seo?.description,
			image: data.information?.siteLogo?.asset?.url,
			imageAlt: data.information?.siteLogo?.alt || data.homePage?.seo?.title,
			siteIcon: data.information?.siteIcon?.asset?.url,
			locale: data.locale,
			alternates: data.alternateLocales,
			breadcrumbs: homepageBreadcrumbs(),
			jsonLd: [organizationSchema(), webPageSchema()]
		});
		$$renderer.push(`<!----> `);
		HomeHero($$renderer, {
			locale: data.locale,
			homePage: data.homePage,
			information: data.information
		});
		$$renderer.push(`<!----> `);
		ServicesSection($$renderer, {
			locale: data.locale,
			services: services(),
			servicesSection: data.homePage?.servicesSection
		});
		$$renderer.push(`<!----> `);
		PortfolioSection($$renderer, {
			locale: data.locale,
			portfolioItems: portfolioItems(),
			portfolioSection: data.homePage?.portfolioSection
		});
		$$renderer.push(`<!----> `);
		BlogSection($$renderer, {
			locale: data.locale,
			posts: data.posts,
			blogSection: data.homePage?.blogSection
		});
		$$renderer.push(`<!----> `);
		if (testimonials().length > 0) {
			$$renderer.push("<!--[0-->");
			TestimonialsSection($$renderer, {
				locale: data.locale,
				testimonials: testimonials(),
				testimonialsSection: data.homePage?.testimonialsSection
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		StatsSection($$renderer, {
			locale: data.locale,
			companyStats: companyStats(),
			statsSection: data.homePage?.companyStatsSection
		});
		$$renderer.push(`<!---->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
