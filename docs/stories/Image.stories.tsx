import type { Meta, StoryObj } from '@storybook/react';
import '@eosjs/components';

// 定义组件的参数接口
interface ImageProps {
    src: string;
    'src-type'?: 'url' | 'blurhash';
    alt?: string;
    width?: string | number;
    height?: string | number;
    loading?: 'lazy' | 'eager';
    crossorigin?: 'anonymous' | 'use-credentials';
    'object-fit'?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    placeholder?: string;
    'placeholder-type'?: 'url' | 'blurhash';
    'placeholder-fill'?: boolean;
    'show-delay'?: number;
}

// 扩展 JSX.IntrinsicElements 以包含 eos-image
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'eos-image': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & ImageProps;
        }
    }
}

const meta: Meta<ImageProps> = {
    title: '组件/Image 图片',
    component: 'eos-image' as any,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Image 图片组件

一个功能强大的图片组件，支持多种加载策略、占位符显示、BlurHash 预览等特性。

## 核心特性

- **🚀 高性能加载**: 内置图片加载器池，智能管理并发加载
- **🎨 BlurHash 支持**: 支持 BlurHash 作为图片源或占位符
- **⚡ 懒加载**: 支持 Intersection Observer 懒加载
- **🖼️ 灵活占位符**: 支持 URL 或 BlurHash 作为占位符
- **📱 响应式**: 支持多种 object-fit 模式
- **🎯 填充模式**: placeholder-fill 属性避免图片容器留白
- **🔄 事件系统**: 完整的加载、错误事件支持

## 属性说明

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| \`src\` | string | - | 图片源，可以是 URL 或 BlurHash 字符串 |
| \`src-type\` | 'url' \\| 'blurhash' | 'url' | 指定 src 的类型 |
| \`alt\` | string | - | 图片的替代文本 |
| \`width\` | string \\| number | - | 图片宽度 |
| \`height\` | string \\| number | - | 图片高度 |
| \`loading\` | 'lazy' \\| 'eager' | 'eager' | 加载策略，lazy 为懒加载 |
| \`crossorigin\` | 'anonymous' \\| 'use-credentials' | - | 跨域设置 |
| \`object-fit\` | 'fill' \\| 'contain' \\| 'cover' \\| 'none' \\| 'scale-down' | 'cover' | 图片适配方式 |
| \`placeholder\` | string | - | 占位符，可以是 URL 或 BlurHash |
| \`placeholder-type\` | 'url' \\| 'blurhash' | 'url' | 占位符类型 |
| \`placeholder-fill\` | boolean | false | 占位符填充模式，避免留白 |
| \`show-delay\` | number | 0 | 图片显示延迟（毫秒） |

## 事件

- \`imageLoad\`: 图片加载成功时触发，事件详情包含 \`{ src }\`
- \`imageError\`: 图片加载失败时触发，事件详情包含 \`{ src }\`
- \`imageProgress\`: 图片加载进度更新时触发，事件详情包含 \`{ loaded, total, src }\`
- \`blurhash-error\`: BlurHash 解码失败时触发

### React 中使用事件

在 React 中，需要使用 \`ref\` 和 \`useEffect\` 来绑定事件处理器：

\`\`\`tsx
const imageRef = useRef<HTMLElement | null>(null);
const [progress, setProgress] = useState({ loaded: 0, total: 0, percent: 0 });

useEffect(() => {
  const element = imageRef.current as any;
  if (!element) return;

  element.onimageload = (e: CustomEvent) => {
    console.log('图片加载成功', e.detail);
  };
  
  element.onimageerror = (e: CustomEvent) => {
    console.error('图片加载失败', e.detail);
  };

  element.onimageprogress = (e: CustomEvent) => {
    const { loaded, total } = e.detail;
    const percent = total > 0 ? Math.round((loaded / total) * 100) : 0;
    setProgress({ loaded, total, percent });
    console.log(\`加载进度: \${percent}%\`);
  };

  return () => {
    element.onimageload = null;
    element.onimageerror = null;
    element.onimageprogress = null;
  };
}, []);

// JSX
<eos-image ref={imageRef} src="..." />

// 显示进度
<div>加载进度: {progress.percent}%</div>
<div>{(progress.loaded / 1024).toFixed(1)}KB / {(progress.total / 1024).toFixed(1)}KB</div>
\`\`\`
        `
            }
        }
    },
    argTypes: {
        src: {
            control: 'text',
            description: '图片源地址或BlurHash字符串',
        },
        'src-type': {
            control: { type: 'select' },
            options: ['url', 'blurhash'],
            description: '指定src的类型',
        },
        alt: {
            control: 'text',
            description: '图片替代文本',
        },
        width: {
            control: 'number',
            description: '图片宽度（像素）',
        },
        height: {
            control: 'number',
            description: '图片高度（像素）',
        },
        loading: {
            control: { type: 'select' },
            options: ['lazy', 'eager'],
            description: '加载策略',
        },
        crossorigin: {
            control: { type: 'select' },
            options: ['anonymous', 'use-credentials'],
            description: '跨域设置',
        },
        'object-fit': {
            control: { type: 'select' },
            options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            description: '图片适配方式',
        },
        placeholder: {
            control: 'text',
            description: '占位符URL或BlurHash',
        },
        'placeholder-type': {
            control: { type: 'select' },
            options: ['url', 'blurhash'],
            description: '占位符类型',
        },
        'placeholder-fill': {
            control: 'boolean',
            description: '占位符填充模式，避免容器留白',
        },
        'show-delay': {
            control: { type: 'number', min: 0, max: 5000, step: 100 },
            description: '图片显示延迟（毫秒）',
        },
    },
};

