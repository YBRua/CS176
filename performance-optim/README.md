# CS176 Assignment 6 Performance Optimization Techniques

## Quick Start

- The website is available at <https://oreo-gen.ybirua.top/>

### Building the Project for Development

```sh
>>> yarn install
>>> yarn dev  # or yarn build
```

## 性能优化清单

- [x] 使用 [Vite](https://vitejs.dev/) 搭建和部署
- [x] 使用 [TinyPNG](https://tinypng.com/) 对 PNG 图像进行了压缩
- [x] 从主页到编辑器的切换动画通过 CSS `transform` 属性实现
  - ~~之后切换到结果展示页面没有做 CSS 动画的原因是结果展示的页面高度要根据图片高度动态决定，导致实现的时候遇到了一些糟糕的困难~~
- [x] 刚进入网页，以及从编辑器到最终结果图的切换过程中加入了加载图标
- [x] Lazy Image Loading [react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component).
- [ ] ~~I18N 汉化~~ 鸽了。~~留到大作业。~~

## Acknowledgement and Reference

- Reference Implementation <https://github.com/ddiu8081/oreooo>
  - OREO PNG assets and canvas layout algorithms are from this repository.
