const fs = require('fs');
const pkg = require('./package.json');

for (const [depType, deps] of Object.entries(pkg)) {
  if (!['dependencies', 'devDependencies', 'peerDependencies'].includes(depType)) continue;

  for (const [pkgName, versionRange] of Object.entries(deps)) {
    try {
      const realPkg = require(`./node_modules/${pkgName}/package.json`);
      deps[pkgName] = realPkg.version;
    } catch (e) {
      console.warn(`Không tìm được version thật sự cho ${pkgName}, giữ nguyên`);
    }
  }
}

fs.writeFileSync('package.no-caret.json', JSON.stringify(pkg, null, 2));
console.log('✅ Đã ghi ra package.no-caret.json');
