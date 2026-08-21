# 🦀 SuperCrab Backend Setup Guide (Google Apps Script + Stripe)

Guide to setting up your free serverless backend using Google Sheets & Google Apps Script for online pickup orders.

---

## Step 1: Create Google Sheet

1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Rename the spreadsheet to **SuperCrab Orders**.
3. Rename the first tab/sheet at the bottom to **Orders**.
4. Copy the **Spreadsheet ID** from the browser URL:
   `https://docs.google.com/spreadsheets/d/`**`1a2b3c4d5e6f7g8h9...`**`/edit`

---

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**.
2. Delete any default code in `Code.gs`.
3. Copy the contents of `google-apps-script/Code.gs` and paste it into `Code.gs`.
4. Click the `+` icon next to Files on the left sidebar and select **Script**.
5. Name the new file `Config`.
6. Copy the contents of `google-apps-script/Config.gs` and paste it into `Config.gs`.
7. Update `Config.gs` with:
   - Your **Stripe Secret Key** (`sk_live_...` or `sk_test_...`)
   - Your **Google Sheet ID** (from Step 1)
   - Save all files (`Ctrl+S` or `Cmd+S`).

---

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** (top right) > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `SuperCrab Orders API v1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` (Crucial! Allows website to make order requests)
4. Click **Deploy**.
5. Review permissions when prompted and click **Allow**.
6. Copy the **Web App URL**:
   `https://script.google.com/macros/s/AKfycbx.../exec`

---

## Step 4: Link Web App URL to React Frontend

1. Open `src/utils/constants.js` in your React code.
2. Find `GOOGLE_APPS_SCRIPT_URL` and replace the placeholder URL with your Web App URL from Step 3:

```javascript
export const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
```

---

## Step 5: Test Full Flow

1. Open your SuperCrab website (`npm run dev`).
2. Go to **Menu** page.
3. Click **Add to Cart** on items, or **Customize** on Combos.
4. Open the Cart drawer and click **Proceed to Pickup Checkout**.
5. Fill in pickup name & phone, then click **Pay & Place Order**.
6. You will be redirected to the official Stripe Checkout page!
7. Complete test payment (if test mode, use card `4242 4242 4242 4242`).
8. You will be redirected back to the **Thank You** page, and the order will instantly appear as a new row in your **Google Sheet**! 🚀
