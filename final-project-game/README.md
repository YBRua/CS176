# CS176 Final Project

> 本仓库是 CS176 现代前端应用开发实践 课程期末大作业仓库

- 大作业选题是 **模拟一个经典游戏**
  - 大概是一个 **2D空战游戏** ~~这算经典游戏吗~~

## 快速开始

> Demo 在 [这里](https://aircombat.ybirua.top/) (<https://aircombat.ybirua.top/>)

- **注意**：因为这个游戏设计上并不是在移动端玩的，所以没有做任何移动端的响应式适配。请千万**不要在移动端打开这个网页**。

### 怎么玩

- 选择飞机和武器
  - 在 `HANGAR` 界面的 `AIRCRAFT` 和 `WEAPON` 选项卡中可以选择飞机和武器
  - 当前正在使用的飞机和武器会显示在屏幕右侧的信息栏中
  - 不同飞机的速度、生命值等属性不同
  - 不同武器的伤害、子弹速度、冷却时间不同
  - 玩家选择的飞机、武器会存储在 `localStorage`，供后续登陆时继续游玩
- 选择关卡
  - 在 `LEVEL` 界面可以选择关卡。目前只有两关。都是无尽模式（~~其实是来不及做boss和游戏结束的界面了~~
    - 因为是无尽模式所以**游戏目标是尽可能取得高分**
    - 玩家的最高分会存储在 `localStorage` 中，每次刷新记录时结算界面会有提示
- 开始游戏
  - 操作
    - 进入游戏后，使用 `方向键` 或 `AD` 左右移动
    - 使用 `SPACE` 键发射子弹
    - 按下 `ESC` 可以暂停游戏
  - HUD
    - 玩家的剩余生命 `HP` 和当前分数 `SCORE` 会显示在屏幕右侧的信息栏中
    - 当 `HP` 归零（或小于零）时游戏结束

> 因为数值策划做得比较糟糕，建议使用的组合是 飞机`I5M3` + 武器`EMAC-19-2`

### 部署

```sh
yarn install
yarn dev
```

#### 音效与声音文件

由于音效、背景音乐网站的 Liscense 限制，本 Github 仓库中不包含部署时使用的音频和音效源文件，请自行下载并放置在 `./assets/audio/` 目录下。

- [动能武器音效](https://www.fesliyanstudios.com/soundeffects-download.php?id=7255)
  - From [fesliyanstudios](https://www.fesliyanstudios.com/royalty-free-sound-effects-download/gun-shooting-300)
- [等离子发射器音效](https://assets.mixkit.co/sfx/download/mixkit-short-laser-gun-shot-1670.wav)
  - From [mixkit](https://mixkit.co/free-sound-effects/gun/)
- [重武器音效](https://assets.mixkit.co/sfx/download/mixkit-laser-weapon-shot-1681.wav)
  - From [mixkit](https://mixkit.co/free-sound-effects/gun/)
- [BGM](https://wingless-seraph.net/material/Es-STAGE2.mp3)
  - From [Wingless Seraph](https://wingless-seraph.net/)

### 特性

#### 框架与依赖库

- Vite + React.js + TypeScript 开发
  - 使用 React Router 搭建网页路由
  - 使用 React Modal 制作了暂停、游戏结束、飞机/武器详细信息的 Modal
- Tailwind CSS

#### 游戏渲染

- 基于 HTMLCanvasElement 实现渲染
- 使用 `requestAnimationFrame` 实现每一帧的更新

#### 逻辑

##### 玩家信息维护

- 玩家信息主要有三个：玩家选择的飞机、玩家选择的武器，以及玩家选择的关卡
  - 因为选择飞机武器和关卡的界面都是套在 React 的组件里的，所以直接用 React 的状态维护
  - 实现上，使用自定义 React Hook 负责维护这三个主要信息，并在每次信息更新时同步存储到 `localStorage`

##### 游戏

- 进入游戏后，通过前述的玩家信息初始化游戏，并开始游戏主循环（基于 `requestAnimationFrame`）
- 游戏中，存在在屏幕范围内的飞机和子弹由一个集合维护
  - 如果某个飞机/子弹飞出屏幕，或者因为碰撞被销毁，则会从集合中移除
- 因为屏幕里的东西不会有很多，所以碰撞检测算法选择了一个实现上比较容易的 `O(N^2)` 复杂度的嵌套循环
  - 碰撞发生时，会通过事件处理函数告知发生碰撞的实体做出对应行为