export default meta;
type Story = StoryObj<ImageProps>;

// 基础示例
export const Default: Story = {
    name: '基础用法',
    args: {
        src: 'https://picsum.photos/400/300',
        alt: '示例图片',
        width: 400,
        height: 300,
        'object-fit': 'cover',
    },
    render: (args) => (
        <div style={{ padding: '20px' }}>
            <h3>基础用法</h3>
            <eos-image {...args} />
        </div>
    ),
};

// Object-fit 演示
export const ObjectFitDemo: Story = {
    name: 'Object-fit 属性演示',
    render: () => (
        <div style={{ padding: '20px' }}>
            <h3>Object-fit 属性演示</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div>
                    <h4>Cover (默认)</h4>
                    <eos-image
                        src="https://picsum.photos/400/600"
                        width="200"
                        height="150"
                        object-fit="cover"
                        alt="Cover示例"
                    />
                </div>
                <div>
                    <h4>Contain</h4>
                    <eos-image
                        src="https://picsum.photos/400/600"
                        width="200"
                        height="150"
                        object-fit="contain"
                        alt="Contain示例"
                    />
                </div>
                <div>
                    <h4>Fill</h4>
                    <eos-image
                        src="https://picsum.photos/400/600"
                        width="200"
                        height="150"
                        object-fit="fill"
                        alt="Fill示例"
                    />
                </div>
            </div>
        </div>
    ),
};

// BlurHash 演示
export const BlurHashDemo: Story = {
    name: 'BlurHash 演示',
    render: () => (
        <div style={{ padding: '20px' }}>
            <h3>BlurHash 演示</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div>
                    <h4>BlurHash 作为图片源</h4>
                    <p>直接显示 BlurHash 解码后的图片</p>
                    <eos-image
                        src="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                        src-type="blurhash"
                        width="250"
                        height="200"
                        alt="BlurHash图片"
                    />
                </div>
                <div>
                    <h4>BlurHash 作为占位符</h4>
                    <p>加载真实图片时显示 BlurHash 占位符</p>
                    <eos-image
                        src="https://picsum.photos/250/200?random=1"
                        placeholder="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                        placeholder-type="blurhash"
                        width="250"
                        height="200"
                        alt="带BlurHash占位符的图片"
                        show-delay="2000"
                    />
                </div>
            </div>
        </div>
    ),
};

