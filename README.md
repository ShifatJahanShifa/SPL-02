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
- [Usage](#Usage)
- [Authors](#Authors)

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
- in subscribed users dashboard: users can input both url and html source code file for generating report. They can get solution for violation. Also they can     filter tests for level A, AA.
- users manage profiles and subscriptions.


#### Payment:

- General features are unlocked for registered users; premium features require subscription.
- Payment method: payment methods include online banking, mobile banking, or credit card.
- Secure SSL channel ensures transaction security; alerts for payment failures. message for successful payment


#### Frontend Code Analysis:

- Users upload URLs or HTML code for evaluation against WCAG-2.1.
- Client code retrieval and parsing for accessibility checks at different levels. (A,AA)
- Logic analysis identifies violations; reports generated for users.


#### Accessibility Review:

- System generates reports indicating accessibility violations by line.
- option to export report in PDF format.
- view the error in the website
- Sample solutions available for subscribed users based on report findings.


#### Sample Solution and Rating:

- Subscribed users receive sample solutions and improved website ratings.
- Solutions include corrected code snippets improved HTML tags,styling property.
- Rating reflects website improvements based on provided sample solutions.



## User Manual 📖

Our user manual provides clear instructions for all users:

- from home page, user can either register or login to the system.
- all registered user will view unsubscribed users dashboard.
- unsubscribed users can input the website url to check the accessibility violations in the website.
- unsubscribed users can subscribe for having the solution of the website.
- the report page have an option to view the violation in the website in real time.
- the users can see the violations in the below of the report page. they can generate pdf of the violations.
- the subscribed users can download the solution. the solution is the updated html source code.
- for subscription, users can pay using any of the way like online banking, credit card, mobile banking etc.
- after successful payment, users will be redirect to subscribed users dashboard.
- system will notifyfor unsuccessful payment
- subscribed users can input both url and source code file in to the system.
- subscribed users can also have the filter option for label A and AA.

## Setup 🛠️

#### Requirements:

- Puppeteer Library, node js, react js, sandbox API, MySQL database

#### Installation Instructions:

Install puppeteer: 
```bash
    npm install puppeteer
```

Install puppeteer: 
```bash
    npm install puppeteer
``` 

Install sandbox API:
```bash
    npm i sslcommerz-lts
```

## Usage

```bash
    git clone: https://github.com/ShifatJahanShifa/SPL-02.git
```

To run the project: 

Run Fronted code: 
```bash
    cd DirectoryStructure
    cd fronted
    npm start
``` 

Run Backend code:
```bash
    cd DirectoryStructure
    cd backend
    node index.js
``` 

## Authors

- [@ShifatJahanShifa](https://www.github.com/ShifatJahanShifa) 
- [@SwadhinPal](https://github.com/swadhinpal)

### e-Accessibility is designed to empower developers in developing a more accessibile website. Happy Coding! 🍵👨‍💻👩‍💻
