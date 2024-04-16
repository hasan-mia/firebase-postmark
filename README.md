# Firebase Function Postmark

Install firebase tools:

```bash
npm install -g firebase-tools
```

Install dependency:

```bash
cd functions
```

```bash
npm install
```

Run:

```bash
firebase emulators:start
```

```bash
#find base url like
http://localhost:5001/project-id/us-central1/api/v1

#webhook api endpoint url
{base_url}/v1/postmarkhook;
```

Deploy:

```bash
firebase deploy
```

Project Structure:

```bash
__functions
_____index.js ('Project root')
_____controllers ('Controller folder')
_______postmarkController.js ('Here define all postmark related functionality')
_____routes ('All indivisual route in this folder')
________postmarkRoute.js ('Postmark related api endpoint')
_____middleware ('Middleware folder')
_____utils ('All helper functions folder')

```

Create New Firebase Function Project:[Dont Need]

```bash
npm install -g firebase-tools
#then
firebase init functions
#then
firebase init emulators
#then select
(Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ Authentication Emulator
 ◉ Functions Emulator
 ◯ Firestore Emulator
 ◯ Database Emulator
 ◯ Hosting Emulator
 ◯ Pub/Sub Emulator
 ◯ Storage Emulator
#then
firebase emulators:start
```
