# Stock Calculator

A React JS Application that serves to calculate the amount of money you should invest into each stock based on a 5 division percentage.
integrates with the Polygon.io API to determine the number of shares you are able to purchase based off the most recent closing stock price.

## Local Development

### Initial Setup

1. Install dependencies
   ```
   npm i
   ```
1. Start React server
   ```
   npm run start
   ```

### Additional documentation for development

- The Polygon free tier utilized in this application only allows 5 API request per minute. The App is designed to make these 5 API calls when the component originally mounts (launch). The free tier also only retrieves the closing price of the previous day for each stock so the price is not fully up to date.
