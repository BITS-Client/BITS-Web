import { C as escape_html, g as stringify, x as attr } from "./index-server.js";
import "./lucide.js";
import { n as External_link, t as Map_pin } from "./map-pin.js";
import { t as Mail } from "./mail.js";
import { n as Phone } from "./sparkles.js";
//#region src/lib/components/ui/card/ContactCard.svelte
function ContactCard($$renderer, $$props) {
	let { email = "", phone = "", address = "", emailLabel = "Email", phoneLabel = "Phone", addressLabel = "Address", title = "Contact Information" } = $$props;
	$$renderer.push(`<div class="contact-info-card svelte-2dgim8"><div class="contact-info-glow svelte-2dgim8"></div> <div class="contact-info-inner svelte-2dgim8"><div class="contact-info-header svelte-2dgim8"><div class="contact-info-icon-wrapper svelte-2dgim8"><div class="contact-info-icon-bg svelte-2dgim8"></div> <div class="contact-info-icon svelte-2dgim8">`);
	Mail($$renderer, { class: "w-6 h-6" });
	$$renderer.push(`<!----></div></div> <h2 class="contact-info-title svelte-2dgim8">${escape_html(title)}</h2></div> <div class="contact-info-grid svelte-2dgim8">`);
	if (email) {
		$$renderer.push(`<!--[0--><a${attr("href", "mailto:" + email)} class="contact-info-item svelte-2dgim8"><div class="contact-info-item-icon svelte-2dgim8">`);
		Mail($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----></div> <div class="contact-info-item-content svelte-2dgim8"><span class="contact-info-label svelte-2dgim8">${escape_html(emailLabel)}</span> <span class="contact-info-value svelte-2dgim8">${escape_html(email)}</span></div> `);
		External_link($$renderer, { class: "w-4 h-4 contact-info-external" });
		$$renderer.push(`<!----></a>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> `);
	if (phone) {
		$$renderer.push(`<!--[0--><a${attr("href", "tel:" + phone)} class="contact-info-item svelte-2dgim8"><div class="contact-info-item-icon svelte-2dgim8">`);
		Phone($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----></div> <div class="contact-info-item-content svelte-2dgim8"><span class="contact-info-label svelte-2dgim8">${escape_html(phoneLabel)}</span> <span class="contact-info-value svelte-2dgim8">${escape_html(phone)}</span></div> `);
		External_link($$renderer, { class: "w-4 h-4 contact-info-external" });
		$$renderer.push(`<!----></a>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> `);
	if (address) {
		$$renderer.push(`<!--[0--><a${attr("href", `https://www.google.com/maps/search/${stringify(encodeURIComponent(address))}`)} target="_blank" rel="noopener noreferrer" class="contact-info-item contact-info-address svelte-2dgim8"><div class="contact-info-item-icon svelte-2dgim8">`);
		Map_pin($$renderer, { class: "w-5 h-5" });
		$$renderer.push(`<!----></div> <div class="contact-info-item-content svelte-2dgim8"><span class="contact-info-label svelte-2dgim8">${escape_html(addressLabel)}</span> <span class="contact-info-value svelte-2dgim8">${escape_html(address)}</span></div> `);
		External_link($$renderer, { class: "w-4 h-4 contact-info-external" });
		$$renderer.push(`<!----></a>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></div></div></div>`);
}
//#endregion
export { ContactCard as t };
