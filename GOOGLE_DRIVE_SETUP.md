# Google Drive API Setup Guide

This guide will help you set up Google Drive API to store accepted quotations automatically.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **"New Project"**
4. Enter project name: `TheWebYatra` (or any name you prefer)
5. Click **"Create"**

## Step 2: Enable Google Drive API

1. In your project, go to **"APIs & Services"** > **"Library"**
2. Search for **"Google Drive API"**
3. Click on it and press **"Enable"**

## Step 3: Create Service Account

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"Service Account"**
3. Enter these details:
   - **Service account name:** `thewebyatra-quotation-service`
   - **Service account ID:** (auto-generated)
   - **Description:** `Service account for uploading accepted quotations to Google Drive`
4. Click **"Create and Continue"**
5. For role, select **"Basic"** > **"Editor"** (or you can skip this step)
6. Click **"Continue"** and then **"Done"**

## Step 4: Create and Download Service Account Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email
3. Go to the **"Keys"** tab
4. Click **"Add Key"** > **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. A JSON file will be downloaded to your computer

## Step 5: Share Google Drive Folder with Service Account

1. Open the JSON file you just downloaded
2. Find the **"client_email"** field - it will look like:
   ```
   thewebyatra-quotation-service@your-project-id.iam.gserviceaccount.com
   ```
3. Copy this email address
4. Open your Google Drive folder: https://drive.google.com/drive/folders/1Goi_q41t6GgI54qzm_DpKc_2X3_rSb3Y
5. Right-click on the folder > **"Share"**
6. Paste the service account email
7. Give it **"Editor"** permission
8. **IMPORTANT:** Uncheck "Notify people" (since it's a service account)
9. Click **"Share"**

## Step 6: Add Credentials to .env.local

1. Open your `.env.local` file in the project root
2. Add these environment variables from your JSON file:

```env
# Google Drive API
GOOGLE_SERVICE_ACCOUNT_EMAIL=thewebyatra-quotation-service@your-project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour very long private key here\n-----END PRIVATE KEY-----\n"
```

**Important Notes:**
- Copy the **entire** `private_key` value from the JSON file
- Keep the quotes around the private key
- The `\n` characters should remain as `\n` (don't convert them to actual newlines)

## Step 7: Configure Gmail for Sending Emails

Since you want to send emails from `thewebyatra@gmail.com`, you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Go to **Security** > **2-Step Verification** (enable if not already enabled)
3. Scroll down to **App passwords**
4. Click **"App passwords"**
5. Select:
   - **App:** Mail
   - **Device:** Other (Custom name) - enter "TheWebYatra Website"
6. Click **"Generate"**
7. Copy the 16-character password (without spaces)

Add to your `.env.local`:

```env
# Gmail SMTP for sending emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=thewebyatra@gmail.com
SMTP_PASS=your_16_character_app_password_here
```

## Step 8: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your website and test the quotation acceptance flow:
   - Fill out the quotation form (5 steps)
   - Click "Accept & Sign Electronically"
   - Fill in the acceptance details
   - Submit

3. Check:
   - ✅ Email received by client
   - ✅ Email received by thewebyatra@gmail.com
   - ✅ PDF uploaded to Google Drive folder

## Troubleshooting

### Error: "Invalid credentials"
- Make sure the private key is correctly formatted with `\n` characters
- Ensure there are no extra spaces or line breaks in the key

### Error: "Permission denied"
- Verify you shared the Google Drive folder with the service account email
- Make sure you gave "Editor" permission

### Email not sending
- Check if you're using the correct App Password (not your Gmail password)
- Verify 2-Step Verification is enabled on your Google account
- Check if "Less secure app access" is turned off (it should be, use App Password instead)

### PDF not uploading to Drive
- Verify the folder ID is correct: `1Goi_q41t6GgI54qzm_DpKc_2X3_rSb3Y`
- Check Google Drive API is enabled in your Cloud Console
- Ensure the service account has access to the folder

## Security Best Practices

1. **Never commit** `.env.local` to Git (it's already in `.gitignore`)
2. **Never share** your service account JSON file publicly
3. **Rotate keys** periodically for better security
4. **Use environment variables** for all sensitive data

## File Naming Convention

Accepted quotation PDFs will be automatically named as:
```
TheWebYatra_Accepted_Quotation_{ClientName}_{QuotationNumber}.pdf
```

Example:
```
TheWebYatra_Accepted_Quotation_John_Doe_TWY-123456.pdf
```

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the server logs in your terminal
3. Verify all environment variables are set correctly
4. Make sure all services (Drive API, Gmail) are properly configured

---

**Setup Complete!** Your quotation system is now ready to:
- ✅ Accept quotations electronically
- ✅ Generate signed PDFs with client details
- ✅ Upload to Google Drive automatically
- ✅ Send emails to both client and company
