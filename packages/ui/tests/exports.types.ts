import type * as Root from "@eosjs/ui";
import type { EosButton } from "@eosjs/ui/button";
import type { CardStackRenderer, EosCardStack } from "@eosjs/ui/card-stack";
import type { EosCarousel } from "@eosjs/ui/carousel";
import { COMPONENT_CONFIG } from "@eosjs/ui/config";
import type { EosImage } from "@eosjs/ui/image";
import type {
	EosImageGroup,
	EosImageGroupItem,
	EosImageGroupLayout,
	ImageGroup,
} from "@eosjs/ui/image-group";
import type { EosProgressBar } from "@eosjs/ui/progress-bar";
import type { EosScrollbar } from "@eosjs/ui/scrollbar";
import type { EosSelect, EosSelectOption } from "@eosjs/ui/select";
import type { EosScene, EosSceneItem } from "@eosjs/ui/scene";

type Same<A, B> = [A, B] extends [B, A] ? true : false;
type Assert<T extends true> = T;
export type EntryContracts = [
	Assert<Same<EosButton, Root.EosButton>>,
	Assert<Same<EosCardStack, Root.EosCardStack>>,
	Assert<Same<EosCarousel, Root.EosCarousel>>,
	Assert<Same<EosImage, Root.EosImage>>,
	Assert<Same<EosImageGroup, Root.EosImageGroup>>,
	Assert<Same<ImageGroup, Root.EosImageGroup>>,
	Assert<Same<EosProgressBar, Root.EosProgressBar>>,
	Assert<Same<EosScrollbar, Root.EosScrollbar>>,
	Assert<Same<EosSelect, Root.EosSelect>>,
	Assert<Same<EosScene, Root.EosScene>>,
	Assert<Same<EosSceneItem, Root.EosSceneItem>>,
	Assert<Same<EosSelectOption, Root.EosSelectOption>>,
	Assert<Same<CardStackRenderer, Root.CardStackRenderer>>,
	Assert<Same<EosImageGroupItem, Root.EosImageGroupItem>>,
	Assert<Same<EosImageGroupLayout, Root.EosImageGroupLayout>>,
];
export const tagName: string = COMPONENT_CONFIG.getTagName("button");
