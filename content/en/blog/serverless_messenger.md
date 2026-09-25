---
title: The Process of Building a Serverless Messenger, From Idea to Implementation
description: A close look at the process behind designing and building a messenger with no central server — from defining the problem to the architectural decisions, with practical notes for each stage.
date: 2026-09-25
image: /images/blog/serverless/serverless.svg
minRead: 10
author:
  name: Reza Akbarpour
  avatar:
    src: /images/23.png
    alt: Reza Akbarpour
---

Building a messenger doesn't follow a fixed formula — especially when the goal is to remove the central server entirely. In that case, every architectural decision has direct consequences for security, availability, and user experience. Having gone through this path in practice, I've arrived at a process that, while leaving room for hard trade-offs, consistently reaches a reliable result.

In this article, using my recent project **Telepatty** as a case study, I'll walk through the process of building a serverless messenger — from defining the problem to the final architectural decisions.

## Step One: Precisely Defining the Problem

Every good project starts with a precise understanding of the problem it's meant to solve. "Being serverless" on its own is a vague goal — you need to pin down exactly which weaknesses of the traditional messaging model are supposed to disappear.

### Analyzing the Common Model

Ordinary messengers share one assumption: a central server that holds user accounts and conversation content. This model has three structural weaknesses:

- Conversation content is accessible to whoever owns the server, regardless of any privacy policy.
- The user account is effectively hostage to that server; if it's shut down or blocked, the user is left without their conversations and with no way to recover them.
- Keeping a server running around the clock is itself a separate project, with its own ongoing cost and hassle.

### Defining Success Criteria

Before any technical decision, you need clear criteria for success. For this kind of project, three main conditions usually come up:

- Conversation content should be readable only by sender and receiver.
- No dedicated server should exist to hold accounts or data.
- A message shouldn't get lost even while the other party is offline.

The important point here is that at first glance these three conditions conflict with each other; "serverless" usually comes at the cost of losing offline delivery. Resolving exactly this tension is the core of the design process.

## Step Two: Choosing the Architecture

After defining the problem, the most important architectural decision is this: **can a single technology cover both live communication and offline delivery?** Experience shows the answer is usually no.

### Separating the Two Kinds of Needs

Two needs have to be separated:

1. **Offline delivery:** requires a holding intermediary — something like a mailbox that keeps the message until the recipient comes online.
2. **Live communication and file transfer:** here an intermediary only adds overhead and latency; a direct connection between the two parties makes more sense.

### Choosing a Decentralized Intermediary

So that the project itself doesn't need dedicated infrastructure either, instead of building a mailbox server you can use a network of open, public relays already maintained by an independent community. The advantage of this choice is that even that "mailbox" isn't under the project owner's control and can't be shut down — meaning the project truly stays serverless.

I took exactly this approach in Telepatty: offline delivery goes through public relays, while live conversation and files go through a direct connection between the two browsers.

## Step Three: Designing the Security Layer

