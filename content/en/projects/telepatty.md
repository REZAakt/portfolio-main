---
title: 'Telepatty'

description: 'A serverless messenger that keeps the user's identity and conversation history on their own device; offline messages are delivered through encrypted public relays, and live chat and file transfer go through a direct connection between the two browsers.'

date: 2026-09-20

year: '2026'

client: 'Personal Project'

role: 'Full-stack developer of the project (architecture design, frontend implementation, and encryption/protocol layers)'

duration: '2 months'

platform: 'Web Application (PWA)'

image: /images/projects/telepatty/1.webp

url: 'https://telepatty.ir'

tags: ['Serverless', 'Encryption', 'PWA', 'WebRTC', 'Nostr']

details:
  - label: 'Focus'

    value: 'End-to-end message encryption, offline delivery through public relays, direct peer-to-peer live communication, and file transfer without passing through a central server'

media:

  - type: video

    src: /images/projects/telepatty/v1.webm

  - type: image

    src: /images/projects/telepatty/1.webp

  - type: image

    src: /images/projects/telepatty/2.webp

  - type: image

    src: /images/projects/telepatty/3.webp

  - type: image

    src: /images/projects/telepatty/4.webp

  - type: image

    src: /images/projects/telepatty/5.webp

  - type: image

    src: /images/projects/telepatty/6.webp

  - type: image

    src: /images/projects/telepatty/7.webp

  - type: image

    src: /images/projects/telepatty/8.webp

  - type: image

    src: /images/projects/telepatty/9.webp
---

## Project Overview

Telepatty is a messenger that runs entirely in the browser, with no installation or account required. Unlike ordinary messengers that keep accounts and conversation content on a central server, in this project the user's identity, encryption keys, and message history stay only on their own device — there is no central server for this project at all.

The core problem this project solves is that server-based messengers share three weaknesses: conversation content is exposed to whoever owns the server, the user's account is effectively held hostage by that server, and keeping a server running around the clock is itself a constant cost and burden. Telepatty tries to provide content security, offline message delivery, and full conversation history all at once — without relying on any dedicated server of its own.

## Approach

The project's architecture rests on three main pillars: the entire app is a static web app (PWA) with no server-side API or database; offline message delivery runs through public relays of the Nostr protocol, which only pass along an encrypted packet without ever seeing its content; and live chat and file transfer run over a direct WebRTC connection between the two browsers, with no intermediary involved at all.

On top of these three pillars, several technical layers were implemented:

- **Identity:** Instead of registration, each user gets a cryptographic key pair (secp256k1) generated for them; the private key is protected with a passphrase and AES-256-GCM encryption, and is never stored in raw form.
- **Message wrapping:** Each message is signed and encrypted in multiple layers before being sent (based on the NIP-44 and NIP-59 standards), so that any relay holding the packet can see neither the message content, nor the sender, nor even the message type.
- **Routing:** A central component in the app decides, for each message, whether to go through a direct channel (if the other party is online) or through a public relay (if they're offline); if neither path is available, the message stays in an outbox and is retried with exponential backoff.
- **Ordering and persistence:** Instead of relying on device clocks (which can't be trusted), each conversation has a logical counter (Lamport clock) that guarantees message ordering; messages, contacts, and settings are also stored in the browser's local database (IndexedDB).
- **Files and photos:** The file header (name, type, hash) is sent as a regular encrypted message, but the actual file bytes only ever pass through the direct channel between the two devices, in chunks, with the ability to resume from the last incomplete chunk if the connection drops.

## Challenge

The biggest challenge was guaranteeing three things at once, without relying on any dedicated server: content security, offline message delivery, and complete conversation history. These three goals are usually in tension with each other, and achieving one typically comes at the cost of another.

Another technical challenge was keeping message ordering consistent without relying on device clocks, since phone clocks can be wrong or inconsistent. Implementing a logical counter (Lamport clock) solved this problem and kept conversation ordering stable even with incorrect clocks.

A further challenge concerned file transfer: it had to be guaranteed that no file bytes ever passed through the public relays, while also working within the constraint that both parties had to be online at the same time. To ensure the correctness of this logic, along with the encryption and routing logic, more than 340 unit tests across 42 files were written, covering the app's core logic independent of its UI.
