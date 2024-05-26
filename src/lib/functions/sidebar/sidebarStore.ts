import { writable } from 'svelte/store';
import { sanitizeHtml } from '../common/sanitize';

const sidebarStore = writable('Test Sidebar Content');

export const sidebarContent = {
	subscribe: sidebarStore.subscribe,

	set(content: string, sanitize = true, defaultMessage?: string) {
		sidebarStore.set(sanitize ? sanitizeHtml(content, defaultMessage) : content);
	},

	update(updateFunction: (content: string) => string) {
		sidebarStore.update((before) => sanitizeHtml(updateFunction(before)));
	},

	setTitleAndDescription({
		name,
		description,
		safeHtml
	}: {
		name: string;
		description: string;
		safeHtml?: string;
	}) {
		let parsed = `<h2 style='padding-bottom: 5px;'>${name}</h2>
        <hr><p>${description}</p>`;
		if (safeHtml) parsed += safeHtml;
		this.set(parsed);
	}
};

//export const sidebarContent = new SidebarStore();
