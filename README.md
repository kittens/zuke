<div align="center">

# Zuke.gg Frontend 🛡️

[![X](https://img.shields.io/badge/@zuke-%23000000.svg?logo=X&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![ChatGPT](https://img.shields.io/badge/ChatGPT-74aa9c?logo=openai&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-009485.svg?logo=fastapi&logoColor=white)](#)
[![Ubuntu](https://img.shields.io/badge/Ubuntu%2020.04.6%20LTS-E95420?logo=ubuntu&logoColor=white)](#)
[![Python](https://img.shields.io/badge/Python%203.8.10-3776AB?logo=python&logoColor=white)](#)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white)](#)
[![Solana](https://img.shields.io/badge/Solana-9945FF?logo=solana&logoColor=fff)](#)
[![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?logo=sqlite&logoColor=white)](#)

</div>

## Overview 🌟

This is the frontend repository for Zuke.gg, built with Next.js. The backend API documentation is included below for reference.

### Features

- Real-time tweet feed with AI-powered sentiment analysis and summaries
- Token detection and information lookup
- Premium subscription with instant updates (0 delay)
- Historical message access for premium users
- Wallet-based authentication system
- Token information lookup with detailed market data
- Support for tweet media, quotes, and replies

## Frontend Development 🛠️

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages by modifying files in the `app` directory. The pages auto-update as you edit the files.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

### Deployment

The easiest way to deploy the frontend is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## API Endpoints 📡

All schemas, endpoints, responses and requests can be viewed at https://api.zuke.gg/docs (except for the websocket).

> Quick Overview:
>
> - `wss://api.zuke.gg/ws` - WebSocket for tweet feed
> - `https://api.zuke.gg/login` - Login endpoint (returns cookie)
> - `https://api.zuke.gg/upgrade` - Premium upgrade endpoint
> - `https://api.zuke.gg/token/{ca}` - Token information endpoint

<details>
<summary><h3>WebSocket Connection</h3></summary>

#### Endpoint

```
wss://api.zuke.gg/ws
```

#### Features

- Provides tweet feed (with a delay)
- Returns last 15 saved tweets on initial connection
- 0 delay available for upgraded users
- Historical message access for premium users
- Automatic reconnection handling

#### Authentication

Send authorization message with user cookie (JSON):

```json
{ "Authorization": "cookie_here" }
```

#### Logout

To logout, send an empty authorization message or one without the token:

```json
{ "Authorization": null }
```

#### Historical Messages

Premium users can request historical messages by sending:

```json
{
  "type": "get_history",
  "timestamp": 1234567890
}
```

This will return messages older than the specified timestamp.

<details>
<summary>📝 Message Format</summary>

```json
{
  "tweet": {
    "username": "string",
    "display_name": "string",
    "text": "string",
    "icon": "string",
    "image": "string",
    "link": "string",
    "info": {
      "twitter_id": "string",
      "is_reply": "boolean",
      "is_retweet": "boolean",
      "is_quote": "boolean",
      "is_self_reply": "boolean",
      "quoted_user": {
        "username": "string",
        "display_name": "string",
        "text": "string",
        "icon": "string"
      }
    },
    "timestamp": "integer"
  },
  "summary": "string",
  "sentiment": "string",
  "tickers": [
    {
      "ca": "string",
      "name": "string",
      "ticker": "string",
      "logo": "string",
      "logo_small": "string",
      "logo_large": "string",
      "twitter_username": "string",
      "match_type": "string",
      "bullx_url": "string",
      "photon_url": "string",
      "dexscreener_url": "string",
      "token": {
        "ca": "string",
        "name": "string",
        "ticker": "string",
        "logo_url": "string",
        "description": "string",
        "spam_status": "string",
        "socials": [
          {
            "type": "string",
            "url": "string"
          }
        ],
        "dex_details": {
          "usd_price": "float",
          "usd_price_24h_change": "float",
          "market_cap": "float",
          "liquidity": "float",
          "holders": "integer",
          "volume_24h": "float",
          "updated_at": "integer"
        }
      }
    }
  ]
}
```

</details>

<details>
<summary>📊 Example Message</summary>

```json
{
  "tweet": {
    "username": "256",
    "display_name": "theta",
    "text": "mewwing and $act all day https://t.co/G1fVBZXLNW",
    "icon": "https://pbs.twimg.com/profile_images/1876510131720269824/sReMElFC.jpg",
    "image": "https://pbs.twimg.com/media/GhD8jxWbMAAmF_n.jpg",
    "link": "https://twitter.com/256/status/1878278775466836226",
    "info": {
      "twitter_id": "5787532",
      "is_reply": false,
      "is_retweet": false,
      "is_quote": false,
      "is_self_reply": false,
      "quoted_user": null
    },
    "timestamp": "1736971847640"
  },
  "summary": "The tweet references \"mewwing\" and $ACT, accompanied by a black and white manga/anime-style illustration...",
  "sentiment": "neutral",
  "tickers": [
    {
      "ca": "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
      "name": "cat in a dogs world",
      "ticker": "MEW",
      "logo": "https://coin-images.coingecko.com/coins/images/36440/large/MEW.png?1711442286",
      "logo_small": "https://dd.dexscreener.com/ds-data/tokens/solana/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5.png",
      "logo_large": "https://dd.dexscreener.com/ds-data/tokens/solana/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5.png?size=lg",
      "twitter_username": "mew",
      "match_type": "account",
      "bullx_url": "https://bullx.io/terminal?chainId=1399811149&address=MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
      "photon_url": "https://photon-sol.tinyastro.io/lp/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
      "dexscreener_url": "https://dexscreener.com/solana/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5"
    }
  ]
}
```

</details>
</details>

<details>
<summary><h3>Login</h3></summary>

#### Endpoint

```
https://api.zuke.gg/login
```

#### Description

Authenticate using wallet signature to receive access cookie

<details>
<summary>📝 Request Format</summary>

```json
{
  "public_key": "string",
  "signature": "string",
  "timestamp": "integer"
}
```

</details>

<details>
<summary>📊 Example Request</summary>

```json
{
  "public_key": "UN33hVgYiYukkWx14253snpwAFQatdRHmADmViWx256",
  "signature": "mMAraPMHswwZzJQHeZ6rpVYyX3LjVqaaGi211wpfSUhVcnL7Hw6Msocbmk4kJizWWWTsD8tawHRBfNN4SpZ3Pec",
  "timestamp": 1736968747030
}
```

</details>

<details>
<summary>📝 Response Format</summary>

```json
{
  "Authorization": "string",
  "is_premium": "boolean"
}
```

</details>

<details>
<summary>📊 Example Response</summary>

```json
{
  "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NDsgcnY6MTMzLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvMTMzLjAiLCJwdWJsaWNfa2V5IjoiQVdDYzhBdGZaVkpNaDE4dlpkU1V6Qno5UTFwVHY3SlQyN2t2RUZhaVdvQlUiLCJ0aW1lc3RhbXAiOjE3Mzc4MTcxMTkxOTcsImNsaWVudF9pcCI6IjEyNy4wLjAuMSJ9.C6Vj5Du5LX5Kdcev0nwMB3xvej5DzsjSb-GAiF4gUVM",
  "is_premium": true
}
```

</details>
</details>

<details>
<summary><h3>Upgrade</h3></summary>

#### Endpoint

```
https://api.zuke.gg/upgrade
```

#### Description

Upgrade account to premium status using transaction ID

<details>
<summary>📝 Request Format</summary>

```json
{
  "txid": "string"
}
```

</details>

<details>
<summary>📊 Example Request</summary>

```json
{
  "txid": "5t5z7R42GpYQoGc1W8M6D2evhRgnot4axUrC14U6VxsTrKYJr5FHVixf7ZzWH1fiNDdEKiTnda7xetRerbN4Pqj6"
}
```

</details>

<details>
<summary>📝 Response Format</summary>

```json
{
  "public_key": "string",
  "is_premium": "boolean"
}
```

</details>

<details>
<summary>📊 Example Response</summary>

```json
{
  "public_key": "6osAjfoEJpJ574G8KRBfCr27p6A6Y3SrfmKZHkbTUKsx",
  "is_premium": true
}
```

</details>
</details>

<details>
<summary><h3>Token Information</h3></summary>

#### Endpoint

```
https://api.zuke.gg/token/{ca}
```

#### Description

Get detailed token information including market data, social links, and DEX details

<details>
<summary>📝 Response Format</summary>

```json
{
  "ca": "string",
  "name": "string",
  "ticker": "string",
  "logo_url": "string",
  "description": "string",
  "spam_status": "string",
  "socials": [
    {
      "type": "string",
      "url": "string"
    }
  ],
  "dex_details": {
    "usd_price": "float",
    "usd_price_24h_change": "float",
    "market_cap": "float",
    "liquidity": "float",
    "holders": "integer",
    "volume_24h": "float",
    "updated_at": "integer"
  },
  "extra_urls": {
    "ca": "string",
    "bullx_url": "string",
    "photon_url": "string",
    "dexscreener_url": "string",
    "logo_small": "string",
    "logo_large": "string"
  }
}
```

</details>

<details>
<summary>📊 Example Response</summary>

```json
{
  "ca": "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
  "name": "cat in a dogs world",
  "ticker": "MEW",
  "logo_url": "https://coin-images.coingecko.com/coins/images/36440/large/MEW.png",
  "description": "A Solana token project",
  "spam_status": "not_spam",
  "socials": [
    {
      "type": "twitter",
      "url": "https://twitter.com/mew"
    }
  ],
  "dex_details": {
    "usd_price": 0.00123,
    "usd_price_24h_change": 5.2,
    "market_cap": 1234567.89,
    "liquidity": 98765.43,
    "holders": 1000,
    "volume_24h": 50000.0,
    "updated_at": 1736971847640
  },
  "extra_urls": {
    "ca": "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
    "bullx_url": "https://bullx.io/terminal?chainId=1399811149&address=MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
    "photon_url": "https://photon-sol.tinyastro.io/lp/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
    "dexscreener_url": "https://dexscreener.com/solana/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5",
    "logo_small": "https://dd.dexscreener.com/ds-data/tokens/solana/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5.png",
    "logo_large": "https://dd.dexscreener.com/ds-data/tokens/solana/MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5.png?size=lg"
  }
}
```

</details>
</details>

## Premium Features 💎

- Instant tweet updates (0 delay)
- Access to historical messages (up to 1000 messages)
- Extended message cache