// 占位符填充模式演示
export const PlaceholderFillDemo: Story = {
    name: '占位符填充模式演示',
    render: () => (
        <div style={{ padding: '20px' }}>
            <h3>占位符填充模式演示</h3>
            <p>placeholder-fill 属性可以让占位符作为背景填充，避免图片尺寸不匹配时的留白</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div>
                    <h4>普通模式</h4>
                    <p>可能有留白</p>
                    <eos-image
                        src="https://picsum.photos/300/600?random=2"
                        placeholder="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                        placeholder-type="blurhash"
                        width="200"
                        height="150"
                        object-fit="contain"
                        alt="普通模式"
                        show-delay="3000"
                    />
                </div>
                <div>
                    <h4>填充模式</h4>
                    <p>占位符作为背景，消除留白</p>
                    <eos-image
                        src="https://picsum.photos/300/600?random=3"
                        placeholder="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                        placeholder-type="blurhash"
                        placeholder-fill
                        width="200"
                        height="150"
                        object-fit="contain"
                        alt="填充模式"
                        show-delay="3000"
                    />
                </div>
            </div>
        </div>
    ),
};

// 懒加载演示
export const LazyLoadingDemo: Story = {
    name: '懒加载演示',
    render: () => (
        <div style={{ padding: '20px' }}>
            <h3>懒加载演示</h3>
            <p>向下滚动查看懒加载效果</p>
            <div style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <p>向下滚动...</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {Array.from({ length: 9 }, (_, i) => (
                    <div key={i}>
                        <h4>图片 {i + 1}</h4>
                        <eos-image
                            src={`https://picsum.photos/250/200?random=${i + 10}`}
                            placeholder="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                            placeholder-type="blurhash"
                            loading="lazy"
                            width="250"
                            height="200"
                            alt={`懒加载图片${i + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    ),
};

// 错误处理演示
export const ErrorHandlingDemo: Story = {
    name: '错误处理演示',
    render: () => (
        <div style={{ padding: '20px' }}>
            <h3>错误处理演示</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div>
                    <h4>图片加载失败</h4>
                    <eos-image
                        src="https://invalid-url.example.com/image.jpg"
                        width="250"
                        height="200"
                        alt="加载失败的图片"
                    />
                </div>
                <div>
                    <h4>带占位符的失败图片</h4>
                    <eos-image
                        src="https://invalid-url.example.com/image.jpg"
                        placeholder="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                        placeholder-type="blurhash"
                        placeholder-fill
                        width="250"
                        height="200"
                        alt="带占位符的失败图片"
                    />
                </div>
            </div>
        </div>
    ),
};

// 响应式演示
export const ResponsiveDemo: Story = {
    name: '响应式演示',
    render: () => (
        <div style={{ padding: '20px' }}>
            <h3>响应式图片演示</h3>
            <p>改变窗口大小查看响应式效果</p>
            <div style={{ maxWidth: '100%', marginTop: '20px' }}>
                <eos-image
                    src="https://picsum.photos/800/400"
                    placeholder="LGF5]+Yk^6#xD4.8CAFVg-;T0Iu"
                    placeholder-type="blurhash"
                    style={{ width: '100%', maxWidth: '800px', height: 'auto' }}
                    alt="响应式图片"
                />
            </div>
        </div>
    ),
};

// 高级配置演示
export const AdvancedConfigDemo: Story = {
    name: '高级配置演示',
    args: {
        src: 'https://picsum.photos/400/300?random=100',
        placeholder: 'LGF5]+Yk^6#xD4.8CAFVg-;T0Iu',
        'placeholder-type': 'blurhash',
        'placeholder-fill': false,
        width: 300,
        height: 200,
        'object-fit': 'cover',
        loading: 'eager',
        'show-delay': 0,
        alt: '高级配置图片',
    },
    render: (args) => (
        <div style={{ padding: '20px' }}>
            <h3>高级配置演示</h3>
            <p>使用右侧控件调整各种参数</p>
            <div style={{ marginTop: '20px' }}>
                <eos-image {...args} />
            </div>
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                <h4>当前配置：</h4>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {JSON.stringify(args, null, 2)}
                </pre>
            </div>
        </div>
    ),
};
