# xAPI-Proxy

Small script I used to test xAPI/TinCan+LRS setup.

Serves static content and proxy calls to xAPI endpoint.


## Usage

Setup

```sh
npm ci
npm start
```

Replaces parameters and open in browser

```
http://localhost:8000/data/SomeModule/res/index
?endpoint=http://localhost:8000/data/xAPI
&auth=OjFjMGY4NTYxNzUwOGI4YWY0NjFkNzU5MWUxMzE1ZGQ1   
&actor={ "name" : ["Project Tin Can"], "mbox" : ["mailto:tincan@scorm.com"] }   
&registration=760e3480-ba55-4991-94b0-01820dbd23a2   
&activity_id=http://example.scorm.com/tincan/example/simplestatement
```
