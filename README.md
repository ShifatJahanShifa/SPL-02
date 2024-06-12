> Software Project Lab 2

# e-Accessibility - A Web Content Accessibility Analysis Tool 🌟
e-Accessibility is a tool for analyzing web content accessibilities in a website. It is specifically designed to identify violations in the design of web contents according to the standard rules named WCAG 2.1 guidelines provided by W3C. It helps developers make their website more accessible for people who have visual impairments, short eye sighted problems, hearing problems, mobility problems, physical impairments. This system generates accessibility violations reports based on the user input url or html file. 
It incorporates the SaaS (Software as a Service) model. For the subscribed users, the system provides a solution for the violations. Also the subscribed users can filter levels (A, AA) to generate reports. 



## Table of Contents

- [Technologies Used](#technologies-used-💻)
- [Features](#features-🌟)
- [User Manual](#user-manual-📖)
- [Setup](#setup-🛠️)
  - [Requirements](#requirements)
  - [Installation Instructions](#installation-instructions)
- [Video Demo](#video-demo-📹)
- [Contact](#contact-📞)

## Technologies Used 💻

e-Accessibility system uses below given technologies:

- **Frontend:** Reactjs, HTML, CSS, JavaScript

- **Backend:** Nodejs

- **Database:** MySQL

- **Library:** Puppeteer

- **Payment Gateway:** SSLCOMMERZ Sandbox API
## Features 🌟

Features of e-Accessibility system:

### For all users

#### Registration and Authentication:
- Users register or log in to access features.
- Users provide credentials needed to register or log in to the system.
- passwords are hashed for security.
- Forgot password option includes OTP verification for resetting.

#### User Dashboard:

- two types of users: unsubscribed and subscribed users. According to users, there are two types of dashboards: unsubscribed and subscribed users dashboards .
- in unsubscribed users dashboard: users can only input url for generating report. They can't have solution for violation.
- in subscribed users dashboard: users can input both url and html source code file for generating report. They can get solution for violation. Also they can filter tests for level A, AA.
- users manage profiles and subscriptions.


#### Payment:

- General features are unlocked for registered users; premium features require subscription.
- Payment method: payment methods include online banking, mobile banking, or credit card.
- Secure SSL channel ensures transaction security; alerts for payment failures. message for successful payment


#### Frontend Code Analysis:

- Users upload URLs or HTML code for evaluation against WCAG-2.1.
- Client code retrieval and parsing for accessibility checks at different levels. (A,AA)
- Logic analysis identifies violations; reports generated for users.


### Features for Students 🎓

#### Lesson Access 📖

- 🚀 Access lessons by simply running the application.
- 🔀 Switch between lessons using the spacebar.

#### Evaluation Window 🧩

- 🧩 Engage in various assessment categories:
  - 🧩 Puzzle Playing: Solve image-based puzzles.
  - 🧩 Word Matching: Match images to their corresponding names.
  - 🧩 MCQ Questions: Answer multiple-choice questions with text and images.
  - 🧩 Sequencing Activity: Sort pictures into a sequence.

#### Celebration Page 🎉

- 🎉 After each assessment, a celebration page appears.
- 🚀 Press the spacebar to advance to the next assessment.

## User Manual 📖

Our user manual provides clear instructions for both instructors and students:

### For Instructors 👩‍🏫

- 📝 Learn to manage student data.
- 📚 Create customized lessons.
- 📊 Make assessment questions.
- 📈 Access and interpret student performance data.

### For Students 🎓

- 📖 Understand how to access and navigate lessons.
- 🧩 Get acquainted with the different evaluation categories.
- 🎉 Celebrate your achievements after each assessment.

## Setup 🛠️

#### Requirements:

- [Download](https://www.codecguide.com/download_k-lite_codec_pack_basic.htm) **K-Lite Codec Pack** for smooth video streaming.

#### Installation Instructions:

> For Teacher:

```
git clone https://github.com/ahmedfahad04/SPL-2.git
cd EmPower
cb Teacher
python3 main.pyw
```

> For Student:

```
git clone https://github.com/ahmedfahad04/SPL-2.git
cd EmPower
cb Student
python3 main.pyw
```

## Video Demo 📹

- Teacher
  

https://github.com/ahmedfahad04/SPL-2/assets/60494055/95c44663-5371-45b7-9a38-d849fd09ef0c



- Student



https://github.com/ahmedfahad04/SPL-2/assets/60494055/c42ce17a-0d58-45c8-b914-fd1d85c80a0c



## Contact 📞

Created by:

1. [Istiaq Ahmed Fahad](https://github.com/ahmedfahad04)
2. [Kamruzzaman Asif](https://github.com/KamruzzamanAsif)

- feel free to contact us!

## EmPower is designed to empower both teachers and students, offering an inclusive and effective learning experience for autistic children. 🌈
