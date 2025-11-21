# EsriMap Gallery

<div align="center">
  <img src="./public/assets/icons/logo.png" alt="EsriMap Gallery Logo" width="150" height="150"/>
  <h3 align="center">EsriMap Gallery</h3>
  <p align="center">基于Vue 3 + TypeScript + Vite构建的ArcGIS地图展示与分析PWA应用</p>
</div>

## 🌈 项目介绍

EsriMap Gallery 是一个现代化的地图应用平台，基于最新的前端技术栈构建，集成了ArcGIS地图服务，提供丰富的地图可视化、分析和交互功能。作为一个PWA(Progressive Web App)应用，它同时具备网页应用的便捷性和原生应用的流畅体验，支持离线访问和安装到桌面。

## 🛠 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite 4.x
- **UI组件库**: Element Plus
- **地图服务**: ArcGIS (esri-loader)
- **可视化库**: ECharts, ECharts-GL, Three.js
- **状态管理**: Vuex 4
- **路由管理**: Vue Router 4
- **国际化**: Vue I18n
- **PWA支持**: vite-plugin-pwa
- **样式处理**: SCSS

## ✨ 主要特性

### 地图功能
- 集成ArcGIS地图服务
- 多种底图切换
- 地图图层管理
- 地图控件与交互工具
- 地图数据可视化

### 用户界面
- 响应式设计，适配各种设备
- 现代化UI设计
- 多主题支持
- 可拖拽布局（vue-grid-layout）

### 数据可视化
- ECharts图表集成
- 3D可视化（Three.js）
- 热力图、散点图等地图分析
- 多维数据展示

### 实用工具
- 二维码生成与扫描
- 图片裁剪与处理
- 代码编辑器集成
- 屏幕截图功能
- 国际化支持

### PWA特性
- 可安装到主屏幕
- 离线访问能力
- 资源缓存优化
- 推送通知支持

## � 系统要求

- Node.js >= 12.0.0
- npm >= 6.0.0
- 现代浏览器（Chrome, Firefox, Safari, Edge最新版本）

## 🚀 安装与运行

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码风格检查与修复

```bash
npm run lint-fix
```

## 📁 项目结构

```
├── src/
│   ├── api/               # API接口定义
│   ├── assets/            # 静态资源
│   ├── components/        # 通用组件
│   ├── i18n/              # 国际化配置
│   ├── layout/            # 布局组件
│   │   ├── navBars/       # 导航栏组件
│   │   ├── navMenu/       # 菜单组件
│   │   └── ...
│   ├── maputils/          # 地图工具与配置
│   │   ├── basemap/       # 底图配置
│   │   ├── visualization/ # 可视化模块
│   │   └── widgets/       # 地图控件
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── theme/             # 主题样式
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── public/                # 静态资源
│   ├── assets/            # 公共资源
│   ├── config/            # 配置文件
│   ├── fonts/             # 字体文件
│   ├── icons/             # 图标资源
│   └── manifest.webmanifest # PWA配置
├── vite.config.ts         # Vite配置
├── tsconfig.json          # TypeScript配置
└── package.json           # 项目依赖
```

## 🎯 主要功能模块

### 1. 地图展示与交互
- 支持多种地图服务和图层
- 地图缩放、平移、旋转等基本操作
- 地图测量工具
- 图层透明度控制

### 2. 数据可视化
- 地图数据专题图渲染
- 多维数据图表展示
- 3D地图分析
- 热力图与聚类展示

### 3. 系统管理
- 用户认证与授权
- 系统配置管理
- 操作日志记录
- 资源管理

### 4. 国际化支持
- 多语言切换
- 本地化配置

### 5. 捐赠支持
- 支持PayPal、支付宝、微信支付等多种捐赠方式

## 🔧 开发指南

### 地图模块开发
地图相关功能主要在 `src/maputils/` 目录下开发，使用esri-loader动态加载ArcGIS API。

### 组件开发
遵循Vue 3组合式API风格，组件放在 `src/components/` 目录下。

### PWA配置
PWA相关配置在 `vite.config.ts` 中设置，包括缓存策略、图标资源等。

## 📱 PWA使用说明

### 安装到桌面
1. 在支持PWA的浏览器中访问应用
2. 点击浏览器地址栏中的安装按钮
3. 按照提示完成安装

### 离线访问
应用会缓存核心资源，在网络不可用时仍可访问部分功能。

## 📜 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## � 相关链接

- [GitHub 仓库](https://github.com/thiswildidea/EarthMapX)
- [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Element Plus 文档](https://element-plus.org/)

## 📬 问题反馈

如有任何问题或建议，请在 [GitHub Issues](https://github.com/thiswildidea/EarthMapX/issues) 提交反馈。

## 💝 支持项目

如果你觉得这个项目有用，请给我们一个 ⭐ Star 支持！
