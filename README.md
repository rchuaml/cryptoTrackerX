# cryptoTrackerX

## Hosted on Heroku
https://cryptotrackerx.herokuapp.com/

Sign up for an account to access features

## Built with
Javascript, Node.js, React.js, Express, PostgreSQL, DOM, AJAX, Bootstrap and Webpack


## Description

A Cryptocurrency portfolio tracking app together with customized news feed feature for the coins that you are tracking. Automatically calculates total profits and or losses and for each coin that you are tracking based on latest prices pulled from coinmarketcap.com API. Also pulls latest news from Cryptocompare News API that are filtered based on the current coins you are tracking and also an embedded news reader functionality that allow users to read full news articles without leaving the site. 

## Rationale

I want to build an app that allows both features of tracking latest profits and losses on the cryptocurrency portfolio and also to track the news simulataneously. As cryptocurrency prices are highly volatile, being aware of latest cryptocurrency news on your coins and also price and profit changes are highly important as an investor and therefore, this app allows users to conveniently track both in a single app.

### Steps Taken

1.) Login/SignUp page and validations of the main dashboard using cookies

2.) Created Routes for different components of the website using React Router

3.) Created Landing Page with bootstrap carousel

4.) Pulled data from coinmarketcap API and created a ranking list of top 100 coins

5.) Added feature to add the coins to a tracking list

6.) Added the feature to edit and delete coins that are in the tracking list

7.) Pulled information from tracking list and used a cryptoNews Api to generate a customised newsfeed and displayed them in a list 

### Further

1.) Created a dashboard to allow logged in users to have access to the main features of the app

2.) Added bootstrap and scss styling to all pages

3.) Added a embedded news reader using modal