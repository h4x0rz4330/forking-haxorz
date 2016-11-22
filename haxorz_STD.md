# Software Testing Document

## for

# H@x0rz

**November 21, 2016**

**Prepared by Team 42:**

Madeline May

Ryan Ngo

Jonathan Nguyen

Hardika Patel

William Raziano

Chris Schayer













|**Table of Contents**|
| ----- |
|**Login**|
|1.0 Login|
|1.1 Incorrect Username|
|1.2 Incorrect Password|
|1.3 Password Recovery|
|**Registration**|
|2.0 Register|
|**Begin Game**|
|3.0 Begin 2-Player Game|
|3.1 Begin 3-Player Game|
|3.2 Begin 4-Player Game|
|**Play Game**|
|4.0 Game Play|
|4.1 "Hack!" Card|
|4.2 "R.A.T." Card|
|4.3 "Cybersecurity Officer" Card|
|4.4 "Firewall" Card|
|4.5 "Hard Reset" Card|
|4.6 "Hijack" Card|
|4.7 "Trojan Horse" Card - Effect|
|4.8 "Trojan Horse" Card - No Effect|
|4.9 "Bitcoin Billions" Card|



##**Test Case #: 1.0**                                  

**Test Case Name:** Login

**System:** H@x0rZ!                              

**Subsystem:** Login 

**Designed by:** Team 42                      

**Design Date:** November 19, 2016 

**Executed by:** Jonathan Nguyen   

**Execution Date:** November 21, 2016 

**Short Description:** Test the login with correct username and password 

| Pre-conditions: The player opens the game. The player has already registered and has a valid username and password.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | In the username box, type 'h4x0rz4330@gmail.com' (remove quotes) | Entered text is shown in box. | Pass | Example username; different for other accounts. Performs as expected. |
| 2 | In the password box, type 'Howuknowdis?' (remove quotes) | Entered text is shown in box as dots (for security). | Pass | Example password; different for other accounts. Performs as expected. |
| 3 | Click the "Login" button | The system opens the main menu page in a new browser tab. Browser will be user's default web browser. | Pass | Success. |

| Post-conditions: The player is brought to the main menu, where gameplay options will be available.   |
| --- |





##**Test Case #: 1.1**                                  

**Test Case Name:** Incorrect Username 

**System:** H@x0rZ! 

**Subsystem:** Login 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Ryan Ngo 

**Execution Date:** November 21, 2016 

**Short Description:** Test the login with an incorrect username 

| Pre-conditions: The player opens the game.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | In the username box, type 'csc4330' (remove quotes) | Entered text is shown in box. | Pass | Performs as expected. |
| 2 | In the password box, type 'Howuknowdis?' (remove quotes) | Entered text is shown in box as dots (for security). | Pass | Performs as expected. |
| 3 | Click the "Login" button | The system displays the message: “Incorrect Username or Password. If you forgot your password, go to the following link to reset it.” and displays a username/password recovery link. | Fail | No username/password recovery link yet |

| Post-conditions: The player can then reenter a username and password or choose to go through the username/password recovery steps.   |
| --- |





##**Test Case #: 1.2** 

**Test Case Name:** Incorrect Password 

**System:** H@x0rZ! 

**Subsystem:** Login 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Jonathan Nguyen                                       

**Execution Date:** November 21, 2016

**Short Description:**  Test the login with a wrong password and use password recovery 

| Pre-conditions: The player opens the game. The player has already registered and has a valid username and password.  |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | In the username box, type 'h4x0rz4330@gmail.com' (remove quotes) | Entered text is shown in box. | Pass | Performs as expected. |
| 2 | In the password box, type 'Password1' (remove quotes) | Entered text is shown in box as dots (for security). | Pass | Performs as expected. |
| 3 | Click the 'Login' button | The system displays the message: “Incorrect Username or Password. If you forgot your password, go to the following link to reset it.” and displays a username/password recovery link. | Fail | No username/password recovery link yet |

| Post-conditions: The player can then reenter a username and password or choose to go through the username/password recovery steps. |
| --- |


##**Test Case #: 1.3** 

**Test Case Name:** Password Recovery

**System:** H@x0rZ! 

**Subsystem:** Login 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Jonathan Nguyen                                       

**Execution Date:** November 21, 2016

**Short Description:**  Test the password recovery function

| Pre-conditions: The player opens the game. The player has already registered and has a valid username and password, but wishes to change password.  |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Press “Recover Password” button | Opens password recovery page. | Fail | Link to page not yet implemented |
| 2 | In the email box, type ‘h4x0rz4330@gmail.com’ (remove quotes) | Entered text is shown in box | Pass | Performs as expected. |
| 3 | Click on “recover username/password” button | The system displays a recover username/password page | Fail | No username/password recovery link yet |
| 4 | Click “Send email” button | The system displays an “Email sent” message | Fail | Not yet implemented. |
| 5 | Login to email ‘h4x0rz4330@gmail.com’ on Gmail website with password ‘\*\*\*\*\*\*\*’ and follow directions in the email to reset password.  | Follow-up email will be sent to ‘h4x0rz4330@gmail.com’, confirming password change | Fail  |  Not yet implemented. |

