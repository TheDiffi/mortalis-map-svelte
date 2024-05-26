import DOMPurify from "dompurify";

const NO_CONTENT_MESSAGE = 'No content available';

export function sanitizeHtml(content: string, defaultMessage: string = NO_CONTENT_MESSAGE): string {
	let sanitizedContent = DOMPurify.sanitize(content);
	return sanitizedContent === '' ? defaultMessage : sanitizedContent;
}
