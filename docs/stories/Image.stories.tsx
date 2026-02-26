import type { Meta, StoryObj } from "@storybook/react";
import "@eosjs/components";

interface ImageProps {
  src: string;
  "src-type"?: "url" | "blurhash";
  alt?: string;
  width?: string | number;
  height?: string | number;
  loading?: "lazy" | "eager";
  crossorigin?: "anonymous" | "use-credentials";
  "object-fit"?: "fill" | "contain" | "cover" | "none" | "scale-down";
  placeholder?: string;
  "placeholder-type"?: "url" | "blurhash";
  "placeholder-fill"?: boolean;
  "show-delay"?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "eos-image": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        ImageProps;
    }
  }
}

const BLURHASH = "LGF5]+Yk^6#xD4.8CAFVg-;T0Iu";

const meta: Meta<ImageProps> = {
  title: "组件/Image 图片",
  component: "eos-image" as any,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
高性能图片组件，支持 BlurHash 预览、懒加载、占位符填充和多种 object-fit 模式。

### 事件

| 事件名 | 触发时机 | event.detail |
|--------|---------|--------------|
| \`imageLoad\` | 加载成功 | \`{ src }\` |
| \`imageError\` | 加载失败 | \`{ src }\` |
| \`imageProgress\` | 加载进度 | \`{ loaded, total, src }\` |
| \`blurhash-error\` | BlurHash 解码失败 |  |

### React 中绑定事件

\`\`\`tsx
const ref = useRef(null);
useEffect(() => {
  const el = ref.current;
  if (!el) return;
  el.onimageload = (e) => console.log('loaded', e.detail);
  el.onimageerror = (e) => console.error('error', e.detail);
  return () => { el.onimageload = null; el.onimageerror = null; };
}, []);
<eos-image ref={ref} src="..." />
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text", description: "图片 URL 或 BlurHash 字符串" },
    "src-type": {
      control: { type: "select" },
      options: ["url", "blurhash"],
      description: "src 类型",
      table: { defaultValue: { summary: "'url'" } },
    },
    alt: { control: "text", description: "替代文本" },
    width: { control: "number", description: "宽度（px）" },
    height: { control: "number", description: "高度（px）" },
    loading: {
      control: { type: "select" },
      options: ["lazy", "eager"],
      description: "加载策略",
      table: { defaultValue: { summary: "'eager'" } },
    },
    crossorigin: {
      control: { type: "select" },
      options: ["anonymous", "use-credentials"],
      description: "跨域设置",
    },
    "object-fit": {
      control: { type: "select" },
      options: ["fill", "contain", "cover", "none", "scale-down"],
      description: "图片适配方式",
      table: { defaultValue: { summary: "'cover'" } },
    },
    placeholder: { control: "text", description: "占位符 URL 或 BlurHash" },
    "placeholder-type": {
      control: { type: "select" },
      options: ["url", "blurhash"],
      description: "占位符类型",
      table: { defaultValue: { summary: "'url'" } },
    },
    "placeholder-fill": {
      control: "boolean",
      description: "占位符填充模式（防止留白）",
      table: { defaultValue: { summary: "false" } },
    },
    "show-delay": {
      control: { type: "number", min: 0, max: 5000, step: 100 },
      description: "图片显示延迟（ms）",
      table: { defaultValue: { summary: "0" } },
    },
  },
};

export default meta;
type Story = StoryObj<ImageProps>;

//  基础用法（交互式） 
export const Default: Story = {
  name: "基础用法",
  args: {
    src: "https://picsum.photos/400/300",
    alt: "示例图片",
    width: 400,
    height: 300,
    "object-fit": "cover",
  },
  render: (args) => <eos-image {...args} />,
};

//  Object-fit 对比 
export const ObjectFitDemo: Story = {
  name: "Object-fit 对比",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {(["cover", "contain", "fill"] as const).map((fit) => (
        <div key={fit} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <code style={{ fontSize: "12px", color: "#64748b" }}>{fit}</code>
          <eos-image
            src="https://picsum.photos/400/600"
            width="100%"
            height="150"
            object-fit={fit}
            alt={`${fit} 示例`}
            style={{ display: "block" }}
          />
        </div>
      ))}
    </div>
  ),
};

//  BlurHash 演示 
export const BlurHashDemo: Story = {
  name: "BlurHash",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <code style={{ fontSize: "12px", color: "#64748b" }}>src-type="blurhash"</code>
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>直接渲染 BlurHash 字符串</p>
        <eos-image
          src={BLURHASH}
          src-type="blurhash"
          width="280"
          height="200"
          alt="BlurHash 图片"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <code style={{ fontSize: "12px", color: "#64748b" }}>placeholder-type="blurhash" + show-delay="2000"</code>
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>加载真实图片前内显示 BlurHash 占位</p>
        <eos-image
          src="https://picsum.photos/280/200?random=1"
          placeholder={BLURHASH}
          placeholder-type="blurhash"
          width="280"
          height="200"
          show-delay="2000"
          alt="带 BlurHash 占位的图片"
        />
      </div>
    </div>
  ),
};

//  占位符填充模式 
export const PlaceholderFillDemo: Story = {
  name: "占位符填充模式",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <code style={{ fontSize: "12px", color: "#64748b" }}>placeholder-fill=false（默认）</code>
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>图片与容器比例不匹配时出现留白</p>
        <eos-image
          src="https://picsum.photos/300/600?random=2"
          placeholder={BLURHASH}
          placeholder-type="blurhash"
          width="220"
          height="150"
          object-fit="contain"
          show-delay="3000"
          alt="普通模式"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <code style={{ fontSize: "12px", color: "#64748b" }}>placeholder-fill=true</code>
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>占位符作为背景，消除留白</p>
        <eos-image
          src="https://picsum.photos/300/600?random=3"
          placeholder={BLURHASH}
          placeholder-type="blurhash"
          placeholder-fill
          width="220"
          height="150"
          object-fit="contain"
          show-delay="3000"
          alt="填充模式"
        />
      </div>
    </div>
  ),
};

//  懒加载 
export const LazyLoadingDemo: Story = {
  name: "懒加载",
  render: () => (
    <div>
      <div
        style={{
          height: "60vh",
          background: "linear-gradient(135deg, #e0e7ff, #f0fdf4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          marginBottom: "24px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
         向下滚动触发懒加载
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {Array.from({ length: 9 }, (_, i) => (
          <eos-image
            key={i}
            src={`https://picsum.photos/250/200?random=${i + 20}`}
            placeholder={BLURHASH}
            placeholder-type="blurhash"
            loading="lazy"
            width="100%"
            height="160"
            alt={`懒加载图片 ${i + 1}`}
            style={{ display: "block" }}
          />
        ))}
      </div>
    </div>
  ),
};

//  错误处理 
export const ErrorHandlingDemo: Story = {
  name: "错误处理",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <code style={{ fontSize: "12px", color: "#64748b" }}>无占位符  加载失败</code>
        <eos-image
          src="https://invalid.example.com/broken.jpg"
          width="260"
          height="180"
          alt="加载失败"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <code style={{ fontSize: "12px", color: "#64748b" }}>有 BlurHash 占位符  加载失败时保留占位</code>
        <eos-image
          src="https://invalid.example.com/broken.jpg"
          placeholder={BLURHASH}
          placeholder-type="blurhash"
          placeholder-fill
          width="260"
          height="180"
          alt="带占位符的失败图片"
        />
      </div>
    </div>
  ),
};
