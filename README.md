# Installation

### Step 1

Download code to local terminal

### Step 2

Open code in vsCode

### Step 3

In vsCode terminal, run [$ npm i] to download npm dependencies

### Step 4

After dependencies installed, run [$ npm start] to start test environment

### Step 5

The client also utilizes a server to store the user matches in a database. Please visit the server repository for further information on how to get that installed. https://github.com/TheCaptainKimchi/raul-calero-capstone-server

# About The App

### Fixed Components

Header and Footer will always render on every page of the website.

1. Header: Navigation component to allow user to navigate throughout site. In mobile viewing, navigation will be nested within a burger menu.
2. Footer: Additional navigation on the bottom of the page with additional social icons to connect with developer.

### Home Page

Home page set up to display key features of the web app and the base navigation to different pages on the website. Key components are the hero and feature promo component.

1. Hero: To welcome user to site and give CTA to feature page.
2. Feature Promo: Provide more details to user about key feature

### About Page

About page to describe version 1 of the project developed in Python (https://sparkgg.net), bio of the developer, social media links, and list of previous projects completed by developer.

### Feature Page

Key feature page to display leaderboard data of Valorant matches stored in server database (Only displays users who have account on the site or users that have been searched previously using feature.) and search feature to search up recent matches from a player's Valorant matches.

### Results Page

After searching for a player, display most recent matches

### Profile Page

Login to profile or display profile details if user is already logged in. Also links to a register page to create an account.

If user is logged in, will display lifetime data stored on server and display most recent matches played related to user.

### Register Page

Register form to create a user account that will store in the server

# Using The App

Most functionality will be in the feature page. You may enter a Riot Games account in the search bars by adding a Riot Id in the left box and the Tagline in the right box. If you do not have a Riot Games account, you may reference other player accounts or use the sample ones below:

Riot Id: xStarwise
Tagline: Na1

Riot Id: SEN TenZ
Tagline: 0505

Riot Id: JustGoNext
Tagline: Throw

Riot Id: K1NGJMZ
Tagline: TTV

The other functionality will be on the profile page. You may make an account only if you have a Riot Games account. You may also use one of the sample Riot Games accounts above to create an account. 

# Tech Stacks Used

### APIS
This project only uses the Riot Games API to capture player datas from their matches as well as the games assets to render on the screen (ex. maps and characters)
https://developer.riotgames.com/
https://developer.riotgames.com/docs/portal

### STACKS
This project uses:

- React
- Javascript
- CSS/SASS
- HTML
- Node js/Express
- Axios

# Future Phases
Continuing on the project, some major shifts are required.

### Phase 1
Restructure the site to utilize the Riot Authentication tool to have the players create an account and give explicit permission for their account to be used with their API. This will mean the core feature to search up players may only be used if they have an account with the site. 

### Phase 2
Adjustment of the displayed data metrics to display more intuitive data of the player's matches. The matches currently only display KDA, ACS, map played, character played, and if the player won or lost. Additional data will include but not limited to:

- Rounds played
- Per round metrics (weapons purchased, credits awarded/spent, KDA/ACS with timestamps and locations)
- Map layouts of key events
- Lifetime character/map data (Filtered by character on map and map statistics alone)

### Phase 3
Introduction of a coaching tool to create a team and add users to your team. This tool will automatically track and provide detailed insights on the players that have been added to the team and can be exported in various formats for the "coach/captain" to analyze for their team's development.
