/**
 * 安全地设置元素属性
 * @param element - DOM元素
 * @param name - 属性名
 * @param value - 属性值
 */
export function setAttribute(
	element: Element,
	name: string,
	value: string | number | boolean | null | undefined,
): void {
	if (value === null || value === undefined || value === false) {
		element.removeAttribute(name);
	} else {
		element.setAttribute(name, value.toString());
	}
}

/**
 * 批量设置元素属性
 * @param element - DOM元素
 * @param attributes - 属性对象
 */
export function setAttributes(
	element: Element,
	attributes: Record<string, any>,
): void {
	Object.entries(attributes).forEach(([name, value]) => {
		setAttribute(element, name, value);
	});
}

/**
 * 获取元素的数值型属性
 * @param element - DOM元素
 * @param name - 属性名
 * @param defaultValue - 默认值
 */
export function getNumericAttribute(
	element: Element,
	name: string,
	defaultValue = 0,
): number {
	const value = element.getAttribute(name);
	if (!value) return defaultValue;
	const num = parseFloat(value);
	return isNaN(num) ? defaultValue : num;
}
