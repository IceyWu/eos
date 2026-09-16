# EOS UI Agent Rules

## UI design source of truth

所有 EOS UI 页面和组件必须遵循 EOS 设计系统规范。外部设计文件和 Skill 只作为参考来源，不能替代 EOS 自己的语义令牌、组件契约和工程规则。

- 外部 Figma 参考文件：[设计文件](https://www.figma.com/design/mzv3WKJrS5TAjuYQYOl74c/HeroUI-Figma-Kit-V3--Community-?node-id=2912-29668)
- Light overview：`12283:6344`
- Dark overview：`22649:1112`
- EOS 设计系统规范：[docs/eos-design-system.md](docs/eos-design-system.md)

### 规范优先级

发生冲突时按以下顺序处理：用户当前明确要求 > [EOS 设计系统规范](docs/eos-design-system.md)中的硬性规则 > 已测量的外部设计意图 > 旧代码和旧截图。任何外部设计值如果违反 EOS 的实际对比度、键盘可用性或响应式要求，必须保留冲突记录并采用符合 EOS 规则的实现。

## 工作约束

- UI 工作开始前必须先读取 EOS 设计系统规范；规范细节只维护在该文件中，避免规则漂移。
- Light 和 Dark 两套主题必须同时实现和验证。
- 原生事件优先：组件直接透传原生事件名和事件对象，不为已有原生事件创建改名包装；仅在确有额外组件语义时使用自定义事件。
- 只修改当前任务所需文件，不删除或重写用户已有改动。
- 未经明确要求，不提交 commit、不创建 PR、不推送远程分支。
- 遇到外部设计、代码和截图矛盾时，记录来源和影响，并以 EOS 设计系统规范为准。

## 变更边界

- 只修改完成当前任务所需的文件。
- 不删除或重写用户已有改动。
- 未经明确要求，不提交 commit、不创建 PR、不推送远程分支。
- 如果 Figma 数据、代码和截图互相矛盾，先记录冲突和来源，再选择 Figma 作为视觉基准并说明影响。

## 执行入口

实现、重构或审查 UI 前，必须按 [EOS 设计系统规范](docs/eos-design-system.md) 中的证据、颜色、排版、布局、可访问性、动效和组件审查流程执行。组件文档、示例和 CSS 注释使用 EOS 的名称与语义，不把外部参考品牌当作产品或规范主体。
