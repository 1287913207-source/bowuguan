# 见微民艺博物馆网站

这是一个可直接部署到 GitHub Pages 的静态网站项目，包含首页、样式和原生 JavaScript 交互。

## 文件结构

- `index.html`: 首页内容与信息架构
- `styles.css`: 视觉样式、响应式布局与动画
- `script.js`: 菜单、馆藏筛选、票务估算与表单交互
- `.github/workflows/deploy-pages.yml`: GitHub Pages 自动部署工作流
- `.nojekyll`: 关闭 Jekyll 处理，按纯静态站发布

## 发布到 GitHub Pages

1. 在 GitHub 新建一个仓库。
2. 把本目录所有文件上传到仓库根目录。
3. 默认分支使用 `main`。
4. 进入 GitHub 仓库的 `Settings > Pages`。
5. 确认 Source 使用 `GitHub Actions`。
6. 推送到 `main` 后，GitHub 会自动运行 `.github/workflows/deploy-pages.yml` 并发布网站。

## 本地预览

如果本机有 Ruby，可以在项目目录运行：

```bash
ruby -run -e httpd . -p 8000
```

然后访问 `http://127.0.0.1:8000/index.html`。
