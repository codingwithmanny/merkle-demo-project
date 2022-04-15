# NodeTS Prisma Auth0 Bootstrap

This is an API that has exposed endpoints with an Auth0 middleware.

---

## Considerations

The api as it stands makes an initial request to `/auth/me` where it reads the
JWT and checks if the providers id exists in the database (`sub` value). If the
provider id doesn't exist, it will create a new user.

---

## Requirements

- Docker `v20.10.11`
- NVM or NodeJS `v16.14.0`
- Yarn `v1.22.17`
- SPA Client
  [github.com/codingwithmanny/reactjs-auth0-bootstrap-vitejs](github.com/codingwithmanny/reactjs-auth0-bootstrap-vitejs)

---

## Pre Configuration

### Create Environment File

```bash
cp env.example .env;
```

### Auth0 App Keys

**NOTE** This assumes that the SPA Client README.md was completed before hand.

A. Go to
`https://manage.auth0.com/dashboard/us/YOUR_EXISTING_TENANT_NAME/applications`

B. Choose your existing application that was used on the client side

C. In the application, click on the **Settings** tab

D. In the Settings section, copy the `Domain`, the `Client ID`, and
`Client Secret` and place the them in your `.env` file as:

```
# AUTH0
AUTH0_DOMAIN="DOMAIN_HERE"
AUTH0_CLIENT_ID="CLIENT_ID_HERE"
AUTH0_CLIENT_SECRET="CLIENT_SECRET_HERE"
AUTH0_AUDIENCE=""
```

### Auth0 API Audience

A. Go to `https://manage.auth0.com/dashboard/us/YOUR_TENANT_NAME/apis`

B. Once in your new api, click on the **Settings** tab

E. In the Settings section, copy the `Identifier` and place it in your `.env`
file as:

```
# AUTH0
AUTH0_DOMAIN="DOMAIN_HERE"
AUTH0_CLIENT_ID="CLIENT_ID_HERE"
AUTH0_CLIENT_SECRET="CLIENT_SECRET_HERE"
AUTH0_AUDIENCE="YOUR_IDENTIFIER_HERE"
```

---

## Local Setup

Make sure you have the correct version of node installed:

```bash
nvm install;
```

### 1 - Install Dependencies

```bash
yarn;
```

### 2 - Start Database

```bash
docker compose up -d;
```

**Additional - Tear Down Database**

```bash
docker compose down --remove-orphans -v;
```

### 3 - Run Migrations

```bash
npx prisma migrate dev;
```

## 4 - Server Start

```bash
yarn dev; # npm dev;
```
