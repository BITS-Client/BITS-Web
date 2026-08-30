import { C as escape_html, d as ensure_array_like, l as derived, m as spread_props, v as html, x as attr } from "../../../../../chunks/index-server.js";
import { c as seoConfig, t as generateArticleSchema } from "../../../../../chunks/seo.js";
import { r as resolvePath } from "../../../../../chunks/routing.js";
import { i as Twitter, l as Icon, n as Facebook, r as Linkedin } from "../../../../../chunks/lucide.js";
import { n as Message_square, r as Check, t as Send } from "../../../../../chunks/send.js";
import { t as Mail } from "../../../../../chunks/mail.js";
import { t as Message_circle } from "../../../../../chunks/message-circle.js";
import { t as SEO } from "../../../../../chunks/SEO2.js";
import { n as DetailHero, t as RelatedSection } from "../../../../../chunks/RelatedSection.js";
import { t as TableOfContents } from "../../../../../chunks/TableOfContents.js";
import { t as NotFound } from "../../../../../chunks/NotFound.js";
//#region node_modules/.pnpm/@lucide+svelte@1.37.0_svelte@5.57.0_@typescript-eslint+types@8.68.0_/node_modules/@lucide/svelte/dist/icons/copy.svelte
function Copy($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "copy" },
		props,
		{ iconNode: [["rect", {
			"width": "14",
			"height": "14",
			"x": "8",
			"y": "8",
			"rx": "2",
			"ry": "2"
		}], ["path", { "d": "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]] }
	]));
}
//#endregion
//#region src/lib/utils/toc.ts
function scrollToHeading(headingId) {
	const element = document.getElementById(headingId);
	if (element) {
		const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 100;
		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth"
		});
	}
}
//#endregion
//#region src/lib/utils/share.ts
async function copyLink() {
	const url = window.location.href;
	try {
		await navigator.clipboard.writeText(url);
		return true;
	} catch {
		const textArea = document.createElement("textarea");
		textArea.value = url;
		textArea.style.position = "fixed";
		textArea.style.left = "-9999px";
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand("copy");
			document.body.removeChild(textArea);
			return true;
		} catch {
			document.body.removeChild(textArea);
			return false;
		}
	}
}
function shareOnTwitter(title, url) {
	const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
	window.open(shareUrl, "_blank");
}
function shareOnLinkedIn(url) {
	const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
	window.open(shareUrl, "_blank");
}
function shareOnFacebook(url) {
	const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
	window.open(shareUrl, "_blank");
}
function shareOnWhatsApp(title, url) {
	const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + " - " + url)}`;
	window.open(shareUrl, "_blank");
}
function shareOnTelegram(title, url) {
	const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
	window.open(shareUrl, "_blank");
}
function shareOnThreads(title, url) {
	const shareUrl = `https://threads.net/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
	window.open(shareUrl, "_blank");
}
function shareViaEmail(title, url) {
	const subject = encodeURIComponent(title);
	const body = encodeURIComponent(`Halo,\n\nSaya menemukan artikel menarik ini dan ingin membagikannya:\n\n${title}\n${url}\n\n--\nDikirim dari BITS Blog`);
	window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
function createShareHandlers() {
	let copied = false;
	async function handleCopyLink() {
		if (await copyLink()) {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2e3);
		}
	}
	function handleShareTwitter() {
		shareOnTwitter(document.title, window.location.href);
	}
	function handleShareLinkedIn() {
		shareOnLinkedIn(window.location.href);
	}
	function handleShareFacebook() {
		shareOnFacebook(window.location.href);
	}
	function handleShareWhatsApp() {
		shareOnWhatsApp(document.title, window.location.href);
	}
	function handleShareTelegram() {
		shareOnTelegram(document.title, window.location.href);
	}
	function handleShareThreads() {
		shareOnThreads(document.title, window.location.href);
	}
	function handleShareEmail() {
		shareViaEmail(document.title, window.location.href);
	}
	return {
		get copied() {
			return copied;
		},
		handleCopyLink,
		handleShareTwitter,
		handleShareLinkedIn,
		handleShareFacebook,
		handleShareWhatsApp,
		handleShareTelegram,
		handleShareThreads,
		handleShareEmail
	};
}
//#endregion
//#region src/lib/components/ui/misc/ShareBar.svelte
function ShareBar($$renderer, $$props) {
	let { copied, oncopy, onshareTwitter, onshareLinkedIn, onshareFacebook, onshareWhatsApp, onshareTelegram, onshareThreads, onshareEmail, shareTitle = "Share Article", showMobile = false } = $$props;
	$$renderer.push(`<div class="share-bar svelte-1rb8lyw"><span class="share-label svelte-1rb8lyw">Share</span> <button class="share-btn whatsapp svelte-1rb8lyw" aria-label="Share on WhatsApp">`);
	Message_square($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <button class="share-btn facebook svelte-1rb8lyw" aria-label="Share on Facebook">`);
	Facebook($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <button class="share-btn telegram svelte-1rb8lyw" aria-label="Share on Telegram">`);
	Send($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <button class="share-btn twitter svelte-1rb8lyw" aria-label="Share on Twitter">`);
	Twitter($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <button class="share-btn linkedin svelte-1rb8lyw" aria-label="Share on LinkedIn">`);
	Linkedin($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <button class="share-btn threads svelte-1rb8lyw" aria-label="Share on Threads">`);
	Message_circle($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <div class="share-divider svelte-1rb8lyw"></div> <button class="share-btn email svelte-1rb8lyw" aria-label="Share via Email">`);
	Mail($$renderer, { class: "share-icon" });
	$$renderer.push(`<!----></button> <button class="share-btn copy svelte-1rb8lyw" aria-label="Copy link">`);
	if (copied) {
		$$renderer.push("<!--[0-->");
		Check($$renderer, { class: "share-icon" });
	} else {
		$$renderer.push("<!--[-1-->");
		Copy($$renderer, { class: "share-icon" });
	}
	$$renderer.push(`<!--]--></button></div> `);
	if (showMobile) {
		$$renderer.push(`<!--[0--><div class="share-section-mobile svelte-1rb8lyw"><h3 class="share-title svelte-1rb8lyw">${escape_html(shareTitle)}</h3> <div class="share-buttons svelte-1rb8lyw"><button class="mobile-share-btn twitter svelte-1rb8lyw">`);
		Twitter($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----> <span>Twitter</span></button> <button class="mobile-share-btn linkedin svelte-1rb8lyw">`);
		Linkedin($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----> <span>LinkedIn</span></button> <button class="mobile-share-btn facebook svelte-1rb8lyw">`);
		Facebook($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----> <span>Facebook</span></button> <button class="mobile-share-btn copy svelte-1rb8lyw">`);
		if (copied) {
			$$renderer.push("<!--[0-->");
			Check($$renderer, { class: "w-5 h-5" });
			$$renderer.push(`<!----> <span>Copied</span>`);
		} else {
			$$renderer.push("<!--[-1-->");
			Copy($$renderer, { class: "w-5 h-5" });
			$$renderer.push(`<!----> <span>Copy Link</span>`);
		}
		$$renderer.push(`<!--]--></button></div></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region src/lib/components/ui/content/BlogContent.svelte
function BlogContent($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { content, tags = [] } = $$props;
		function blocksToHtml(blocks) {
			if (!blocks || !Array.isArray(blocks)) return "";
			return blocks.map((block) => {
				if (block._type === "block" && block.style && block.children) {
					const text = block.children.map((c) => c.text).join("");
					const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
					const tag = block.style.startsWith("h") ? block.style : "p";
					return `<${tag} id="${id}" class="toc-heading">${text}</${tag}>`;
				}
				return "";
			}).filter(Boolean).join("");
		}
		$$renderer.push(`<div class="blog-content svelte-1dvwhri"><div class="article-content prose svelte-1dvwhri">`);
		if (content) $$renderer.push(`<!--[0-->${html(blocksToHtml(content))}`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (tags.length > 0) {
			$$renderer.push(`<!--[0--><div class="tags-section svelte-1dvwhri"><div class="tags-list svelte-1dvwhri"><!--[-->`);
			const each_array = ensure_array_like(tags);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tag = each_array[$$index];
				$$renderer.push(`<span class="tag-link svelte-1dvwhri">${escape_html(tag)}</span>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/card/AuthorCard.svelte
function AuthorCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { author, writtenByLabel } = $$props;
		$$renderer.push(`<div class="author-card svelte-1ia2rhh"><div class="author-card-bg svelte-1ia2rhh"></div> <div class="author-card-content svelte-1ia2rhh"><div class="author-card-avatar svelte-1ia2rhh">`);
		if (author.avatar) $$renderer.push(`<!--[0--><img${attr("src", author.avatar)}${attr("alt", author.name || "Author")} class="author-avatar-img svelte-1ia2rhh" onerror="this.__e=event"/> <span class="author-initials svelte-1ia2rhh" style="display: none;">${escape_html(author.name?.charAt(0) || "B")}</span>`);
		else $$renderer.push(`<!--[-1--><span class="author-initials svelte-1ia2rhh">${escape_html(author.name?.charAt(0) || "B")}</span>`);
		$$renderer.push(`<!--]--></div> <div class="author-card-info"><span class="author-card-label svelte-1ia2rhh">${escape_html(writtenByLabel)}</span> <h3 class="author-card-name svelte-1ia2rhh">${escape_html(author.name || "Banten IT Solutions Team")}</h3> <p class="author-card-role svelte-1ia2rhh">${escape_html(author.role || "Content Team")}</p> <p class="author-card-bio svelte-1ia2rhh">${escape_html(author.bio || "Our team of experts shares insights and knowledge about technology, business solutions, and digital transformation.")}</p></div></div></div>`);
	});
}
//#endregion
//#region src/lib/components/ui/section/ArticleSection.svelte
function ArticleSection($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { copied, oncopy, onshareTwitter, onshareLinkedIn, onshareFacebook, onshareWhatsApp, onshareTelegram, onshareThreads, onshareEmail, shareTitle, content, tags, author, writtenByLabel, tableOfContents, activeTocId, onTocClick, inThisArticleLabel } = $$props;
		$$renderer.push(`<div class="article-layout svelte-6kt1a"><div class="share-column svelte-6kt1a">`);
		ShareBar($$renderer, {
			copied,
			oncopy,
			onshareTwitter,
			onshareLinkedIn,
			onshareFacebook,
			onshareWhatsApp,
			onshareTelegram,
			onshareThreads,
			onshareEmail,
			shareTitle,
			showMobile: true
		});
		$$renderer.push(`<!----></div> <div class="article-main svelte-6kt1a">`);
		BlogContent($$renderer, {
			content,
			tags
		});
		$$renderer.push(`<!----> `);
		AuthorCard($$renderer, {
			author,
			writtenByLabel
		});
		$$renderer.push(`<!----></div> `);
		if (tableOfContents.length > 0) {
			$$renderer.push(`<!--[0--><aside class="right-sidebar svelte-6kt1a"><div class="sidebar-sticky svelte-6kt1a">`);
			TableOfContents($$renderer, {
				items: tableOfContents,
				title: inThisArticleLabel,
				activeId: activeTocId,
				onclick: onTocClick
			});
			$$renderer.push(`<!----></div></aside>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/routes/[lang]/blog/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		function resolve(path) {
			return resolvePath(path, data.locale);
		}
		const detailWrittenBy = derived(() => data.blogPage?.detail?.writtenBy || "Written by");
		const detailInThisArticle = derived(() => data.blogPage?.detail?.inThisArticle || "In this article");
		const detailReadArticle = derived(() => data.blogPage?.detail?.readArticle || "Read Article");
		const detailShareArticle = derived(() => data.blogPage?.detail?.shareArticle || "Share Article");
		const detailPostNotFound = derived(() => data.blogPage?.detail?.postNotFound || "Post Not Found");
		const detailPostNotFoundDesc = derived(() => data.blogPage?.detail?.postNotFoundDesc || "The article you are looking for does not exist or has been removed.");
		const detailGoHome = derived(() => data.blogPage?.detail?.goHome || "Go Home");
		const post = derived(() => data.post ? {
			slug: data.post.slug?.current || "",
			title: data.post.title || "",
			excerpt: data.post.seo?.description || "",
			seoTitle: data.post.seo?.title,
			seoDescription: data.post.seo?.description,
			content: data.post.body || "",
			category: data.post.category?.slug?.current || "technology",
			categoryLabel: data.post.category?.title || "Technology",
			categoryColor: data.post.category?.color || "#3b82f6",
			image: data.post.imageUrl || "",
			author: {
				name: data.post.author?.name || "BITS Team",
				role: data.post.author?.role || "Author",
				bio: data.post.author?.bio || "",
				avatar: data.post.author?.avatarUrl || ""
			},
			tags: data.post.tags || [],
			date: data.post.publishedAt || (/* @__PURE__ */ new Date()).toISOString()
		} : null);
		const relatedPosts = derived(() => (data.relatedPosts || []).map((p) => ({
			slug: p.slug?.current || "",
			title: p.title || "",
			image: p.imageUrl || "",
			category: p.category?.slug || "",
			categoryLabel: p.category?.title || "",
			categoryColor: p.category?.color || "#3b82f6",
			date: p.publishedAt || (/* @__PURE__ */ new Date()).toISOString()
		})));
		const breadcrumbs = derived(() => {
			if (!post()) return [];
			return [
				{
					name: data.navigation?.items?.find((item) => item.href === "/")?.label || "Home",
					url: "/"
				},
				{
					name: "Blog",
					url: "/blog"
				},
				{
					name: post().title,
					url: `/blog/${post().slug}`
				}
			];
		});
		const seoTitle = derived(() => {
			const locale = data.locale;
			const seoTitleData = post()?.seoTitle;
			return seoTitleData?.[locale] || seoTitleData?.en || post()?.title || "Blog Post";
		});
		const seoDescription = derived(() => {
			const locale = data.locale;
			const seoDescData = post()?.seoDescription;
			return seoDescData?.[locale] || seoDescData?.en || "";
		});
		const articleSchema = derived(() => post() ? generateArticleSchema({
			headline: seoTitle(),
			description: seoDescription(),
			authorName: post().author?.name || "BITS Team",
			datePublished: post().date,
			image: post().image || seoConfig.defaultImage,
			url: `/blog/${post().slug}`,
			publisherLogo: data.information?.siteLogo?.asset?.url
		}) : null);
		const shareHandlers = derived(createShareHandlers);
		let tableOfContents = [];
		let activeTocId = "";
		function handleTocClick(headingId) {
			activeTocId = headingId;
			scrollToHeading(headingId);
		}
		if (post()) {
			$$renderer.push("<!--[0-->");
			SEO($$renderer, {
				title: seoTitle(),
				description: seoDescription(),
				image: post().image,
				type: "article",
				publishedTime: post().date,
				author: post().author?.name,
				section: post().category,
				tags: post().tags || [],
				siteIcon: data.information?.siteIcon?.asset?.url,
				breadcrumbs: breadcrumbs(),
				jsonLd: [articleSchema()]
			});
		} else {
			$$renderer.push("<!--[-1-->");
			SEO($$renderer, {
				title: detailPostNotFound(),
				description: detailPostNotFoundDesc(),
				noindex: true,
				siteIcon: data.information?.siteIcon?.asset?.url
			});
		}
		$$renderer.push(`<!--]--> `);
		if (post()) {
			$$renderer.push("<!--[0-->");
			DetailHero($$renderer, {
				title: post().title,
				description: post().excerpt,
				category: post().categoryLabel,
				imageUrl: post().image,
				locale: data.locale,
				breadcrumbs: breadcrumbs(),
				author: {
					name: post().author.name,
					iconUrl: post().author.avatar
				},
				authorRole: post().author.role,
				tags: post().tags
			});
			$$renderer.push(`<!----> <article class="article-section"><div class="container-base">`);
			if (shareHandlers()) {
				$$renderer.push("<!--[0-->");
				ArticleSection($$renderer, {
					copied: shareHandlers().copied,
					oncopy: shareHandlers().handleCopyLink,
					onshareTwitter: shareHandlers().handleShareTwitter,
					onshareLinkedIn: shareHandlers().handleShareLinkedIn,
					onshareFacebook: shareHandlers().handleShareFacebook,
					onshareWhatsApp: shareHandlers().handleShareWhatsApp,
					onshareTelegram: shareHandlers().handleShareTelegram,
					onshareThreads: shareHandlers().handleShareThreads,
					onshareEmail: shareHandlers().handleShareEmail,
					shareTitle: detailShareArticle(),
					content: post().content,
					tags: post().tags,
					author: post().author,
					writtenByLabel: detailWrittenBy(),
					tableOfContents,
					activeTocId,
					onTocClick: handleTocClick,
					inThisArticleLabel: detailInThisArticle()
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></article> `);
			if (relatedPosts().length > 0) {
				$$renderer.push("<!--[0-->");
				RelatedSection($$renderer, {
					posts: relatedPosts(),
					locale: data.locale,
					readArticleLabel: detailReadArticle(),
					onresolve: resolve
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			NotFound($$renderer, {
				title: detailPostNotFound(),
				description: detailPostNotFoundDesc(),
				buttonLabel: detailGoHome(),
				href: resolve("/")
			});
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
