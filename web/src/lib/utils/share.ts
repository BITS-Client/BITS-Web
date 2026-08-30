export async function copyLink(): Promise<boolean> {
	const url = window.location.href;

	try {
		await navigator.clipboard.writeText(url);
		return true;
	} catch {
		const textArea = document.createElement('textarea');
		textArea.value = url;
		textArea.style.position = 'fixed';
		textArea.style.left = '-9999px';
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand('copy');
			document.body.removeChild(textArea);
			return true;
		} catch {
			document.body.removeChild(textArea);
			return false;
		}
	}
}

export function shareOnTwitter(title: string, url: string) {
	const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
	window.open(shareUrl, '_blank');
}

export function shareOnLinkedIn(url: string) {
	const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
	window.open(shareUrl, '_blank');
}

export function shareOnFacebook(url: string) {
	const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
	window.open(shareUrl, '_blank');
}

export function shareOnWhatsApp(title: string, url: string) {
	const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
	window.open(shareUrl, '_blank');
}

export function shareOnTelegram(title: string, url: string) {
	const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
	window.open(shareUrl, '_blank');
}

export function shareOnThreads(title: string, url: string) {
	const shareUrl = `https://threads.net/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
	window.open(shareUrl, '_blank');
}

export function shareViaEmail(title: string, url: string) {
	const subject = encodeURIComponent(title);
	const body = encodeURIComponent(
		`Halo,\n\nSaya menemukan artikel menarik ini dan ingin membagikannya:\n\n${title}\n${url}\n\n--\nDikirim dari BITS Blog`
	);
	window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

export interface ShareHandlers {
	copied: boolean;
	handleCopyLink: () => Promise<void>;
	handleShareTwitter: () => void;
	handleShareLinkedIn: () => void;
	handleShareFacebook: () => void;
	handleShareWhatsApp: () => void;
	handleShareTelegram: () => void;
	handleShareThreads: () => void;
	handleShareEmail: () => void;
}

export function createShareHandlers(): ShareHandlers {
	let copied = false;

	async function handleCopyLink() {
		const success = await copyLink();
		if (success) {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
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
