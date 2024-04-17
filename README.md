# A Project made for Wathare Infotech Hiring Challenge

## How to clone this project on your local? 

Enter the following commands into your terminal.
create a directory for the project and enter it.
clone the project using the project link.

``` shell
    mkdir iot_hiring_project && cd iot_hiring_project
    git clone https://github.com/Vedx23/wathare-hiring-challenge.git
```
now go into the frontend and backend folders respectively and resolve the dependencies of node packages.
``` shell
    cd frontend\iot-logger
    npm install
    cd ../..
    cd backend
    npm install
```
to run the backend properly use the sample-data.json in the backend folder and import it into your mongodb Atlas instance. Also add your mongo instance link with your password, database name and collection name in backend/index.js

Now you can run both the servers and test.

``` bash
cd backend
node index.js

//in a new terminal start the frontend react server
cd frontend/iot-logger
npm run dev
```

These are few reference images of how the project will look, if not debug the erros as per cmd-line logs.

![Image one](https://raw.githubusercontent.com/Vedx23/wathare-hiring-challenge/main/images/one.png)

![Image two](https://raw.githubusercontent.com/Vedx23/wathare-hiring-challenge/main/images/two.png)
