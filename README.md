# Jira Automation via Google Apps Script

Used App Script (for Google) to automate ticket creation on Jira from Google Sheets 

## 🚀 Features

- Bulk creation of Jira issues from Google Sheets
- Dynamic fields: Summary, Description, Epic, Due Date, Sprint, Story Points
- Custom date parsing and error handling
- Logs success/failure per row

## 🛠️ Tech Stack

- Google Apps Script (JavaScript)
- Jira Cloud REST API v3

## 📸 Screenshots / Demo

will add soon

## 🔗 Usage

1. Clone this repo.
2. Open Google Sheets > Extensions > Apps Script.
3. Paste the code from `Code.gs`.
4. Update your Jira domain and API token. Ensure to change it to your Project key (ENG) and add custom fields ID appropriately.
5. Set up a sheet named `Ticket Creator` with required columns.
6. Run the `createJiraIssues` function.

---
