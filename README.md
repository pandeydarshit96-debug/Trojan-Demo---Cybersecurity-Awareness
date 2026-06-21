# Trojan Demo — Cybersecurity Awareness Project

## Project Overview

This project demonstrates how a **Trojan Horse** attack works in the real world.
On the surface, it looks like a simple calculator. But hidden inside is a folder access tool.
A remote chatbot interface is also included, simulating how attackers can access files from any device.

---

## What is a Trojan?

> "A Trojan is malware that disguises itself as legitimate software to trick users into running it."

When a user runs this "calculator", they think they are just doing calculations.
But typing a secret trigger activates a hidden folder search mode — without the user ever suspecting it.

---

## Project Files

| File | Purpose |
|------|---------|
| `first.js` | Calculator + Hidden folder search (terminal demo) |
| `server.js` | Backend server for remote chatbot access |
| `index.html` | Jarvis chatbot UI (access from phone/browser) |
| `package.json` | Project dependencies |

---

## How to Run

### Terminal Demo (first.js)
```bash
node first.js
```
- A calculator will appear
- Enter any calculation (e.g. `5+3`)
- Type `#+t` to activate the hidden folder search mode
- Type a folder name → get the path → opens in Explorer

### Chatbot Demo (Remote Access)

**Terminal 1 — Start the server:**
```bash
npm install
node server.js
```

**Terminal 2 — Expose to internet via ngrok:**
```bash
ngrok config add-authtoken YOUR_NGROK_TOKEN
ngrok http 3000
```

**In the browser:**
- Open `index.html`
- Enter the ngrok URL (e.g. `https://xxxx.ngrok-free.app`)
- Click Connect
- Type a folder name → folder opens on the target PC

---

## Demo Flow

### Terminal Demo
```
Simple Calculator
─────────────────
> 23 + 53
= 76
> 10 * 5
= 50
> #+t                        ← Secret trigger (only the attacker knows this)
[System Diagnostic Mode Activated]

📂 Enter folder name (type "exit" to quit): Documents
🔍 Searching for "Documents"...
✅ 1 folder(s) found:
   [1] C:\Users\victim\Documents
   ➤ Open in Explorer? (y/n): y
   ✅ Opening in Explorer...
```

### Chatbot Demo
```
Open index.html on phone/browser
→ Enter ngrok URL → Click Connect
→ Type folder name
→ Folder opens on the target PC instantly
```

---

## Key Concepts Demonstrated

| Concept | Explanation |
|---------|-------------|
| **Trojan Horse** | Looks like a calculator, acts as a folder access tool |
| **Social Engineering** | User believes it is just a calculator |
| **Hidden Payload** | Real functionality is completely concealed |
| **Secret Trigger** | `#+t` activates the hidden mode |
| **Remote Access** | Control PC folder from any device via chatbot |
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
- ✅ Avoid connecting unknown devices on public WiFi

---

## Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript
- **Backend:** Express.js
- **Tunnel:** ngrok
- **Frontend:** HTML, CSS, Vanilla JS
- **Built-in Modules:** `fs`, `path`, `readline`, `child_process`

---

## Disclaimer

> This project is built strictly for **educational purposes**.
> Using it to gain unauthorized access to real systems is illegal.
> This demo is intended to raise cybersecurity awareness.
