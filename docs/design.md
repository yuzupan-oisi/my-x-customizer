# 設計

本ドキュメントは、Twitter カスタマイズ Chrome 拡張機能の設計について記述する。

## 1. ファイル構成

本拡張機能は以下のファイルで構成する。

```
twitter-customizer/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 2. manifest.json

拡張機能の定義ファイル。

```json
{
  "manifest_version": 3,
  "name": "Twitter Customizer",
  "version": "0.1.0",
  "description": "Twitterの表示をカスタマイズする拡張機能です。",
  "permissions": [
    "storage"
  ],
  "host_permissions": [
    "https://twitter.com/*",
    "https://x.com/*"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": [
        "https://twitter.com/*",
        "https://x.com/*"
      ],
      "js": ["content.js"]
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

## 3. UI設計 (popup.html)

ユーザーが設定を行うポップアップ画面。

- **リツイートの表示設定:**
  - 「リツイートを表示する」というラベル付きのチェックボックスを配置する。
  - このチェックボックスの状態は `storage` API を通じて永続化される。

## 4. スクリプトの役割

### popup.js

- ポップアップ画面のロジックを担当する。
- 起動時に `chrome.storage.local` から現在の設定値（リツイート表示/非表示）を読み込み、チェックボックスに反映させる。
- チェックボックスの状態が変更された際、`chrome.storage.local` に新しい設定値を保存する。

### content.js

- Twitter のウェブページ上で動作し、DOM操作を担当する。
- `chrome.storage.local` から設定値を読み込み、リツイートを非表示にするかどうかを判断する。
- `MutationObserver` を使用して、動的に読み込まれる新しいツイート（リツイート）に対応する。
- `chrome.storage.onChanged` イベントを監視し、ポップアップでの設定変更が即座にページに反映されるようにする。