/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TocItem {
	level: number;
	text: string;
	id: string;
}

export function extractHeadingsFromBlocks(blocks: any[]): TocItem[] {
	if (!blocks || !Array.isArray(blocks)) return [];

	const headings: TocItem[] = [];

	blocks.forEach((block: any) => {
		if (block._type === 'block' && block.style && block.style.startsWith('h') && block.children) {
			const text = block.children.map((c: any) => c.text).join('');
			const id = text
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/\s+/g, '-');
			const level = parseInt(block.style.replace('h', ''));

			headings.push({ level, text, id });
		}
	});

	return headings;
}

export function scrollToHeading(headingId: string) {
	const element = document.getElementById(headingId);
	if (element) {
		const headerOffset = 100;
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - headerOffset;
		window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
	}
}

export function getActiveTocId(headings: TocItem[]): string {
	if (headings.length === 0) return '';

	const headerHeight = 120;
	const scrollPosition = window.scrollY + headerHeight;

	for (let i = headings.length - 1; i >= 0; i--) {
		const heading = headings[i];
		const element = document.getElementById(heading.id);
		if (element) {
			const offsetTop = element.offsetTop;
			if (scrollPosition >= offsetTop) {
				return heading.id;
			}
		}
	}

	return '';
}
