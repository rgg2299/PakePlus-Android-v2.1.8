// 输入法按键编辑器核心逻辑
class KeyEditor {
    constructor() {
        this.initElements();
        this.initPresets();
        this.loadSettings();
        this.initEventListeners();
        this.initDragAndDrop();
        this.initScrollSync();
        this.initSubtitleSystem();
        this.initTextResize();
        this.initCustomSizeInput();
        this.updatePreview();
        this.updateGradientPreview();
    }

    initElements() {
        // 基本设置
        this.keyText = document.getElementById('keyText');
        this.sizeTemplate = document.getElementById('sizeTemplate');
        this.customWidth = document.getElementById('customWidth');
        this.customHeight = document.getElementById('customHeight');
        this.applyCustomSize = document.getElementById('applyCustomSize');
        this.customSizeInputGroup = document.getElementById('customSizeInputGroup');
        this.fontSize = document.getElementById('fontSize');
        this.textColor = document.getElementById('textColor');
        this.textPosX = document.getElementById('textPosX');
        this.textPosY = document.getElementById('textPosY');
        this.keyWidth = document.getElementById('keyWidth');
        this.keyHeight = document.getElementById('keyHeight');
        this.keyWidthInput = document.getElementById('keyWidthInput');
        this.keyHeightInput = document.getElementById('keyHeightInput');
        this.borderRadius = document.getElementById('borderRadius');
        this.padding = document.getElementById('padding');
        this.imageMargin = document.getElementById('imageMargin');
        this.opacity = document.getElementById('opacity');

        // 填充设置
        this.fillType = 'solid';
        this.bgColor = document.getElementById('bgColor');
        this.gradientStart = document.getElementById('gradientStart');
        this.gradientEnd = document.getElementById('gradientEnd');
        this.gradientAngle = document.getElementById('gradientAngle');

        // 图片背景设置
        this.bgImageInput = document.getElementById('bgImageInput');
        this.selectImageBtn = document.getElementById('selectImageBtn');
        this.removeImageBtn = document.getElementById('removeImageBtn');
        this.bgImagePreview = document.getElementById('bgImagePreview');
        this.imagePreviewContainer = document.getElementById('imagePreviewContainer');
        this.bgImageSize = document.getElementById('bgImageSize');
        this.bgImageOpacity = document.getElementById('bgImageOpacity');
        this.bgImageData = null; // 存储图片数据
        this.bgImageObject = null; // 存储图片对象

        // 描边设置
        this.strokeEnabled = document.getElementById('strokeEnabled');
        this.strokeWidth = document.getElementById('strokeWidth');
        this.strokeColor = document.getElementById('strokeColor');
        this.strokeType = document.getElementById('strokeType');
        this.strokePosition = 'outer';

        // 阴影设置
        this.shadowEnabled = document.getElementById('shadowEnabled');
        this.shadowX = document.getElementById('shadowX');
        this.shadowY = document.getElementById('shadowY');
        this.shadowBlur = document.getElementById('shadowBlur');
        this.shadowColor = document.getElementById('shadowColor');
        this.shadowType = 'outer';

        // 光晕设置
        this.glowEnabled = document.getElementById('glowEnabled');
        this.glowBlur = document.getElementById('glowBlur');
        this.glowSpread = document.getElementById('glowSpread');
        this.glowColor = document.getElementById('glowColor');
        this.glowOpacity = document.getElementById('glowOpacity');
        this.glowType = 'outer';

        // 预览和按钮
        this.keyPreview = document.getElementById('keyPreview');
        this.previewArea = document.getElementById('previewArea');
        this.gradientPreview = document.getElementById('gradientPreview');

        // 副标题系统
        this.subtitleContainer = document.getElementById('subtitleContainer');
        this.addSubtitleBtn = document.getElementById('addSubtitleBtn');
        this.subtitles = [];
        this.subtitlePositions = []; // 存储每个副标题的位置信息 {x, y}
        this.subtitleFontSizes = []; // 存储每个副标题的字体大小
        this.currentHoveredText = null; // 当前悬停的文字元素
        this.mainTextScale = 1; // 主文字的缩放比例
    }

