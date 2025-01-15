Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 events are shown by default
    Given the user hasn’t specified the number of events
    When the user opens the app
    Then the default number of displayed events should be 32

  Scenario: User can change the number of events displayed
    Given the main page is open
    When the user sets the number of events to 10
    Then only 10 events should be displayed in the event list