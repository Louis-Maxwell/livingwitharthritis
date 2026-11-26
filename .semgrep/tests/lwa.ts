// ruleid: lwa-no-eval
eval(userCode);
// ruleid: lwa-no-eval
new Function(userCode);
// ok: lwa-no-eval
JSON.parse(userData);
// ruleid: lwa-no-string-timers
setTimeout("alert(1)", 50);
// ruleid: lwa-no-string-timers
setInterval("alert(1)", 50);
// ok: lwa-no-string-timers
setTimeout(() => work(), 50);
// ruleid: lwa-no-disabled-tls
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// ruleid: lwa-no-disabled-tls
const unsafeTls = { rejectUnauthorized: false };
// ok: lwa-no-disabled-tls
const safeTls = { rejectUnauthorized: true };
// ruleid: lwa-no-wildcard-postmessage
frame.postMessage(secret, "*");
// ok: lwa-no-wildcard-postmessage
frame.postMessage(secret, "https://example.test");
// ruleid: lwa-no-document-write
document.write(userHtml);
// ruleid: lwa-no-document-write
document.writeln(userHtml);
// ok: lwa-no-document-write
document.createTextNode(userHtml);
// ruleid: lwa-no-shell-interpolation
exec(`tool ${userInput}`);
// ruleid: lwa-no-shell-interpolation
execSync(`tool ${userInput}`);
// ok: lwa-no-shell-interpolation
execFile("tool", [userInput]);
