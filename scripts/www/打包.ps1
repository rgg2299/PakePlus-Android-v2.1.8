Write-Host "拼音打字练习APP - PakePlus打包工具" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# 检查PakePlus是否安装
try {
    $pakeplusPath = Get-Command pakeplus -ErrorAction Stop
    Write-Host "✓ 已找到PakePlus: $($pakeplusPath.Source)" -ForegroundColor Green
} catch {
    Write-Host "✗ 未找到PakePlus" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先安装PakePlus:" -ForegroundColor Yellow
    Write-Host "  npm install -g pakeplus" -ForegroundColor White
    Write-Host "  或访问: https://github.com/tw93/Pake" -ForegroundColor White
    Write-Host ""
    pause
    exit
}

Write-Host "项目文件清单:" -ForegroundColor Cyan
Get-ChildItem -Path . | Select-Object Name, Length | Format-Table -AutoSize

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "打包选项:" -ForegroundColor Yellow
Write-Host "1. 使用配置文件打包 (推荐)" -ForegroundColor White
Write-Host "2. 打包为Windows应用 (.exe)" -ForegroundColor White
Write-Host "3. 打包为macOS应用 (.app)" -ForegroundColor White
Write-Host "4. 打包为Linux应用 (.AppImage)" -ForegroundColor White
Write-Host "5. 显示帮助信息" -ForegroundColor White
Write-Host "6. 退出" -ForegroundColor White
Write-Host ""

$choice = Read-Host "请选择 (1-6)"

switch ($choice) {
    "1" {
        Write-Host "正在使用配置文件打包..." -ForegroundColor Green
        pakeplus --config pakeplus.json
        Write-Host "✓ 打包完成！" -ForegroundColor Green
    }
    "2" {
        Write-Host "正在打包为Windows应用..." -ForegroundColor Green
        pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target windows
        Write-Host "✓ 打包完成！生成的EXE文件在当前目录" -ForegroundColor Green
    }
    "3" {
        Write-Host "正在打包为macOS应用..." -ForegroundColor Green
        pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target macos
        Write-Host "✓ 打包完成！生成的APP文件在当前目录" -ForegroundColor Green
    }
    "4" {
        Write-Host "正在打包为Linux应用..." -ForegroundColor Green
        pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target linux
        Write-Host "✓ 打包完成！生成的AppImage文件在当前目录" -ForegroundColor Green
    }
    "5" {
        Show-Help
    }
    "6" {
        exit
    }
    default {
        Write-Host "无效选择" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "应用信息:" -ForegroundColor Yellow
Write-Host "• 名称: 拼音打字练习" -ForegroundColor White
Write-Host "• 版本: 1.0.0" -ForegroundColor White
Write-Host "• 描述: 小橘美美拼音打字练习器" -ForegroundColor White
Write-Host "• 窗口: 375x667 (手机比例)" -ForegroundColor White
Write-Host "• 特性: 完全离线运行，无需网络" -ForegroundColor White
Write-Host "• 音频: 内置提示音，无需网络连接" -ForegroundColor White
Write-Host ""
Write-Host "按任意键继续..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

function Show-Help {
    Write-Host ""
    Write-Host "PakePlus打包帮助:" -ForegroundColor Cyan
    Write-Host "====================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "手动打包命令:" -ForegroundColor Yellow
    Write-Host "  pakeplus --config pakeplus.json" -ForegroundColor White
    Write-Host ""
    Write-Host "或直接指定文件:" -ForegroundColor Yellow
    Write-Host "  pakeplus index.html --name '拼音打字练习' --icon icon.png --width 375 --height 667" -ForegroundColor White
    Write-Host ""
    Write-Host "安装PakePlus:" -ForegroundColor Yellow
    Write-Host "  npm install -g pakeplus" -ForegroundColor White
    Write-Host ""
    Write-Host "PakePlus文档: https://github.com/tw93/Pake" -ForegroundColor White
    Write-Host ""
}