# Trojan-Demo---Cybersecurity-Awareness
A cybersecurity awareness demo that simulates a Trojan Horse attack — disguised as a calculator with a hidden folder access tool and remote chatbot interface.
# Trojan Demo — Cybersecurity Awareness Project

## Project Overview

This project demonstrates how a **Trojan Horse** attack works in the real world.
On the surface, it looks like a simple calculator. But hidden inside is a folder access tool that gets triggered by a secret command.

---

## What is a Trojan?

> "A Trojan is malware that disguises itself as legitimate software to trick users into running it."

When a user runs this "calculator", they think they are just doing calculations.
But typing a secret trigger activates a hidden folder search mode — without the user ever suspecting it.

---

## Project Files

| File | Purpose |
|------|---------|
| `first.js` | Calculator + Hidden folder search tool |
| `package.json` | Project metadata |

---

## How to Run

### Step 1 — Install Dependencies
```bash
npm install
```

### Step 2 — Run the Calculator
```bash
node first.js
```

---

## Demo Flow

```
Simple Calculator
─────────────────
> 23 + 53
= 76
> 10 * 5
= 50
> #+t                        ← Secret trigger (only the hacker knows this)
[System Diagnostic Mode Activated]

📂 Enter folder name (type "exit" to quit): GEN-AI
🔍 Searching for "GEN-AI"... (node_modules skipped)
✅ 1 folder(s) found:
   [1] C:\Users\admin\Desktop\GEN-AI
📁 [1] C:\Users\admin\Desktop\GEN-AI
   ➤ Open in Explorer? (y/n): y
   ✅ Opening in Explorer...
```

---

## Key Concepts Demonstrated

| Concept | Explanation |
|---------|-------------|
| **Trojan Horse** | Looks like a calculator, acts as a folder access tool |
| **Social Engineering** | User believes it is just a calculator |
| **Hidden Payload** | Real functionality is completely concealed |
| **Secret Trigger** | `#+t` activates the hidden mode |
| **Local File System Access** | Folder scanning via Node.js `fs` module |

---

## How Real Hackers Do This

1. Bundle malware with **cracked software**
2. Hide it inside **email attachments**
3. Distribute it as **fake software updates**
4. Leave infected USB drives in public places (**USB drop attack**)

---

## How to Stay Safe

- ✅ Download software only from trusted sources
- ✅ Use a reliable antivirus
- ✅ Never run unknown files
- ✅ Be careful with email attachments
- ✅ Prefer open source software

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript
- **Built-in Modules:** `fs`, `path`, `readline`, `child_process`

---

## Disclaimer

> This project is built strictly for **educational purposes**.
> Using it to gain unauthorized access to real systems is illegal.
> This demo is intended to raise cybersecurity awareness.
