---
title: 'KarizLab'

description: 'KarizLab is a private platform for managing multiple laboratory branches across the country, along with lab suppliers and their evaluation, order and invoice registration, various transfer notes, and warehouse inventory, among other things.'

date: 2024-04-14

year: '2024'

client: 'KarizLab'

role: 'Full-stack developer (frontend & backend), UI/UX designer'

duration: '2 months'

platform: 'Web App'

image: /images/projects/Karizlab/2.webp

url: 'private'

tags: ['Web Application', 'User Management', 'Monitoring', 'Industrial', 'Reporting']

details:
  - label: 'Focus'

    value: 'The complete management cycle for laboratory branches, suppliers, customers, products, and administration — all in one unified KarizLab system.'

media:
  - type: video

    src: /images/projects/Karizlab/1v.webm

  - type: image

    src: /images/projects/Karizlab/2.webp

  - type: image

    src: /images/projects/Karizlab/3.webp

  - type: image

    src: /images/projects/Karizlab/4.webp

  - type: image

    src: /images/projects/Karizlab/5.webp

  - type: image

    src: /images/projects/Karizlab/6.webp
---

## Project Overview

KarizLab is a complete system for managing laboratory branches across the country, rating and managing suppliers, ordering products, and fully tracking orders from suppliers. It also includes a warehouse and product management section.

## Approach

The system supports different subscription tiers (as requested by the client) with a high degree of customization, which can be created and sold to different laboratories.
After purchasing a subscription, each lab gets access to features based on its tier. Suppliers are also defined in the system, with the ability to advertise and get boosted (climb the ranking in the supplier list). Labs can evaluate suppliers according to the protocol built into the system. Lab products can be added to lab inventory, along with incoming and outgoing transfer notes.

The entire process — from placing an order to receiving it, and even evaluating shipped or returned products — happens within the site itself. The system also includes various SMS notifications, along with an advertising system.

## Challenge

The main challenge in projects of this scale is closing security gaps, optimization, speed, and scalability — which I personally found interesting.

For that reason, I took server-side access control seriously and didn't rely solely on frontend checks; since client-side checks can be bypassed, every request that reaches the server passes again through authentication and authorization filters. In addition:

- Input validation to prevent attacks like SQL Injection and XSS
- Rate limiting on sensitive routes to prevent brute-force attacks
- Using HTTPS and encrypting sensitive data (both in transit and at rest)
- CORS control to block unauthorized access from unknown domains
- CSRF tokens to prevent forged requests
- Logging and monitoring suspicious activity for faster detection of intrusion attempts

All of these were implemented and enforced on the site.
