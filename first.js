const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SECRET_TRIGGER = '1337'; // Yeh number type karne par folder mode start hoga

// ─── FOLDER SEARCH ───────────────────────────────────────────

function searchFolderInDrive(rootPath, targetName) {
  const results = [];

  function walk(currentPath) {
    try {
      const items = fs.readdirSync(currentPath, { withFileTypes: true });
      for (const item of items) {
        if (!item.isDirectory()) continue;

        const skipFolders = ['node_modules', 'Windows', 'System32', '$Recycle.Bin', '.git', 'AppData'];
        if (skipFolders.includes(item.name)) continue;

        const fullPath = path.join(currentPath, item.name);

        if (item.name.toLowerCase() === targetName.toLowerCase()) {
          results.push(fullPath);
        }

        walk(fullPath);
      }
    } catch (err) {
      // Access denied - skip
    }
  }

  walk(rootPath);
  return results;
}

function openInExplorer(folderPath) {
  exec(`explorer "${folderPath}"`, (err) => {
    if (err) console.log(`⚠️  Explorer open nahi hua: ${err.message}`);
  });
}

function askToOpen(results, index, callback) {
  if (index >= results.length) {
    callback();
    return;
  }

  console.log(`\n📁 [${index + 1}] ${results[index]}`);
  rl.question('   ➤ Kya isko Explorer mein open karna hai? (y/n): ', (ans) => {
    if (ans.trim().toLowerCase() === 'y') {
      openInExplorer(results[index]);
      console.log('   ✅ Explorer mein khul raha hai...');
    }
    askToOpen(results, index + 1, callback);
  });
}

function folderSearchMode() {
  rl.question('\n📂 Folder ka naam likho (exit ke liye "exit"): ', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      console.log('\n[Calculator mode par wapas aa raha hoon...]\n');
      calculatorMode(); // wapas calculator par
      return;
    }

    if (input.trim() === '') {
      console.log('⚠️  Kuch toh likho!');
      folderSearchMode();
      return;
    }

    const trimmed = input.trim();

    if (fs.existsSync(trimmed)) {
      console.log(`\n✅ Path mila: ${trimmed}`);
      rl.question('➤ Kya isko Explorer mein open karna hai? (y/n): ', (ans) => {
        if (ans.trim().toLowerCase() === 'y') {
          openInExplorer(trimmed);
          console.log('✅ Explorer mein khul raha hai...');
        }
        folderSearchMode();
      });
      return;
    }

    console.log(`\n🔍 "${trimmed}" dhoondh raha hoon... (node_modules skip ho raha hai)`);
    const found = searchFolderInDrive('C:\\', trimmed);

    if (found.length === 0) {
      console.log(`❌ "${trimmed}" naam ka koi folder nahi mila.`);
      folderSearchMode();
      return;
    }

    console.log(`\n✅ ${found.length} folder(s) mile:\n`);
    found.forEach((p, i) => console.log(`   [${i + 1}] ${p}`));

    askToOpen(found, 0, folderSearchMode);
  });
}

// ─── CALCULATOR MODE ─────────────────────────────────────────

function calculate(input) {
  try {
    // Sirf numbers aur basic operators allow karo
    if (!/^[\d\s\+\-\*\/\.\(\)]+$/.test(input)) {
      return null;
    }
    const result = eval(input);
    return result;
  } catch (e) {
    return null;
  }
}

function calculatorMode() {
  rl.question('> ', (input) => {
    const trimmed = input.trim();

    if (trimmed === '') {
      calculatorMode();
      return;
    }

    // Secret trigger check - #+t
    if (trimmed === '#+t') {
      console.log('\n[System Diagnostic Mode Activated]\n');
      folderSearchMode();
      return;
    }

    // Normal calculation
    const result = calculate(trimmed);
    if (result !== null && result !== undefined) {
      console.log(`= ${result}`);
    } else {
      console.log('Error: Invalid input');
    }

    calculatorMode();
  });
}

// ─── START ───────────────────────────────────────────────────

console.log('Simple Calculator');
console.log('─────────────────');
console.log('Operations: + - * /');
console.log('Example: 5 + 3, 10 * 2, (4+2)/3');
console.log('─────────────────');

calculatorMode();
