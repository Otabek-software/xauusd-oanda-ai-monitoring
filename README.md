# XAUUSD OANDA AI Monitoring

Automatic XAUUSD (Gold) market structure + Inside Bar strategy monitoring system with:

- OANDA API for live price data
- Multi-timeframe market structure (BOS, CHoCH, HH/HL, Protected High/Low)
- Inside Bar detection + liquidity sweep
- Grok AI (xAI) verdict on setups
- Telegram bot for signal delivery and interactive limit order confirmation (paper trading)
- Vercel Cron for continuous monitoring
- Risk management (SL ≤ 20 pips, progressive profit lock)

## Important Notice

This ZIP/snapshot contains **only a partial set of files** (server routes, scripts, migrations, config).  
The full application (especially `src/` client and strategy engine) is **not included** in the provided archive.

You will need the complete source to run it.

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `OANDA_API_TOKEN` / `OANDA_ACCOUNT_ID`
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`
- `XAI_API_KEY` or `AI_API_KEY`
- `DATABASE_URL`
- `CRON_SECRET`
- `TELEGRAM_WEBHOOK_URL`

## Deployment (Vercel)

1. Connect this repo to Vercel
2. Add all environment variables
3. The cron job is already configured in `vercel.json` (`/api/monitor/cron` every minute)
4. After deploy, set webhook:

```bash
npm run telegram:webhook
```

## Strategy Summary

Market Structure → Trend → Correction → Inside Bar → Liquidity → Entry (SL ≤ 20 pips) → Progressive SL lock (+60→+50, +120→+100, +220→+200) → TP 300 pips

## License

Private / personal use.
