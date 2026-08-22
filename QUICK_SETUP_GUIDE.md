# Quick Setup Guide - Google Drive API

## ✅ Email Already Configured!

Your Gmail SMTP is already set up:
- Email: `thewebyatra@gmail.com`
- App Password: `xwwy ejjx wnqg matl` (without spaces: `xwwyejjxwnqgmatl`)

## 🚀 Next Step: Google Drive Service Account

You need to create a Google Service Account to upload accepted quotations to your Google Drive folder automatically.

### Follow These Steps:

#### 1. Go to Google Cloud Console
👉 **[Click here to open Google Cloud Console](https://console.cloud.google.com/)**

#### 2. Create a New Project (if you don't have one)
- Click the project dropdown at the top
- Click **"New Project"**
- Name: `TheWebYatra`
- Click **"Create"**

#### 3. Enable Google Drive API
- Go to **"APIs & Services"** → **"Library"**
- Search for **"Google Drive API"**
- Click **"Enable"**

#### 4. Create Service Account
- Go to **"APIs & Services"** → **"Credentials"**
- Click **"Create Credentials"** → **"Service Account"**
- Fill in:
  - **Name:** `thewebyatra-quotations`
  - **Description:** `Upload accepted quotations to Drive`
- Click **"Create and Continue"** → **"Done"**

#### 5. Download JSON Key
- Click on your service account (looks like an email)
- Go to **"Keys"** tab
- Click **"Add Key"** → **"Create new key"**
- Choose **"JSON"**
- Click **"Create"** - A JSON file will download

#### 6. Open the Downloaded JSON File

It will look something like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-123456",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "thewebyatra-quotations@your-project-123456.iam.gserviceaccount.com",
  "client_id": "123456789",
  ...
}
```

#### 7. Copy These Two Values to Your `.env.local` File

**Copy the `client_email` field:**
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=thewebyatra-quotations@your-project-xxxxx.iam.gserviceaccount.com
```

**Copy the ENTIRE `private_key` field (including the quotes):**
```env
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour very long key here...\n-----END PRIVATE KEY-----\n"
```

⚠️ **IMPORTANT:** Keep the `\n` as-is, don't replace them with actual line breaks!

#### 8. Share Your Google Drive Folder with the Service Account

- Copy the `client_email` from the JSON (e.g., `thewebyatra-quotations@your-project.iam.gserviceaccount.com`)
- Open your Google Drive folder: 
  👉 **[Your Quotations Folder](https://drive.google.com/drive/folders/1Goi_q41t6GgI54qzm_DpKc_2X3_rSb3Y)**
- Right-click the folder → **"Share"**
- Paste the service account email
- Set permission to **"Editor"**
- **UNCHECK "Notify people"** (it's a robot, not a person!)
- Click **"Share"**

## 📝 Your Complete `.env.local` File Should Look Like:

```env
# ── Contact Form Email (SMTP) ──────────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=thewebyatra@gmail.com
SMTP_PASS=xwwyejjxwnqgmatl

# The inbox that receives contact form submissions
CONTACT_EMAIL=hello@thewebyatra.com

# ── Google Drive API (for storing accepted quotations) ────────────────────
GOOGLE_SERVICE_ACCOUNT_EMAIL=thewebyatra-quotations@your-project-xxxxx.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...[very long key]...=\n-----END PRIVATE KEY-----\n"
```

## 🧪 Testing

After setting up everything:

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Test the quotation flow:**
   - Fill out all 5 steps in the quotation form
   - Click "Accept & Sign Electronically"
   - Fill in your details and submit

3. **Check results:**
   - ✅ You should receive an email at the client's email address
   - ✅ `thewebyatra@gmail.com` should receive a notification email
   - ✅ The PDF should appear in your Google Drive folder

## ❓ Need Help?

If you get stuck at any step:

1. **Can't find Google Cloud Console?** 
   - Make sure you're logged into the correct Google account (thewebyatra@gmail.com)

2. **Service account not working?**
   - Double-check you shared the Drive folder with the service account email
   - Verify the private key is copied exactly as-is with `\n` characters

3. **Emails not sending?**
   - The app password is already configured correctly: `xwwyejjxwnqgmatl`
   - Make sure your `.env.local` file has this exact value

## 🎯 What You Get After Setup:

When a client accepts a quotation:

1. **✅ Client receives:**
   - Email with accepted quotation PDF attached
   - Instructions for next steps
   - Your contact information

2. **✅ You (TheWebYatra) receive:**
   - Email notification about new acceptance
   - Client details and quotation number
   - PDF attached

3. **✅ Google Drive:**
   - Accepted PDF automatically uploaded
   - File named: `TheWebYatra_Accepted_Quotation_ClientName_TWY-123456.pdf`
   - Accessible via link for easy sharing/archiving

---

**Ready to go?** Just complete the Google Service Account setup (steps 1-8 above) and you're all set! 🚀
