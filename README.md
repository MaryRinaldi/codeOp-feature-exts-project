# KØdo (Niamh Doyle MVP)

## What

Fullstack MVP project using React, React Router, Tailwind CSS, Daisy UI and Material Icons in the frontend and Express and MySQL in backend.

## Presentation deck

[Link to deck](https://drive.google.com/file/d/1qy2mz3wCinoqPoAeg17vlnhMZVn-DJ1Z/view?usp=sharing)

![Slidedeck coverpage](./imgs/slidedeck-coverpage.png)

## Concept

KØdo (from Estonian kodu 'home' + English 'do') is pitched as a homelife management solution for busy parents, to facilitate caring for their children via the sharing of important information on the children in the family between guardians, be they primary guardians, extended family guardians (such as grandparents), or temporary guardians (e.g. neighbours, friends).

The idea is for it to be a convenient tool to allow for scheduling of family life and storing of key data points, such as contact information of the children's schools and doctors, child dietary requirements and likes, upcoming appointments and events etc.

## Running database on your pc

1. Create your .env file

2. Create database on mysql; suggest using name "kodo"

## Running

Installation instructions are at the very end of this readme. Start the app and then install.

1. In the terminal run the below. Don't kill it; let it run.

```
npm start
```

2. In a fresh, second terminal run the below. Don't kill it; let it run.

```
cd client
npm run dev
```

3. In a third terminal run:

```
mysql -u root -p
<enter your mysql password>
USE kodo;
```

Or if you already have set up mysql so you skip entering password:

```
mysql
USE kodo;
```

4. In a fourth terminal run the below, inside the Cd Client. Don't kill it; let it run. This listen for CSS changes in input.css and rebuilds output.css;

```
 npx tailwindcss -i src/index.css -o src/output.css --watch
```

Fin! You are done! Now get back to developing!

## Functionality

### Present functionality

- Sign up as a new user
- Create a family as an admin user
- Edit profile details
- Add children and invite other users guardians to your family
- Send, cancel and accept / decline invites
- Remove guardians
- View family's doctors and teachers (data comes only from backend starter data)

### Not presently-possible functionality (but possible to do)

- Provide other guardians access to only specific views
- Edit child details
- Add information on your child's school, teacher, doctor, diet, etc.
- Scheduling
- Sending reminders by SMS/email/WhatsApp

## Pages

### Homepage & login

Homepage as seen by logged-out visitors

![Homepage for logged out vistors](./imgs/pages/homepage.png)

Homepage as seen by logged-in users

![Homepage for logged in users](./imgs/pages/homepage-loggedin.png);

Login screen

![Login screen](./imgs/pages/login.png);

Sign up

![Sign up screen](./imgs/pages/signup.png);

### Inner App

The inner app, which a user gets access to upon successful sign in. Allows user to navigate to a number of views. Only the profile, admin, and family views have been built out so far.

![Inner app nav](./imgs/views/inner-app-nav.png)

#### Profile

![Profile view](./imgs/views/profile.png)

#### Admin view

![Admin view](./imgs/views/admin-view.png)

#### Family view

![Family view](./imgs/views/family-view.png)

#### Schooling view

![Schooling view](./imgs/views/school-view.png)

#### Health view

![Health view](./imgs/views/health-view.png)

## Features

### Invites

Invite banner notification as seen from the invitor's side

![Invite from invitor side](./imgs/views/family-view-invitor.png)

Invite banner notification as seen from the invitee's side

![Invite from invitee side](./imgs/views/family-view-invitee.png)

## Backend

### ERD

![ERD](./resources/erd-2024-03-07.png)

### Endpoints

7 endpoints – /users, /families, families/members, /children, /invitations, /health, /education

#### /users

GET – Returns one user object, OR an array containing all users
POST – Creates a new user and returns the new user (object)
PUT – Updates user details and returns an array with one user (object)

#### /users/signup

GET – Returns one user (object)

#### /users/login

GET – Returns one user (object)

#### /families

GET – Returns an empty array or an array containing one family (object)

POST – Creates a new family and returns the new family (object)

#### /families/members

POST – Creates a new family members table and inserts a new row with the admin user into this table and returns a string, OR inserts a new guardian into the table and returns an integer.

GET – Performs a join and returns an array of guardians

DELETE - Deletes a guardian and returns a string

#### /children

POST – Creates a new child and returns an array containing one child; inserts child into the family members table and returns an array of children

GET – Returns an array of children

#### /education

GET – Performs a join and returns an array containing teachers

#### /health

GET – Performs a join and returns an array containing doctors

#### /invitations

GET – returns array of invitations

POST – creates a new invitation and returns a string

DELETE – deletes an invitation and returns an array of invitations

## Conceptualising

![User flow](./imgs/design/userflow.jpg)

![Wireframes](./imgs/design/wireframes.jpg)

## Installation

## Setting up repository on machine

### Fork project to your GitHub account

1. Follow the guide [**here**](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository)

### Cloning project to your machine

2. Follow the guide [**here**](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#cloning-your-forked-repository)

## Setting up project (just the first time)

### Open project in VSCode

1. Once the project is on your machine, drag the folder and drop it in VSCode to open it or run the [shortcut](https://www.freecodecamp.org/news/how-to-open-visual-studio-code-from-your-terminal/):

```
cd <path to project directory>
code .
```

### Add DOT env with your DB password

2. Create a .env file at the top level of your project with the following (all other details are already in the model/database.js file)

```
DB_PASS=<your password>
```

### Create DB

3. Open up the terminal in VSCode and run

```
mysql -u root -p
<enter your mysql password>
CREATE DATABASE kodo;
```

Or if you already have set up mysql so you skip entering password:

```
mysql
CREATE DATABASE kodo;
```

You can kill terminal.

## Installation steps (just the first time)

### Install backend packages and set up db tables and populate with initial data

1. In the terminal run:

```
npm i
npm run migrate
```

### Install frontend packages

2. In the same terminal run:

```
cd client
npm i
```

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
