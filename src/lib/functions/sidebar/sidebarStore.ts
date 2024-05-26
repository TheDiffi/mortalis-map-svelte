import { writable } from 'svelte/store';
import { sanitizeHtml } from '../common/sanitize';

const INITIAL_SIDEBAR_CONTENT = `<div slot="content">
<h2 style="padding-bottom: 5px">Welcome to Icewind Dale</h2><hr /><p>
Click markers to view more information about the location <br /><br />
You can also hold the right key to pan and rotate the map <br /><br />
Try out the elements in the corner to see what they do! <br /><br />
Also, I've heard that easthaven looks really good from up close ;)
</p>
</div>`;

function createSidebarContent() {
	const { subscribe, set, update } = writable(INITIAL_SIDEBAR_CONTENT);

	return {
		subscribe: subscribe,

		set(content: string, sanitize = true, defaultMessage?: string) {
			set(sanitize ? sanitizeHtml(content, defaultMessage) : content);
		},

		update(updateFunction: (content: string) => string) {
			update((before) => sanitizeHtml(updateFunction(before)));
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
}
export const sidebarContent = createSidebarContent();
