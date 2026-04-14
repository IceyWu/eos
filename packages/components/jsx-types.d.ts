import type { EosButton, EosCarousel, EosImage } from "@eosjs/components";

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
  [Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`]: CustomElements[Key];
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

export type EosButtonProps = {};

export type EosButtonSolidJsProps = {
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
  /** 图片地址（URL 或 blurhash 字符串） */
  src?: unknown;
  /** 图片地址（URL 或 blurhash 字符串） */
  undefined?: unknown;
  /** src 的类型，默认 url */
  "src-type"?: unknown;
  /** 替代文本 */
  alt?: unknown;
  /** 宽度 */
  width?: unknown;
  /** 高度 */
  height?: unknown;
  /** 加载策略 */
  loading?: unknown;
  /** 跨域设置 */
  crossorigin?: unknown;
  /** 填充模式 */
  "object-fit"?: unknown;
  /** 占位内容（URL 或 blurhash 字符串） */
  placeholder?: unknown;
  /** 占位类型 */
  "placeholder-type"?: unknown;
  /** 占位填充模式 */
  "placeholder-fill"?: unknown;
  /** 图片显示延迟（毫秒） */
  "show-delay"?: unknown;
  /**  */
  onimageload?: EosImage["onimageload"];
  /**  */
  onimageerror?: EosImage["onimageerror"];
  /**  */
  onimageprogress?: EosImage["onimageprogress"];

  /**  */
  "onblurhash-error"?: (e: CustomEvent) => void;
  /** 图片加载成功 */
  onimageLoad?: (e: CustomEvent) => void;
  /** 图片加载失败 */
  onimageError?: (e: CustomEvent) => void;
  /** 图片加载进度 */
  onimageProgress?: (e: CustomEvent) => void;
};

export type EosImageSolidJsProps = {
  /** 图片地址（URL 或 blurhash 字符串） */
  "attr:src"?: unknown;
  /** 图片地址（URL 或 blurhash 字符串） */
  "prop:undefined"?: unknown;
  /** src 的类型，默认 url */
  "attr:src-type"?: unknown;
  /** 替代文本 */
  "attr:alt"?: unknown;
  /** 宽度 */
  "attr:width"?: unknown;
  /** 高度 */
  "attr:height"?: unknown;
  /** 加载策略 */
  "attr:loading"?: unknown;
  /** 跨域设置 */
  "attr:crossorigin"?: unknown;
  /** 填充模式 */
  "attr:object-fit"?: unknown;
  /** 占位内容（URL 或 blurhash 字符串） */
  "attr:placeholder"?: unknown;
  /** 占位类型 */
  "attr:placeholder-type"?: unknown;
  /** 占位填充模式 */
  "attr:placeholder-fill"?: unknown;
  /** 图片显示延迟（毫秒） */
  "attr:show-delay"?: unknown;
  /**  */
  "prop:onimageload"?: EosImage["onimageload"];
  /**  */
  "prop:onimageerror"?: EosImage["onimageerror"];
  /**  */
  "prop:onimageprogress"?: EosImage["onimageprogress"];
  /**  */
  "on:blurhash-error"?: (e: CustomEvent) => void;
  /** 图片加载成功 */
  "on:imageLoad"?: (e: CustomEvent) => void;
  /** 图片加载失败 */
  "on:imageError"?: (e: CustomEvent) => void;
  /** 图片加载进度 */
  "on:imageProgress"?: (e: CustomEvent) => void;

  /** Set the innerHTML of the element */
  innerHTML?: string;
  /** Set the textContent of the element */
  textContent?: string | number;
};

export type CustomElements = {
  /**
   * EosButton 组件
   * 一个简单的按钮组件
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
   * - `pause() => void`: undefined
   * - `updateProgress(progress: number) => void`: 手动同步进度显示（用于视频播放进度）
   */
  "eos-carousel": Partial<
    EosCarouselProps & BaseProps<EosCarousel> & BaseEvents
  >;

  /**
   * 优化的 EosImage 组件
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `src`/`undefined`: 图片地址（URL 或 blurhash 字符串）
   * - `src-type`/`undefined`: src 的类型，默认 url
   * - `alt`/`undefined`: 替代文本
   * - `width`/`undefined`: 宽度
   * - `height`/`undefined`: 高度
   * - `loading`/`undefined`: 加载策略
   * - `crossorigin`/`undefined`: 跨域设置
   * - `object-fit`/`undefined`: 填充模式
   * - `placeholder`/`undefined`: 占位内容（URL 或 blurhash 字符串）
   * - `placeholder-type`/`undefined`: 占位类型
   * - `placeholder-fill`/`undefined`: 占位填充模式
   * - `show-delay`/`undefined`: 图片显示延迟（毫秒）
   * - `onimageload`: undefined (property only)
   * - `onimageerror`: undefined (property only)
   * - `onimageprogress`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `blurhash-error`: undefined
   * - `imageLoad`: 图片加载成功
   * - `imageError`: 图片加载失败
   * - `imageProgress`: 图片加载进度
   */
  "eos-image": Partial<EosImageProps & BaseProps<EosImage> & BaseEvents>;
};

export type CustomElementsSolidJs = {
  /**
   * EosButton 组件
   * 一个简单的按钮组件
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
   * 优化的 EosImage 组件
   *
   * ## Attributes & Properties
   *
   * Component attributes and properties that can be applied to the element or by using JavaScript.
   *
   * - `src`/`undefined`: 图片地址（URL 或 blurhash 字符串）
   * - `src-type`/`undefined`: src 的类型，默认 url
   * - `alt`/`undefined`: 替代文本
   * - `width`/`undefined`: 宽度
   * - `height`/`undefined`: 高度
   * - `loading`/`undefined`: 加载策略
   * - `crossorigin`/`undefined`: 跨域设置
   * - `object-fit`/`undefined`: 填充模式
   * - `placeholder`/`undefined`: 占位内容（URL 或 blurhash 字符串）
   * - `placeholder-type`/`undefined`: 占位类型
   * - `placeholder-fill`/`undefined`: 占位填充模式
   * - `show-delay`/`undefined`: 图片显示延迟（毫秒）
   * - `onimageload`: undefined (property only)
   * - `onimageerror`: undefined (property only)
   * - `onimageprogress`: undefined (property only)
   *
   * ## Events
   *
   * Events that will be emitted by the component.
   *
   * - `blurhash-error`: undefined
   * - `imageLoad`: 图片加载成功
   * - `imageError`: 图片加载失败
   * - `imageProgress`: 图片加载进度
   */
  "eos-image": Partial<
    EosImageProps & EosImageSolidJsProps & BaseProps<EosImage> & BaseEvents
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
