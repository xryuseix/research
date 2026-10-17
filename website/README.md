# Research website

Next.js / React / Material UI と Rust製WebAssemblyを使ったWebサイトです。
公開パスは /research です。Node.js・npm・Rustはホストへインストールせず、すべてDocker内で実行します。

## 開発

Docker Desktop（またはDocker Engine + Compose）が必要です。
このディレクトリと同じ親ディレクトリに problem/calculator と problem/make10puzzle のRustソースがある構成で使います。

```sh
docker compose up --build
# または ./develop.sh
```

http://localhost:3000/research を開いてください。
3000番ポートが使用中の場合は WEB_PORT=3001 docker compose up --build で変更できます。
初回はRust / wasm-packの準備、WebAssemblyのコンパイル、npm ciを行います。
ソース変更はバインドマウントで反映され、node_modulesと.nextはDockerボリューム内に保存します。
WebAssemblyはローカルファイル依存としてnpmで管理し、node_modulesへの手動コピーを廃止しました。
WebpackはWebAssemblyの読み込みに必要なため、開発・ビルドの両方で明示しています。

## 検証と本番ビルド

```sh
docker compose run --rm web npm run lint
docker compose run --rm web npm run typecheck
docker compose run --rm web npm run build
docker compose run --rm --service-ports web npm start
```

buildは本番サーバー向けです。検証・ビルドと開発サーバーは同時実行せず、開発サーバーを停止してから実行してください。
静的サイトとして出力する場合は docker compose run --rm web npm run export を実行します（out/に出力）。

## 依存パッケージの変更

```sh
docker compose run --rm web npm install パッケージ名@latest
docker compose run --rm web npm install --save-dev パッケージ名@latest
```

package-lock.jsonもコミットしてください。Dockerイメージと依存ボリュームの更新には以下を実行します。

```sh
docker compose build --pull web
docker compose run --rm web npm ci
docker compose up
```

Rustソースを変更した場合もイメージを再ビルドしてnpm ciを実行します。
Rustステージでは最新Rustとの互換性のためwasm-bindgenを更新します。親ディレクトリのRustソース・ロックファイルは変更しません。
npm依存はpackage-lock.jsonで固定していますが、Rustツールチェーンとwasm-packはイメージの再ビルド時点の版を使用します。

TypeScript 7の型チェックと、ESLint/Next.js向けTypeScript 6互換APIを公式推奨のnpm aliasで併用しています。
`npm run typecheck` はTypeScript 7を実行します。

ESLint 10非対応の間接プラグインを避けるため、Next.jsのCore Web Vitals・React Hooks・TypeScriptのルールを最新プラグインから直接読み込んでいます。
TypeScriptの併用方式: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60

2026-10-17時点のnpm auditでは、本番依存は指摘0件です。開発用の@next/eslint-plugin-next配下（fast-glob → micromatch → braces）にhighが4件残ります。
bracesのlatest（3.0.3）にも修正版がなく、依存のダウングレードや監査の抑制は行っていません。