    initPresets() {
        this.presets = {
            default: {
                keyText: 'A',
                keyWidth: 120,
                keyHeight: 120,
                borderRadius: 20,
                padding: 20,
                opacity: 100,
                fillType: 'solid',
                bgColor: '#667eea',
                gradientStart: '#667eea',
                gradientEnd: '#764ba2',
                gradientAngle: 135,
                strokeEnabled: false,
                strokeWidth: 3,
                strokeColor: '#ffffff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 15,
                shadowColor: '#000000',
                shadowType: 'outer'
            },
            modern: {
                keyText: 'B',
                keyWidth: 140,
                keyHeight: 140,
                borderRadius: 30,
                padding: 25,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#4facfe',
                gradientStart: '#4facfe',
                gradientEnd: '#00f2fe',
                gradientAngle: 45,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ffffff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 20,
                shadowColor: '#000000',
                shadowType: 'outer'
            },
            glass: {
                keyText: '玻',
                keyWidth: 130,
                keyHeight: 130,
                borderRadius: 25,
                padding: 22,
                opacity: 65,
                fillType: 'solid',
                bgColor: 'rgba(255, 255, 255, 0.15)',
                gradientStart: '#ffffff',
                gradientEnd: '#e0e0e0',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(255, 255, 255, 0.4)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 8,
                shadowY: 8,
                shadowBlur: 25,
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowType: 'outer'
            },
            'glass-thin': {
                keyText: '薄',
                keyWidth: 125,
                keyHeight: 125,
                borderRadius: 20,
                padding: 20,
                opacity: 50,
                fillType: 'solid',
                bgColor: 'rgba(255, 255, 255, 0.08)',
                gradientStart: '#ffffff',
                gradientEnd: '#f0f0f0',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 1,
                strokeColor: 'rgba(255, 255, 255, 0.3)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 15,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowType: 'outer'
            },
            'glass-thick': {
                keyText: '厚',
                keyWidth: 135,
                keyHeight: 135,
                borderRadius: 28,
                padding: 24,
                opacity: 80,
                fillType: 'solid',
                bgColor: 'rgba(255, 255, 255, 0.25)',
                gradientStart: '#ffffff',
                gradientEnd: '#d8d8d8',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 3,
                strokeColor: 'rgba(255, 255, 255, 0.5)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 10,
                shadowY: 10,
                shadowBlur: 30,
                shadowColor: 'rgba(0, 0, 0, 0.35)',
                shadowType: 'outer'
            },
            'glass-frosted': {
                keyText: '磨',
                keyWidth: 128,
                keyHeight: 128,
                borderRadius: 24,
                padding: 22,
                opacity: 75,
                fillType: 'gradient',
                bgColor: 'rgba(200, 200, 220, 0.2)',
                gradientStart: 'rgba(220, 220, 240, 0.3)',
                gradientEnd: 'rgba(180, 180, 200, 0.2)',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(255, 255, 255, 0.35)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 22,
                shadowColor: 'rgba(0, 0, 0, 0.28)',
                shadowType: 'outer'
            },
            'glass-matte': {
                keyText: '哑',
                keyWidth: 126,
                keyHeight: 126,
                borderRadius: 22,
                padding: 21,
                opacity: 70,
                fillType: 'solid',
                bgColor: 'rgba(210, 210, 225, 0.2)',
                gradientStart: '#d2d2e1',
                gradientEnd: '#c0c0d0',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(240, 240, 250, 0.4)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 18,
                shadowColor: 'rgba(0, 0, 0, 0.22)',
                shadowType: 'outer'
            },
            'glass-prism': {
                keyText: '棱',
                keyWidth: 132,
                keyHeight: 132,
                borderRadius: 26,
                padding: 23,
                opacity: 85,
                fillType: 'gradient',
                bgColor: 'rgba(180, 200, 255, 0.15)',
                gradientStart: 'rgba(150, 180, 255, 0.2)',
                gradientEnd: 'rgba(200, 220, 255, 0.1)',
                gradientAngle: 45,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(220, 235, 255, 0.45)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 7,
                shadowY: 7,
                shadowBlur: 28,
                shadowColor: 'rgba(100, 150, 200, 0.25)',
                shadowType: 'outer'
            },
            'frosted-heavy': {
                keyText: '重',
                keyWidth: 130,
                keyHeight: 130,
                borderRadius: 25,
                padding: 22,
                opacity: 80,
                fillType: 'gradient',
                bgColor: 'rgba(180, 185, 195, 0.25)',
                gradientStart: 'rgba(190, 195, 205, 0.35)',
                gradientEnd: 'rgba(170, 175, 185, 0.25)',
                gradientAngle: 160,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(210, 215, 225, 0.4)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 25,
                shadowColor: 'rgba(0, 0, 0, 0.32)',
                shadowType: 'outer'
            },
            'frosted-light': {
                keyText: '轻',
                keyWidth: 124,
                keyHeight: 124,
                borderRadius: 20,
                padding: 20,
                opacity: 55,
                fillType: 'gradient',
                bgColor: 'rgba(220, 222, 230, 0.12)',
                gradientStart: 'rgba(230, 232, 240, 0.18)',
                gradientEnd: 'rgba(210, 212, 220, 0.12)',
                gradientAngle: 145,
                strokeEnabled: true,
                strokeWidth: 1,
                strokeColor: 'rgba(240, 242, 250, 0.28)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 18,
                shadowColor: 'rgba(0, 0, 0, 0.18)',
                shadowType: 'outer'
            },
            neon: {
                keyText: '霓',
                keyWidth: 150,
                keyHeight: 150,
                borderRadius: 15,
                padding: 20,
                opacity: 100,
                fillType: 'gradient',
                bgColor: '#0f0f23',
                gradientStart: '#00ff88',
                gradientEnd: '#00ffff',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 3,
                strokeColor: '#00ff88',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 0,
                shadowY: 0,
                shadowBlur: 30,
                shadowColor: '#00ff88',
                shadowType: 'outer'
            },
            minimal: {
                keyText: '简',
                keyWidth: 110,
                keyHeight: 110,
                borderRadius: 8,
                padding: 15,
                opacity: 100,
                fillType: 'solid',
                bgColor: '#f5f5f5',
                gradientStart: '#f5f5f5',
                gradientEnd: '#e8e8e8',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 1,
                strokeColor: '#dddddd',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 2,
                shadowY: 2,
                shadowBlur: 5,
                shadowColor: '#000000',
                shadowType: 'outer'
            },
            vintage: {
                keyText: '古',
                keyWidth: 125,
                keyHeight: 125,
                borderRadius: 18,
                padding: 20,
                opacity: 90,
                fillType: 'solid',
                bgColor: '#d4a574',
                gradientStart: '#d4a574',
                gradientEnd: '#c4956a',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 3,
                strokeColor: '#8b7355',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 12,
                shadowColor: '#5c4033',
                shadowType: 'outer'
            },
            metallic: {
                keyText: '金',
                keyWidth: 130,
                keyHeight: 130,
                borderRadius: 22,
                padding: 22,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#c0c0c0',
                gradientStart: '#e8e8e8',
                gradientEnd: '#a0a0a0',
                gradientAngle: 90,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#808080',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 12,
                shadowColor: '#606060',
                shadowType: 'outer'
            },
            wood: {
                keyText: '木',
                keyWidth: 128,
                keyHeight: 128,
                borderRadius: 16,
                padding: 20,
                opacity: 92,
                fillType: 'gradient',
                bgColor: '#8b6914',
                gradientStart: '#a67c00',
                gradientEnd: '#6b5a10',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#4a3f0b',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 10,
                shadowColor: '#3a3008',
                shadowType: 'outer'
            },
            leather: {
                keyText: '皮',
                keyWidth: 126,
                keyHeight: 126,
                borderRadius: 20,
                padding: 20,
                opacity: 88,
                fillType: 'solid',
                bgColor: '#8b4513',
                gradientStart: '#a0522d',
                gradientEnd: '#8b4513',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#654321',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 3,
                shadowY: 3,
                shadowBlur: 8,
                shadowColor: '#4a3219',
                shadowType: 'outer'
            },
            'gradient-blue': {
                keyText: '蓝',
                keyWidth: 140,
                keyHeight: 140,
                borderRadius: 28,
                padding: 24,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#4facfe',
                gradientStart: '#00c6fb',
                gradientEnd: '#005bea',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ffffff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 22,
                shadowColor: '#003d82',
                shadowType: 'outer'
            },
            'gradient-sunset': {
                keyText: '夕',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 26,
                padding: 23,
                opacity: 94,
                fillType: 'gradient',
                bgColor: '#fa709a',
                gradientStart: '#fee140',
                gradientEnd: '#fa709a',
                gradientAngle: 150,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ffffff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 20,
                shadowColor: '#c43d63',
                shadowType: 'outer'
            },
            tech: {
                keyText: '科',
                keyWidth: 140,
                keyHeight: 140,
                borderRadius: 12,
                padding: 22,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#00d2ff',
                gradientStart: '#3a7bd5',
                gradientEnd: '#00d2ff',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#1e90ff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 15,
                shadowColor: '#0066cc',
                shadowType: 'outer'
            },
            cyber: {
                keyText: '赛',
                keyWidth: 145,
                keyHeight: 145,
                borderRadius: 8,
                padding: 20,
                opacity: 98,
                fillType: 'gradient',
                bgColor: '#ff00ff',
                gradientStart: '#ff00ff',
                gradientEnd: '#00ffff',
                gradientAngle: 45,
                strokeEnabled: true,
                strokeWidth: 3,
                strokeColor: '#ff00ff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 0,
                shadowY: 0,
                shadowBlur: 25,
                shadowColor: '#ff00ff',
                shadowType: 'outer'
            },
            ocean: {
                keyText: '海',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 24,
                padding: 22,
                opacity: 93,
                fillType: 'gradient',
                bgColor: '#0288d1',
                gradientStart: '#0288d1',
                gradientEnd: '#4fc3f7',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#81d4fa',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 18,
                shadowColor: '#01579b',
                shadowType: 'outer'
            },
            forest: {
                keyText: '森',
                keyWidth: 136,
                keyHeight: 136,
                borderRadius: 20,
                padding: 21,
                opacity: 92,
                fillType: 'gradient',
                bgColor: '#2e7d32',
                gradientStart: '#2e7d32',
                gradientEnd: '#81c784',
                gradientAngle: 120,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#a5d6a7',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 16,
                shadowColor: '#1b5e20',
                shadowType: 'outer'
            },
            'sunset-glow': {
                keyText: '辉',
                keyWidth: 142,
                keyHeight: 142,
                borderRadius: 25,
                padding: 24,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#ff512f',
                gradientStart: '#ff512f',
                gradientEnd: '#dd2476',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ffcc80',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 22,
                shadowColor: '#880e4f',
                shadowType: 'outer'
            },
            aurora: {
                keyText: '极',
                keyWidth: 144,
                keyHeight: 144,
                borderRadius: 28,
                padding: 24,
                opacity: 94,
                fillType: 'gradient',
                bgColor: '#00b4db',
                gradientStart: '#00b4db',
                gradientEnd: '#0083b0',
                gradientAngle: 160,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#b2ebf2',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 24,
                shadowColor: '#006064',
                shadowType: 'outer'
            },
            ruby: {
                keyText: '红',
                keyWidth: 132,
                keyHeight: 132,
                borderRadius: 18,
                padding: 20,
                opacity: 96,
                fillType: 'gradient',
                bgColor: '#c62828',
                gradientStart: '#e53935',
                gradientEnd: '#c62828',
                gradientAngle: 90,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ffcdd2',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 18,
                shadowColor: '#b71c1c',
                shadowType: 'outer'
            },
            emerald: {
                keyText: '翠',
                keyWidth: 134,
                keyHeight: 134,
                borderRadius: 20,
                padding: 21,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#2e7d32',
                gradientStart: '#43a047',
                gradientEnd: '#2e7d32',
                gradientAngle: 90,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#c8e6c9',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 19,
                shadowColor: '#1b5e20',
                shadowType: 'outer'
            },
            gold: {
                keyText: '金',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 22,
                padding: 22,
                opacity: 97,
                fillType: 'gradient',
                bgColor: '#ffd700',
                gradientStart: '#fff8dc',
                gradientEnd: '#ffd700',
                gradientAngle: 45,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#fff9c4',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 20,
                shadowColor: '#b8860b',
                shadowType: 'outer'
            },
            silver: {
                keyText: '银',
                keyWidth: 136,
                keyHeight: 136,
                borderRadius: 20,
                padding: 21,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#c0c0c0',
                gradientStart: '#e8e8e8',
                gradientEnd: '#a0a0a0',
                gradientAngle: 90,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#f5f5f5',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 16,
                shadowColor: '#757575',
                shadowType: 'outer'
            },
            rose: {
                keyText: '玫',
                keyWidth: 130,
                keyHeight: 130,
                borderRadius: 22,
                padding: 21,
                opacity: 92,
                fillType: 'gradient',
                bgColor: '#f48fb1',
                gradientStart: '#f8bbd9',
                gradientEnd: '#f48fb1',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#fce4ec',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 17,
                shadowColor: '#c2185b',
                shadowType: 'outer'
            },
            lavender: {
                keyText: '薰',
                keyWidth: 132,
                keyHeight: 132,
                borderRadius: 23,
                padding: 21,
                opacity: 91,
                fillType: 'gradient',
                bgColor: '#b39ddb',
                gradientStart: '#d1c4e9',
                gradientEnd: '#b39ddb',
                gradientAngle: 120,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ede7f6',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 18,
                shadowColor: '#512da8',
                shadowType: 'outer'
            },
            mint: {
                keyText: '薄',
                keyWidth: 128,
                keyHeight: 128,
                borderRadius: 20,
                padding: 20,
                opacity: 90,
                fillType: 'gradient',
                bgColor: '#a5d6a7',
                gradientStart: '#c8e6c9',
                gradientEnd: '#a5d6a7',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#e8f5e9',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 16,
                shadowColor: '#388e3c',
                shadowType: 'outer'
            },
            peach: {
                keyText: '蜜',
                keyWidth: 134,
                keyHeight: 134,
                borderRadius: 22,
                padding: 22,
                opacity: 93,
                fillType: 'gradient',
                bgColor: '#ffccbc',
                gradientStart: '#ffccbc',
                gradientEnd: '#ffab91',
                gradientAngle: 120,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#fbe9e7',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 18,
                shadowColor: '#d84315',
                shadowType: 'outer'
            },
            berry: {
                keyText: '莓',
                keyWidth: 130,
                keyHeight: 130,
                borderRadius: 21,
                padding: 20,
                opacity: 94,
                fillType: 'gradient',
                bgColor: '#ce93d8',
                gradientStart: '#e1bee7',
                gradientEnd: '#ce93d8',
                gradientAngle: 150,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#f3e5f5',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 17,
                shadowColor: '#7b1fa2',
                shadowType: 'outer'
            },
            chocolate: {
                keyText: '巧',
                keyWidth: 132,
                keyHeight: 132,
                borderRadius: 18,
                padding: 20,
                opacity: 93,
                fillType: 'gradient',
                bgColor: '#8d6e63',
                gradientStart: '#a1887f',
                gradientEnd: '#8d6e63',
                gradientAngle: 90,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#efebe9',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 16,
                shadowColor: '#5d4037',
                shadowType: 'outer'
            },
            coffee: {
                keyText: '咖',
                keyWidth: 134,
                keyHeight: 134,
                borderRadius: 19,
                padding: 21,
                opacity: 92,
                fillType: 'gradient',
                bgColor: '#795548',
                gradientStart: '#8d6e63',
                gradientEnd: '#6d4c41',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#d7ccc8',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 18,
                shadowColor: '#4e342e',
                shadowType: 'outer'
            },
            stone: {
                keyText: '石',
                keyWidth: 136,
                keyHeight: 136,
                borderRadius: 14,
                padding: 20,
                opacity: 94,
                fillType: 'solid',
                bgColor: '#78909c',
                gradientStart: '#90a4ae',
                gradientEnd: '#607d8b',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#cfd8dc',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 15,
                shadowColor: '#455a64',
                shadowType: 'outer'
            },
            crystal: {
                keyText: '晶',
                keyWidth: 140,
                keyHeight: 140,
                borderRadius: 26,
                padding: 23,
                opacity: 88,
                fillType: 'gradient',
                bgColor: 'rgba(200, 230, 255, 0.3)',
                gradientStart: 'rgba(220, 240, 255, 0.4)',
                gradientEnd: 'rgba(180, 220, 255, 0.25)',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(230, 245, 255, 0.5)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 8,
                shadowY: 8,
                shadowBlur: 26,
                shadowColor: 'rgba(100, 150, 200, 0.3)',
                shadowType: 'outer'
            },
            bubble: {
                keyText: '泡',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 69,
                padding: 25,
                opacity: 75,
                fillType: 'gradient',
                bgColor: 'rgba(255, 182, 193, 0.4)',
                gradientStart: 'rgba(255, 218, 233, 0.5)',
                gradientEnd: 'rgba(255, 182, 193, 0.35)',
                gradientAngle: 120,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(255, 240, 245, 0.6)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 22,
                shadowColor: 'rgba(233, 30, 99, 0.2)',
                shadowType: 'outer'
            },
            cloud: {
                keyText: '云',
                keyWidth: 144,
                keyHeight: 140,
                borderRadius: 35,
                padding: 24,
                opacity: 82,
                fillType: 'gradient',
                bgColor: 'rgba(255, 255, 255, 0.6)',
                gradientStart: 'rgba(255, 255, 255, 0.7)',
                gradientEnd: 'rgba(230, 240, 255, 0.5)',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(255, 255, 255, 0.8)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 20,
                shadowColor: 'rgba(96, 125, 139, 0.25)',
                shadowType: 'outer'
            },
            star: {
                keyText: '星',
                keyWidth: 140,
                keyHeight: 140,
                borderRadius: 20,
                padding: 22,
                opacity: 96,
                fillType: 'gradient',
                bgColor: '#0d1b2a',
                gradientStart: '#1b263b',
                gradientEnd: '#0d1b2a',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#7b2cbf',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 18,
                shadowColor: '#240046',
                shadowType: 'outer'
            },
            galaxy: {
                keyText: '系',
                keyWidth: 146,
                keyHeight: 146,
                borderRadius: 25,
                padding: 24,
                opacity: 95,
                fillType: 'gradient',
                bgColor: '#240046',
                gradientStart: '#3c096c',
                gradientEnd: '#10002b',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#e0aaff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 24,
                shadowColor: '#10002b',
                shadowType: 'outer'
            },
            fire: {
                keyText: '火',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 16,
                padding: 21,
                opacity: 98,
                fillType: 'gradient',
                bgColor: '#ff5722',
                gradientStart: '#ff9800',
                gradientEnd: '#ff5722',
                gradientAngle: 45,
                strokeEnabled: true,
                strokeWidth: 3,
                strokeColor: '#ffcc80',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 0,
                shadowY: 0,
                shadowBlur: 28,
                shadowColor: '#bf360c',
                shadowType: 'outer'
            },
            ice: {
                keyText: '冰',
                keyWidth: 136,
                keyHeight: 136,
                borderRadius: 22,
                padding: 22,
                opacity: 88,
                fillType: 'gradient',
                bgColor: 'rgba(179, 229, 252, 0.6)',
                gradientStart: 'rgba(225, 245, 254, 0.7)',
                gradientEnd: 'rgba(129, 212, 250, 0.45)',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(225, 245, 254, 0.8)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 22,
                shadowColor: 'rgba(1, 87, 155, 0.3)',
                shadowType: 'outer'
            },
            thunder: {
                keyText: '雷',
                keyWidth: 142,
                keyHeight: 142,
                borderRadius: 15,
                padding: 21,
                opacity: 97,
                fillType: 'gradient',
                bgColor: '#263238',
                gradientStart: '#37474f',
                gradientEnd: '#263238',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 3,
                strokeColor: '#ffeb3b',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 24,
                shadowColor: '#ffeb3b',
                shadowType: 'outer'
            },
            rain: {
                keyText: '雨',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 24,
                padding: 22,
                opacity: 85,
                fillType: 'gradient',
                bgColor: 'rgba(100, 181, 246, 0.5)',
                gradientStart: 'rgba(144, 202, 249, 0.6)',
                gradientEnd: 'rgba(66, 165, 245, 0.4)',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(225, 245, 254, 0.7)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 20,
                shadowColor: 'rgba(13, 71, 161, 0.25)',
                shadowType: 'outer'
            },
            snow: {
                keyText: '雪',
                keyWidth: 140,
                keyHeight: 140,
                borderRadius: 25,
                padding: 23,
                opacity: 92,
                fillType: 'gradient',
                bgColor: 'rgba(255, 255, 255, 0.85)',
                gradientStart: 'rgba(255, 255, 255, 0.9)',
                gradientEnd: 'rgba(235, 240, 245, 0.75)',
                gradientAngle: 180,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(255, 255, 255, 0.95)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 20,
                shadowColor: 'rgba(176, 190, 197, 0.4)',
                shadowType: 'outer'
            },
            cherry: {
                keyText: '樱',
                keyWidth: 136,
                keyHeight: 136,
                borderRadius: 23,
                padding: 21,
                opacity: 90,
                fillType: 'gradient',
                bgColor: '#f8bbd0',
                gradientStart: '#fce4ec',
                gradientEnd: '#f8bbd0',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#fff',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 18,
                shadowColor: '#c2185b',
                shadowType: 'outer'
            },
            autumn: {
                keyText: '秋',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 20,
                padding: 21,
                opacity: 93,
                fillType: 'gradient',
                bgColor: '#ff7043',
                gradientStart: '#ffab91',
                gradientEnd: '#ff7043',
                gradientAngle: 120,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#ffccbc',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 5,
                shadowY: 5,
                shadowBlur: 19,
                shadowColor: '#d84315',
                shadowType: 'outer'
            },
            bamboo: {
                keyText: '竹',
                keyWidth: 134,
                keyHeight: 134,
                borderRadius: 18,
                padding: 20,
                opacity: 94,
                fillType: 'gradient',
                bgColor: '#66bb6a',
                gradientStart: '#81c784',
                gradientEnd: '#66bb6a',
                gradientAngle: 90,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: '#c8e6c9',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 4,
                shadowY: 4,
                shadowBlur: 16,
                shadowColor: '#388e3c',
                shadowType: 'outer'
            },
            jade: {
                keyText: '玉',
                keyWidth: 138,
                keyHeight: 138,
                borderRadius: 22,
                padding: 22,
                opacity: 91,
                fillType: 'gradient',
                bgColor: 'rgba(129, 199, 132, 0.65)',
                gradientStart: 'rgba(165, 214, 167, 0.75)',
                gradientEnd: 'rgba(102, 187, 106, 0.55)',
                gradientAngle: 135,
                strokeEnabled: true,
                strokeWidth: 2,
                strokeColor: 'rgba(200, 230, 201, 0.8)',
                strokeType: 'solid',
                strokePosition: 'outer',
                shadowEnabled: true,
                shadowX: 6,
                shadowY: 6,
                shadowBlur: 24,
                shadowColor: 'rgba(51, 105, 30, 0.3)',
                shadowType: 'outer'
            }
        };
    }

