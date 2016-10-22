# **Software Requirements Specification**

## for

# **H@x0rz**

**Version 1.0 approved**

**Prepared by Jonathan Nguyen**

**Team 42**

**October 21, 2016**

***

## **Table of Contents**
| **Table of Contents**     |
| :--- |
| **Revision History**      |
| **1. Introduction**     |
| 1.1        Purpose        |
| 1.2        Document Conventions        |
| 1.3        Intended Audience and Reading Suggestions        |
| 1.4        Product Scope        |
| 1.5        References        |
|**2. Overall Description**|
|**3. External Interface Requirements**|
| 3.1        User Interfaces        |
| 3.2        Hardware Interfaces        |
| 3.3        Software Interfaces        |
| 3.4        Communications Interfaces        |
|**4. System Features**|
| 4.1        System Feature 1        |
| 4.2        System Feature 2 (and so on)        |
|**5. Other Nonfunctional Requirements**|
| 5.1        Performance Requirements        |
| 5.2        Security Requirements        |
| 5.3        Software Quality Attributes        |
| 5.4        Business Rules        |
|**6. Other Requirements**|
| **Appendix A: Glossary**       |
| **Appendix B: Analysis Models**      |
| **Appendix C: To Be Determined List**     |

***

## **Revision History**
| **Name** | **Date** | **Reason For Changes** | **Version** |
| :---: | :---: | :---: | :---: |
| Jonathan Nguyen | 10/16/16 | Creation of document; introduction written | 0.1 |
| Will Raziano | 10/20/16 | Addition of ER, use cases, fleshing out S3,4,5 | 0.2 |

***

# **1. Introduction**

## **1.1 Purpose**

The purpose of this document is to describe, in detail, the requirements for Version 0.5 of the “H@x0rz” web application software. This will cover requirements for the entire system, composed of the server-side and the client-side of the application.

## **1.2 Document Conventions**

Every requirement stated in this document shall have its own priority level and will not inherit priorities from any higher-level requirements.

## **1.3 Intended Audience and Reading Suggestions**

This document is intended for reading by the Application’s development team (including, but not limited to, software developers, marketing teams, project managers, and testers) and any businesspersons who would be involved in the distribution or purchase of the Application.

This document contains detailed descriptions of the “H@x0rz” application, its implementation, requirements, and use cases.

It is recommended that all readers begin with Sections \* and \*. Those on the development team should then proceed to read Sections \*, \*, and \*. Others should proceed to read Sections \*, \*, and \*.

## **1.4 Product Scope**

“H@x0rz” is a turn-based multiplayer card game played through a web application. Users must register and sign-in through a user account in order to use the Application. The Application will be offered to users free of charge. The Application will support secure in-app purchases, though such purchases are planned for future versions of the Application and not the initial release. Any purchases made will be linked to the purchasing user’s account.

Research into the current app-gaming market shows that the business model above – a free base application that offers more content through microtransactions – provides a significantly larger profit than other common forms of revenue in app games, such as advertising. It is also more appealing to potential customers than games which must be purchased to play. By using this strategy for earning revenue, “H@x0rz” can reach a larger portion of the market.

The goal of this application is to provide an enjoyable experience to users and, once purchasable content is introduced, to return a profit margin to the development team. Such profits will be used to further develop and maintain the Application.

## **1.5 References**

