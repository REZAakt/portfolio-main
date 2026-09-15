---
title: 'Sana ERP'

description: 'A comprehensive and integrated organizational management system for Sana, designed to manage production processes, warehousing, office automation, and other organizational departments'

date: 2026-04-21

year: '1405'

client: 'Sana ERP'

role: 'Frontend Developer of the system (and part of the backend), UI/UX Designer'

duration: 'Continuously under development'

platform: 'Web App'

image: /images/projects/sanaapp/8.webp

url: 'https://app.sanaerp.ir/'

tags:
  [
    'Web Application',

    'Comprehensive Organization Management System',

    'ERP System',

    'Production Management',

    'Warehouse Management',

    'Office Automation',

    'User and Access Management',

    'Quality Control and Production Tracking',

    'and more'
  ]

details:
  - label: 'Focus'

    value: 'Integrating production processes, warehousing, office automation, user management, and other organizational departments into a single unified system'
media:
  - type: video

    src: /images/projects/sanaapp/1v.webm

  - type: image

    src: /images/projects/sanaapp/1.webp

  - type: image

    src: /images/projects/sanaapp/2.webp

  - type: image

    src: /images/projects/sanaapp/3.webp

  - type: image

    src: /images/projects/sanaapp/4.webp

  - type: image

    src: /images/projects/sanaapp/5.webp

  - type: image

    src: /images/projects/sanaapp/6.webp

  - type: image

    src: /images/projects/sanaapp/7.webp

  - type: image

    src: /images/projects/sanaapp/8.webp
---

## Project Overview

Sana is a comprehensive and integrated system for school management, designed for schools of any grade level, bringing together various educational, administrative, financial, and communication departments of a school into a single unified platform.

The main goal of the project was to create a modern and simple experience for all school users; from students and parents to teachers, vice principals, counselors, and other administrative staff. Instead of using several separate systems for recording grades, exams, attendance, and financial affairs and school management, all these processes have been made available in a single integrated system.

In designing this system, I tried to make sure the user interface not only had a modern appearance but was also simple and understandable to use for users of different ages and levels of familiarity with software. For this reason, in the UI/UX section, I focused on proper page structure, quick access to features, information organization, and reducing the complexity of the user experience.

## Approach

This project is a comprehensive educational and school management platform that brings together all stakeholders of a school — including students, teachers, counselors, vice principals, and other administrative staff, as well as parents — into a single unified platform.

The system is designed based on user roles, and each group has access to the sections relevant to their tasks. In this way, the information and features needed by each user are made available without cluttering the user interface.

The main sections of the system include:

- Management of students and parents
- Management of teachers and school administrative staff
- Weekly class schedule
- Academic calendar
- Registration and administration of online exams
- Grade recording and academic evaluation
- Issuing and viewing report cards
- Reporting on students' academic progress
- Attendance management
- Tuition and school financial management
- Management of vice principals, counselors, and other staff
- Providing information and features tailored to each user's role

One of the important parts of the project was integrating these features into a single unified system. For example, information about students, classes, teachers, grades, and financial status needed to be usable across different sections of the system, while each user could only view the information authorized for their role.

In the user interface design, I tried to use modern UI/UX patterns to make working with the system simpler for different users. From the page structure and how information is displayed, to forms, tables, dashboards, and the path to accessing features, everything was designed with the goal of reducing confusion and improving the user experience.

## Challenge

One of the main challenges of the project was implementing a relatively large system with several interdependent sections in less than three months. During this time, in addition to frontend development, I also participated in part of the backend implementation and UI/UX design; therefore, I needed to simultaneously focus on the user experience, technical structure, and system performance.

Another important challenge was designing and implementing three completely separate panels for management and administrative staff, teachers, and students and parents. Each panel had its own specific requirements and processes, but all of them needed to connect to a central system and use information in an integrated way.

To solve this issue, the project structure was designed and implemented in a modular way based on Clean Architecture, so that different parts of the system would not have direct dependencies on one another, making development and maintenance simpler. This structure helped keep the business logic separate from the details of the user interface and infrastructure, allowing each section to be developed in a more organized manner.

In the data layer as well, the relationships between students, parents, teachers, classes, exams, grades, attendance, and financial transactions were of great importance. The smallest inconsistency in these relationships could cause incorrect information to be displayed in one of the panels. For this reason, designing the connections between sections and properly managing the data were important parts of the development process.

Optimizing the system's speed was another challenge of the project. The volume of information such as grades, attendance, financial transactions, and academic reports could affect response time and user experience. For this reason, I focused on optimizing the database structure, reducing unnecessary requests, better managing data received from the server, and improving the page loading process so that the system would run more smoothly in daily use.

On the frontend side, one of the challenges was displaying a large amount of information without cluttering the user interface. To solve this, organized structures were used for dashboards, forms, tables, and various sections so that users could reach the information they needed more quickly.

Security and access control were also very important due to the sensitivity of information related to students, parents, teachers, and financial matters. Each user needed to have access only to the sections and information authorized for their role. For this reason, authentication, request validation, and access-level management were given careful attention in the design and implementation of the system.

Ultimately, the goal was to build an integrated, scalable, and usable system despite the wide range of features and differing user needs; a system that would be suitable for the school's users in terms of user experience, and would also provide a solid technical foundation for developing future features.
