# Serv

## What is it?
Serv is an issue tracker where a user can submit a ticket and assign it to someone. Others can view tickets, address them, then close a ticket when completed.

### Stack
Serv is made with the following:
> ##### Back End:
> * Express
> * Mongoose
> ##### Front End:
> * jQuery
> * Bootstrap

### User Stories
<ol>
  <li>Prevent cross site scripting(XSS attack).</li>
  <li>I can <b>POST</b> <code>/api/issues/{projectname}</code> with form data containing required <em>issue_title</em>, <em>issue_text</em>, <em>created_by</em>, and optional <em>assigned_to</em> and <em>status_text</em>.</li>
  <li>The object saved (and returned) will include all of those fields (blank for optional no input) and also include <em>created_on</em>(date/time), <em>updated_on</em>(date/time), <em>open</em>(boolean, true for open, false for closed), and <em>_id</em>.</li>
  <li>I can <b>PUT</b> <code>/api/issues/{projectname}</code> with a <em>_id</em> and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update <em>updated_on</em>. If no fields are sent return 'no updated field sent'.</li>
  <li>I can <b>DELETE</b> <code>/api/issues/{projectname}</code> with a <em>_id</em> to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.</li>
  <li>I can <b>GET</b> <code>/api/issues/{projectname}</code> for an array of all issues on that specific project with all the information for each issue as was returned when posted.</li>
  <li>I can filter my get request by also passing along any field and value in the query(ie. <code>/api/issues/{project}?open=false</code>). I can pass along as many fields/values as I want.</li>
  <li>All 11 functional tests are complete and passing.</li>
</ol>
<h3>Example get usage:</h3>
<code>/api/issues/{project}</code><br>
<code>/api/issues/{project}?open=true&amp;assigned_to=Joe</code><br>
<h3>Example return:</h3>
<code>[{"_id":"5871dda29faedc3491ff93bb", "issue_title":"Fix error in posting data", "issue_text":"When we post data it has an error.", "created_on":"2017-01-08T06:35:14.240Z", "updated_on":"2017-01-08T06:35:14.240Z", "created_by":"Joe", "assigned_to":"Joe", "open":true, "status_text":"In QA"},...]</code>


## How to use locally
Make sure to have node and npm installed on your computer.

Clone the repo.

> <code>git clone https://github.com/Waymans/Issue-Tracker folder-name</code>

Change into the folder directory.

> <code>cd folder-name</code>

Install the dependencies.

> <code>npm install</code>

Once installed, start the server.

> <code>node server</code>

Open browser at:

> <code>localhost:3000</code>

(Optional) - To run tests:

> <code>npm run tests</code>

## Authors
Waylan Hedine