const OSS_THUMBNAIL_PROCESS = "image/resize,w_960/quality,q_82";

const thumbnailUrl = (url: string) =>
	`${url}${url.includes("?") ? "&" : "?"}x-oss-process=${OSS_THUMBNAIL_PROCESS}`;

const media = [
	[
		"DSCF1497.JPG",
		"185a57da-a4d7-41e4-aadf-d53e5ddea192.jpg",
		"LVF6Rvofogaz%%fQayj[WBWCWBj[",
	],
	[
		"DSCF1685.JPG",
		"ba9099e6-7061-4cfb-b1d3-8473c0a4fb98.jpg",
		"LaEy[Jazj]jt~qjsjZbH%1bHayjs",
	],
	[
		"DSCF1692.JPG",
		"63a255df-9aad-42ac-bad2-e9020c9847fd.jpg",
		"LIDT3JIoI;WBlV%2t7ofX9aesSoL",
	],
	[
		"DSCF1693.JPG",
		"324ae849-df37-4650-8751-43d2ea9be07a.jpg",
		"LdEy#+t7j]j[~qoej[j[ofayayjt",
	],
	[
		"DSCF1694.JPG",
		"0666847d-f621-4f2a-88e2-24812dac34f6.jpg",
		"LiFF]do#WAj[~XWBj[ayogWBkCay",
	],
	[
		"DSCF1407.JPG",
		"17cab0c6-c0cf-473f-8ba6-5a9dc81ee37f.jpg",
		"L7Ad~3xus:n~pfofjsjsNGayaef6",
	],
	[
		"DSCF1414.JPG",
		"1f267991-9bb8-4a5e-8fef-0a18e086f89d.jpg",
		"LLEfZ*M|0L-o0.t7%2RjjFs.%1R+",
	],
	[
		"DSCF1415.JPG",
		"011b2a01-d030-4111-8b28-5b6eb9dfb53d.jpg",
		"L8Am;}xaCmkXH[WVF2nh-UT0Imrq",
	],
	[
		"DSCF1420.JPG",
		"aaf18fdc-862f-4953-a7d0-cf42684f9527.jpg",
		"LQE{U-Rk0Ls:OGoeR+j[Mxj[-:WB",
	],
	[
		"DSCF1421.JPG",
		"33191197-e63c-4c6f-9f93-d8d6676a4f24.jpg",
		"LHJ*Yb?G0fS5B@xtIpNGE2Io%Lof",
	],
	[
		"DSCF1443.JPG",
		"59595da1-90fa-4d5a-a15e-d223b8070ac3.jpg",
		"L7Ct9Exu.AV@cHROo~t89aROR*kC",
	],
	[
		"DSCF1483.JPG",
		"c8ceed3f-8594-415f-97f7-7748dabf5ca6.jpg",
		"LJC%p#t7o#R*?waeaeoLNGWCf5oe",
	],
	[
		"DSCF1514.JPG",
		"2bedcbe9-b9f7-41e3-ae51-18193c446572.jpg",
		"LWGSZTxvM{og.ARjofWBIojZayf5",
	],
	[
		"DSCF1612.JPG",
		"39cb0acb-f9b5-4af8-abd7-19485f3666ba.jpg",
		"LTH.Tr%MxuM{_4M{Rjt7M{ayayj[",
	],
	[
		"DSCF1656.JPG",
		"2a2d530b-1bb7-4328-bd9e-08941b8c27c7.jpg",
		"LnIX?cj[oft6?wayWVR*M|j[axay",
	],
	[
		"DSCF1681.JPG",
		"d4d07b7f-bc46-4529-af64-951d37ea56df.jpg",
		"LRCsp:j[R+WV%%fQa#a}V@ayoLj[",
	],
] as const;

const OSS_BASE_URL =
	"https://lpalette.oss-accelerate.aliyuncs.com/go_oss/prod/mkIo6X4FryYKOcUzuz4Kew/2026-04-12";

export const images = media.map(([name, filename, blurhash]) => ({
	alt: name,
	placeholder: blurhash,
	placeholderFill: true,
	placeholderType: "blurhash" as const,
	src: thumbnailUrl(`${OSS_BASE_URL}/${filename}`),
}));
