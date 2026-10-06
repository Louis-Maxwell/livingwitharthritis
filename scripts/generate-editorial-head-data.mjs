import fs from "node:fs";
import ts from "typescript";
const app = fs.readFileSync("src/App.tsx", "utf8");
const imports = new Map([...app.matchAll(/const\s+(\w+)\s*=\s*lazyWithRetry\(\s*\(\)\s*=>\s*import\(["']([^"']+)["']/g)].map(m => [m[1], m[2]]));
const data = {};
for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
  const file = imports.get(m[2]);
  if (!file?.includes("/pillar/")) continue;
  const source = fs.readFileSync(`src/${file.replace(/^\.\//, "")}.tsx`, "utf8");
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let content = "";
  const faqs = [];
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(tree) === "CONTENT" && node.initializer &&
      (ts.isNoSubstitutionTemplateLiteral(node.initializer) || ts.isStringLiteral(node.initializer))) content = node.initializer.text;
    if (ts.isVariableDeclaration(node) && /FAQ/i.test(node.name.getText(tree)) && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      for (const item of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(item)) continue;
        const values = {};
        for (const prop of item.properties) if (ts.isPropertyAssignment(prop) && ts.isStringLiteralLike(prop.initializer)) values[prop.name.getText(tree)] = prop.initializer.text;
        if (values.question && values.answer) faqs.push({ q: values.question, a: values.answer });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  if (!content) throw new Error(`No literal CONTENT for ${m[1]}; do not silently ship a summary shell`);
  data[m[1]] = { bodyHtml: content, ...(faqs.length ? { faqs } : {}) };
}
if (Object.keys(data).length < 8) throw new Error("Unexpected editorial inventory loss");
fs.writeFileSync("scripts/editorial-head-data.json", JSON.stringify(data, null, 2) + "\n");
console.log(`[editorial-head] ${Object.keys(data).length} full guides extracted without evaluating source`);
