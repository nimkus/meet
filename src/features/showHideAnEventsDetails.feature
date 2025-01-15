Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user is on the main page
    When the list of events is displayed
    Then each event’s details should be hidden by default

  Scenario: User can expand an event to see details
    Given an event element is collapsed
    When the user clicks on the “Details” button of an event
    Then the event details should be displayed

  Scenario: User can collapse an event to hide details
    Given an event element is expanded
    When the user clicks on the “Details” button of an event
    Then the event details should be hidden