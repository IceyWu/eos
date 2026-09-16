import type {
  EosButton,
  EosCarousel,
  EosImage,
  EosProgressBar,
  EosScrollbar,
} from "@eosjs/components";

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
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: any;
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number> | any;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
  /** The popover global attribute is used to designate an element as a popover element. */
  popover?: "auto" | "hint" | "manual";
  /** Turns an element element into a popover control button; takes the ID of the popover element to control as its value. */
  popovertarget?: "top" | "bottom" | "left" | "right" | "auto";
  /** Specifies the action to be performed on a popover element being controlled by a control element. */
  popovertargetaction?: "show" | "hide" | "toggle";
};

type BaseEvents = {};

export type EosButtonProps = {
  /**  */
  "aria-label"?: unknown;
  /**  */
  undefined?: unknown;
  /**  */
  color?: unknown;
  /**  */
  disabled?: unknown;
  /**  */
  "full-width"?: unknown;
  /**  */
  "icon-only"?: unknown;
  /**  */
  loading?: unknown;
  /**  */
  name?: unknown;
  /**  */
  size?: unknown;
  /**  */
  type?: unknown;
  /**  */
  value?: unknown;
  /**  */
  variant?: unknown;
};

export type EosButtonSolidJsProps = {
  /**  */
  "attr:aria-label"?: unknown;
  /**  */
  "prop:undefined"?: unknown;
  /**  */
  "attr:color"?: unknown;
  /**  */
  "attr:disabled"?: unknown;
  /**  */
  "attr:full-width"?: unknown;
  /**  */
  "attr:icon-only"?: unknown;
  /**  */
  "attr:loading"?: unknown;
  /**  */
  "attr:name"?: unknown;
  /**  */
  "attr:size"?: unknown;
  /**  */
  "attr:type"?: unknown;
  /**  */
  "attr:value"?: unknown;
  /**  */
  "attr:variant"?: unknown;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type EosCarouselProps = {
  /** 是否自动播放 */
  autoplay?: unknown;
  /** 是否自动播放 */
  undefined?: unknown;
  /** 自动播放间隔（毫秒），最小 1000，默认 2000 */
  interval?: unknown;
  /** 是否循环播放 */
  loop?: unknown;
  /** 是否显示导航按钮，默认 true */
  "show-navigation"?: unknown;
  /** 初始显示的 slide 索引 */
  "initial-index"?: unknown;
  /** 指示器位置 */
  "indicator-position"?: unknown;
  /** 指示器样式 */
  "indicator-style"?: unknown;
  /** 虚拟化阈值，超过此值自动开启三槽虚拟渲染，默认 8 */
  "virtual-threshold"?: unknown;
  /**  */
  showNavigation?: EosCarousel["showNavigation"];
  /**  */
  initialIndex?: EosCarousel["initialIndex"];
  /**  */
  indicatorPosition?: EosCarousel["indicatorPosition"];
  /**  */
  indicatorStyle?: EosCarousel["indicatorStyle"];

  /** 当前 slide 激活时触发 */
  "onslide-active"?: (e: CustomEvent) => void;
  /** 点击 slide 时触发 */
  "onslide-click"?: (e: CustomEvent) => void;
  /** 切换 slide 时触发，detail: { currentIndex, previousIndex } */
  onchange?: (e: CustomEvent) => void;
};

export type EosCarouselSolidJsProps = {
  /** 是否自动播放 */
  "bool:autoplay"?: unknown;
  /** 是否自动播放 */
  "prop:undefined"?: unknown;
  /** 自动播放间隔（毫秒），最小 1000，默认 2000 */
  "attr:interval"?: unknown;
  /** 是否循环播放 */
  "bool:loop"?: unknown;
  /** 是否显示导航按钮，默认 true */
  "attr:show-navigation"?: unknown;
  /** 初始显示的 slide 索引 */
  "attr:initial-index"?: unknown;
  /** 指示器位置 */
  "attr:indicator-position"?: unknown;
  /** 指示器样式 */
  "attr:indicator-style"?: unknown;
  /** 虚拟化阈值，超过此值自动开启三槽虚拟渲染，默认 8 */
  "attr:virtual-threshold"?: unknown;
  /**  */
  "prop:showNavigation"?: EosCarousel["showNavigation"];
  /**  */
  "prop:initialIndex"?: EosCarousel["initialIndex"];
  /**  */
  "prop:indicatorPosition"?: EosCarousel["indicatorPosition"];
  /**  */
  "prop:indicatorStyle"?: EosCarousel["indicatorStyle"];
  /** 当前 slide 激活时触发 */
  "on:slide-active"?: (e: CustomEvent) => void;
  /** 点击 slide 时触发 */
  "on:slide-click"?: (e: CustomEvent) => void;
  /** 切换 slide 时触发，detail: { currentIndex, previousIndex } */
  "on:change"?: (e: CustomEvent) => void;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type EosImageProps = {
  /** Image URL or BlurHash string. */
  src?: unknown;
  /** Image URL or BlurHash string. */
  undefined?: unknown;
  /** How to interpret `src` (default: url). */
  "src-type"?: unknown;
  /** Alternative text for the image. */
  alt?: unknown;
  /** Host width. */
  width?: unknown;
  /** Host height. */
  height?: unknown;
  /** Whether to wait for viewport visibility. */
  loading?: unknown;
  /** Native cross-origin image setting. */
  crossorigin?: unknown;
  /** Native image fitting mode. */
  "object-fit"?: unknown;
  /** Placeholder URL or BlurHash string. */
  placeholder?: unknown;
  /** How to interpret the placeholder. */
  "placeholder-type"?: unknown;
  /** Keep the placeholder as a background layer. */
  "placeholder-fill"?: unknown;
  /** Delay before revealing a loaded image, in milliseconds. */
  "show-delay"?: unknown;
  /** Make the image follow its container width. */
  responsive?: unknown;
  /** Clip the image to a circle. */
  circle?: unknown;

  /**  */
  "onblurhash-error"?: (e: CustomEvent) => void;
  /** The image is ready to display. */
  onload?: (e: Event) => void;
  /** The image failed to load. */
  onerror?: (e: Event) => void;
  /** Network progress with detail `{ loaded, total, src }`. */
  onprogress?: (e: CustomEvent) => void;
};

export type EosImageSolidJsProps = {
  /** Image URL or BlurHash string. */
  "attr:src"?: unknown;
  /** Image URL or BlurHash string. */
  "prop:undefined"?: unknown;
  /** How to interpret `src` (default: url). */
  "attr:src-type"?: unknown;
  /** Alternative text for the image. */
  "attr:alt"?: unknown;
  /** Host width. */
  "attr:width"?: unknown;
  /** Host height. */
  "attr:height"?: unknown;
  /** Whether to wait for viewport visibility. */
  "attr:loading"?: unknown;
  /** Native cross-origin image setting. */
  "attr:crossorigin"?: unknown;
  /** Native image fitting mode. */
  "attr:object-fit"?: unknown;
  /** Placeholder URL or BlurHash string. */
  "attr:placeholder"?: unknown;
  /** How to interpret the placeholder. */
  "attr:placeholder-type"?: unknown;
  /** Keep the placeholder as a background layer. */
  "attr:placeholder-fill"?: unknown;
  /** Delay before revealing a loaded image, in milliseconds. */
  "attr:show-delay"?: unknown;
  /** Make the image follow its container width. */
  "bool:responsive"?: unknown;
  /** Clip the image to a circle. */
  "bool:circle"?: unknown;
  /**  */
  "on:blurhash-error"?: (e: CustomEvent) => void;
  /** The image is ready to display. */
  "on:load"?: (e: Event) => void;
  /** The image failed to load. */
  "on:error"?: (e: Event) => void;
  /** Network progress with detail `{ loaded, total, src }`. */
  "on:progress"?: (e: CustomEvent) => void;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type EosProgressBarProps = {
  /** 总段数 */
  total?: unknown;
  /** 总段数 */
  undefined?: unknown;
  /** 当前激活的段索引（0-based） */
  current?: unknown;
  /** 样式变体 */
  variant?: unknown;
  /** 位置方向 */
  position?: unknown;
  /** 当前段是否显示加载波纹 */
  loading?: unknown;

  /** 点击某段时触发，detail: { index } */
  "onsegment-click"?: (e: CustomEvent) => void;
};

export type EosProgressBarSolidJsProps = {
  /** 总段数 */
  "attr:total"?: unknown;
  /** 总段数 */
  "prop:undefined"?: unknown;
  /** 当前激活的段索引（0-based） */
  "attr:current"?: unknown;
  /** 样式变体 */
  "attr:variant"?: unknown;
  /** 位置方向 */
  "attr:position"?: unknown;
  /** 当前段是否显示加载波纹 */
  "bool:loading"?: unknown;
  /** 点击某段时触发，detail: { index } */
  "on:segment-click"?: (e: CustomEvent) => void;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type EosScrollbarProps = {
  /** 滚动方向，默认 horizontal */
  direction?: unknown;
  /** 滚动方向，默认 horizontal */
  undefined?: unknown;
  /** 是否自动隐藏（无交互时淡出），默认 false */
  "auto-hide"?: unknown;
  /** 滑块颜色 */
  "thumb-color"?: unknown;
  /** 轨道颜色 */
  "track-color"?: unknown;
  /** 滑块粗细（px），默认 6 */
  "thumb-size"?: unknown;
  /** 滑块最小长度（px），默认 30 */
  "thumb-min-size"?: unknown;
  /** 圆角（px），默认 3 */
  "border-radius"?: unknown;
  /**  */
  autoHide?: EosScrollbar["autoHide"];
  /** 当前滚动比例 0~1 */
  ratio?: EosScrollbar["ratio"];
  /** 滑块占轨道比例 0~1 */
  thumbRatio?: EosScrollbar["thumbRatio"];

  /** 滚动位置变化，detail: { position, ratio, scrollOffset? } */
  "onscroll-change"?: (e: CustomEvent) => void;
};

export type EosScrollbarSolidJsProps = {
  /** 滚动方向，默认 horizontal */
  "attr:direction"?: unknown;
  /** 滚动方向，默认 horizontal */
  "prop:undefined"?: unknown;
  /** 是否自动隐藏（无交互时淡出），默认 false */
  "bool:auto-hide"?: unknown;
  /** 滑块颜色 */
  "attr:thumb-color"?: unknown;
  /** 轨道颜色 */
  "attr:track-color"?: unknown;
  /** 滑块粗细（px），默认 6 */
  "attr:thumb-size"?: unknown;
  /** 滑块最小长度（px），默认 30 */
  "attr:thumb-min-size"?: unknown;
  /** 圆角（px），默认 3 */
  "attr:border-radius"?: unknown;
  /**  */
  "prop:autoHide"?: EosScrollbar["autoHide"];
  /** 当前滚动比例 0~1 */
  "prop:ratio"?: EosScrollbar["ratio"];
  /** 滑块占轨道比例 0~1 */
  "prop:thumbRatio"?: EosScrollbar["thumbRatio"];
  /** 滚动位置变化，detail: { position, ratio, scrollOffset? } */
  "on:scroll-change"?: (e: CustomEvent) => void;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type CustomElements = {
  /**
   * EOS Button
   *
   * EOS Button custom element.
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `aria-label`/`undefined`: undefined
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
   * EosCarousel 组件
   * 类似抖音 Web 版风格的轮播图组件，支持自动播放、手动导航、触摸滑动等功能
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `autoplay`/`undefined`: 是否自动播放
   * - `interval`/`undefined`: 自动播放间隔（毫秒），最小 1000，默认 2000
   * - `loop`/`undefined`: 是否循环播放
   * - `show-navigation`/`undefined`: 是否显示导航按钮，默认 true
   * - `initial-index`/`undefined`: 初始显示的 slide 索引
   * - `indicator-position`/`undefined`: 指示器位置
   * - `indicator-style`/`undefined`: 指示器样式
   * - `virtual-threshold`/`undefined`: 虚拟化阈值，超过此值自动开启三槽虚拟渲染，默认 8
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
   * - `slide-active`: 当前 slide 激活时触发
   * - `slide-click`: 点击 slide 时触发
   * - `change`: 切换 slide 时触发，detail: { currentIndex, previousIndex }
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
   * EOS Image is a framework-agnostic image element with native image events,
   * lazy loading, BlurHash placeholders, and explicit loading and error states.
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `src`/`undefined`: Image URL or BlurHash string.
   * - `src-type`/`undefined`: How to interpret `src` (default: url).
   * - `alt`/`undefined`: Alternative text for the image.
   * - `width`/`undefined`: Host width.
   * - `height`/`undefined`: Host height.
   * - `loading`/`undefined`: Whether to wait for viewport visibility.
   * - `crossorigin`/`undefined`: Native cross-origin image setting.
   * - `object-fit`/`undefined`: Native image fitting mode.
   * - `placeholder`/`undefined`: Placeholder URL or BlurHash string.
   * - `placeholder-type`/`undefined`: How to interpret the placeholder.
   * - `placeholder-fill`/`undefined`: Keep the placeholder as a background layer.
   * - `show-delay`/`undefined`: Delay before revealing a loaded image, in milliseconds.
   * - `responsive`/`undefined`: Make the image follow its container width.
   * - `circle`/`undefined`: Clip the image to a circle.
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `blurhash-error`: undefined
   * - `load`: The image is ready to display.
   * - `error`: The image failed to load.
   * - `progress`: Network progress with detail `{ loaded, total, src }`.
   */
  "eos-image": Partial<EosImageProps & BaseProps<EosImage> & BaseEvents>;

  /**
   * EosProgressBar 组件
   * 分段式进度条，支持 default / dots / tiktok 三种样式，
   * 支持加载波纹动画、自定义进度填充、水平/垂直方向。
   * 可独立使用，也可嵌入 eos-carousel。
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `total`/`undefined`: 总段数
   * - `current`/`undefined`: 当前激活的段索引（0-based）
   * - `variant`/`undefined`: 样式变体
   * - `position`/`undefined`: 位置方向
   * - `loading`/`undefined`: 当前段是否显示加载波纹
   * - `total`: undefined (property only)
   * - `current`: undefined (property only)
   * - `variant`: undefined (property only)
   * - `position`: undefined (property only)
   * - `loading`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `segment-click`: 点击某段时触发，detail: { index }
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `startProgress(options?: { duration?: number; onComplete?: () => void }) => void`: 开始当前段的进度动画
   * - `stopProgress() => void`: 停止进度动画
   * - `setProgress(value: number) => void`: 手动设置进度 0-100
   * - `setLoading(v: boolean) => void`: 设置加载状态
   */
  "eos-progress-bar": Partial<
    EosProgressBarProps & BaseProps<EosProgressBar> & BaseEvents
  >;

  /**
   * EosScrollbar 组件
   * 自定义滚动条，可独立使用或嵌入任意可滚动容器。
   * 支持水平/垂直方向、拖拽交互、自动隐藏、自定义样式。
   * 支持虚拟列表模式：通过 setVirtualScroll 手动驱动滚动状态。
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `direction`/`undefined`: 滚动方向，默认 horizontal
   * - `auto-hide`/`undefined`: 是否自动隐藏（无交互时淡出），默认 false
   * - `thumb-color`/`undefined`: 滑块颜色
   * - `track-color`/`undefined`: 轨道颜色
   * - `thumb-size`/`undefined`: 滑块粗细（px），默认 6
   * - `thumb-min-size`/`undefined`: 滑块最小长度（px），默认 30
   * - `border-radius`/`undefined`: 圆角（px），默认 3
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
   * - `scroll-change`: 滚动位置变化，detail: { position, ratio, scrollOffset? }
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `attach(el: HTMLElement) => void`: 绑定到一个可滚动的 DOM 元素，自动同步滚动位置
   * - `detach() => void`: 解除与目标元素的绑定
   * - `setVirtualScroll(options: { contentSize: number; viewportSize: number; scrollOffset: number }, options.contentSize, options.viewportSize, options.scrollOffset) => void`: 虚拟列表模式：手动设置滚动状态。
   * 适用于虚拟列表/虚拟滚动场景，DOM 实际高度与逻辑内容高度不一致时使用。
   * - `clearVirtualScroll() => void`: 退出虚拟列表模式，恢复为自动从 DOM 同步
   */
  "eos-scrollbar": Partial<
    EosScrollbarProps & BaseProps<EosScrollbar> & BaseEvents
  >;
};

export type CustomElementsSolidJs = {
  /**
   * EOS Button
   *
   * EOS Button custom element.
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `aria-label`/`undefined`: undefined
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
   * EosCarousel 组件
   * 类似抖音 Web 版风格的轮播图组件，支持自动播放、手动导航、触摸滑动等功能
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `autoplay`/`undefined`: 是否自动播放
   * - `interval`/`undefined`: 自动播放间隔（毫秒），最小 1000，默认 2000
   * - `loop`/`undefined`: 是否循环播放
   * - `show-navigation`/`undefined`: 是否显示导航按钮，默认 true
   * - `initial-index`/`undefined`: 初始显示的 slide 索引
   * - `indicator-position`/`undefined`: 指示器位置
   * - `indicator-style`/`undefined`: 指示器样式
   * - `virtual-threshold`/`undefined`: 虚拟化阈值，超过此值自动开启三槽虚拟渲染，默认 8
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
   * - `slide-active`: 当前 slide 激活时触发
   * - `slide-click`: 点击 slide 时触发
   * - `change`: 切换 slide 时触发，detail: { currentIndex, previousIndex }
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
   * EOS Image is a framework-agnostic image element with native image events,
   * lazy loading, BlurHash placeholders, and explicit loading and error states.
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `src`/`undefined`: Image URL or BlurHash string.
   * - `src-type`/`undefined`: How to interpret `src` (default: url).
   * - `alt`/`undefined`: Alternative text for the image.
   * - `width`/`undefined`: Host width.
   * - `height`/`undefined`: Host height.
   * - `loading`/`undefined`: Whether to wait for viewport visibility.
   * - `crossorigin`/`undefined`: Native cross-origin image setting.
   * - `object-fit`/`undefined`: Native image fitting mode.
   * - `placeholder`/`undefined`: Placeholder URL or BlurHash string.
   * - `placeholder-type`/`undefined`: How to interpret the placeholder.
   * - `placeholder-fill`/`undefined`: Keep the placeholder as a background layer.
   * - `show-delay`/`undefined`: Delay before revealing a loaded image, in milliseconds.
   * - `responsive`/`undefined`: Make the image follow its container width.
   * - `circle`/`undefined`: Clip the image to a circle.
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `blurhash-error`: undefined
   * - `load`: The image is ready to display.
   * - `error`: The image failed to load.
   * - `progress`: Network progress with detail `{ loaded, total, src }`.
   */
  "eos-image": Partial<
    EosImageProps & EosImageSolidJsProps & BaseProps<EosImage> & BaseEvents
  >;

  /**
   * EosProgressBar 组件
   * 分段式进度条，支持 default / dots / tiktok 三种样式，
   * 支持加载波纹动画、自定义进度填充、水平/垂直方向。
   * 可独立使用，也可嵌入 eos-carousel。
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `total`/`undefined`: 总段数
   * - `current`/`undefined`: 当前激活的段索引（0-based）
   * - `variant`/`undefined`: 样式变体
   * - `position`/`undefined`: 位置方向
   * - `loading`/`undefined`: 当前段是否显示加载波纹
   * - `total`: undefined (property only)
   * - `current`: undefined (property only)
   * - `variant`: undefined (property only)
   * - `position`: undefined (property only)
   * - `loading`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `segment-click`: 点击某段时触发，detail: { index }
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `startProgress(options?: { duration?: number; onComplete?: () => void }) => void`: 开始当前段的进度动画
   * - `stopProgress() => void`: 停止进度动画
   * - `setProgress(value: number) => void`: 手动设置进度 0-100
   * - `setLoading(v: boolean) => void`: 设置加载状态
   */
  "eos-progress-bar": Partial<
    EosProgressBarProps &
      EosProgressBarSolidJsProps &
      BaseProps<EosProgressBar> &
      BaseEvents
  >;

  /**
   * EosScrollbar 组件
   * 自定义滚动条，可独立使用或嵌入任意可滚动容器。
   * 支持水平/垂直方向、拖拽交互、自动隐藏、自定义样式。
   * 支持虚拟列表模式：通过 setVirtualScroll 手动驱动滚动状态。
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `direction`/`undefined`: 滚动方向，默认 horizontal
   * - `auto-hide`/`undefined`: 是否自动隐藏（无交互时淡出），默认 false
   * - `thumb-color`/`undefined`: 滑块颜色
   * - `track-color`/`undefined`: 轨道颜色
   * - `thumb-size`/`undefined`: 滑块粗细（px），默认 6
   * - `thumb-min-size`/`undefined`: 滑块最小长度（px），默认 30
   * - `border-radius`/`undefined`: 圆角（px），默认 3
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
   * - `scroll-change`: 滚动位置变化，detail: { position, ratio, scrollOffset? }
   *
   * ## Methods
   *
   * Methods that can be called to access component functionality.
   *
   * - `attach(el: HTMLElement) => void`: 绑定到一个可滚动的 DOM 元素，自动同步滚动位置
   * - `detach() => void`: 解除与目标元素的绑定
   * - `setVirtualScroll(options: { contentSize: number; viewportSize: number; scrollOffset: number }, options.contentSize, options.viewportSize, options.scrollOffset) => void`: 虚拟列表模式：手动设置滚动状态。
   * 适用于虚拟列表/虚拟滚动场景，DOM 实际高度与逻辑内容高度不一致时使用。
   * - `clearVirtualScroll() => void`: 退出虚拟列表模式，恢复为自动从 DOM 同步
   */
  "eos-scrollbar": Partial<
    EosScrollbarProps &
      EosScrollbarSolidJsProps &
      BaseProps<EosScrollbar> &
      BaseEvents
  >;
};

export type CustomCssProperties = {};

declare module "react" {
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
