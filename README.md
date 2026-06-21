# Trojan Demo — Cybersecurity Awareness Project

## Project Overview

This project demonstrates how a **Trojan Horse** attack works in the real world.
On the surface, it looks like a simple calculator. But hidden inside is a folder access tool.
A remote chatbot interface is also included, simulating how attackers can access files remotely from any device.

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

### Prerequisites
- [Node.js](https://nodejs.org) installed
- [ngrok](https://ngrok.com) account (free) — only needed for chatbot demo

### Install Dependencies
```bash
npm install
```

---

## Demo 1 — Terminal (Calculator + Hidden Tool)

```bash
node first.js
```

**What happens:**
1. A simple calculator starts
2. User performs normal calculations — `5+3`, `10*2` etc.
3. When secret trigger `#+t` is typed, hidden folder search mode activates
4. User types a folder name → full path is shown → folder opens in Explorer

**Flow:**
```
Simple Calculator
─────────────────
> 23 + 53
= 76
> 10 * 5
= 50
> #+t                   ← Secret trigger (only the attacker knows this)

[System Diagnostic Mode Activated]

📂 Enter folder name (type "exit" to quit): Documents
🔍 Searching for "Documents"...
✅ 1 folder(s) found:
   [1] C:\Users\victim\Documents
   ➤ Open in Explorer? (y/n): y
   ✅ Opening in Explorer...
```

---

## Demo 2 — Chatbot (Remote Access from Any Device)

This simulates how an attacker can remotely access folders on a victim's PC from their own phone or browser.

### How it works:
1. `server.js` runs on the target PC — it acts as a hidden backend
2. `ngrok` exposes that server to the internet via a public URL
3. The attacker opens `index.html` (Jarvis chatbot) on their phone/browser
4. They type a folder name in the chatbot → the folder opens on the target PC

### Step 1 — Start the server on target PC
```bash
node server.js
```
You will see:
```
✅ Server running at: http://localhost:3000
📡 Expose with ngrok: ngrok http 3000
```

### Step 2 — Expose the server to internet using ngrok

First, create a free account at [ngrok.com](https://ngrok.com) and get your authtoken from the dashboard.

```bash
# Set your authtoken (one time only)
ngrok config add-authtoken YOUR_NGROK_AUTHTOKEN

# Expose port 3000
ngrok http 3000
```

You will get a public URL like:
```
Forwarding   https://xxxx.ngrok-free.app -> http://localhost:3000
```

### Step 3 — Open the Chatbot

- Open `index.html` in any browser (on phone or PC)
- Paste the ngrok URL in the input box at the top
- Click **Connect** — status turns green when connected
- Type a folder name in the chat (e.g. `Documents`, `Desktop`)
- The folder will open on the target PC instantly

**Chatbot Flow:**
```
JARVIS: Connected! PC User: victim
YOU: Documents
JARVIS: ✅ "Documents" — 1 folder(s) found!
        📁 Paths:
        1. C:\Users\victim\Documents
        [Folder opens on target PC]
```

---

## Key Concepts Demonstrated

| Concept | Explanation |
|---------|-------------|
| **Trojan Horse** | Looks like a calculator, acts as a folder access tool |
| **Social Engineering** | User believes it is just a calculator |
| **Hidden Payload** | Real functionality is completely concealed |
| **Secret Trigger** | `#+t` activates the hidden mode |
| **Remote Access** | Attacker controls PC folder from any device via chatbot |
| **Tunneling** | ngrok exposes local server to the internet |
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
- ✅ Never run unknown or unverified files
- ✅ Be careful with email attachments
- ✅ Keep your OS and software updated
- ✅ Prefer open source software
- ✅ Avoid running unknown scripts from the internet

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
