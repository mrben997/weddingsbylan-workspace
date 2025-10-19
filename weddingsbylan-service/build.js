const fs = require('fs');
const path = require('path');

/**
 * Copy a file or directory recursively.
 * @param {string} src - Source path.
 * @param {string} dest - Destination path.
 */
function copy(src, dest) {
    const stats = fs.statSync(src);

    // Ensure the destination directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
        console.log(`Created directory: ${destDir}`);
    }

    // If it's a directory
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((file) => {
            copy(path.join(src, file), path.join(dest, file));
        });
    }
    // If it's a file
    else if (stats.isFile()) {
        fs.copyFileSync(src, dest);
    }
}

// Ensure the `build` folder exists
const buildDir = path.resolve('build');
if (fs.existsSync(buildDir)) {
    // fs.rmSync(buildDir, { recursive: true, force: true });
    console.log(`Removed existing folder: ${buildDir}`);
}
fs.mkdirSync(buildDir, { recursive: true });
console.log(`Created folder: ${buildDir}`);
// Define the copy operations
const operations = [
    { src: 'package.json', dest: 'package.json' },
    { src: 'projects/server/package.json', dest: 'build/projects/server/package.json' },
    { src: 'projects/server/dist', dest: 'build/projects/server/dist' },
    { src: 'projects/server/.env.production', dest: 'build/projects/server/.env.production' },
    { src: 'projects/app-client/.next/standalone', dest: 'build/projects/app-client/' },
    { src: 'projects/app-client/public', dest: 'build/projects/app-client/public' },
    { src: 'projects/app-client/.next/static', dest: 'build/projects/app-client/.next/static' },
];

// Perform the copy operations
operations.forEach(({ src, dest }) => {
    const resolvedSrc = path.resolve(src);
    const resolvedDest = path.resolve(dest);

    console.log(`Copying: ${resolvedSrc} -> ${resolvedDest}`);
    if (fs.existsSync(resolvedSrc)) {
        copy(resolvedSrc, resolvedDest);
    } else {
        console.error(`Source not found: ${resolvedSrc}`);
    }
});

console.log('All files and directories copied successfully to the build folder.');
