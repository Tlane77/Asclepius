# About Asclepius

![Asclepius Home](./images/Asclepius.png)


Concepts covered in this project include: ASP.NET core API, C#, External API, SQL, React Hooks, Context, SCRUM and Agile Workflows (including wireframes and database diagrams)

## Asclepius Prototype

I'm ready to build a [working prototype](https://en.wikipedia.org/wiki/Prototype) of the Asclepius application. This prototype will help to better understand and refine the  product design. It won't be as feature-rich or as polished as our final product, but it should implement the core features and be as close to our _current vision_ of the product as possible. 

We know we want a user web application with a rich user experience. For the final product, we we'd like to use better external API for pulling in health statistics, but we'd like to develop the prototype as rapidly as possible. As architect I've decided that React and ASP.NET Core API is the perfect balance of features and rapid development.

* **Authors** can create Condition Inquires, manage their own Conditions by adding new condition inquires,editing their own,deleting their own, comment on thier own conditions, then read and comment on other authors' conditions once they are registered and logged in. There is also an area to create new categories for users to choose from in the categories section.






# Getting Started with Asclepius
### Getting Started

1. Pull down this repo

1. Run the two scripts that are in the SQL folder. These will create the Asclepius database and add some test data. You will be capturing the `FirebaseUserId` in the UserProfile table

1. Create your own Firebase project. **Firebase Steps** should do the follow steps in the firebase console:

   - Go to [Firebase](https://console.firebase.google.com/u/0/) and add a new project. You can name it whatever you want (Tabloid is a good name)
   - Go to the Authentication tab, click "Set up sign in method", and enable the Username and Password option.
   - Add at least two new users in firebase. Use email addresses that you find in the UserProfile table of your SQL Server database
   - Once firebase creates a UID for these users, copy the UID from firebase and update the `FirebaseUserId` column for the same users in your SQL Server database.
   - Click the Gear icon in the sidebar to go to Project Settings. You'll need the information on this page for the next few steps

1. Go to the `appSettings.Local.json.example` file. Replace the value for FirebaseProjectId with your own

1. Rename the `appSettings.Local.json.example` file to remove the `.example` extension. This file should now just be called `appSettings.Local.json`

1. Open your `client` directory in VsCode. Open the `.env.local.example` file and replace `__YOUR_API_KEY_HERE__` with your own firebase Web API Key

1. Rename the `.env.local.example` file to remove the `.example` extension. This file should now just be called `.env.local`

1. Install your dependencies by running `npm install` from the same directory as your `package.json` file


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## Specific Installs needed for this project

### `npm --save react-columns`
### `npm --save react-formControl`
### `npm install --save dayjs react-dayjs`
Open (https://day.js.org/docs/en/display/format) to get date format data description.
### `npm install axios`
### `npm install react-number-format
### `npm install apexcharts

### `npm i --save @fortawesome/fontawesome-svg-core`
  ### `npm install --save @fortawesome/free-solid-svg-icons`
  ### `npm install --save @fortawesome/react-fontawesome`
## Nuget Pkgs
Install Microsoft.AspNetCore.Authentication.JwtBearer(3.1.9).
## Microsoft.Data.SqlClient(2.0.1)
## SixLabors.ImageSharp(1.0.1)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
