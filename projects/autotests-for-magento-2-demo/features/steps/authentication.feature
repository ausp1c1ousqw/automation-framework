Feature: User Authentication
  
  Scenario: Successful Login
    Given I open the main page
    When I click Sign In link
   Then Sign in page is opened
   When I sign in with email "roni_cost3@example.com" and password "roni_cost3@example.com"
   Then I should see welcome message "Welcome, Veronica Costello!"

  Scenario: Login with incorrect password
    Given I open the main page
    When I click Sign In link
    Then Sign in page is opened
    When I sign in with email "" and password ""
   Then I should see sign in error "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."

  

  