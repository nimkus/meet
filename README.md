# Meet App

## Objective

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events. This app offers offline functionality, quick access via a home screen shortcut, and visualizes event data for users in an interactive and visually appealing way.

## Features

### 1. Filter Events by City

**User Story:**
As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.

**Scenarios:**

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.
```
Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events.
```

**Scenario 2:** User should see a list of suggestions when they search for a city.
```
Given the main page is open;
When user starts typing in the city textbox;
Then the user should receive a list of cities (suggestions) that match what they’ve typed.
```

**Scenario 3:** User can select a city from the suggested list.
```
Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
When the user selects a city (e.g., “Berlin, Germany”) from the list;
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.
```

---

### 2. Show/Hide Event Details

**User Story:**
As a user, I should be able to show and hide event details so that I can see details of an event if I want to see them and hide them if I don’t want to see them.

**Scenarios:**

**Scenario 1:** An event element is collapsed by default.
```
Given the user is on the main page;
When the list of events is displayed;
Then each event’s details should be hidden by default.
```

**Scenario 2:** User can expand an event to see details.
```
Given an event element is collapsed;
When the user clicks on the “Details” button of an event;
Then the event details should be displayed.
```

**Scenario 3:** User can collapse an event to hide details.
```
Given an event element is expanded;
When the user clicks on the “Details” button of an event;
Then the event details should be hidden.
```

---

### 3. Specify Number of Events

**User Story:**
As a user, I should be able to specify the number of events I am shown by the app so that I can see more or fewer events at once.

**Scenarios:**

**Scenario 1:** When user hasn’t specified a number, 32 events are shown by default.
```
Given the user hasn’t specified the number of events;
When the user opens the app;
Then the default number of displayed events should be 32.
```

**Scenario 2:** User can change the number of events displayed.
```
Given the main page is open;
When the user sets the number of events to 10;
Then only 10 events should be displayed in the event list.
```

---

### 4. Use the App When Offline

**User Story:**
As a user, I should be able to use the app when offline so that I can access my events even if I am not connected to the internet.

**Scenarios:**

**Scenario 1:** Show cached data when there’s no internet connection.
```
Given the user has accessed the app online before;
When the user opens the app without an internet connection;
Then the app should display cached event data.
```

**Scenario 2:** Show error when user changes search settings (city, number of events).
```
Given the user is offline;
When the user tries to search for a city or change the number of displayed events;
Then an error message should be displayed indicating no internet connection.
```

---

### 5. Add an App Shortcut to the Home Screen

**User Story:**
As a user, I should be able to add an app shortcut to my home screen so that I can access my app more quickly.

**Scenario:**

**Scenario 1:** User can install the meet app as a shortcut on their device home screen.
```
Given the user is on the app’s main page;
When the user clicks the “Add to Home Screen” button;
Then the app should be added as a shortcut to their device’s home screen.
```

---

### 6. Display Charts Visualizing Event Details

**User Story:**
As a user, I should be able to display charts to visualize event details of upcoming events in each city so that I know what events are organized in which city.

**Scenario:**

**Scenario 1:** Show a chart with the number of upcoming events in each city.
```
Given the main page is open;
When the user scrolls to the charts section;
Then a chart should be displayed showing the number of upcoming events in each city.
```

---

## Technical Requirements

- The app must be a React application.
- It must use the TDD technique.
- The app must fetch event data using the Google Calendar API and OAuth2 authentication.
- Serverless functions (e.g., AWS Lambda) must be used for the authorization server.
- The app must work offline with the help of a service worker.
- The app must implement data visualization.
- Users must be able to add the app to their home screen.
- The app must pass Lighthouse’s PWA checklist.
- The app must achieve a test coverage rate of >= 90%.

## Deployment

- The app will be deployed on GitHub Pages.
- The code is hosted on GitHub and can be accessed by potential recruiters or users.


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## License

This project is open-source and available under the [MIT License](LICENSE).