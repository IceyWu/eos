export interface ImageGroupItem {
	/** Image source URL or BlurHash value. */
	src: string;
	/** How to interpret `src`. @default "url" */
	srcType?: "url" | "blurhash";
	/** Accessible name for the image. */
	alt?: string;
	/** Image layout strategy. @default "cover" */
	objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
	/** Placeholder URL or BlurHash value. */
	placeholder?: string;
	/** How to interpret `placeholder`. @default "url" */
	placeholderType?: "url" | "blurhash";
	/** Keep the placeholder visible as a background layer. @default false */
	placeholderFill?: boolean;
	/** Delay before revealing a loaded image, in milliseconds. @default 0 */
	showDelay?: number;
	/** Whether the image follows its container width. @default false */
	responsive?: boolean;
	/** Clip the image to a circle. @default false */
	circle?: boolean;
}

export interface ImageGroupProps {
	/** Images and per-image eos-image properties to render. */
	items?: ImageGroupItem[];
	/** Layout strategy for the collection. @default "grid" */
	layout?: "grid" | "featured" | "pair";
	/** Maximum rendered images; the remainder is shown as a count. @default 9 */
	maxVisible?: number;
}

export function ImageGroup(_props: ImageGroupProps): null {
	return null;
}
