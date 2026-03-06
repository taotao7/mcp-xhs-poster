# mcp-xhs-poster

小红书 MCP Server —— 通过 MCP 协议实现小红书的登录、发布图文笔记、管理会话。

基于 Puppeteer 浏览器自动化，支持扫码登录、图片上传、话题标签、定时发布、附件上传等功能。

## 功能

| 工具 | 说明 |
|------|------|
| `check_login_status` | 检查当前 Cookie 是否为有效的登录状态 |
| `get_login_qrcode` | 生成登录二维码，等待扫码（最长 4 分钟） |
| `publish_content` | 发布图文笔记（支持标题、正文、图片、标签、定时、附件） |
| `delete_cookies` | 删除已保存的 Cookie，重置登录状态 |

## 安装

```bash
bun install
```

需要安装 [Bun](https://bun.sh) 运行时。

## 配置

在 MCP 客户端（如 Claude Desktop）中添加：

```json
{
  "mcpServers": {
    "xhs-poster": {
      "command": "bun",
      "args": ["run", "/path/to/mcp-xhs-poster/src/index.ts"],
      "env": {
        "XHS_HEADLESS": "true",
        "XHS_COOKIES_PATH": "~/.media-mcp/xhs-cookies.json"
      }
    }
  }
}
```

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `XHS_HEADLESS` | `true` | 设为 `false` 可显示浏览器窗口（调试用） |
| `XHS_COOKIES_PATH` | `~/.media-mcp/xhs-cookies.json` | Cookie 存储路径 |

## 使用流程

1. 调用 `check_login_status` 检查是否已登录
2. 未登录则调用 `get_login_qrcode`，用小红书 App 扫码
3. 登录成功后调用 `publish_content` 发布笔记

### publish_content 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 笔记标题 |
| `content` | string | 是 | 笔记正文 |
| `images` | string[] | 是 | 图片文件绝对路径（至少 1 张） |
| `tags` | string[] | 否 | 话题标签（最多 10 个） |
| `schedule_at` | string | 否 | 定时发布时间，ISO 8601 格式（1 小时 ~ 14 天内），页面输入格式为 `YYYY-MM-DD HH:mm` |
| `attachments` | string[] | 否 | 附件文件绝对路径 |

### 定时发布

传入 `schedule_at` 参数即可定时发布。工具会自动打开定时开关，将 ISO 8601 时间转为 `YYYY-MM-DD HH:mm` 格式填入日期选择器，然后点击发布。发布后笔记会出现在创作者中心的「定时发布」列表中。

> 注意：定时时间必须在 1 小时 ~ 14 天之间，超出范围会报错。

## 技术栈

- TypeScript + Bun
- Puppeteer + Stealth Plugin（反检测）
- MCP SDK (`@modelcontextprotocol/sdk`)
- Zod（参数校验）

## License

MIT
