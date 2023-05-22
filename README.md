

## BloodDonationApp
Welcome to the BloodDonationApp repository! 

## Table of Contents

- [Description](#description)
- [Libraries Used](#libraries-used)
- [Functions](#functions)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Appreciation](#appreciation)

## Description
BloodDonationApp is designed to connect blood donors with those in need, making the process of donating blood easier, more convenient, and ultimately, lifesaving.
This repository serves as the central hub for the development and maintenance of the BloodDonationApp application.

## Libraries Used 

The following highlighted libraries were instrumental in the development of this application:

- [Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator/): Provides a way for the app to transition between screens
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started): Provides developers with a set of tools and conventions to simplify the management of state in a JavaScript application using Redux
- [Firebase](https://firebase.google.com/docs?gad=1&gclid=CjwKCAjwvJyjBhApEiwAWz2nLQ3LoDviNnoVQv3abZiZqloyvPn_oIxAfviHPd5tX2m1IohJzcJhiBoChmAQAvD_BwE&gclsrc=aw.ds): Provides a suite of tools and services that enable developers to build and deploy applications more easily. 
- [React native maps](https://github.com/react-native-maps/react-native-maps): For integrating maps into App - used to display donnors map location.
- [React native Toast](https://www.npmjs.com/package/react-native-root-toast): used to display a toast message that shows up at the top of your screen for a brief period of time.
- [React native Contacts](https://www.npmjs.com/package/react-native-root-toast): is a set of tools that allows developers to interact with the device's contacts or address book within a React Native application - used to read the contacts stored on the user's device and display them.

## Functions

1. User Registration: Allows users to create an account by providing their email address, username, and password. Validates the input data and stores the user information securely in the database.
2. User Login: Provides a login form where registered users can enter their credentials (email and password) to access their accounts. Verifies the entered information and grants access upon successful authentication.
3. Create Blood Donation Request: Enables users to create a donation request by entering their name, location, phone and attaching a note. saves the input in the database, associating it with the authenticated user.
4. Find Blood Donnor: Displays a list of available donnors and relevant information whom users can request blood from.
5. In App Chat: Provides  an in chat where the user can request assistant.
6. Invite contact: Users are able to select whom they want to invite to the app from their contact list.
7. User Profile: Displays the profile information of the currently logged-in user, including their username, profile picture, blood type and other relevant details. Users can upload their profile picture.

Please refer to the documentation or inline comments in the source code for more detailed information about each function.

## Installation
To run the Blood donation application locally, follow these steps:

Clone this repository: git clone (https://github.com/Chinemereem/BloodDonateApp)
Navigate to the project directory: cd bloodDonationApp
Install the required dependencies: npm install


If you're new to react native, head over to react native docs to [set up](https://reactnative.dev/docs/environment-setup) your dev environment.
![Content Screenshot](/image.png)

## Usage

```bash
# Run the application
npm start react-native run-android or npm start react-native run-ios 
```

## Contributing
Contributions are welcome! If you wish to contribute to the BloodDonationApp, please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name
Make your changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name
Submit a pull request.
Please ensure your code adheres to the established coding standards and includes appropriate documentation

## Appreciation

Thank you for taking the time to read the README for the BloodDonationApp! I appreciate your interest in the BloodDonate application. If you have any feedback, suggestions, or questions, please don't hesitate to reach out. Your input is valuable to me and helps me improve the app.



