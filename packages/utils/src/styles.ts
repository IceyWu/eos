/**
 * 处理尺寸值，支持纯数字或带单位的字符串
 * @param value - 输入值，可以是数字或字符串
 * @param defaultUnit - 默认单位，当输入为纯数字时使用
 * @returns 带单位的字符串
 */
export function formatSize(
	value: string | number | undefined | null,
	defaultUnit = "px",
): string {
	if (value == null || value === "") {
		return "";
	}

	// 如果是数字，添加默认单位
	if (typeof value === "number") {
		return `${value}${defaultUnit}`;
	}

	// 如果是字符串
	const strValue = value.toString().trim();

	// 如果是纯数字字符串，添加默认单位
	if (/^\d+(\.\d+)?$/.test(strValue)) {
		return `${strValue}${defaultUnit}`;
	}

	// 否则直接返回（已经包含单位或是其他CSS值）
	return strValue;
}

/**
 * 解析尺寸值为数字
 * @param value - 输入值
 * @returns 数字值，如果无法解析则返回null
 */
export function parseSize(
	value: string | number | undefined | null,
): number | null {
	if (value == null || value === "") {
		return null;
	}

	if (typeof value === "number") {
		return value;
	}

	const parsed = parseFloat(value.toString());
	return isNaN(parsed) ? null : parsed;
}

/**
 * 检查是否是有效的CSS单位
 * @param value - 要检查的值
 * @returns 是否是有效的CSS单位
 */
export function isValidCSSUnit(value: string): boolean {
	const cssUnits = [
		"px",
		"em",
		"rem",
		"%",
		"vh",
		"vw",
		"vmin",
		"vmax",
		"ex",
		"ch",
		"cm",
		"mm",
		"in",
		"pt",
		"pc",
	];
	const pattern = new RegExp(`^\\d+(\\.\\d+)?(${cssUnits.join("|")})$`);
	return pattern.test(value);
}

/**
 * 获取值的单位
 * @param value - 输入值
 * @returns 单位字符串，如果没有单位则返回空字符串
 */
export function getUnit(value: string): string {
	const match = value.match(/\d+(\.\d+)?(.*)$/);
	return match ? match[2] : "";
}
