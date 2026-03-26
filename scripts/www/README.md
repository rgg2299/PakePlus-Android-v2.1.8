# 📱 拼音打字练习APP

小橘美美拼音打字练习器的独立桌面应用版本。

## 🚀 快速开始

### 方法一：使用打包脚本（推荐）
1. 双击运行 `打包.bat`（Windows）
2. 或运行 `打包.ps1`（PowerShell）
3. 选择打包选项（推荐选择1）

### 方法二：手动打包
```bash
# 使用配置文件打包
pakeplus --config pakeplus.json

# 或直接指定文件
pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667
```

## 📁 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 主程序文件（离线音频版本） |
| `icon.png` | 应用图标（32x32像素） |
| `pakeplus.json` | PakePlus配置文件 |
| `打包.bat` | Windows批处理打包脚本 |
| `打包.ps1` | PowerShell打包脚本 |
| `README.md` | 说明文档 |

## 🔧 系统要求

- **操作系统**: Windows 7+/macOS 10.12+/Linux
- **依赖工具**: Node.js 和 PakePlus
- **安装PakePlus**: `npm install -g pakeplus`

## 🎯 应用特性

✅ **完全离线运行**
- 无需网络连接
- 音频内置为Base64格式
- 在任何设备上都能使用

✅ **跨平台支持**
- Windows (.exe)
- macOS (.app)
- Linux (.AppImage)

✅ **优化设计**
- 手机比例窗口（375x667）
- 响应式布局
- 触摸屏友好

✅ **功能完整**
- 拼音打字练习
- 成绩统计
- 离线提示音
- 多种练习模式

## 📦 打包说明

### 使用配置文件打包（推荐）
```bash
pakeplus --config pakeplus.json
```

### 按平台打包
```bash
# Windows
pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target windows

# macOS
pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target macos

# Linux
pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target linux
```

## ⚙️ 配置文件详解

```json
{
  "name": "拼音打字练习",         // 应用名称
  "version": "1.0.0",           // 版本号
  "description": "小橘美美拼音打字练习器", // 描述
  "entry": "index.html",        // 入口文件
  "window": {
    "width": 375,               // 窗口宽度
    "height": 667,              // 窗口高度
    "resizable": true,          // 可调整大小
    "fullscreenable": true      // 可全屏
  },
  "platform": ["windows", "macos", "linux"], // 支持的平台
  "features": {
    "offline": true,            // 离线功能
    "noNetworkRequired": true   // 无需网络
  }
}
```

## 🔄 自定义配置

### 修改窗口大小
在 `pakeplus.json` 中调整：
```json
"window": {
  "width": 400,
  "height": 700
}
```

### 更换图标
1. 准备新的PNG图标文件（建议32x32或256x256像素）
2. 命名为 `icon.png`
3. 替换原来的图标文件

### 修改应用信息
编辑 `pakeplus.json` 中的：
- `name`: 应用名称
- `version`: 版本号
- `description`: 应用描述

## ❓ 常见问题

### Q: 打包失败，提示找不到pakeplus
A: 请先安装PakePlus：`npm install -g pakeplus`

### Q: 如何修改应用名称？
A: 编辑 `pakeplus.json` 中的 `name` 字段

### Q: 可以更换背景音乐吗？
A: 需要修改 `index.html` 中的音频配置部分

### Q: 支持手机端吗？
A: 这是桌面应用，但窗口比例适配手机，可在手机模拟器中运行

## 📞 技术支持

如有问题，请检查：
1. Node.js 和 PakePlus 是否已安装
2. 所有文件是否在同一目录
3. 文件路径是否正确

---

💡 **提示**: 打包后的应用可自由分发，无需安装任何额外软件！

## 🎉 开始使用

现在您可以：
1. 运行打包脚本创建桌面应用
2. 将应用分享给其他人
3. 在任何支持的操作系统上使用

**祝您使用愉快！** 🚀