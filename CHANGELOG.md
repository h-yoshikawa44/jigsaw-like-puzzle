# CHANGELOG

## v2.0.0（2023/09/16）
### Updated
- Node.js、各種ライブラリのアプデ(#88)
- CRA 構成から Vite 構成に移行(#89)

主要なアプデ内容（上記2つ合わせたもの）
- Node.js: 14.17.3 -> 18.17.1
- TypeScript: 4.5.5 -> 5.2.2
- react-router-dom: 5.3.0 -> 6.15.0
- Material UI：
  - core：5.4.2 -> 5.14.8
  - icon：5.4.2 -> 5.14.8
- React Konva: 17.0.2-5 -> 18.2.10

## v1.1.0（2022/02/20）
### Updated
- 各種ライブラリのアプデ(#66)
  - react-script：4.0.3 → 5.0.0
  - typescript：4.3.5 → 4.5.5
  - react-router-dom：5.2.0 → 5.3.0
  - Material UI：
    - core：4.9.14 → 5.4.2
    - icon：4.9.1 → 5.4.2

### Development Added
- Pre Commit 設定追加(#66)

## v1.0.0（2021/08/05）
### Fixed
- アプリ全体の TypeScript 化(#55)
- リファクタリング（ロジック部分をカスタムフック切り出し）(#55)

### Development Added
- 開発ブランチ用のワークフロー作成(#55)

## v0.2.0（2021/08/03）
### Updated
- ライブラリ全体のバージョンアップ(#50)
  - Node.js 12.18.3 → 14.17.3
  - React 16.13.1 → 17.0.2
  - React Konva 16.13.0-3 → 17.0.2-5
  - Material UI
    - core 4.9.14 → 4.12.3
    - icon 4.9.1 → 4.11.2

### Development Changed
- デプロイ自動化(#21)

## v0.1.5（2020/09/20）
### Fixed
- ピースの影が濃くなっている問題の解消(#36)

### Updated
- ライブラリの脆弱性対応

### Development Removed
- Docker 環境の除去

## v0.1.4（2020/05/28）
## Development Fixed
- Google Analytics がちゃんと動いてない不具合対応(#17)
  - Firebase SDK を予約済み URL でなく、ライブラリから使用するよう変更
  - firebase.analytics() を追加

## v0.1.3（2020/05/26）
### Fixed
- パズルを遊んでいるうちにフリーズし RangeError: Maximum call stack size exceeded が出る問題の解消(#25)

## v0.1.2（2020/05/26）
### Changed
- useImage で画像からオブジェクト生成時に待ち時間が発生する(#19)
　→ 待ち時間の間は「読み込み中...」と表示、完了後に Canvas と難易度選択ボタンを表示 に変更

### Fixed
- リファクタリング（コンポーネント・ファイル分割）(#19)

## v0.1.1（2020/05/25）
### Development Fixed
- Firebase SDK の読み込み場所の修正(#17)

## v0.1.0（2020/05/23）
### Added
- 基本的なパズルの仕組みを作成(#3, #8)
  - 難易度選択
  - 難易度（初級、中級、上級）に応じたパズルロジック
  - ポーズ
  - リザルト

- ポリシーページ作成

### Changed
- ドラッグ中のピースが必ず前面に来るように対応(#12)

### Development Added
- Firebase との連携(#10)
  - Firebase Hosting

2020/05/18～5/24 で開催された #web1week 投稿作品。
最低限遊べる程度の実装。
- [１週間でWebサービスを作るイベント - お題「Like」](https://crieit.net/boards/web1week-202005)
