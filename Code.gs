function createJiraIssue() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");  // Do change the sheet name if needed - Hammad
    var lastRow = sheet.getLastRow(); 
    var data = sheet.getRange(lastRow, 2, 1, 7).getValues(); // Fetch 7 columns

    var summary = data[0][0];        // Column A - Summary
    var description = data[0][1];    // Column B - Description
    var priority = data[0][2];       // Column C - Priority
    var storyPoints = data[0][3];    // Column D - Story Points
    var sprint = data[0][4];         // Column E - Sprint
    var assignee = data[0][5];       // Column F - Assignee
    var issueType = data[0][6];      // Column G - Issue Type
    // console.log(summary)
    // console.log(description)
    // console.log(priority)
    // console.log(storyPoints)
    // console.log(sprint)
    // console.log(assignee)
    // console.log(issueType)
    
var jiraDomain = "https://company.atlassian.net";
    var jiraProjectKey = "ENG";  

    var url = "https://company.atlassian.net/rest/api/3/issue";

    var headers = {
        "Authorization": "Basic " + Utilities.base64Encode("email@domain.com:<api-token>"),
        "Content-Type": "application/json"
    };

    // Jira requires Description in Atlassian Doc format
    var formattedDescription = {
        "type": "doc",
        "version": 1,
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": description
                    }
                ]
            }
        ]
    };

    var payload = JSON.stringify({
        "fields": {
            "project": { "key": jiraProjectKey },
            "summary": summary,
            "description": formattedDescription,
            "issuetype": { "name": issueType }, 
            "priority": { "name": priority.toString() }, // Priority must be a string
            "customfield_10028": storyPoints, // Replace XXXX with Story Points custom field ID
            "customfield_10020": sprint, // Replace YYYY with Sprint custom field ID
            "assignee": { "accountId": getAssigneeAccountId(assignee) } // Convert Assignee name to Jira ID
        }
    });

    var options = {
        "method": "post",
        "headers": headers,
        "payload": payload
    };

    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
}

function getAssigneeAccountId(assigneeName) {
    var url = "https://company.atlassian.net/rest/api/3/user/search?query=" + encodeURIComponent(assigneeName);
    
    var headers = {
        "Authorization": "Basic " + Utilities.base64Encode("email@domain.com:<api-token>"),
        "Content-Type": "application/json"
    };

    var options = {
        "method": "get",
        "headers": headers
    };

    var response = UrlFetchApp.fetch(url, options);
    var users = JSON.parse(response.getContentText());

    if (users.length > 0) {
        return users[0].accountId; // Return the first match
    } else {
        throw new Error("User not found: " + assigneeName);
    }
}