| Post-conditions: The recovery email sent to the player will contain the player's username and an option to reset password. |
| --- |


##**Test Case #: 2.0** 

**Test Case Name:** Register 

**System:** H@x0rZ! 

**Subsystem:** Register 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Ryan Ngo

**Execution Date:** November 21, 2016

**Short Description:**  Test the registration process for an account 

| Pre-conditions: The player opens the game.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click "New Account" button. | The system displays the registration page. | Pass | Successful. |
| 2 | Fill out the form with an email address, username, and password. | Entered text is shown in boxes. ‘Password’ and ‘Confirm password’ fields should display dots corresponding to the entered text (for security). | Pass | Performs as expected. |
| 3 | Click "Register" button. | TThe system displays a ‘Registration successful!’ message and opens the main menu page in a new browser page. | Pass | Performs as expected. |

| Post-conditions: The player is brought to the main menu, where game play options will be available.   |
| --- |





##**Test Case #: 3.0** 

**Test Case Name:** Begin 2-Player Game 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Jonathan Nguyen                                       

**Execution Date:** November 21, 2016

**Short Description:**  Test starting a new game with 2 players

| Pre-conditions: The player successfully logs into the game.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the ‘2-Player Game’ button | The system displays the game table screen with 2 players: the current player and 1 opposing player | Fail | Link to board not yet implemented |

| Post-conditions: The game begins once all of the players have joined.   |
| --- |



##**Test Case #: 3.1** 

**Test Case Name:** Begin 3-Player Game 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Jonathan Nguyen                                       

**Execution Date:** November 21, 2016

**Short Description:**  Test starting a new game with 3 players

| Pre-conditions: The player successfully logs into the game.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the ‘3-Player Game’ button | The system displays the game table screen with 3 players: the current player and 2 opposing player | Fail | Link to board not yet implemented |

| Post-conditions: The game begins once all of the players have joined.   |
| --- |





##**Test Case #: 3.2** 

**Test Case Name:** Begin 4-Player Game 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Jonathan Nguyen                                       

**Execution Date:** November 21, 2016

**Short Description:**  Test starting a new game with 4 players

| Pre-conditions: The player successfully logs into the game.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the ‘4-Player Game’ button | The system displays the game table screen with 4 players: the current player and 3 opposing player | Fail | Link to board not yet implemented |

| Post-conditions: The game begins once all of the players have joined.   |
| --- |





##**Test Case #: 4.0** 

**Test Case Name:** Game Play 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test game play 

| Pre-conditions: The player successfully logs into the game. The player chooses a number of players. The game begins. It is the player's turn.  |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Deck will automatically give a card to player | The system displays the player’s current card (hand) | Pass | Performs as expected |
| 2 | Hover cursor over a card | The card will enlarge so that the player can read its functionality | Pass | Performed as expected |
| 3 | Click on a card to play it | The system will allow player to choose another player as a target, if applicable | Pass | Performed as expected |
| 4 | Click on a player to apply card effect. | System will use player's choice to determine outcome of card played | Fail | Not yet implemented |

| Post-conditions: Depending on the card the player has chosen to play, different actions will occur. \*See following test cases for specifics on each card type.  |
| --- |





##**Test Case #: 4.1** 

**Test Case Name:** "Hack!" Card

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test the "Hack!" Card functionality 

| Pre-conditions: The player chooses to play a "Hack!" card.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Hack!" card to play it | The system displays an interface with the option of players to choose as the target of the card effect. | Pass | Performs as expected |
| 2 | Click on the name of a player | The modal displays the options of cards to guess from.  | Pass | Performs as expected |
| 3 | Click on one of the cards, except another hack card | If the selected player has the card chosen, the system flips the guessed card to reveal a correct guess and the owner of that card loses (no longer plays in the current game). Otherwise, the system displays a message saying “Hack failed”. | Fail | Not yet implemented |

| Post-conditions: "Hack!" card is moved, face-up, to current player's discard pile. Game play continues with the next player.   |
| --- |





##**Test Case #: 4.2** 

**Test Case Name:** "R.A.T." Card 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

** Short Description:** Test the "R.A.T." Card functionality 

| Pre-conditions: The player chooses to play a &quot;R.A.T.&quot; card.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "R.A.T." card to play it | TThe system displays an interface with the option of players to choose as the target of the card effect. | Pass | Performs as expected |
| 2 | Click on the name of a player | The modal displays the card in the chosen player’s hand to the person playing the “R.A.T.” card. | Fail | Not yet implemented |

