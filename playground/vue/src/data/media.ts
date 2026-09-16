import rawData from "../json/data.json";

export interface MediaItem {
	id: number | string;
	name: string;
	type: "image" | "video";
	url: string;
	blurhash: string | null;
	videoSrc: string | null;
}

export const mediaItems: MediaItem[] = (rawData as any[]).map((data) => ({
	id: data.id,
	name: data.name,
	type: (data.type as string).startsWith("video") ? "video" : "image",
	url: data.url,
	blurhash: data.blurhash ?? null,
	videoSrc: data.videoSrc ?? data.live_photo_video?.url ?? null,
}));

export const fallbackMediaItem: MediaItem = {
	id: 0,
	name: "Image",
	type: "image",
	url: "",
	blurhash: null,
	videoSrc: null,
};
