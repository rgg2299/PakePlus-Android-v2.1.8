@echo off
echo 拼音打字练习APP - PakePlus打包工具
echo ============================================
echo.

REM 检查PakePlus是否安装
where pakeplus >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到PakePlus
    echo 请先安装PakePlus:
    echo npm install -g pakeplus
    echo 或访问: https://github.com/tw93/Pake
    pause
    exit /b 1
)

echo 正在准备打包文件...
echo.

REM 显示当前目录结构
echo 项目文件:
dir /b

echo.
echo ============================================
echo 选择打包选项:
echo 1. 打包为Windows应用 (.exe)
echo 2. 打包为macOS应用 (.app) 
echo 3. 打包为Linux应用 (.AppImage)
echo 4. 使用配置文件打包 (推荐)
echo 5. 退出
echo.

set /p choice="请选择 (1-5): "

if "%choice%"=="1" (
    echo 正在打包为Windows应用...
    pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target windows
    echo 打包完成！生成的EXE文件在当前目录
) else if "%choice%"=="2" (
    echo 正在打包为macOS应用...
    pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target macos
    echo 打包完成！生成的APP文件在当前目录
) else if "%choice%"=="3" (
    echo 正在打包为Linux应用...
    pakeplus index.html --name "拼音打字练习" --icon icon.png --width 375 --height 667 --target linux
    echo 打包完成！生成的AppImage文件在当前目录
) else if "%choice%"=="4" (
    echo 正在使用配置文件打包...
    pakeplus --config pakeplus.json
    echo 打包完成！生成的应用在当前目录
) else if "%choice%"=="5" (
    exit /b 0
) else (
    echo 无效选择
)

echo.
echo 打包步骤完成！
echo.
echo 应用信息:
echo - 名称: 拼音打字练习
echo - 版本: 1.0.0
echo - 描述: 小橘美美拼音打字练习器
echo - 窗口: 375x667 (手机比例)
echo - 特性: 完全离线运行，无需网络
echo.
pause