/**
 * Eos 组件库配置
 */
export const COMPONENT_CONFIG = {
	/**
	 * 组件前缀
	 * 所有组件的标签名都会以此前缀开头
	 * 例如：prefix 为 'eos' 时，按钮组件为 'eos-button'
	 */
	prefix: "eos",

	/**
	 * 获取完整的组件标签名
	 * @param componentName 组件名称（不含前缀）
	 * @returns 完整的标签名
	 */
	getTagName(componentName: string): string {
		return `${COMPONENT_CONFIG.prefix}-${componentName}`;
	},
};

/**
 * 组件注册配置
 */
export interface ComponentRegistration {
	/** 组件名称（不含前缀） */
	name: string;
	/** 组件类 */
	component: CustomElementConstructor;
}