All current and previous versions of the application and its documentation can be found at [https://github.com/h4x0rz4330/forking-haxorz](https://github.com/h4x0rz4330/forking-haxorz)

# **2. Overall Description**

H@x0rz is a new and self-contained product. It is composed of two major systems: a 
web-based client and a web server. The web application is an interface for users to play the game, interact with other players, and make purchases for in-game items. The web server handles connection between players and processes game commands and logic. (See Appendix B for an entity-relationship diagram describing this system.)

There is only one class of user, which encompasses all users of the Application. The Application allows the user to perform the following actions:
-	Register and login to a user account
-	View tutorials on how to play the game
-	Play the game with a random set of 1-3 other players (this number is chosen by the player)

Future patch versions are planned to have the following actions added:
-	Purchase and use of in-game cosmetic items
-	Viewing of the player’s overall win-loss statistics
-	Viewing of a leaderboard which shows top scoring players

Documents that will be provided for users will include a manual describing the requirements for playing the game and all functions that are available to the user, a tutorial explaining how to play the game, and a quick-reference guide during gameplay. All of these will be provided inside the Application. The manual and tutorial will be available through a “Tutorial” tab from the main menu. The quick-reference guide will be available while a player is in a game.

The client-side of the Application will operate as a web application that is compatible with any commonly used web browser including, but not limited to, Internet Explorer, Mozilla Firefox, Google Chrome, and Safari. The server-side of the Application will operate from a privately-owned server belonging to administrator(s).

Appropriate communication and security protocols will be taken to protect user information and data transfers between clients and the server (See Sections 3.4 and 5.2 for further details on communication protocols and security measures, respectively.)

The Application will support English as its primary language. It is assumed that the device on which the user is running the Application is able to connect to the Internet with a stable connection and that the device is capable of displaying and processing the Application. It is also assumed that the operating systems and web browsers that support the Application will continue to support the application without conflicts.

# **3. External Interface Requirements**
## **3.1 User Interfaces**

The user must have a functioning web browser, as the client and its user interface will run inside of a web browser window. All inputs from the user are expected to be through use of the cursor and will go through this interface. Inputs are then processed by the client (and server, if applicable) before an output is displayed back to the interface for further inputs.

Each screen of the Application will have its own buttons, either for performing that page’s primary functions or for navigating to other screens.

The Application and in-game displays will resize appropriately for standard screen resolutions, with 1920 x 1080 being the optimal resolution. The minimal operating resolution is 768 x 432. The game operates at a 16:9 aspect ratio.

## **3.2 Hardware Interfaces**

The Application requires that a user has access to the Internet and a stable connection, as this will be used to transmit data between the client and server. The user will also need a cursoring-controlling device, such as a mouse or a trackpad, to navigate the menus and functionality of the Application.

The Application will initially be supported for desktop and laptop computers only. Support on smartphones and tablets are planned for future versions of the Application.

## **3.3 Software Interfaces**

The Application will employ a client-server system to help prevent corruption of stored user data and to lessen the processing load on the user’s machine. A database will be used to store each user’s registration information, account ID, and gameplay statistics. The client, upon startup, will request a connection with the server. The server will handle processing of all gameplay and accesses to the database once communication has been established. The Application’s web server and database will be deployed on an Amazon EC2 instance.

## **3.4 Communications Interfaces**

The application client will communicate with the server via HTTP inside of a web browser. The client will need to be logged in to a registered user account in order for the server socket to connect to the client socket. 

# **4. System Features**

_&lt;This template illustrates organizing the functional requirements for the product by system features, the major services provided by the product. You may prefer to organize this section by use case, mode of operation, user class, object class, functional hierarchy, or combinations of these, whatever makes the most logical sense for your product.&gt;_

## **4.1 System Feature: Client / Server Interactions**

| | **Use Case : Login Check**|
| --- | --- |
|Preconditions:|Server has established connection with client. Server and client have private shared keys.|
|Main Success Scenario:|Client sends user’s login information (username and password) encrypted with server’s public key. Server decrypts login information with the server’s private key. If login information matches database, server sends approval of login to client.|
|Alternate Scenarios:|Username does not match any username in database. Server tells client that login has failed and to prompt user to check their login information or create a new account.|
| |Password does not match the associated username’s password in database. Server tells client that login has failed and to prompt user to check their login information or go through a password-recovery process.|
| |Login has failed due to client being unable to connect with server. Client prompts user to check their internet connectivity, then try again by re-entering their login information.|

| | **Use Case: Gameplay**|
| --- | --- |
|Preconditions:|Client has connectivity to server and is logged in to a valid user account.|
|Main Success Scenario:|User chooses to join a game. Client sends a request to the server to join a game with an open player slot. Once one is found, server associates that client with other clients in that game. When all player slots are filled, server initializes a game and sends information to each client. During the course of a game, clients send user inputs to the server, and the server returns results of those inputs to every client for displaying to the user. This occurs until the game reaches an end condition; the server then sends a message to the client to end the game and terminates associations between clients.|
|Alternate Scenarios:|Server must be taken down for maintenance or other emergency and cannot be reached by client. Client halts current actions and displays that server is currently down for maintenance. Connections and status of current game are saved, allowing users to return to the game after server is restored.|
| |Server returns a failed login. Client prompts user to re-enter login information, then client sends the new information to server for another check.|
| |Client cannot send inputs to server. Client retries connection until connection is reestablished, or one minute has passed with no stable connectivity. If the latter, client prompts user to check their internet connectivity and will try to reconnect again for one minute after the user presses a ‘retry’ button.|

| | **Use Case: User Interface**|
| --- | --- |
|Preconditions:|Client information is up-to-date (i.e. client version Application matches the server version).|
|Main Success Scenario:|Client displays loading screen for startup. When done loading, user is prompted for login information. User enters their information, and the login is verified. Client displays main menu and. User selects a desired game to join. Client loads the in-game screen. Client prompts user to choose one of two options each turn, then displays the effects of that choice. Client displays other players’ moves until the user’s next turn. The user continues playing until a winner is determined. Client displays the lobby again.|
|Alternate Scenarios:|Startup files failed to load. User is prompted to check for compatibility issues, such as type of web browser and hardware requirements.|
| |Game cannot process player’s turn due to a problem connecting with the server. User is prompted to check their internet connection, then to resend the action via an on-screen ‘retry’ button.|
| |Game does not proceed due to inactivity from a user. After three days of inactivity, the inactive user is removed from the game, their cards are revealed to the other players, and game resumes as normal.|
| |Application is improperly closed. The user will be required to login again upon relaunching the application. If the user is in a game when the application closed, they are removed from that game.|

**4.1.1	Description and Priority**

This feature encompasses all communication between clients and the server. As this forms the core of the Application’s operations, this is a High priority feature. 

**4.1.2	Stimulus/Response Sequences**

**4.1.3	Functional Requirements**

|**Item**|**FR-1: Account Login**|
|:---|:---|
|**Summary**||
|**Rationale**||
|**Requirements**||
|**References**||
|**Rating**||

|**Item**|**FR-2: Client-Side Communication**|
|:---|:---|
|**Summary**||
|**Rationale**||
|**Requirements**||
|**References**||
|**Rating**||

|**Item**|**FR-3: Server-Side Communication**|
|:---|:---|
|**Summary**||
|**Rationale**||
|**Requirements**||
|**References**||
|**Rating**||

## **4.2	System Feature: Gameplay (High Priority)**

**Entity-Relationship Model of Gameplay Functionality:**

![alt text][logo]

[logo]: https://github.com/h4x0rz4330/forking-haxorz/blob/master/ERDiagramV2.png "ER Diagram"

Gameplay is turn based, with each player (2 - 4 total) getting a single card. Once it is a player’s turn, he or she receives a second card. Players can only take actions during their turn. The actions are clearly explained in the text of the cards. The player must choose a card, which targets either another player or the person playing the card. Play continues for each player until he or she is out of cards, once a player is out of cards, he or she is out of the round. The last player with a remaining card is the winner of the round, unless a specific card effect grants a player the win of the round. The cards are shuffled and dealt out again, beginning a new round. Play continues until one player reaches the predetermined number of round wins for the game.

| **User Action** | **Client Action** | **Server Action** |
| :---: | :---: | :---: |
|1. User logs in|2. Transfer information to server|3. Initialize game|
|5. Await players|4.Setup Board||
|||6. Randomize deck|
||8. Update, show first card to user|7. Send one card to each client (initial deal)|
|9. Await turn (unless user has lost round)|||
|10. User is a spectator (user has lost the round)|||
||11. Deal Card (unless user has lost round)||
|12. Selects a card and target (if applicable)|13. Sends choice(s) to server|14. Calculates output|
|17. User sees card effect|16. Sends output to GUI|15. Returns to client|

\* Parts 9-17 repeat until a winner for the round has been determined, then step 6 begins the new round. 

**4.2.1	Description and Priority**

**4.2.2	Stimulus/Response Sequences**

**4.2.3	Functional Requirements**

REQ-1:

REQ-2:

# **5. Other Nonfunctional Requirements**
## **5.1 Performance Requirements**

Latency time between inputting a command and receiving a response from the server should be kept to a minimum for seamless functionality. 

## **5.2 Security Requirements**

Security will be maintained for users through the use of a hash table in which each user’s statistics will be attached to his or her account, labelled with a unique user-selected username. This account is protected by a password also chosen by the user. When microtransactions are implemented future versions of the Application, a more secure form of authentication will be utilized to protect user accounts and payment information from theft or unauthorized use. A Privacy Policy document will be instated and enforced to ensure that all user information is handled responsibly. A copy of the Privacy Policy can be found here: [Privacy Policy](https://docs.google.com/document/d/114Hyb4u6K6-x0VO9qGfpDYRWuHk8Xjjt0NNuivizjKA/edit?usp=sharing). A Terms and Conditions document will also be instated to ensure that users understand all legalities regarding use of the product, including security measures taken by the development team and security measures that are recommended for the user to take. A copy of the Terms and Conditions can be found here: [Terms and Conditions](https://docs.google.com/document/d/1hnIq2t2LyO3Ul3l_mJzWAKZX3nhvR_NkVIQ69cmcoxo/edit?usp=sharing)

## **5.3 Software Quality Attributes**



## **5.4 Business Rules**

Users shall have no direct access to the server and will only be able to interact with the Application via the client’s user interface. Administrators will have access to all source code for the Application in order to perform maintenance and patching of the system.

The base Application will be free-to-play and offer full functionality. A microtransaction system will be supported in future versions, allowing users to purchase in-app items, such as visual themes for cards. The price of in-app items will be agreed upon and set by administrators. Purchasable items will not affect gameplay mechanics in any way and are purely cosmetic.


# **6. Other Requirements**



#**Appendix A: Glossary**

| **Term** | **Definition** |
| --- | --- |
| Admin / Administrator | A person who has been granted permission to access and edit secured portions of the Application, such as source code and database information. |
| Application | The software in its entirety, including but not limited to the host server and any instances of the application. |
| Client | An instance of the “H@x0rz” user-level software, run from a user’s machine. Communicates with the server to send and receive data. |
| Device | The machine on which the client is run. |
| In-app | Available through the application. |
| Server | The “H@x0rz” back-end software, run on a web server owned by the developers of this application. Communicates with clients to send and receive data. |
| User | Any person who uses the “H@x0rz” application, particularly the client-end. |

#**Appendix B: Analysis Models**



#**Appendix C: To Be Determined List**