| Post-conditions: "R.A.T." card is moved, face-up, to current player's discard pile. Game play continues with the next player.   |
| --- |





##**Test Case #: 4.3** 

**Test Case Name:** "Cybersecurity Officer" Card 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

** Short Description:** Test the "Cybersecurity Officer" Card functionality 

| **Pre-conditions:** The player chooses to play a "Cybersecurity Officer" card.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Cybersecurity Officer" card to play it | The system displays an interface with the option of players to choose as the target of the card effect. | Pass | Performs as expected |
| 2 | Click on the name of a player | The modal displays the card in the current player’s and the chosen player’s hands. The owner of the card with the lower value loses. | Fail | Not yet implemented |


| Post-conditions: "Cybersecurity Officer" card is moved, face-up, to current player's discard pile. Game play continues with the next player.   |
| --- |





##**Test Case #: 4.4** 

**Test Case Name:** "Firewall" Card 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

** Short Description:** Test the "Firewall" Card functionality 

| Pre-conditions: The player chooses to play a "Firewall" card.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Firewall" card to play it |  A label will appear next to the user stating “Protected” to signify that the user is under the card’s effect. This label will disappear at the start of the user’s next turn. | Pass | Performs as expected |

| Post-conditions: "Firewall" card is moved, face-up, to current player's discard pile. This player cannot be chosen as the target for card effects from other players until their next turn has begun. Game play continues with the next player.   |
| --- |





##**Test Case #: 4.5** 

**Test Case Name:** "Hard Reset" Card 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test the "Hard Reset" Card functionality 

| **Pre-conditions:** The player chooses to play a "Hard Reset" card.   |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Hard Reset" card to play it | The system displays an interface with the option of players to choose from to play this card on. | Pass | Performs as expected |
| 2 | Click on the name of a player | Target player will discard the card in their hand and a new card will be dealt to the player. | Pass | Performs as expected |

| Post-conditions: The player chosen has to discard their card and draw a new one. If opposing player discards “Bitcoin Billions” card, they lose the round. “Hard Reset” card is moved, face-up, to current player’s discard pile. Game play continues with the next player. |
| --- |





##**Test Case #: 4.6** 

**Test Case Name:** "Hijack" Card 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test the "Hijack" Card functionality

| Pre-conditions: The player chooses to play a "Hijack" card.    |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Hijack" card to play it | The system displays a modal with the option of players to choose from to play this card on. | Pass | Performs as expected |
| 2 | Click on the name of a player | The system replaces the card in the current player’s hand with the card in the chosen player’s hand, and vice versa. | Pass | Performs as expected |

| Post-conditions: "Hijack" card is moved, face-up, to current player's discard pile. Game play continues with the next player.   |
| --- |





##**Test Case #: 4.7** 

**Test Case Name:** "Trojan Horse" Card - Effect 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test the "Trojan Horse" Card functionality 

| Pre-conditions: After drawing a card at the start of their turn, the current player has a “Trojan Horse” card and either a “Hard Reset” or “Hijack” card. Player will be unable to choose the “Hard Reset” / “Hijack” card, thus forcing them to play the “Trojan Horse” card.  |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Trojan Horse" card to play it | “Hard Reset” / “Hijack” card are re-enabled for play selection for future turns. | Pass | Performs as expected |


| Post-conditions: "Trojan Horse" card is moved, face-up, to current player's discard pile. Game play continues with the next player.   |
| --- |





##**Test Case #: 4.8** 

**Test Case Name:** "Trojan Horse" Card - No Effect 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test the "Trojan Horse" Card functionality |
| --- |

| Pre-conditions: After drawing a card at the start of their turn, the current player has a “Trojan Horse” card,  and neither a “Hard Reset”, nor “Hijack” card. The player chooses to play the “Trojan Horse” card.  |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Trojan Horse" card to play it | No response should occur. | Pass | Performs as expected |


| Post-conditions: "Trojan Horse" card is moved, face-up, to current player's discard pile. Game play continues with the next player.  |
| --- |

| **Test Case #: 4.9** 

**Test Case Name:** "Bitcoin Billions" Card 

**System:** H@x0rZ! 

**Subsystem:** Game 

**Designed by:** Team 42 

**Design Date:** November 19, 2016 

**Executed by:** Chris Schayer

**Execution Date:** November 20, 2016

**Short Description:** Test the "Bitcoin Billions" Card functionality |

| --- |

| Pre-conditions: The player chooses to play a "Bitcoin Billions" card.    |
| --- |

| **Step** | **Action** | **Expected System Response** | **Pass/Fail** | **Comment** |
| --- | --- | --- | --- | --- |
| 1 | Click on the "Bitcoin Billions" card to play it | The system displays a message that the player has lost the round. | Fail | Message not yet implemented |

| Post-conditions: "Bitcoin Billions" card is moved, face-up, to current player's discard pile. Game play continues with the next player. |
| --- |





