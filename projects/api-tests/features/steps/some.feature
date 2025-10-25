Feature: User API

  Scenario: Successful registration and login
    Given I register a new user with email "eve.holt@reqres.in" and password "pistol"
    Then the registration should return a token

    When I login with email "eve.holt@reqres.in" and password "pistol"
    Then the login response should contain a token

    Scenario: View employees on the second page
    When the HR requests the list of employees on page 2
    Then the system should return a list of employees
    And the page should be 2