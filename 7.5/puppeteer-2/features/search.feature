Feature: Tests for tickets

    Feature Description
    Scenario: Should book available ticket
        Given user enters the page "/client/index.php"
        When user choose date "2"
        When user choose movie time
        When user choose a sit "3", "3"
        When user click on the booking button
        When user click on the button to get booking code
        Then user get the code and text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Should book some available tickets
        Given user enters the page "/client/index.php"
        When user choose date "2"
        When user choose movie time
        When user choose a sit "3", "6"
        When user choose a sit "3", "7"
        When user click on the booking button
        When user click on the button to get booking code 
        Then user get the code and text "Покажите QR-код нашему контроллеру для подтверждения бронирования."

    Scenario: Should try to book unavailable ticket, but unsuccessfully
        Given user enters the page "/client/index.php"
        When user choose date "2"
        When user choose movie time
        When user choose a sit "3", "3"
        When user click on the booking button
        Then button for booking is inactive "true"