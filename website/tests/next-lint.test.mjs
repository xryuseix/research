import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ESLint } from "eslint";
import next from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const root = mkdtempSync(path.join(tmpdir(), "next-lint-"));
after(() => rmSync(root, { recursive: true, force: true }));
for (const page of [
  "apps/web/pages/index.tsx",
  "apps/docs/src/pages/about.tsx",
]) {
  const filename = path.join(root, page);
  mkdirSync(path.dirname(filename), { recursive: true });
  writeFileSync(filename, "export default function Page() { return null; }");
}

function linter(rootDir) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ["**/*.tsx"],
        languageOptions: { parser: tseslint.parser },
        plugins: { "@next/next": next },
        settings: { next: { rootDir } },
        rules: { "@next/next/no-html-link-for-pages": "error" },
      },
    ],
  });
}
const filePath = path.resolve("pages/lint-fixture.tsx");
const ruleId = "@next/next/no-html-link-for-pages";

for (const [name, rootDir, hrefs] of [
  ["literal directory", path.join(root, "apps/web"), ["/"]],
  ["wildcard directories", path.join(root, "apps/*"), ["/", "/about"]],
  ["brace alternatives", path.join(root, "apps/{web,docs}"), ["/", "/about"]],
  [
    "directory array",
    [path.join(root, "apps/web"), path.join(root, "apps/docs")],
    ["/", "/about"],
  ],
  [
    "Windows separators",
    path.join(root, "apps/*").replaceAll("/", String.fromCharCode(92)),
    ["/", "/about"],
  ],
]) {
  test("Next.js still detects internal HTML links with " + name, async () => {
    for (const href of hrefs) {
      const [result] = await linter(rootDir).lintText(
        'export default function Test() { return <a href="' +
          href +
          '">Page</a>; }',
        { filePath },
      );
      assert.equal(result.errorCount, 1);
      assert.equal(result.messages[0].ruleId, ruleId);
    }
  });
}

test("Next Link and external anchors remain valid", async () => {
  const [result] = await linter(path.join(root, "apps/*")).lintText(
    'import Link from "next/link"; export default function Test() { return <><Link href="/">Home</Link><a href="https://example.com">External</a></>; }',
    { filePath },
  );
  assert.equal(result.errorCount, 0);
  assert.equal(result.warningCount, 0);
});
