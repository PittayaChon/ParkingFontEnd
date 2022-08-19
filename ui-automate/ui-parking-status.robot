*** Settings ***
Library           SeleniumLibrary

*** Test Cases ***
Open google chrome
    ${opt}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${opt}    add_argument    --headless
    Call Method    ${opt}    add_argument    --no-sandbox
    Create Webdriver    Chrome    chrome_options=${opt}
    Go To    http://prod.sandbox-me.com/
    Comment    Capture Page Screenshot
    

Check Parking Lot 1
    Sleep   5sec
    ${parkingStatusBefore}=    Get Text    //div[@class='col border border-dark border-bottom-0 top green-c'][1]/div[2]
    Console    \n Parking Lot 1 Status Before : ${parkingStatusBefore}
    Click Element    //div[@class='row'][1]/div[1]/div[3]
    
    Sleep   5sec
    ${parkingStatusAfter}=    Get Text    //div[@class='col border border-dark border-bottom-0 top red-c']/div[2]
    Console   \n Parking Lot 1 Status After : ${parkingStatusAfter}
    Should Be True      ${{'${parkingStatusBefore}' != '${parkingStatusAfter}'}}

Open Reserve Page
    Click Element    //div[@class='d-flex justify-content-center mt-3']/button
    Sleep   5sec
    ${titel} =    Get Text    //div[@class='container']/body/app-mobile/h2
    Should Be True    ${{'${titel}' == 'Reserve'}}
    Input Text    //input[@class='form-control']    1234
    Sleep   5sec
    ${parkingStatusBefore}=    Get Text    //li[@class='list-group-item green-c'][1]/div[@class='col'][2]
    Console    \n Reserve Status Before : ${parkingStatusBefore}
    Click Element    //li[@class='list-group-item green-c'][1]/div[@class='col btn btn-primary']/div
    Sleep   5sec
    ${parkingStatusAfter}=    Get Text    //li[@class='list-group-item orenge-c']/div[@class='col'][3]
    Console   \n Reserve Status After : ${parkingStatusAfter}
    Should Be True      ${{'${parkingStatusBefore}' != '${parkingStatusAfter}'}}


Close google chrome
    Close Browser


*** Keywords ***
Console
    [Arguments]    ${output}
    Log To Console    ${output}