    initEventListeners() {
        // 预设按钮
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => this.applyPreset(btn.dataset.preset, btn));
        });

        // 范围滑块值显示和实时预览
        this.setupRangeInputs();

        // 填充类型切换
        document.querySelectorAll('[data-type="solid"], [data-type="gradient"], [data-type="image"]').forEach(btn => {
            if (btn.closest('.toggle-group')?.querySelector('[data-type="solid"]')) {
                btn.addEventListener('click', () => this.setFillType(btn.dataset.type, btn));
            }
        });

        // 描边开关
        this.strokeEnabled.addEventListener('change', () => {
            this.saveSettings();
            document.getElementById('strokeSection').classList.toggle('section-disabled', !this.strokeEnabled.checked);
            this.updatePreview();
        });

        // 描边位置切换
        document.querySelectorAll('#strokeSection [data-type]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#strokeSection [data-type]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.strokePosition = btn.dataset.type;
                this.saveSettings();
                this.updatePreview();
            });
        });

        // 阴影开关
        this.shadowEnabled.addEventListener('change', () => {
            this.saveSettings();
            document.getElementById('shadowSection').classList.toggle('section-disabled', !this.shadowEnabled.checked);
            this.updatePreview();
        });

        // 阴影类型切换
        document.querySelectorAll('#shadowSection [data-type]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#shadowSection [data-type]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.shadowType = btn.dataset.type;
                this.saveSettings();
                this.updatePreview();
            });
        });

        // 光晕开关
        this.glowEnabled.addEventListener('change', () => {
            this.saveSettings();
            document.getElementById('glowSection').classList.toggle('section-disabled', !this.glowEnabled.checked);
            this.updatePreview();
        });

        // 光晕类型切换
        document.querySelectorAll('#glowSection [data-type]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#glowSection [data-type]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.glowType = btn.dataset.type;
                this.saveSettings();
                this.updatePreview();
            });
        });

        // 图片背景相关事件
        if (this.selectImageBtn) {
            this.selectImageBtn.addEventListener('click', () => {
                this.bgImageInput.click();
            });
        }

        if (this.bgImageInput) {
            this.bgImageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }

        if (this.removeImageBtn) {
            this.removeImageBtn.addEventListener('click', () => this.removeBackgroundImage());
        }

        if (this.bgImageSize) {
            this.bgImageSize.addEventListener('change', () => {
                this.saveSettings();
                this.updatePreview();
            });
        }

        if (this.bgImageOpacity) {
            this.bgImageOpacity.addEventListener('input', () => {
                document.getElementById('bgImageOpacityValue').textContent = this.bgImageOpacity.value + '%';
                this.saveSettings();
                this.updatePreview();
            });
        }

        // 按钮事件
        document.getElementById('resetBtn').addEventListener('click', () => this.resetSettings());
        document.getElementById('resetPositionBtn').addEventListener('click', () => this.resetPosition());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadImage());

        // 添加副标题按钮事件
        if (this.addSubtitleBtn) {
            this.addSubtitleBtn.addEventListener('click', () => {
                this.addSubtitle();
                this.saveSettings();
            });
        }

        // 尺寸模板选择事件
        if (this.sizeTemplate) {
            this.sizeTemplate.addEventListener('change', () => {
                this.applySizeTemplate();
                this.saveSettings();
            });
        }

        // 自定义尺寸输入组事件
        if (this.applyCustomSize) {
            this.applyCustomSize.addEventListener('click', () => {
                this.applyCustomSizeValue();
                this.saveSettings();
            });
        }

        // 精确输入框事件
        if (this.keyWidthInput) {
            this.keyWidthInput.addEventListener('input', () => {
                const value = Math.max(40, Math.min(1920, parseInt(this.keyWidthInput.value) || 40));
                this.keyWidthInput.value = value;
                this.keyWidth.value = value;
                document.getElementById('widthValue').textContent = value;
                this.sizeTemplate.value = 'custom-input';
                this.saveSettings();
                this.updatePreview();
            });
        }

        if (this.keyHeightInput) {
            this.keyHeightInput.addEventListener('input', () => {
                const value = Math.max(40, Math.min(1920, parseInt(this.keyHeightInput.value) || 40));
                this.keyHeightInput.value = value;
                this.keyHeight.value = value;
                document.getElementById('heightValue').textContent = value;
                this.sizeTemplate.value = 'custom-input';
                this.saveSettings();
                this.updatePreview();
            });
        }
    }

    setupRangeInputs() {
        const rangeInputs = [
            { input: this.fontSize, display: 'fontSizeValue', suffix: '' },
            { input: this.textPosX, display: 'textPosXValue', suffix: '%' },
            { input: this.textPosY, display: 'textPosYValue', suffix: '%' },
            { input: this.keyWidth, display: 'widthValue', suffix: '' },
            { input: this.keyHeight, display: 'heightValue', suffix: '' },
            { input: this.borderRadius, display: 'radiusValue', suffix: '' },
            { input: this.padding, display: 'paddingValue', suffix: '' },
            { input: this.imageMargin, display: 'imageMarginValue', suffix: '' },
            { input: this.opacity, display: 'opacityValue', suffix: '%' },
            { input: this.gradientAngle, display: 'angleValue', suffix: '°' },
            { input: this.strokeWidth, display: 'strokeWidthValue', suffix: '' },
            { input: this.shadowX, display: 'shadowXValue', suffix: '' },
            { input: this.shadowY, display: 'shadowYValue', suffix: '' },
            { input: this.shadowBlur, display: 'shadowBlurValue', suffix: '' },
            { input: this.glowBlur, display: 'glowBlurValue', suffix: '' },
            { input: this.glowSpread, display: 'glowSpreadValue', suffix: '' },
            { input: this.glowOpacity, display: 'glowOpacityValue', suffix: '%' }
        ];

        rangeInputs.forEach(({ input, display, suffix }) => {
            if (input) {
                const displayElement = document.getElementById(display);
                if (displayElement) {
                    input.addEventListener('input', () => {
                        displayElement.textContent = input.value + suffix;

                        // 如果是宽度或高度滑块，同步到精确输入框
                        if (input === this.keyWidth) {
                            this.keyWidthInput.value = input.value;
                            this.sizeTemplate.value = 'custom';
                        }
                        if (input === this.keyHeight) {
                            this.keyHeightInput.value = input.value;
                            this.sizeTemplate.value = 'custom';
                        }

                        this.updatePreview();
                    });
                }
            }
        });

        // 文本输入
        this.keyText.addEventListener('input', () => {
            this.updatePreview();
            // 更新 placeholder
            if (this.keyText.value.trim() === '') {
                this.keyPreview.dataset.placeholder = 'true';
            } else {
                delete this.keyPreview.dataset.placeholder;
            }
        });

        // 颜色选择器
        const colorInputs = [
            this.bgColor,
            this.gradientStart,
            this.gradientEnd,
            this.strokeColor,
            this.shadowColor,
            this.textColor,
            this.glowColor
        ];

        colorInputs.forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    this.updatePreview();
                    this.updateGradientPreview();
                });
            }
        });

        // 描边类型
        this.strokeType.addEventListener('change', () => this.updatePreview());
    }

    setFillType(type, btn) {
        this.fillType = type;
        document.querySelectorAll('[data-type="solid"], [data-type="gradient"], [data-type="image"]').forEach(b => {
            if (b.closest('.toggle-group')?.querySelector('[data-type="solid"]')) {
                b.classList.remove('active');
            }
        });
        btn.classList.add('active');

        document.getElementById('solidColorSection').style.display = type === 'solid' ? 'block' : 'none';
        document.getElementById('gradientSection').style.display = type === 'gradient' ? 'block' : 'none';
        document.getElementById('imageSection').style.display = type === 'image' ? 'block' : 'none';

        this.updatePreview();
        this.updateGradientPreview();
    }

    applyPreset(presetName, btn) {
        const preset = this.presets[presetName];
        if (!preset) return;

        // 更新UI
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 应用预设值
        this.keyText.value = preset.keyText;
        this.keyWidth.value = preset.keyWidth;
        this.keyHeight.value = preset.keyHeight;
        this.keyWidthInput.value = preset.keyWidth;
        this.keyHeightInput.value = preset.keyHeight;
        this.borderRadius.value = preset.borderRadius;
        this.padding.value = preset.padding;
        this.opacity.value = preset.opacity;
        this.bgColor.value = this.hexToStandard(preset.bgColor);
        this.gradientStart.value = preset.gradientStart;
        this.gradientEnd.value = preset.gradientEnd;
        this.gradientAngle.value = preset.gradientAngle;
        this.strokeEnabled.checked = preset.strokeEnabled;
        this.strokeWidth.value = preset.strokeWidth;
        this.strokeColor.value = preset.strokeColor;
        this.strokeType.value = preset.strokeType;
        this.shadowEnabled.checked = preset.shadowEnabled;
        this.shadowX.value = preset.shadowX;
        this.shadowY.value = preset.shadowY;
        this.shadowBlur.value = preset.shadowBlur;
        this.shadowColor.value = preset.shadowColor;

        this.fillType = preset.fillType;
        this.strokePosition = preset.strokePosition;
        this.shadowType = preset.shadowType;

        // 更新填充类型UI
        const fillButtons = document.querySelectorAll('[data-type="solid"], [data-type="gradient"]');
        fillButtons.forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-type="${preset.fillType}"]`).classList.add('active');
        document.getElementById('solidColorSection').style.display = preset.fillType === 'solid' ? 'block' : 'none';
        document.getElementById('gradientSection').style.display = preset.fillType === 'gradient' ? 'block' : 'none';

        // 更新描边位置UI
        document.querySelectorAll('#strokeSection [data-type]').forEach(b => b.classList.remove('active'));
        document.querySelector(`#strokeSection [data-type="${preset.strokePosition}"]`).classList.add('active');

        // 更新阴影类型UI
        document.querySelectorAll('#shadowSection [data-type]').forEach(b => b.classList.remove('active'));
        document.querySelector(`#shadowSection [data-type="${preset.shadowType}"]`).classList.add('active');

        // 更新显示值
        document.getElementById('widthValue').textContent = preset.keyWidth;
        document.getElementById('heightValue').textContent = preset.keyHeight;
        document.getElementById('radiusValue').textContent = preset.borderRadius;
        document.getElementById('paddingValue').textContent = preset.padding;
        document.getElementById('opacityValue').textContent = preset.opacity + '%';
        document.getElementById('angleValue').textContent = preset.gradientAngle + '°';
        document.getElementById('strokeWidthValue').textContent = preset.strokeWidth;
        document.getElementById('shadowXValue').textContent = preset.shadowX;
        document.getElementById('shadowYValue').textContent = preset.shadowY;
        document.getElementById('shadowBlurValue').textContent = preset.shadowBlur;

        // 更新启用状态
        document.getElementById('strokeSection').classList.toggle('section-disabled', !preset.strokeEnabled);
        document.getElementById('shadowSection').classList.toggle('section-disabled', !preset.shadowEnabled);

        this.updatePreview();
        this.updateGradientPreview();
    }

    hexToStandard(color) {
        if (color.startsWith('rgba')) {
            // 提取rgb部分
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return '#' + [match[1], match[2], match[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
            }
        }
        return color;
    }

    updatePreview() {
        requestAnimationFrame(() => {
            const preview = this.keyPreview;
            const width = this.keyWidth.value;
            const height = this.keyHeight.value;
            const radius = this.borderRadius.value;
            const padding = this.padding.value;
            const opacity = this.opacity.value / 100;

            // 基本样式
            preview.style.width = `${width}px`;
            preview.style.height = `${height}px`;
            preview.style.borderRadius = `${radius}px`;
            preview.style.padding = `${padding}px`;
            preview.style.opacity = opacity;

            // 文字：当输入框无个人输入时，预览框内文字不显示
            if (!this.keyText.value.trim()) {
                preview.innerHTML = '';
            } else {
                preview.innerHTML = '';

                // 创建主标题元素
                const mainTitle = document.createElement('div');
                const baseFontSize = this.fontSize.value;
                const scaledFontSize = Math.round(baseFontSize * this.mainTextScale);
                mainTitle.style.fontSize = `${scaledFontSize}px`;
                mainTitle.style.color = this.textColor.value;
                mainTitle.style.fontWeight = 'bold';
                mainTitle.textContent = this.keyText.value;
                mainTitle.style.position = 'absolute';
                mainTitle.style.left = `${this.textPosX.value}%`;
                mainTitle.style.top = `${this.textPosY.value}%`;
                mainTitle.style.transform = 'translate(-50%, -50%)';
                mainTitle.style.cursor = 'move';
                mainTitle.style.userSelect = 'none';
                mainTitle.className = 'draggable-text main-text';
                mainTitle.dataset.type = 'main';
                preview.appendChild(mainTitle);

                // 为主标题添加拖拽功能
                this.makeTextDraggable(mainTitle, 'main');

                // 添加副标题
                this.subtitles.forEach((subtitle, index) => {
                    if (subtitle.trim()) {
                        const subtitleEl = document.createElement('div');
                        const baseFontSize = Math.max(this.fontSize.value * 0.6, 12);
                        const subtitleScale = this.subtitleFontSizes[index] || 1;
                        const scaledFontSize = Math.round(baseFontSize * subtitleScale);
                        subtitleEl.style.fontSize = `${scaledFontSize}px`;
                        subtitleEl.style.color = this.textColor.value;
                        subtitleEl.style.opacity = '0.9';
                        subtitleEl.textContent = subtitle;
                        subtitleEl.style.position = 'absolute';

                        // 获取或初始化副标题位置
                        const pos = this.subtitlePositions[index] || {
                            x: 50,
                            y: 50 + (index + 1) * 15
                        };

                        subtitleEl.style.left = `${pos.x}%`;
                        subtitleEl.style.top = `${pos.y}%`;
                        subtitleEl.style.transform = 'translate(-50%, -50%)';
                        subtitleEl.style.cursor = 'move';
                        subtitleEl.style.userSelect = 'none';
                        subtitleEl.className = 'draggable-text subtitle-text';
                        subtitleEl.dataset.index = index;
                        subtitleEl.dataset.type = 'subtitle';
                        preview.appendChild(subtitleEl);

                        // 为副标题添加拖拽功能
                        this.makeTextDraggable(subtitleEl, 'subtitle', index);
                    }
                });
            }

            // 背景填充
            if (this.fillType === 'solid') {
                preview.style.background = this.bgColor.value;
                preview.style.backgroundImage = 'none';
            } else if (this.fillType === 'gradient') {
                const angle = this.gradientAngle.value;
                const start = this.gradientStart.value;
                const end = this.gradientEnd.value;
                preview.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
            } else if (this.fillType === 'image') {
                if (this.bgImageData) {
                    const sizeMode = this.bgImageSize.value;
                    const opacity = this.bgImageOpacity.value / 100;
                    preview.style.backgroundImage = `url(${this.bgImageData})`;
                    preview.style.backgroundSize = sizeMode;
                    preview.style.backgroundPosition = 'center center';
                    preview.style.backgroundRepeat = 'no-repeat';
                    preview.style.opacity = opacity;
                } else {
                    preview.style.background = 'rgba(255, 255, 255, 0.1)';
                    preview.style.backgroundImage = 'none';
                }
            }

            // 描边
            let shadowEffects = '';
            
            if (this.strokeEnabled.checked) {
                const strokeW = this.strokeWidth.value;
                const color = this.strokeColor.value;
                const type = this.strokeType.value;

                let borderStyle = 'solid';
                if (type === 'dashed') borderStyle = 'dashed';
                else if (type === 'dotted') borderStyle = 'dotted';

                if (this.strokePosition === 'inner') {
                    shadowEffects += ` inset 0 0 0 ${strokeW}px ${color}`;
                    preview.style.border = 'none';
                } else {
                    preview.style.border = `${strokeW}px ${borderStyle} ${color}`;
                }
            } else {
                preview.style.border = 'none';
            }

            // 阴影
            if (this.shadowEnabled.checked) {
                const x = this.shadowX.value;
                const y = this.shadowY.value;
                const blur = this.shadowBlur.value;
                const color = this.shadowColor.value;

                if (this.shadowType === 'inner') {
                    shadowEffects += ` inset ${x}px ${y}px ${blur}px ${color}`;
                } else {
                    shadowEffects += ` ${x}px ${y}px ${blur}px ${color}`;
                }
            }

            // 光晕
            if (this.glowEnabled.checked) {
                const blur = this.glowBlur.value;
                const spread = this.glowSpread.value;
                const color = this.hexToRgba(this.glowColor.value, this.glowOpacity.value / 100);

                if (this.glowType === 'inner') {
                    shadowEffects += ` inset 0 0 ${blur}px ${spread}px ${color}`;
                } else {
                    shadowEffects += ` 0 0 ${blur}px ${spread}px ${color}`;
                }
            }

            preview.style.boxShadow = shadowEffects || 'none';
        });
    }

    hexToRgba(hex, alpha) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})` : 
            hex;
    }

    updateGradientPreview() {
        if (this.fillType === 'gradient') {
            const angle = this.gradientAngle.value;
            const start = this.gradientStart.value;
            const end = this.gradientEnd.value;
            this.gradientPreview.style.background = `linear-gradient(${angle}deg, ${start}, ${end})`;
        }
    }

    resetSettings() {
        this.applyPreset('default', document.querySelector('[data-preset="default"]'));
    }

    resetPosition() {
        // 重置预览框位置到中心
        this.keyPreview.style.position = 'relative';
        this.keyPreview.style.left = '';
        this.keyPreview.style.top = '';
        this.keyPreview.style.transform = 'none';

        // 清除用户拖动标记,恢复自动同步功能
        if (this.resetDragged) {
            this.resetDragged();
        }

        // 显示提示
        this.showNotification('位置已重置,自动同步已恢复');
    }

    showNotification(message) {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideDown 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

        // 添加动画样式
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // 2秒后自动消失
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    downloadImage() {
        const preview = this.keyPreview;
        const width = parseInt(this.keyWidth.value);
        const height = parseInt(this.keyHeight.value);
        const radius = parseInt(this.borderRadius.value);
        const padding = parseInt(this.padding.value);
        const imageMargin = parseInt(this.imageMargin.value);

        // 创建 canvas（增加图边留白）
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const canvasWidth = width + imageMargin * 2;
        const canvasHeight = height + imageMargin * 2;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // 绘制背景（透明，不绘制）

        // 保存状态以应用阴影
        ctx.save();

        // 阴影设置
        if (this.shadowEnabled.checked && this.shadowType === 'outer') {
            ctx.shadowColor = this.shadowColor.value;
            ctx.shadowBlur = parseInt(this.shadowBlur.value);
            ctx.shadowOffsetX = parseInt(this.shadowX.value);
            ctx.shadowOffsetY = parseInt(this.shadowY.value);
        }

        // 光晕设置
        if (this.glowEnabled.checked && this.glowType === 'outer') {
            const glowBlur = parseInt(this.glowBlur.value);
            const glowSpread = parseInt(this.glowSpread.value);
            const glowOpacity = this.glowOpacity.value / 100;
            const glowColor = this.hexToRgba(this.glowColor.value, glowOpacity);
            
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = Math.max(glowBlur, ctx.shadowBlur || 0);
            ctx.shadowOffsetX = ctx.shadowOffsetX || 0;
            ctx.shadowOffsetY = ctx.shadowOffsetY || 0;
        }

        // 背景填充
        if (this.fillType === 'solid') {
            ctx.fillStyle = this.bgColor.value;
            ctx.beginPath();
            this.roundRect(ctx, imageMargin, imageMargin, width, height, radius);
            ctx.fill();
        } else if (this.fillType === 'gradient') {
            const angle = parseInt(this.gradientAngle.value);
            const rad = angle * Math.PI / 180;
            const x1 = imageMargin + width / 2 - Math.cos(rad) * width / 2;
            const y1 = imageMargin + height / 2 - Math.sin(rad) * height / 2;
            const x2 = imageMargin + width / 2 + Math.cos(rad) * width / 2;
            const y2 = imageMargin + height / 2 + Math.sin(rad) * height / 2;

            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, this.gradientStart.value);
            gradient.addColorStop(1, this.gradientEnd.value);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            this.roundRect(ctx, imageMargin, imageMargin, width, height, radius);
            ctx.fill();
        } else if (this.fillType === 'image' && this.bgImageObject) {
            // 绘制图片背景
            ctx.save();
            ctx.beginPath();
            this.roundRect(ctx, imageMargin, imageMargin, width, height, radius);
            ctx.clip();

            const sizeMode = this.bgImageSize.value;
            const opacity = this.bgImageOpacity.value / 100;
            ctx.globalAlpha = opacity;

            const img = this.bgImageObject;
            const imgAspect = img.width / img.height;
            const targetAspect = width / height;

            let drawX = imageMargin;
            let drawY = imageMargin;
            let drawW = width;
            let drawH = height;

            if (sizeMode === 'cover') {
                // 覆盖模式：裁剪填充
                if (imgAspect > targetAspect) {
                    drawH = height;
                    drawW = height * imgAspect;
                    drawX = imageMargin - (drawW - width) / 2;
                } else {
                    drawW = width;
                    drawH = width / imgAspect;
                    drawY = imageMargin - (drawH - height) / 2;
                }
            } else if (sizeMode === 'contain') {
                // 包含模式：完整显示
                if (imgAspect > targetAspect) {
                    drawW = width;
                    drawH = width / imgAspect;
                    drawY = imageMargin + (height - drawH) / 2;
                } else {
                    drawH = height;
                    drawW = height * imgAspect;
                    drawX = imageMargin + (width - drawW) / 2;
                }
            }
            // stretch 模式：直接拉伸，使用目标尺寸

            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            ctx.restore();
        }

        // 恢复状态
        ctx.restore();

        // 内阴影
        if (this.shadowEnabled.checked && this.shadowType === 'inner') {
            ctx.save();
            ctx.beginPath();
            this.roundRect(ctx, imageMargin, imageMargin, width, height, radius);
            ctx.clip();
            
            ctx.fillStyle = this.shadowColor.value;
            ctx.globalAlpha = 0.3;
            ctx.filter = `blur(${this.shadowBlur.value}px)`;
            ctx.fillRect(
                imageMargin + parseInt(this.shadowX.value) - 20,
                imageMargin + parseInt(this.shadowY.value) - 20,
                width + 40,
                height + 40
            );
            ctx.restore();
        }

        // 内光晕
        if (this.glowEnabled.checked && this.glowType === 'inner') {
            ctx.save();
            ctx.beginPath();
            this.roundRect(ctx, imageMargin, imageMargin, width, height, radius);
            ctx.clip();
            
            ctx.fillStyle = this.glowColor.value;
            ctx.globalAlpha = this.glowOpacity.value / 100;
            ctx.filter = `blur(${this.glowBlur.value}px)`;
            ctx.fillRect(imageMargin - this.glowSpread.value, imageMargin - this.glowSpread.value, width + this.glowSpread.value * 2, height + this.glowSpread.value * 2);
            ctx.restore();
        }

        // 描边
        if (this.strokeEnabled.checked) {
            const strokeWidth = parseInt(this.strokeWidth.value);
            ctx.lineWidth = strokeWidth;
            ctx.strokeStyle = this.strokeColor.value;

            if (this.strokeType.value === 'dashed') {
                ctx.setLineDash([10, 5]);
            } else if (this.strokeType.value === 'dotted') {
                ctx.setLineDash([2, 4]);
            } else {
                ctx.setLineDash([]);
            }

            ctx.beginPath();
            const offset = strokeWidth / 2;
            this.roundRect(ctx, imageMargin + offset, imageMargin + offset, width - strokeWidth, height - strokeWidth, radius);
            ctx.stroke();
        }

        // 文字
        const text = this.keyText.value;
        const fontSize = parseInt(this.fontSize.value);
        const subtitleFontSize = Math.max(fontSize * 0.6, 12);

        // 绘制主文字
        if (text && text.trim()) {
            const posX = imageMargin + (parseInt(this.textPosX.value) / 100) * width;
            const posY = imageMargin + (parseInt(this.textPosY.value) / 100) * height;

            ctx.font = `bold ${fontSize}px "Microsoft YaHei", Arial, sans-serif`;
            ctx.fillStyle = this.textColor.value;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.fillText(text, posX, posY);
        }

        // 绘制副标题
        this.subtitles.forEach((subtitle, index) => {
            if (subtitle && subtitle.trim()) {
                const pos = this.subtitlePositions[index] || { x: 50, y: 50 + (index + 1) * 15 };
                const posX = imageMargin + (pos.x / 100) * width;
                const posY = imageMargin + (pos.y / 100) * height;

                ctx.font = `${subtitleFontSize}px "Microsoft YaHei", Arial, sans-serif`;
                ctx.fillStyle = this.textColor.value;
                ctx.globalAlpha = 0.9;
                ctx.fillText(subtitle, posX, posY);
            }
        });

        // 恢复透明度
        ctx.globalAlpha = 1;

        // 下载
        const link = document.createElement('a');
        const filename = (text && text.trim()) ? `key-${text}-${Date.now()}.png` : `key-${Date.now()}.png`;
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    roundRect(ctx, x, y, width, height, radius) {
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    initDragAndDrop() {
        let isDragging = false;
        let startX, startY;
        let originalX, originalY;
        let isUserDragged = false; // 标记是否用户手动拖动过

        this.keyPreview.addEventListener('mousedown', (e) => {
            // 如果正在拖拽文字,则不拖拽按键
            if (this.isTextDragging) {
                return;
            }

            // 如果点击的是文字元素,不触发按键拖拽
            if (e.target.classList.contains('draggable-text')) {
                return;
            }

            isDragging = true;
            isUserDragged = true;
            startX = e.clientX;
            startY = e.clientY;

            // 获取预览框当前位置
            const rect = this.keyPreview.getBoundingClientRect();
            const parentRect = this.previewArea.getBoundingClientRect();

            // 如果是相对定位,转换为绝对定位
            if (this.keyPreview.style.position !== 'absolute') {
                originalX = rect.left - parentRect.left;
                originalY = rect.top - parentRect.top;
                this.keyPreview.style.position = 'absolute';
            } else {
                originalX = parseFloat(this.keyPreview.style.left) || 0;
                originalY = parseFloat(this.keyPreview.style.top) || 0;
            }

            this.keyPreview.style.cursor = 'grabbing';
            e.preventDefault(); // 防止选中文字
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            // 计算新位置（允许超出父容器范围）
            let newX = originalX + deltaX;
            let newY = originalY + deltaY;

            // 应用新位置
            this.keyPreview.style.position = 'absolute';
            this.keyPreview.style.left = `${newX}px`;
            this.keyPreview.style.top = `${newY}px`;
            this.keyPreview.style.transform = 'none';

            // 存储当前位置以便下次使用
            this.currentX = newX;
            this.currentY = newY;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                this.keyPreview.style.cursor = 'move';
            }
        });

        // 将用户拖动标记暴露给其他方法使用
        this.isUserDragged = () => isUserDragged;
        this.resetDragged = () => {
            isUserDragged = false;
            this.currentX = null;
            this.currentY = null;
        };
    }

    initScrollSync() {
        // 获取各个设置区域
        const panel = document.querySelector('.panel');
        const headings = document.querySelectorAll('.panel h2');

        // 监听设置面板的滚动事件
        panel.addEventListener('scroll', () => {
            // 如果用户手动拖动过,则不自动移动预览框
            if (this.isUserDragged && this.isUserDragged()) {
                return;
            }

            let currentHeading = null;
            let maxIntersection = 0;

            // 找到当前可见最多的标题
            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                const panelRect = panel.getBoundingClientRect();

                // 计算标题与可视区域的交集
                const top = Math.max(rect.top, panelRect.top);
                const bottom = Math.min(rect.bottom, panelRect.bottom);
                const intersection = Math.max(0, bottom - top);

                if (intersection > maxIntersection && intersection > 0) {
                    maxIntersection = intersection;
                    currentHeading = heading;
                }
            });

            // 根据当前标题移动预览框
            if (currentHeading) {
                this.movePreviewToSection(currentHeading.textContent);
            }
        }, { passive: true });
    }

    movePreviewToSection(headingText) {
        if (!headingText) return;

        // 重置预览框位置
        this.keyPreview.style.position = 'relative';
        this.keyPreview.style.left = '';
        this.keyPreview.style.top = '';
        this.keyPreview.style.transform = '';

        // 添加平滑过渡效果
        this.keyPreview.style.transition = 'all 0.3s ease';

        // 根据区域类型调整预览框的位置偏移
        let offsetX = 0;
        let offsetY = 0;
        let scale = 1;

        if (headingText.includes('填充颜色')) {
            // 填充区域：稍微偏上并放大
            offsetY = -30;
            scale = 1.05;
        } else if (headingText.includes('描边设置')) {
            // 描边区域：稍微偏右
            offsetX = 30;
        } else if (headingText.includes('阴影设置')) {
            // 阴影区域：稍微偏下
            offsetY = 30;
        } else if (headingText.includes('光晕效果')) {
            // 光晕区域：稍微偏左并放大
            offsetX = -30;
            scale = 1.05;
        } else if (headingText.includes('基本设置')) {
            // 基本设置：不偏移
            offsetX = 0;
            offsetY = 0;
        }

        // 应用变换
        this.keyPreview.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

        // 恢复原始过渡设置
        setTimeout(() => {
            this.keyPreview.style.transition = 'box-shadow 0.3s, background 0.3s, border 0.3s, transform 0.3s';
        }, 300);
    }

    initSubtitleSystem() {
        // 添加副标题按钮
        if (this.addSubtitleBtn) {
            this.addSubtitleBtn.addEventListener('click', () => this.addSubtitle());
        }
    }

    addSubtitle() {
        const index = this.subtitles.length;
        this.subtitles.push('');
        this.subtitlePositions.push({ x: 50, y: 50 + (index + 1) * 15 });
        this.subtitleFontSizes.push(1); // 初始化副标题字体缩放比例为1

        const subtitleItem = document.createElement('div');
        subtitleItem.className = 'subtitle-item';
        subtitleItem.dataset.index = index;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `副标题 ${index + 1}`;
        input.value = '';
        input.addEventListener('input', (e) => {
            this.subtitles[index] = e.target.value;
            this.updatePreview();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => {
            this.removeSubtitle(index, subtitleItem);
        });

        subtitleItem.appendChild(input);
        subtitleItem.appendChild(deleteBtn);
        this.subtitleContainer.appendChild(subtitleItem);

        // 更新所有副标题的索引
        this.updateSubtitleIndices();
    }

    removeSubtitle(index, element) {
        // 从数组中删除
        this.subtitles.splice(index, 1);
        this.subtitlePositions.splice(index, 1);
        this.subtitleFontSizes.splice(index, 1);
        // 从DOM中删除
        element.remove();
        // 更新所有副标题的索引
        this.updateSubtitleIndices();
        // 更新预览
        this.updatePreview();
    }

    updateSubtitleIndices() {
        const items = this.subtitleContainer.querySelectorAll('.subtitle-item');
        const newSubtitles = [];
        const newPositions = [];
        const newFontSizes = [];

        items.forEach((item, newIndex) => {
            const input = item.querySelector('input');
            input.placeholder = `副标题 ${newIndex + 1}`;

            // 重新绑定事件
            const oldIndex = parseInt(item.dataset.index);
            input.removeEventListener('input', null);

            input.addEventListener('input', (e) => {
                newSubtitles[newIndex] = e.target.value;
                this.subtitles[newIndex] = e.target.value;
                this.updatePreview();
            });

            // 更新删除按钮事件
            const deleteBtn = item.querySelector('button');
            deleteBtn.onclick = () => {
                this.removeSubtitle(newIndex, item);
            };

            item.dataset.index = newIndex;

            // 如果旧索引有值,迁移到新索引
            if (this.subtitles[oldIndex] !== undefined) {
                newSubtitles[newIndex] = this.subtitles[oldIndex];
            }
            if (this.subtitlePositions[oldIndex] !== undefined) {
                newPositions[newIndex] = this.subtitlePositions[oldIndex];
            }
            if (this.subtitleFontSizes[oldIndex] !== undefined) {
                newFontSizes[newIndex] = this.subtitleFontSizes[oldIndex];
            }
        });

        this.subtitles = [...newSubtitles];
        this.subtitlePositions = [...newPositions];
        this.subtitleFontSizes = [...newFontSizes];
    }

    makeTextDraggable(element, type, index = null) {
        let isDragging = false;
        let startX, startY;
        let originalX, originalY;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

            const rect = element.getBoundingClientRect();
            const previewRect = this.keyPreview.getBoundingClientRect();

            originalX = rect.left - previewRect.left;
            originalY = rect.top - previewRect.top;

            element.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();

            // 标记按键正在被拖拽
            this.isTextDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newX = originalX + deltaX;
            const newY = originalY + deltaY;

            const previewRect = this.keyPreview.getBoundingClientRect();
            const percentageX = (newX / previewRect.width) * 100;
            const percentageY = (newY / previewRect.height) * 100;

            element.style.left = `${percentageX}%`;
            element.style.top = `${percentageY}%`;

            // 保存位置信息
            if (type === 'main') {
                this.textPosX.value = Math.round(percentageX);
                this.textPosY.value = Math.round(percentageY);
                document.getElementById('textPosXValue').textContent = Math.round(percentageX) + '%';
                document.getElementById('textPosYValue').textContent = Math.round(percentageY) + '%';
            } else if (type === 'subtitle' && index !== null) {
                this.subtitlePositions[index] = { x: percentageX, y: percentageY };
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'move';
                this.isTextDragging = false;
            }
        });

        // 添加鼠标悬停事件以跟踪当前悬停的文字
        element.addEventListener('mouseenter', () => {
            this.currentHoveredText = element;
        });

        element.addEventListener('mouseleave', () => {
            this.currentHoveredText = null;
        });
    }

    initTextResize() {
        // 监听鼠标滚轮事件，用于缩放文字
        this.keyPreview.addEventListener('wheel', (e) => {
            // 如果鼠标没有悬停在文字元素上，不进行缩放
            if (!this.currentHoveredText) {
                return;
            }

            // 阻止默认的滚动行为
            e.preventDefault();

            const delta = e.deltaY;
            const scaleStep = 0.1; // 每次滚动的缩放步长

            const textType = this.currentHoveredText.dataset.type;
            const currentIndex = parseInt(this.currentHoveredText.dataset.index);

            if (textType === 'main') {
                // 缩放主文字
                if (delta < 0) {
                    // 向上滚动，放大
                    this.mainTextScale = Math.min(this.mainTextScale + scaleStep, 3); // 最大3倍
                } else {
                    // 向下滚动，缩小
                    this.mainTextScale = Math.max(this.mainTextScale - scaleStep, 0.3); // 最小0.3倍
                }
            } else if (textType === 'subtitle' && !isNaN(currentIndex)) {
                // 缩放副标题
                const currentScale = this.subtitleFontSizes[currentIndex] || 1;
                if (delta < 0) {
                    // 向上滚动，放大
                    this.subtitleFontSizes[currentIndex] = Math.min(currentScale + scaleStep, 3);
                } else {
                    // 向下滚动，缩小
                    this.subtitleFontSizes[currentIndex] = Math.max(currentScale - scaleStep, 0.3);
                }
            }

            // 更新预览
            this.updatePreview();

            // 显示缩放提示
            this.showResizeNotification(textType, currentIndex);
        }, { passive: false });
    }

    showResizeNotification(textType, index) {
        let message = '';
        let scale = 1;

        if (textType === 'main') {
            scale = this.mainTextScale;
            message = `主文字缩放: ${(scale * 100).toFixed(0)}%`;
        } else if (textType === 'subtitle' && !isNaN(index)) {
            scale = this.subtitleFontSizes[index] || 1;
            message = `副标题 ${index + 1} 缩放: ${(scale * 100).toFixed(0)}%`;
        }

        if (message) {
            this.showNotification(message);
        }
    }

    applySizeTemplate() {
        const template = this.sizeTemplate.value;

        if (template === 'custom-input') {
            // 自定义输入模式，显示自定义输入组
            this.customSizeInputGroup.style.display = 'block';
            return;
        } else if (template === 'preset') {
            // 预设模式，隐藏自定义输入组
            this.customSizeInputGroup.style.display = 'none';
            return;
        }

        // 解析模板值（预设尺寸）
        const [width, height] = template.split('x').map(Number);

        // 应用尺寸
        this.keyWidth.value = width;
        this.keyHeight.value = height;
        this.keyWidthInput.value = width;
        this.keyHeightInput.value = height;
        this.customWidth.value = width;
        this.customHeight.value = height;

        // 隐藏自定义输入组
        this.customSizeInputGroup.style.display = 'none';

        // 更新显示值
        document.getElementById('widthValue').textContent = width;
        document.getElementById('heightValue').textContent = height;

        // 更新预览
        this.updatePreview();

        // 显示通知
        this.showNotification(`已应用尺寸模板: ${width} × ${height}`);
    }

    applyCustomSizeValue() {
        const width = parseInt(this.customWidth.value);
        const height = parseInt(this.customHeight.value);

        // 验证输入
        if (isNaN(width) || isNaN(height)) {
            this.showNotification('请输入有效的数值');
            return;
        }

        if (width < 40 || width > 1920 || height < 40 || height > 1920) {
            this.showNotification('尺寸必须在 40-1920 像素之间');
            return;
        }

        // 应用自定义尺寸
        this.keyWidth.value = width;
        this.keyHeight.value = height;
        this.keyWidthInput.value = width;
        this.keyHeightInput.value = height;

        // 更新显示值
        document.getElementById('widthValue').textContent = width;
        document.getElementById('heightValue').textContent = height;

        // 更新预览
        this.updatePreview();

        // 显示通知
        this.showNotification(`已应用自定义尺寸: ${width} × ${height}`);
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        // 验证文件类型
        if (!file.type.startsWith('image/')) {
            this.showNotification('请选择有效的图片文件');
            return;
        }

        // 验证文件大小（最大 10MB）
        if (file.size > 10 * 1024 * 1024) {
            this.showNotification('图片大小不能超过 10MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            this.bgImageData = event.target.result;

            // 创建图片对象用于 canvas 绘制
            const img = new Image();
            img.onload = () => {
                this.bgImageObject = img;

                // 显示图片预览
                this.bgImagePreview.src = this.bgImageData;
                this.imagePreviewContainer.style.display = 'block';

                // 切换到图片模式
                this.setFillType('image', document.querySelector('[data-type="image"]'));

                // 自动调整尺寸以匹配图片比例
                const imgAspect = img.width / img.height;
                const currentWidth = parseInt(this.keyWidth.value);
                const newHeight = Math.round(currentWidth / imgAspect);

                // 限制在合理范围内
                const clampedHeight = Math.max(40, Math.min(1920, newHeight));
                this.keyHeight.value = clampedHeight;
                this.keyHeightInput.value = clampedHeight;
                document.getElementById('heightValue').textContent = clampedHeight;

                this.updatePreview();
                this.showNotification('图片导入成功！');
            };
            img.onerror = () => {
                this.showNotification('图片加载失败，请重试');
            };
            img.src = this.bgImageData;
        };
        reader.onerror = () => {
            this.showNotification('图片读取失败，请重试');
        };
        reader.readAsDataURL(file);

        // 清空 input，允许重复上传同一文件
        e.target.value = '';
    }

    removeBackgroundImage() {
        this.bgImageData = null;
        this.bgImageObject = null;
        this.imagePreviewContainer.style.display = 'none';
        this.bgImageInput.value = '';

        // 切换回纯色模式
        this.setFillType('solid', document.querySelector('[data-type="solid"]'));

        this.updatePreview();
        this.showNotification('背景图片已移除');
    }

    initCustomSizeInput() {
        // 初始化时根据模板值显示/隐藏自定义输入组
        if (this.sizeTemplate && this.customSizeInputGroup) {
            const template = this.sizeTemplate.value;
            this.customSizeInputGroup.style.display = (template === 'custom-input') ? 'block' : 'none';
        }

        // 支持回车键应用自定义尺寸
        const inputs = [this.customWidth, this.customHeight];
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.applyCustomSizeValue();
                    }
                });
            }
        });

        // 输入时自动更新到自定义模板
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    this.sizeTemplate.value = 'custom-input';
                });
            }
        });
    }

    // 保存设置到 localStorage
    saveSettings() {
        const settings = {
            // 基本参数
            keyText: this.keyText.value,
            fontSize: this.fontSize.value,
            textColor: this.textColor.value,
            textPosX: this.textPosX.value,
            textPosY: this.textPosY.value,
            keyWidth: this.keyWidth.value,
            keyHeight: this.keyHeight.value,
            borderRadius: this.borderRadius.value,
            padding: this.padding.value,
            imageMargin: this.imageMargin.value,
            opacity: this.opacity.value,
            sizeTemplate: this.sizeTemplate.value,
            customWidth: this.customWidth.value,
            customHeight: this.customHeight.value,

            // 填充设置
            fillType: this.fillType,
            bgColor: this.bgColor.value,
            gradientStart: this.gradientStart.value,
            gradientEnd: this.gradientEnd.value,
            gradientAngle: this.gradientAngle.value,

            // 图片背景
            bgImageSize: this.bgImageSize.value,
            bgImageOpacity: this.bgImageOpacity.value,

            // 描边设置
            strokeEnabled: this.strokeEnabled.checked,
            strokeWidth: this.strokeWidth.value,
            strokeColor: this.strokeColor.value,
            strokeType: this.strokeType.value,
            strokePosition: this.strokePosition,

            // 阴影设置
            shadowEnabled: this.shadowEnabled.checked,
            shadowX: this.shadowX.value,
            shadowY: this.shadowY.value,
            shadowBlur: this.shadowBlur.value,
            shadowColor: this.shadowColor.value,
            shadowType: this.shadowType,

            // 光晕设置
            glowEnabled: this.glowEnabled.checked,
            glowBlur: this.glowBlur.value,
            glowSpread: this.glowSpread.value,
            glowColor: this.glowColor.value,
            glowOpacity: this.glowOpacity.value,
            glowType: this.glowType,

            // 副标题系统
            subtitles: this.subtitles,
            subtitlePositions: this.subtitlePositions,
            subtitleFontSizes: this.subtitleFontSizes,

            // 文字缩放
            mainTextScale: this.mainTextScale
        };

        try {
            localStorage.setItem('keyEditorSettings', JSON.stringify(settings));
        } catch (e) {
            console.error('保存设置失败:', e);
        }
    }

    // 从 localStorage 加载设置
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('keyEditorSettings');
            if (!savedSettings) {
                // 首次加载或无保存数据，设置默认尺寸为 100×100
                this.setDefaultSize();
                return;
            }

            const settings = JSON.parse(savedSettings);

            // 恢复基本参数
            if (settings.keyText !== undefined) this.keyText.value = settings.keyText;
            if (settings.fontSize !== undefined) this.fontSize.value = settings.fontSize;
            if (settings.textColor !== undefined) this.textColor.value = settings.textColor;
            if (settings.textPosX !== undefined) this.textPosX.value = settings.textPosX;
            if (settings.textPosY !== undefined) this.textPosY.value = settings.textPosY;
            if (settings.borderRadius !== undefined) this.borderRadius.value = settings.borderRadius;
            if (settings.padding !== undefined) this.padding.value = settings.padding;
            if (settings.imageMargin !== undefined) this.imageMargin.value = settings.imageMargin;
            if (settings.opacity !== undefined) this.opacity.value = settings.opacity;

            // 恢复尺寸模板选择（但不恢复实际尺寸）
            if (settings.sizeTemplate !== undefined) {
                this.sizeTemplate.value = settings.sizeTemplate;
            }

            // 恢复自定义尺寸输入值
            if (settings.customWidth !== undefined) this.customWidth.value = settings.customWidth;
            if (settings.customHeight !== undefined) this.customHeight.value = settings.customHeight;

            // 恢复填充设置
            if (settings.fillType !== undefined) this.fillType = settings.fillType;
            if (settings.bgColor !== undefined) this.bgColor.value = settings.bgColor;
            if (settings.gradientStart !== undefined) this.gradientStart.value = settings.gradientStart;
            if (settings.gradientEnd !== undefined) this.gradientEnd.value = settings.gradientEnd;
            if (settings.gradientAngle !== undefined) this.gradientAngle.value = settings.gradientAngle;

            // 恢复图片背景设置
            if (settings.bgImageSize !== undefined) this.bgImageSize.value = settings.bgImageSize;
            if (settings.bgImageOpacity !== undefined) this.bgImageOpacity.value = settings.bgImageOpacity;

            // 恢复描边设置
            if (settings.strokeEnabled !== undefined) this.strokeEnabled.checked = settings.strokeEnabled;
            if (settings.strokeWidth !== undefined) this.strokeWidth.value = settings.strokeWidth;
            if (settings.strokeColor !== undefined) this.strokeColor.value = settings.strokeColor;
            if (settings.strokeType !== undefined) this.strokeType.value = settings.strokeType;
            if (settings.strokePosition !== undefined) this.strokePosition = settings.strokePosition;

            // 恢复阴影设置
            if (settings.shadowEnabled !== undefined) this.shadowEnabled.checked = settings.shadowEnabled;
            if (settings.shadowX !== undefined) this.shadowX.value = settings.shadowX;
            if (settings.shadowY !== undefined) this.shadowY.value = settings.shadowY;
            if (settings.shadowBlur !== undefined) this.shadowBlur.value = settings.shadowBlur;
            if (settings.shadowColor !== undefined) this.shadowColor.value = settings.shadowColor;
            if (settings.shadowType !== undefined) this.shadowType = settings.shadowType;

            // 恢复光晕设置
            if (settings.glowEnabled !== undefined) this.glowEnabled.checked = settings.glowEnabled;
            if (settings.glowBlur !== undefined) this.glowBlur.value = settings.glowBlur;
            if (settings.glowSpread !== undefined) this.glowSpread.value = settings.glowSpread;
            if (settings.glowColor !== undefined) this.glowColor.value = settings.glowColor;
            if (settings.glowOpacity !== undefined) this.glowOpacity.value = settings.glowOpacity;
            if (settings.glowType !== undefined) this.glowType = settings.glowType;

            // 恢复副标题系统
            if (settings.subtitles !== undefined) {
                this.subtitles = settings.subtitles;
                this.subtitlePositions = settings.subtitlePositions || [];
                this.subtitleFontSizes = settings.subtitleFontSizes || [];
            }

            // 恢复文字缩放
            if (settings.mainTextScale !== undefined) this.mainTextScale = settings.mainTextScale;

            // 设置默认尺寸为 100×100
            this.setDefaultSize();

            // 更新 UI 显示
            this.updateUIDisplay();
            this.restoreSubtitles();

        } catch (e) {
            console.error('加载设置失败:', e);
            // 加载失败时也设置默认尺寸
            this.setDefaultSize();
        }
    }

    // 设置默认尺寸为 100×100
    setDefaultSize() {
        this.keyWidth.value = 100;
        this.keyHeight.value = 100;
        this.keyWidthInput.value = 100;
        this.keyHeightInput.value = 100;
        this.customWidth.value = 100;
        this.customHeight.value = 100;
    }

    // 更新 UI 显示
    updateUIDisplay() {
        // 更新范围滑块的显示值
        document.getElementById('fontSizeValue').textContent = this.fontSize.value;
        document.getElementById('textPosXValue').textContent = this.textPosX.value + '%';
        document.getElementById('textPosYValue').textContent = this.textPosY.value + '%';
        document.getElementById('widthValue').textContent = this.keyWidth.value;
        document.getElementById('heightValue').textContent = this.keyHeight.value;
        document.getElementById('radiusValue').textContent = this.borderRadius.value;
        document.getElementById('paddingValue').textContent = this.padding.value;
        document.getElementById('imageMarginValue').textContent = this.imageMargin.value;
        document.getElementById('opacityValue').textContent = this.opacity.value + '%';
        document.getElementById('angleValue').textContent = this.gradientAngle.value + '°';
        document.getElementById('strokeWidthValue').textContent = this.strokeWidth.value;
        document.getElementById('shadowXValue').textContent = this.shadowX.value;
        document.getElementById('shadowYValue').textContent = this.shadowY.value;
        document.getElementById('shadowBlurValue').textContent = this.shadowBlur.value;
        document.getElementById('glowBlurValue').textContent = this.glowBlur.value;
        document.getElementById('glowSpreadValue').textContent = this.glowSpread.value;
        document.getElementById('glowOpacityValue').textContent = this.glowOpacity.value + '%';
        document.getElementById('bgImageOpacityValue').textContent = this.bgImageOpacity.value + '%';

        // 更新填充类型 UI
        const fillButtons = document.querySelectorAll('[data-type="solid"], [data-type="gradient"], [data-type="image"]');
        fillButtons.forEach(b => b.classList.remove('active'));
        const activeFillBtn = document.querySelector(`[data-type="${this.fillType}"]`);
        if (activeFillBtn) activeFillBtn.classList.add('active');

        document.getElementById('solidColorSection').style.display = this.fillType === 'solid' ? 'block' : 'none';
        document.getElementById('gradientSection').style.display = this.fillType === 'gradient' ? 'block' : 'none';
        document.getElementById('imageSection').style.display = this.fillType === 'image' ? 'block' : 'none';

        // 更新描边位置 UI
        document.querySelectorAll('#strokeSection [data-type]').forEach(b => b.classList.remove('active'));
        document.querySelector(`#strokeSection [data-type="${this.strokePosition}"]`)?.classList.add('active');

        // 更新阴影类型 UI
        document.querySelectorAll('#shadowSection [data-type]').forEach(b => b.classList.remove('active'));
        document.querySelector(`#shadowSection [data-type="${this.shadowType}"]`)?.classList.add('active');

        // 更新光晕类型 UI
        document.querySelectorAll('#glowSection [data-type]').forEach(b => b.classList.remove('active'));
        document.querySelector(`#glowSection [data-type="${this.glowType}"]`)?.classList.add('active');

        // 更新启用/禁用状态
        document.getElementById('strokeSection').classList.toggle('section-disabled', !this.strokeEnabled.checked);
        document.getElementById('shadowSection').classList.toggle('section-disabled', !this.shadowEnabled.checked);
        document.getElementById('glowSection').classList.toggle('section-disabled', !this.glowEnabled.checked);

        // 更新自定义尺寸输入组显示
        this.customSizeInputGroup.style.display = (this.sizeTemplate.value === 'custom-input') ? 'block' : 'none';
    }

    // 恢复副标题输入框
    restoreSubtitles() {
        // 清空现有副标题
        this.subtitleContainer.innerHTML = '';
        this.subtitles = [];
        this.subtitlePositions = [];
        this.subtitleFontSizes = [];

        // 从保存的数据恢复
        if (this.subtitles && Array.isArray(this.subtitles)) {
            this.subtitles.forEach((subtitle, index) => {
                if (subtitle !== undefined && subtitle !== null) {
                    this.subtitles.push('');
                    this.subtitlePositions.push(this.subtitlePositions[index] || { x: 50, y: 50 + (index + 1) * 15 });
                    this.subtitleFontSizes.push(this.subtitleFontSizes[index] || 1);

                    const subtitleItem = document.createElement('div');
                    subtitleItem.className = 'subtitle-item';
                    subtitleItem.dataset.index = this.subtitles.length - 1;

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = `副标题 ${this.subtitles.length}`;
                    input.value = subtitle;
                    input.addEventListener('input', (e) => {
                        this.subtitles[this.subtitles.length - 1] = e.target.value;
                        this.updatePreview();
                    });

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = '删除';
                    deleteBtn.addEventListener('click', () => {
                        this.removeSubtitle(this.subtitles.length - 1, subtitleItem);
                    });

                    subtitleItem.appendChild(input);
                    subtitleItem.appendChild(deleteBtn);
                    this.subtitleContainer.appendChild(subtitleItem);
                }
            });
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new KeyEditor();
});
