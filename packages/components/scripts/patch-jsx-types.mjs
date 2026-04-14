/**
 * 修补 @wc-toolkit/jsx-types 生成的类型文件
 * 将 BaseProps 中的 ref/style 改为与 React 兼容的类型
 */
import { readFileSync, writeFileSync } from "node:fs";

const file = "jsx-types.d.ts";
let content = readFileSync(file, "utf-8");

// ref: 改为 any 让各框架自己的 ref 类型接管
content = content.replace(
	/ref\?: T \| \(\(e: T\) => void\);/g,
	"ref?: any;",
);

// style: 改为兼容 React.CSSProperties 和 Record 的联合类型
content = content.replace(
	/style\?: Record<string, string \| number>;/g,
	"style?: Record<string, string | number> | any;",
);

writeFileSync(file, content);
console.log("[patch-jsx-types] Patched ref and style types");
