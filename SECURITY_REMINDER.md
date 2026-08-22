# 🔒 Security Reminder

## ⚠️ NEVER Commit These Files to Git:

1. **`.env.local`** - Contains sensitive credentials ✅ (Already in .gitignore)
2. **Service Account JSON files** (`*.json` except package files) ✅ (Now in .gitignore)

## ✅ Current Security Status:

### Protected Files (Not in GitHub):
- ✅ `.env.local` - Email and Google Drive credentials
- ✅ `the-web-yatra-d083bf571ded.json` - Service Account key
- ✅ All other JSON credential files

### Safe Storage Location:
**Keep your Service Account JSON file:**
- Outside the project folder
- In a secure location (password manager, encrypted drive)
- **NEVER** in the project directory

## 🔑 Your Credentials Location:

**For Production Deployment (Vercel/other hosting):**

Add these environment variables in your hosting platform's dashboard:

```env
# Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=thewebyatra@gmail.com
SMTP_PASS=xwwyejjxwnqgmatl
CONTACT_EMAIL=hello@thewebyatra.com

# Google Drive Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=theweb-yatra-drive@the-web-yatra.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...YOUR_FULL_KEY_HERE...\n-----END PRIVATE KEY-----\n"
```

**⚠️ IMPORTANT:** 
- Copy the private key EXACTLY as it appears in your `.env.local`
- Keep the `\n` characters (don't replace with actual line breaks)
- Include the quotes around the private key

## 📋 Deployment Checklist:

- [ ] Added all environment variables to hosting platform
- [ ] Verified Google Drive folder is shared with service account
- [ ] Tested email sending in production
- [ ] Confirmed PDF upload to Google Drive works
- [ ] Checked that accepted quotations appear in Drive folder

## 🆘 If Credentials Are Leaked:

If you accidentally commit credentials to GitHub:

1. **Immediately revoke/delete:**
   - Gmail App Password (create a new one)
   - Google Service Account (delete and create new)

2. **Remove from Git history:**
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env.local the-web-yatra-*.json" \
   --prune-empty --tag-name-filter cat -- --all
   
   git push origin --force --all
   ```

3. **Update credentials:**
   - Create new Service Account
   - Generate new App Password
   - Update `.env.local` with new values

## 📚 More Information:

- Gmail App Password: https://support.google.com/accounts/answer/185833
- Google Service Account: https://console.cloud.google.com/iam-admin/serviceaccounts
- Vercel Environment Variables: https://vercel.com/docs/environment-variables

---

**Remember:** Your `.env.local` and JSON key files should NEVER appear in GitHub! ✅
