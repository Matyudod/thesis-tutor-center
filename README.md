# README
## Set up enviroment
Install NodeJS in https://nodejs.org/en/download

Install Python 3.9.7 in https://www.python.org/downloads/windows/

Install Rasa Open Source:

      pip3 install -U pip
      pip3 install rasa

Install packages for project

    npm install

## Deployment
Now, we can start this project with command:

Start Rasa:

    rasa run --enable-api --cors "*"
Start Server:

    npm start

Open Desktop App:

    npm run desktop-app
