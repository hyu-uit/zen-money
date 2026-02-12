---
name: zen-money
description: Project context and PRD for ZenMoney personal finance app. Use when implementing features, designing APIs, modifying the database schema, or making architectural decisions in this project.
---

# ZenMoney — Personal Finance Management App

## Overview

A personal app to manage cash flow aligned with a salary cycle (25th of each month), auto-allocate budget into specialized bank accounts, and track long-term investment portfolios.

## Tech Stack

- **Runtime**: NestJS 11 (TypeScript)
- **ORM**: Prisma 7.2.0 with `prisma-client-js` generator
- **Database**: PostgreSQL (local Prisma Postgres via `prisma dev`, connect via `accelerateUrl`)
- **Package manager**: Yarn
- **Note**: Prisma 7 requires `accelerateUrl` in PrismaClient constructor (no `datasourceUrl`/`datasources`)

## Core Entities

| Entity | Description |
|--------|-------------|
| **PhysicalAccount** | Real bank accounts: VCB (essential), MB (investment), Techcombank (savings), Momo (misc) |
| **Fund (Virtual)** | Virtual budget buckets: Thiết yếu, Đầu tư, Tình cảm, Mua sắm... allocated by % of salary |
| **InvestmentAsset** | Stock holdings: ticker, quantity, avg cost, latest market price |
| **FiscalCycle** | Budget period: 25th of month N → 24th of month N+1 |
| **Transaction** | Income/expense/transfer records linked to a fund and physical account |

## Modules & Features

### 1. Income Allocation (`/income-allocation`)

- Input salary amount received into primary account (VCB)
- Auto-calculate fund amounts based on configured percentages
- Generate a **transfer to-do list** (e.g., "Transfer 5M from VCB → MB Bank")
- Mark transfers as "Done" → update physical account balances

### 2. Expense Management (`/expenses`)

- Each Fund maps to a default PhysicalAccount (e.g., Ăn uống → VCB)
- Log expense by selecting a Fund → system deducts from the linked PhysicalAccount
- Alert if a Fund is exhausted but the PhysicalAccount still has balance (cross-fund overspend)

### 3. Investment Journal (`/investments`)

- Log stock purchases: date, ticker, quantity, matched price
- No sell feature in v1.0
- End-of-month review (24th): input current market price for held tickers
- Investment notes: strategy reasoning per asset ("Why did I buy this?", "Next month plan?")

### 4. Reporting (`/reports`)

- **Cycle Report**: spending summary for 25/N → 24/N+1
- **Budget vs Actual**: horizontal bar chart data — % spent per fund
- **Portfolio Growth**: column chart data — principal vs market value over time

## User Flow

1. **Day 25** — Receive salary → app splits by % → user transfers real money per suggestions → tick "Done"
2. **Daily** — Log expense → pick Fund → app deducts from linked bank account
3. **Stock purchase** — Log qty/price → app deducts from Investment fund & MB Bank
4. **Day 24** — Input current stock prices → view monthly report → write strategy notes

## Database Design

Prisma schema at `prisma/schema.prisma`. Key relationships:

- `Fund.defaultAccountId` → `PhysicalAccount.id` (each fund maps to a bank account)
- `Transaction.fundId` → `Fund.id`
- `Transaction.accountId` → `PhysicalAccount.id`
- `Transaction.fiscalCycleId` → `FiscalCycle.id`
- `InvestmentTransaction.assetId` → `InvestmentAsset.id`
- `InvestmentSnapshot.assetId` → `InvestmentAsset.id`

Use `Decimal @db.Decimal(15, 2)` for all monetary fields.

## NestJS Module Structure

```
src/
├── main.ts
├── app.module.ts
├── prisma/
│   ├── prisma.module.ts        # Global PrismaModule
│   └── prisma.service.ts       # PrismaClient wrapper
├── accounts/
│   ├── accounts.module.ts
│   ├── accounts.controller.ts
│   ├── accounts.service.ts
│   └── dto/
├── funds/
│   ├── funds.module.ts
│   ├── funds.controller.ts
│   ├── funds.service.ts
│   └── dto/
├── income-allocation/
│   ├── income-allocation.module.ts
│   ├── income-allocation.controller.ts
│   ├── income-allocation.service.ts
│   └── dto/
├── expenses/
│   ├── expenses.module.ts
│   ├── expenses.controller.ts
│   ├── expenses.service.ts
│   └── dto/
├── investments/
│   ├── investments.module.ts
│   ├── investments.controller.ts
│   ├── investments.service.ts
│   └── dto/
├── fiscal-cycles/
│   ├── fiscal-cycles.module.ts
│   ├── fiscal-cycles.controller.ts
│   ├── fiscal-cycles.service.ts
│   └── dto/
└── reports/
    ├── reports.module.ts
    ├── reports.controller.ts
    └── reports.service.ts
```

## Conventions

- **Validation**: Use `class-validator` + `class-transformer` with DTOs
- **API prefix**: `/api/v1` (set in `main.ts`)
- **Error handling**: NestJS built-in exception filters
- **Naming**: kebab-case for routes, camelCase for TS, PascalCase for classes/models
- **Single-user app**: No auth required in v1.0 (personal use only)

## Build Order (Suggested)

1. Prisma schema (add missing relations & fields) + PrismaModule
2. Accounts CRUD
3. Funds CRUD
4. FiscalCycle management
5. Income Allocation (salary input + auto-split + transfer to-do)
6. Expense Management (logging + alerts)
7. Investment Journal (purchase log + snapshots + notes)
8. Reporting (cycle summary + budget vs actual + portfolio growth)

## UI Direction (for future frontend)

- Primary: Green (investment), Secondary: Blue (banking), Accent: Orange (spending alerts)
- Main screen: progress bars per fund showing spend velocity