The hardest part of the work is designing a model that guarantees the holding intermediary (a public service outside the builder's control) never has access to the actual content.

The key principle is: **the message must be fully packaged and locked before it ever leaves the device** — not encrypted somewhere along the transit path. This means several successive layers of signing and encryption, arranged so the intermediary only knows "this packet needs to reach such-and-such destination," without knowing what the content is, who the sender is, or what type of message it is.

An important point at this stage is being honest about the actual scope of the claim: this model makes the message **private**, not necessarily **anonymous**. The intermediary can still see how much data arrived, when, and to which destination — and it's better to document that limitation openly rather than hide it.

## Step Four: Designing Identity Without a User Account

If there's no central server, "registration" doesn't mean anything either — because there's no one to hold it. The common solution is for each user's identity to be a cryptographic key pair generated directly on their own device, rather than something issued by a server.

This decision has a clear cost: if a user doesn't back up their identity and loses their device, that identity is gone for good. There's no "forgot password" option, because there's no central service to recover it. This is exactly the price that "true serverlessness" demands, and I think it's more honest to state this trade-off openly than to pretend the problem doesn't exist. To reduce the risk, several protective layers are usually added: locking the private key behind a passphrase, automatic app lock after inactivity, and encrypted backups.

## Step Five: Smart Message Routing

With the architecture and security settled, the next question is: exactly which path should each message take? A central routing layer can decide, per message:

- If a direct channel to the recipient is already established, the message goes straight through it with no intermediary delay.
- If the recipient is offline, the message goes through the public intermediary and is held until they come online.
- If no path is available at all, the message stays in an outbound queue and is retried with backoff.

A subtle technical point here is that even coordinating to establish that direct connection has to happen over a secure channel, without needing an intermediary server to exchange network addresses.

## Step Six: Solving the Message-Ordering Problem

One of the hidden pains of decentralized systems is time. When there's no reference server to keep "the correct clock," each device relies only on its own internal clock — and device clocks aren't always trustworthy.

If message order is based purely on recorded timestamps, one device with a wrong clock can scramble the entire conversation history. The common solution to this is a logical counter per conversation: a number that increases with every new message and is also updated from incoming messages. The device's real clock is only used to break ties, not as the primary reference for ordering.

## Step Seven: File Transfer Without Exposing Content

Files and photos are where a lot of "secure" messengers actually fall apart, because in the end the file has to be stored somewhere. The clear boundary usually drawn is separating "metadata" from "the actual file content":

- The file header (name, type, size, and a hash for integrity checking) is sent through the same encrypted path as ordinary messages.
- The file content itself never passes through the public intermediary; it's transferred only over the direct connection between the two devices, in chunks.

The cost of this decision is that both parties need to be online at the same time for a file transfer. This should be seen as a natural trade-off, not an embarrassing limitation — because the only alternative is storing the file on an intermediary server, which is exactly what the whole project set out to avoid in the first place.

## The Main Challenges Along the Way

Three challenges usually take up more time than the rest:

- **Balancing three conflicting goals:** security, offline capability, and being serverless usually work against each other. Reaching a point where all three hold at once requires layered design, not a single simple solution.
- **Message ordering without a central time source:** without a logical counter, keeping conversation order correct is practically impossible.
- **Making sure the encryption and routing logic is actually correct:** since there's no central server to debug against, the app's core logic has to be fully independent of the UI and heavily tested.

In Telepatty, to cover that last risk, the core logic was written completely separate from the UI layer, and I wrote over 340 unit tests across 42 files for it — from packet decryption to abuse-prevention limits.

## What Usually Stays Unsolved

No serverless messenger is ever "complete"; being honest about the limitations is an important part of the design process:

- Absolute anonymity is usually not achievable; the public intermediary can still see how much data arrived, when, and to which destination. "Being private" and "being anonymous" are two different claims.
- Full forward secrecy for offline-stored messages requires a more complex structure, for which a stable, standard browser implementation doesn't really exist yet.
- Hiding a user's network address from the other party usually requires a helper server — which, however small, is itself a return to the concept of a "server."
- No encryption can prevent the risk of a compromised device, or the phone being physically accessible to someone else.

## Conclusion

Building a serverless messenger doesn't require inventing a new algorithm; the real challenge is arranging a few well-known pieces (public-key cryptography, decentralized public relays, direct device-to-device connections) so that one hard constraint is never violated: no dedicated server, without sacrificing security, offline capability, or conversation history.

The biggest lesson from this process is that "being serverless" isn't a free decision; whatever weight is lifted off a central server has to be compensated for elsewhere — in the encryption layer, in identity management, or in message routing — through more careful design. Telepatty is one practical example of this approach; you can see the code or try it yourself: [telepatty.ir](https://telepatty.ir)

I'd love to hear about your own experience building decentralized systems, or any questions you have about this process. Reach out in the comments.
