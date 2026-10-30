import type {
  EosButton,
  EosCardStack,
  EosCarousel,
  EosImage,
  EosProgressBar,
  EosScene,
  EosSceneItem,
  EosImageGroup,
  EosScrollbar,
  EosSelect,
} from "@eosjs/ui";

/**
 * This type can be used to create scoped tags for your components.
 *
 * Usage:
 *
 * ```ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 *
 * declare module "my-library" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * ```
 *
 * @deprecated Runtime scoped elements result in duplicate types and can confusing for developers. It is recommended to use the `prefix` and `suffix` options to generate new types instead.
 */
export type ScopedElements<
  Prefix extends string = "",
  Suffix extends string = "",
> = {
  [
    Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`
  ]: CustomElements[Key];
};

type BaseProps<T extends HTMLElement> = {
  /** Content added between the opening and closing tags of the element */
  children?: any | undefined;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string | undefined;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string | undefined;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined> | undefined;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl" | undefined;
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string | undefined;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string | undefined;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string | undefined;
  /** A unique identifier for the element. */
  id?: string | undefined;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number | undefined;
  /** Specifies the language of the element. */
  lang?: string | undefined;
  /** Defines the element's semantic role for accessibility APIs. */
  role?: string | undefined;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string | undefined;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: any;
  /** Adds a reference for a custom element slot */
  slot?: string | undefined;
  /** Prop for setting inline styles */
  style?: Record<string, string | number> | any;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number | undefined;
  /** Specifies the tooltip text for the element. */
  title?: string | undefined;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no" | undefined;
  /** The popover global attribute is used to designate an element as a popover element. */
  popover?: "auto" | "hint" | "manual" | undefined;
  /** Turns an element element into a popover control button; takes the ID of the popover element to control as its value. */
  popovertarget?: "top" | "bottom" | "left" | "right" | "auto" | undefined;
  /** Specifies the action to be performed on a popover element being controlled by a control element. */
  popovertargetaction?: "show" | "hide" | "toggle" | undefined;
};

type BaseEvents = {};

export type EosButtonProps = {
  /**  */
  "aria-label"?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  "aria-keyshortcuts"?: unknown | undefined;
  /**  */
  "aria-pressed"?: unknown | undefined;
  /**  */
  color?: unknown | undefined;
  /**  */
  disabled?: unknown | undefined;
  /**  */
  "full-width"?: unknown | undefined;
  /**  */
  "icon-only"?: unknown | undefined;
  /**  */
  loading?: unknown | undefined;
  /**  */
  name?: unknown | undefined;
  /**  */
  size?: unknown | undefined;
  /**  */
  type?: unknown | undefined;
  /**  */
  value?: unknown | undefined;
  /**  */
  variant?: unknown | undefined;
};

export type EosButtonSolidJsProps = {
  /**  */
  "attr:aria-label"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:aria-keyshortcuts"?: unknown | undefined;
  /**  */
  "attr:aria-pressed"?: unknown | undefined;
  /**  */
  "attr:color"?: unknown | undefined;
  /**  */
  "attr:disabled"?: unknown | undefined;
  /**  */
  "attr:full-width"?: unknown | undefined;
  /**  */
  "attr:icon-only"?: unknown | undefined;
  /**  */
  "attr:loading"?: unknown | undefined;
  /**  */
  "attr:name"?: unknown | undefined;
  /**  */
  "attr:size"?: unknown | undefined;
  /**  */
  "attr:type"?: unknown | undefined;
  /**  */
  "attr:value"?: unknown | undefined;
  /**  */
  "attr:variant"?: unknown | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosCardStackProps = {
  /** Number of cards in the external data source */
  "item-count"?: unknown | undefined;
  /** Number of cards in the external data source */
  undefined?: unknown | undefined;
  /** Initial zero-based index */
  "initial-index"?: unknown | undefined;
  /** Wrap at either end */
  loop?: unknown | undefined;
  /**  */
  itemCount?: EosCardStack["itemCount"] | undefined;
  /**  */
  initialIndex?: EosCardStack["initialIndex"] | undefined;
  /**  */
  renderItem?: EosCardStack["renderItem"] | undefined;

  /** detail: { currentIndex, previousIndex } */
  onchange?: ((e: CustomEvent) => void) | undefined;
};

export type EosCardStackSolidJsProps = {
  /** Number of cards in the external data source */
  "attr:item-count"?: unknown | undefined;
  /** Number of cards in the external data source */
  "prop:undefined"?: unknown | undefined;
  /** Initial zero-based index */
  "attr:initial-index"?: unknown | undefined;
  /** Wrap at either end */
  "bool:loop"?: unknown | undefined;
  /**  */
  "prop:itemCount"?: EosCardStack["itemCount"] | undefined;
  /**  */
  "prop:initialIndex"?: EosCardStack["initialIndex"] | undefined;
  /**  */
  "prop:renderItem"?: EosCardStack["renderItem"] | undefined;
  /** detail: { currentIndex, previousIndex } */
  "on:change"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosCarouselProps = {
  /**  */
  autoplay?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  interval?: unknown | undefined;
  /**  */
  loop?: unknown | undefined;
  /**  */
  "show-navigation"?: unknown | undefined;
  /**  */
  "initial-index"?: unknown | undefined;
  /**  */
  "indicator-position"?: unknown | undefined;
  /**  */
  "indicator-style"?: unknown | undefined;
  /**  */
  "virtual-threshold"?: unknown | undefined;
  /**  */
  showNavigation?: EosCarousel["showNavigation"] | undefined;
  /**  */
  initialIndex?: EosCarousel["initialIndex"] | undefined;
  /**  */
  indicatorPosition?: EosCarousel["indicatorPosition"] | undefined;
  /**  */
  indicatorStyle?: EosCarousel["indicatorStyle"] | undefined;

  /**  */
  "onslide-active"?: ((e: CustomEvent) => void) | undefined;
  /**  */
  "onslide-click"?: ((e: CustomEvent) => void) | undefined;
  /**  */
  onchange?: ((e: CustomEvent) => void) | undefined;
};

export type EosCarouselSolidJsProps = {
  /**  */
  "attr:autoplay"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:interval"?: unknown | undefined;
  /**  */
  "attr:loop"?: unknown | undefined;
  /**  */
  "attr:show-navigation"?: unknown | undefined;
  /**  */
  "attr:initial-index"?: unknown | undefined;
  /**  */
  "attr:indicator-position"?: unknown | undefined;
  /**  */
  "attr:indicator-style"?: unknown | undefined;
  /**  */
  "attr:virtual-threshold"?: unknown | undefined;
  /**  */
  "prop:showNavigation"?: EosCarousel["showNavigation"] | undefined;
  /**  */
  "prop:initialIndex"?: EosCarousel["initialIndex"] | undefined;
  /**  */
  "prop:indicatorPosition"?: EosCarousel["indicatorPosition"] | undefined;
  /**  */
  "prop:indicatorStyle"?: EosCarousel["indicatorStyle"] | undefined;
  /**  */
  "on:slide-active"?: ((e: CustomEvent) => void) | undefined;
  /**  */
  "on:slide-click"?: ((e: CustomEvent) => void) | undefined;
  /**  */
  "on:change"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosImageProps = {
  /**  */
  src?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  "src-type"?: unknown | undefined;
  /**  */
  alt?: unknown | undefined;
  /**  */
  width?: unknown | undefined;
  /**  */
  height?: unknown | undefined;
  /**  */
  loading?: unknown | undefined;
  /**  */
  crossorigin?: unknown | undefined;
  /**  */
  "object-fit"?: unknown | undefined;
  /**  */
  placeholder?: unknown | undefined;
  /**  */
  "placeholder-type"?: unknown | undefined;
  /**  */
  "placeholder-fill"?: unknown | undefined;
  /**  */
  "show-delay"?: unknown | undefined;
  /**  */
  responsive?: unknown | undefined;
  /**  */
  circle?: unknown | undefined;

  /**  */
  "onblurhash-error"?: ((e: CustomEvent) => void) | undefined;
};

export type EosImageSolidJsProps = {
  /**  */
  "attr:src"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:src-type"?: unknown | undefined;
  /**  */
  "attr:alt"?: unknown | undefined;
  /**  */
  "attr:width"?: unknown | undefined;
  /**  */
  "attr:height"?: unknown | undefined;
  /**  */
  "attr:loading"?: unknown | undefined;
  /**  */
  "attr:crossorigin"?: unknown | undefined;
  /**  */
  "attr:object-fit"?: unknown | undefined;
  /**  */
  "attr:placeholder"?: unknown | undefined;
  /**  */
  "attr:placeholder-type"?: unknown | undefined;
  /**  */
  "attr:placeholder-fill"?: unknown | undefined;
  /**  */
  "attr:show-delay"?: unknown | undefined;
  /**  */
  "attr:responsive"?: unknown | undefined;
  /**  */
  "attr:circle"?: unknown | undefined;
  /**  */
  "on:blurhash-error"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosProgressBarProps = {
  /**  */
  total?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  current?: unknown | undefined;
  /**  */
  variant?: unknown | undefined;
  /**  */
  position?: unknown | undefined;
  /**  */
  loading?: unknown | undefined;
  /**  */
  "aria-label"?: unknown | undefined;
  /**  */
  scrubbable?: unknown | undefined;
  /** Localized labels, one per segment. No HTML is interpreted. */
  segmentLabels?: EosProgressBar["segmentLabels"] | undefined;

  /**  */
  "onsegment-click"?: ((e: CustomEvent) => void) | undefined;
};

export type EosProgressBarSolidJsProps = {
  /**  */
  "attr:total"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:current"?: unknown | undefined;
  /**  */
  "attr:variant"?: unknown | undefined;
  /**  */
  "attr:position"?: unknown | undefined;
  /**  */
  "attr:loading"?: unknown | undefined;
  /**  */
  "attr:aria-label"?: unknown | undefined;
  /**  */
  "attr:scrubbable"?: unknown | undefined;
  /** Localized labels, one per segment. No HTML is interpreted. */
  "prop:segmentLabels"?: EosProgressBar["segmentLabels"] | undefined;
  /**  */
  "on:segment-click"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosImageGroupProps = {
  /**  */
  items?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  layout?: unknown | undefined;
  /**  */
  "max-visible"?: unknown | undefined;
  /**  */
  maxVisible?: EosImageGroup["maxVisible"] | undefined;

  /**  */
  "onimage-click"?: ((e: CustomEvent) => void) | undefined;
};

export type EosImageGroupSolidJsProps = {
  /**  */
  "attr:items"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:layout"?: unknown | undefined;
  /**  */
  "attr:max-visible"?: unknown | undefined;
  /**  */
  "prop:maxVisible"?: EosImageGroup["maxVisible"] | undefined;
  /**  */
  "on:image-click"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosSceneProps = {
  /** Accessible name for the scene content. */
  "aria-label"?: unknown | undefined;
  /** Accessible name for the scene content. */
  undefined?: unknown | undefined;
};

export type EosSceneSolidJsProps = {
  /** Accessible name for the scene content. */
  "attr:aria-label"?: unknown | undefined;
  /** Accessible name for the scene content. */
  "prop:undefined"?: unknown | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosSceneItemProps = {
  /** Normalized horizontal scene coordinate from 0 to 1. */
  x?: unknown | undefined;
  /** Normalized horizontal scene coordinate from 0 to 1. */
  undefined?: unknown | undefined;
  /** Normalized vertical scene coordinate from 0 to 1. */
  y?: unknown | undefined;
  /** Stacking order among scene items. */
  "z-index"?: unknown | undefined;
  /** The item edge, corner, or center aligned with x/y. */
  anchor?: unknown | undefined;
};

export type EosSceneItemSolidJsProps = {
  /** Normalized horizontal scene coordinate from 0 to 1. */
  "attr:x"?: unknown | undefined;
  /** Normalized horizontal scene coordinate from 0 to 1. */
  "prop:undefined"?: unknown | undefined;
  /** Normalized vertical scene coordinate from 0 to 1. */
  "attr:y"?: unknown | undefined;
  /** Stacking order among scene items. */
  "attr:z-index"?: unknown | undefined;
  /** The item edge, corner, or center aligned with x/y. */
  "attr:anchor"?: unknown | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosScrollbarProps = {
  /**  */
  direction?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  "auto-hide"?: unknown | undefined;
  /**  */
  "thumb-color"?: unknown | undefined;
  /**  */
  "track-color"?: unknown | undefined;
  /**  */
  "thumb-size"?: unknown | undefined;
  /**  */
  "thumb-min-size"?: unknown | undefined;
  /**  */
  "border-radius"?: unknown | undefined;
  /**  */
  autoHide?: EosScrollbar["autoHide"] | undefined;
  /** 当前滚动比例 0~1 */
  ratio?: EosScrollbar["ratio"] | undefined;
  /** 滑块占轨道比例 0~1 */
  thumbRatio?: EosScrollbar["thumbRatio"] | undefined;

  /**  */
  "onscroll-change"?: ((e: CustomEvent) => void) | undefined;
};

export type EosScrollbarSolidJsProps = {
  /**  */
  "attr:direction"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:auto-hide"?: unknown | undefined;
  /**  */
  "attr:thumb-color"?: unknown | undefined;
  /**  */
  "attr:track-color"?: unknown | undefined;
  /**  */
  "attr:thumb-size"?: unknown | undefined;
  /**  */
  "attr:thumb-min-size"?: unknown | undefined;
  /**  */
  "attr:border-radius"?: unknown | undefined;
  /**  */
  "prop:autoHide"?: EosScrollbar["autoHide"] | undefined;
  /** 当前滚动比例 0~1 */
  "prop:ratio"?: EosScrollbar["ratio"] | undefined;
  /** 滑块占轨道比例 0~1 */
  "prop:thumbRatio"?: EosScrollbar["thumbRatio"] | undefined;
  /**  */
  "on:scroll-change"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type EosSelectProps = {
  /**  */
  value?: unknown | undefined;
  /**  */
  undefined?: unknown | undefined;
  /**  */
  open?: unknown | undefined;
  /**  */
  disabled?: unknown | undefined;
  /**  */
  placeholder?: unknown | undefined;
  /**  */
  "aria-label"?: unknown | undefined;
  /**  */
  "aria-labelledby"?: unknown | undefined;
  /**  */
  placement?: unknown | undefined;
  /**  */
  options?: EosSelect["options"] | undefined;
  /**  */
  boundary?: EosSelect["boundary"] | undefined;

  /**  */
  onchange?: ((e: CustomEvent) => void) | undefined;
};

export type EosSelectSolidJsProps = {
  /**  */
  "attr:value"?: unknown | undefined;
  /**  */
  "prop:undefined"?: unknown | undefined;
  /**  */
  "attr:open"?: unknown | undefined;
  /**  */
  "attr:disabled"?: unknown | undefined;
  /**  */
  "attr:placeholder"?: unknown | undefined;
  /**  */
  "attr:aria-label"?: unknown | undefined;
  /**  */
  "attr:aria-labelledby"?: unknown | undefined;
  /**  */
  "attr:placement"?: unknown | undefined;
  /**  */
  "prop:options"?: EosSelect["options"] | undefined;
  /**  */
  "prop:boundary"?: EosSelect["boundary"] | undefined;
  /**  */
  "on:change"?: ((e: CustomEvent) => void) | undefined;

  /** Set the innerHTML of the element */
  innerHTML?: string | undefined;
  /** Set the textContent of the element */
  textContent?: string | number | undefined;
};

export type CustomElements = {
  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `aria-label`/`undefined`: undefined
   * - `aria-keyshortcuts`/`undefined`: undefined
   * - `aria-pressed`/`undefined`: undefined
   * - `color`/`undefined`: undefined
   * - `disabled`/`undefined`: undefined
   * - `full-width`/`undefined`: undefined
   * - `icon-only`/`undefined`: undefined
   * - `loading`/`undefined`: undefined
   * - `name`/`undefined`: undefined
   * - `size`/`undefined`: undefined
   * - `type`/`undefined`: undefined
   * - `value`/`undefined`: undefined
   * - `variant`/`undefined`: undefined
   * - `disabled`: undefined (property only)
   * - `loading`: undefined (property only)
   */
  "eos-button": Partial<EosButtonProps & BaseProps<EosButton> & BaseEvents>;

  /**
   * A swipeable, bounded-DOM stack of cards. Set `itemCount` and `renderItem` after
   * creating the element; three cards rest in the stack, with one extra card
   * mounted briefly while a new neighbour is revealed.
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `item-count`/`undefined`: Number of cards in the external data source
   * - `initial-index`/`undefined`: Initial zero-based index
   * - `loop`/`undefined`: Wrap at either end
   * - `itemCount`: undefined (property only)
   * - `initialIndex`: undefined (property only)
   * - `loop`: undefined (property only)
   * - `currentIndex`: undefined (property only) (readonly)
   * - `renderItem`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `change`: detail: { currentIndex, previousIndex }
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `refresh() => void`: Rebuild the visible window after an external item changes.
   * - `next() => void`: undefined
   * - `prev() => void`: undefined
   * - `goTo(index: number) => void`: Adjacent moves animate; distant jumps replace the visible window directly.
   */
  "eos-card-stack": Partial<
    EosCardStackProps & BaseProps<EosCardStack> & BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `autoplay`/`undefined`: undefined
   * - `interval`/`undefined`: undefined
   * - `loop`/`undefined`: undefined
   * - `show-navigation`/`undefined`: undefined
   * - `initial-index`/`undefined`: undefined
   * - `indicator-position`/`undefined`: undefined
   * - `indicator-style`/`undefined`: undefined
   * - `virtual-threshold`/`undefined`: undefined
   * - `autoplay`: undefined (property only)
   * - `interval`: undefined (property only)
   * - `loop`: undefined (property only)
   * - `showNavigation`: undefined (property only)
   * - `initialIndex`: undefined (property only)
   * - `indicatorPosition`: undefined (property only)
   * - `indicatorStyle`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `slide-active`: undefined
   * - `slide-click`: undefined
   * - `change`: undefined
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `next() => void`: undefined
   * - `prev() => void`: undefined
   * - `goTo(index: number) => void`: undefined
   * - `play() => void`: undefined
   * - `setSlideLoading(loading: boolean) => void`: 设置当前 slide 为加载中状态（波纹动画）
   * 调用 startSlideProgress 时会自动结束加载状态
   * - `startSlideProgress(options?: { duration?: number; onComplete?: () => void }, options.duration, options.onComplete) => void`: 开始当前 slide 的进度倒计时
   * - `stopSlideProgress() => void`: undefined
   * - `pauseSlideProgress() => void`: 暂停当前 slide 的进度并保留已完成的进度
   * - `resumeSlideProgress() => void`: 恢复当前 slide 从暂停位置继续进度
   * - `pause() => void`: undefined
   * - `updateProgress(progress: number) => void`: 手动同步进度显示（用于视频播放进度）
   */
  "eos-carousel": Partial<
    EosCarouselProps & BaseProps<EosCarousel> & BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `src`/`undefined`: undefined
   * - `src-type`/`undefined`: undefined
   * - `alt`/`undefined`: undefined
   * - `width`/`undefined`: undefined
   * - `height`/`undefined`: undefined
   * - `loading`/`undefined`: undefined
   * - `crossorigin`/`undefined`: undefined
   * - `object-fit`/`undefined`: undefined
   * - `placeholder`/`undefined`: undefined
   * - `placeholder-type`/`undefined`: undefined
   * - `placeholder-fill`/`undefined`: undefined
   * - `show-delay`/`undefined`: undefined
   * - `responsive`/`undefined`: undefined
   * - `circle`/`undefined`: undefined
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `blurhash-error`: undefined
   */
  "eos-image": Partial<EosImageProps & BaseProps<EosImage> & BaseEvents>;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `total`/`undefined`: undefined
   * - `current`/`undefined`: undefined
   * - `variant`/`undefined`: undefined
   * - `position`/`undefined`: undefined
   * - `loading`/`undefined`: undefined
   * - `aria-label`/`undefined`: undefined
   * - `scrubbable`/`undefined`: undefined
   * - `total`: undefined (property only)
   * - `current`: undefined (property only)
   * - `variant`: undefined (property only)
   * - `position`: undefined (property only)
   * - `loading`: undefined (property only)
   * - `segmentLabels`: Localized labels, one per segment. No HTML is interpreted. (property only)
   * - `progress`: undefined (property only) (readonly)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `segment-click`: undefined
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `getSegment(index: number) => HTMLButtonElement | undefined`: A segment's native button, for tooltip anchoring and native events.
   * - `getSegmentIndexAt(clientX: number, clientY: number) => number | undefined`: Resolve the nearest visible segment, including gaps and vertical layouts.
   * - `setState(current: number, progress: number) => void`: One playback clock can update the segment and its fraction without starting another RAF.
   * - `startProgress(options?: { duration?: number; onComplete?: () => void }) => void`: 开始当前段的进度动画
   * - `stopProgress() => void`: Stop the internal clock and retain the displayed fraction.
   * - `pauseProgress() => void`: undefined
   * - `resumeProgress() => void`: undefined
   * - `setProgress(value: number) => void`: External-clock update: only the cached active fill's transform changes per frame.
   * - `setLoading(v: boolean) => void`: 设置加载状态
   */
  "eos-progress-bar": Partial<
    EosProgressBarProps & BaseProps<EosProgressBar> & BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `items`/`undefined`: undefined
   * - `layout`/`undefined`: undefined
   * - `max-visible`/`undefined`: undefined
   * - `items`: undefined (property only)
   * - `layout`: undefined (property only)
   * - `maxVisible`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `image-click`: undefined
   */
  "eos-image-group": Partial<
    EosImageGroupProps & BaseProps<EosImageGroup> & BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `direction`/`undefined`: undefined
   * - `auto-hide`/`undefined`: undefined
   * - `thumb-color`/`undefined`: undefined
   * - `track-color`/`undefined`: undefined
   * - `thumb-size`/`undefined`: undefined
   * - `thumb-min-size`/`undefined`: undefined
   * - `border-radius`/`undefined`: undefined
   * - `direction`: undefined (property only)
   * - `autoHide`: undefined (property only)
   * - `thumbColor`: undefined (property only) (readonly)
   * - `trackColor`: undefined (property only) (readonly)
   * - `thumbSize`: undefined (property only) (readonly)
   * - `thumbMinSize`: undefined (property only) (readonly)
   * - `borderRadius`: undefined (property only) (readonly)
   * - `ratio`: 当前滚动比例 0~1 (property only)
   * - `thumbRatio`: 滑块占轨道比例 0~1 (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `scroll-change`: undefined
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `attach(el: HTMLElement) => void`: 绑定到一个可滚动的 DOM 元素，自动同步滚动位置
   * - `detach() => void`: 解除与目标元素的绑定
   * - `setVirtualScroll(options: {
   * 		contentSize: number;
   * 		viewportSize: number;
   * 		scrollOffset: number;
   * 	}, options.contentSize, options.viewportSize, options.scrollOffset) => void`: 虚拟列表模式：手动设置滚动状态。
   * 适用于虚拟列表/虚拟滚动场景，DOM 实际高度与逻辑内容高度不一致时使用。
   * - `clearVirtualScroll() => void`: 退出虚拟列表模式，恢复为自动从 DOM 同步
   */
  "eos-scrollbar": Partial<
    EosScrollbarProps & BaseProps<EosScrollbar> & BaseEvents
  >;
  "eos-scene": Partial<EosSceneProps & BaseProps<EosScene> & BaseEvents>;
  "eos-scene-item": Partial<EosSceneItemProps & BaseProps<EosSceneItem> & BaseEvents>;
};

export type CustomElementsSolidJs = {
  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `aria-label`/`undefined`: undefined
   * - `aria-keyshortcuts`/`undefined`: undefined
   * - `aria-pressed`/`undefined`: undefined
   * - `color`/`undefined`: undefined
   * - `disabled`/`undefined`: undefined
   * - `full-width`/`undefined`: undefined
   * - `icon-only`/`undefined`: undefined
   * - `loading`/`undefined`: undefined
   * - `name`/`undefined`: undefined
   * - `size`/`undefined`: undefined
   * - `type`/`undefined`: undefined
   * - `value`/`undefined`: undefined
   * - `variant`/`undefined`: undefined
   * - `disabled`: undefined (property only)
   * - `loading`: undefined (property only)
   */
  "eos-button": Partial<
    EosButtonProps & EosButtonSolidJsProps & BaseProps<EosButton> & BaseEvents
  >;

  /**
   * A swipeable, bounded-DOM stack of cards. Set `itemCount` and `renderItem` after
   * creating the element; three cards rest in the stack, with one extra card
   * mounted briefly while a new neighbour is revealed.
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `item-count`/`undefined`: Number of cards in the external data source
   * - `initial-index`/`undefined`: Initial zero-based index
   * - `loop`/`undefined`: Wrap at either end
   * - `itemCount`: undefined (property only)
   * - `initialIndex`: undefined (property only)
   * - `loop`: undefined (property only)
   * - `currentIndex`: undefined (property only) (readonly)
   * - `renderItem`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `change`: detail: { currentIndex, previousIndex }
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `refresh() => void`: Rebuild the visible window after an external item changes.
   * - `next() => void`: undefined
   * - `prev() => void`: undefined
   * - `goTo(index: number) => void`: Adjacent moves animate; distant jumps replace the visible window directly.
   */
  "eos-card-stack": Partial<
    EosCardStackProps &
      EosCardStackSolidJsProps &
      BaseProps<EosCardStack> &
      BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `autoplay`/`undefined`: undefined
   * - `interval`/`undefined`: undefined
   * - `loop`/`undefined`: undefined
   * - `show-navigation`/`undefined`: undefined
   * - `initial-index`/`undefined`: undefined
   * - `indicator-position`/`undefined`: undefined
   * - `indicator-style`/`undefined`: undefined
   * - `virtual-threshold`/`undefined`: undefined
   * - `autoplay`: undefined (property only)
   * - `interval`: undefined (property only)
   * - `loop`: undefined (property only)
   * - `showNavigation`: undefined (property only)
   * - `initialIndex`: undefined (property only)
   * - `indicatorPosition`: undefined (property only)
   * - `indicatorStyle`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `slide-active`: undefined
   * - `slide-click`: undefined
   * - `change`: undefined
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `next() => void`: undefined
   * - `prev() => void`: undefined
   * - `goTo(index: number) => void`: undefined
   * - `play() => void`: undefined
   * - `setSlideLoading(loading: boolean) => void`: 设置当前 slide 为加载中状态（波纹动画）
   * 调用 startSlideProgress 时会自动结束加载状态
   * - `startSlideProgress(options?: { duration?: number; onComplete?: () => void }, options.duration, options.onComplete) => void`: 开始当前 slide 的进度倒计时
   * - `stopSlideProgress() => void`: undefined
   * - `pauseSlideProgress() => void`: 暂停当前 slide 的进度并保留已完成的进度
   * - `resumeSlideProgress() => void`: 恢复当前 slide 从暂停位置继续进度
   * - `pause() => void`: undefined
   * - `updateProgress(progress: number) => void`: 手动同步进度显示（用于视频播放进度）
   */
  "eos-carousel": Partial<
    EosCarouselProps &
      EosCarouselSolidJsProps &
      BaseProps<EosCarousel> &
      BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `src`/`undefined`: undefined
   * - `src-type`/`undefined`: undefined
   * - `alt`/`undefined`: undefined
   * - `width`/`undefined`: undefined
   * - `height`/`undefined`: undefined
   * - `loading`/`undefined`: undefined
   * - `crossorigin`/`undefined`: undefined
   * - `object-fit`/`undefined`: undefined
   * - `placeholder`/`undefined`: undefined
   * - `placeholder-type`/`undefined`: undefined
   * - `placeholder-fill`/`undefined`: undefined
   * - `show-delay`/`undefined`: undefined
   * - `responsive`/`undefined`: undefined
   * - `circle`/`undefined`: undefined
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `blurhash-error`: undefined
   */
  "eos-image": Partial<
    EosImageProps & EosImageSolidJsProps & BaseProps<EosImage> & BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `total`/`undefined`: undefined
   * - `current`/`undefined`: undefined
   * - `variant`/`undefined`: undefined
   * - `position`/`undefined`: undefined
   * - `loading`/`undefined`: undefined
   * - `aria-label`/`undefined`: undefined
   * - `scrubbable`/`undefined`: undefined
   * - `total`: undefined (property only)
   * - `current`: undefined (property only)
   * - `variant`: undefined (property only)
   * - `position`: undefined (property only)
   * - `loading`: undefined (property only)
   * - `segmentLabels`: Localized labels, one per segment. No HTML is interpreted. (property only)
   * - `progress`: undefined (property only) (readonly)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `segment-click`: undefined
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `getSegment(index: number) => HTMLButtonElement | undefined`: A segment's native button, for tooltip anchoring and native events.
   * - `getSegmentIndexAt(clientX: number, clientY: number) => number | undefined`: Resolve the nearest visible segment, including gaps and vertical layouts.
   * - `setState(current: number, progress: number) => void`: One playback clock can update the segment and its fraction without starting another RAF.
   * - `startProgress(options?: { duration?: number; onComplete?: () => void }) => void`: 开始当前段的进度动画
   * - `stopProgress() => void`: Stop the internal clock and retain the displayed fraction.
   * - `pauseProgress() => void`: undefined
   * - `resumeProgress() => void`: undefined
   * - `setProgress(value: number) => void`: External-clock update: only the cached active fill's transform changes per frame.
   * - `setLoading(v: boolean) => void`: 设置加载状态
   */
  "eos-progress-bar": Partial<
    EosProgressBarProps &
      EosProgressBarSolidJsProps &
      BaseProps<EosProgressBar> &
      BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `items`/`undefined`: undefined
   * - `layout`/`undefined`: undefined
   * - `max-visible`/`undefined`: undefined
   * - `items`: undefined (property only)
   * - `layout`: undefined (property only)
   * - `maxVisible`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `image-click`: undefined
   */
  "eos-image-group": Partial<
    EosImageGroupProps &
      EosImageGroupSolidJsProps &
      BaseProps<EosImageGroup> &
      BaseEvents
  >;

  /**
   *
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `direction`/`undefined`: undefined
   * - `auto-hide`/`undefined`: undefined
   * - `thumb-color`/`undefined`: undefined
   * - `track-color`/`undefined`: undefined
   * - `thumb-size`/`undefined`: undefined
   * - `thumb-min-size`/`undefined`: undefined
   * - `border-radius`/`undefined`: undefined
   * - `direction`: undefined (property only)
   * - `autoHide`: undefined (property only)
   * - `thumbColor`: undefined (property only) (readonly)
   * - `trackColor`: undefined (property only) (readonly)
   * - `thumbSize`: undefined (property only) (readonly)
   * - `thumbMinSize`: undefined (property only) (readonly)
   * - `borderRadius`: undefined (property only) (readonly)
   * - `ratio`: 当前滚动比例 0~1 (property only)
   * - `thumbRatio`: 滑块占轨道比例 0~1 (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `scroll-change`: undefined
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `attach(el: HTMLElement) => void`: 绑定到一个可滚动的 DOM 元素，自动同步滚动位置
   * - `detach() => void`: 解除与目标元素的绑定
   * - `setVirtualScroll(options: {
   * 		contentSize: number;
   * 		viewportSize: number;
   * 		scrollOffset: number;
   * 	}, options.contentSize, options.viewportSize, options.scrollOffset) => void`: 虚拟列表模式：手动设置滚动状态。
   * 适用于虚拟列表/虚拟滚动场景，DOM 实际高度与逻辑内容高度不一致时使用。
   * - `clearVirtualScroll() => void`: 退出虚拟列表模式，恢复为自动从 DOM 同步
   */
  "eos-scrollbar": Partial<
    EosScrollbarProps &
      EosScrollbarSolidJsProps &
      BaseProps<EosScrollbar> &
      BaseEvents
  >;
  "eos-select": Partial<EosSelectProps & EosSelectSolidJsProps & BaseProps<EosSelect> & BaseEvents>;
  "eos-select": Partial<EosSelectProps & BaseProps<EosSelect> & BaseEvents>;
  "eos-scene": Partial<EosSceneProps & EosSceneSolidJsProps & BaseProps<EosScene> & BaseEvents>;
  "eos-scene-item": Partial<EosSceneItemProps & EosSceneItemSolidJsProps & BaseProps<EosSceneItem> & BaseEvents>;
};

export type CustomCssProperties = {};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "react/jsx-dev-runtime" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "@builder.io/qwik" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "@stencil/core" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "hono/jsx" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "react-native" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements extends CustomElementsSolidJs {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  export interface CSSProperties extends CustomCssProperties {}
}
