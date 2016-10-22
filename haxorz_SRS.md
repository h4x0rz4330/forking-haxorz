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

Future versions are planned to have the following actions added:
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

The Application and in-game displays will resize appropriately for standard screen resolutions, with 1920 x 1080 being the optimal resolution.

## **3.2 Hardware Interfaces**

The Application requires that a user has access to the Internet and a stable connection, as this will be used to transmit data between the client and server. The user will also need a cursoring-controlling device, such as a mouse or a trackpad, to navigate the menus and functionality of the Application.

The Application will initially be supported for desktop and laptop computers only. Support on smartphones and tablets are planned for future versions of the Application.

## **3.3 Software Interfaces**

The Application will employ a client-server system to help prevent corruption of stored user data and to lessen the processing load on the user’s machine. A database will be used to store each user’s registration information, account ID, and gameplay statistics. The client, upon startup, will request a connection with the server. The server will handle processing of all gameplay and accesses to the database once communication has been established. The Application’s web server and database will be deployed on an Amazon EC2 instance.

## **3.4 Communications Interfaces**

The application client will communicate with the server via HTTP inside of a web browser. The client will need to be logged in to a registered user account in order for the server socket to connect to the client socket. 

# **4. System Features**

_&lt;This template illustrates organizing the functional requirements for the product by system features, the major services provided by the product. You may prefer to organize this section by use case, mode of operation, user class, object class, functional hierarchy, or combinations of these, whatever makes the most logical sense for your product.&gt;_

## **4.1 System Feature: Client / Server Interaction (High Priority)**

**Use Cases of Client application interaction with Server:**

| | **Use Case** : **Lobby/Game Startup**|
| --- | --- |
|Precondition:|The server has finished start-up routine|
|Main Success Scenario:| Server initializes Lobby to keep track of available games on different threads and continually processes requests from client to join or create games on Lobby.|
|Alternate Scenarios:|Lobby fails to start. Server shuts down immediately and sends alerts to system manager and other relevant administrators.|
| |Lobby fails to create games. After five failed game creations, Lobby is restarted. If there are no successes after 3 Lobby restarts, server shuts down immediately and sends alerts to system manager and other relevant administrators.|

| | **Use Case: Encryption &quot;Hand-Shake&quot; Check**|
| --- | --- |
|Preconditions: | Server has established connection with client. Server and client have private shared keys.|
|Main Success Scenario: | Client sends user&#39;s login information (username and password) encrypted with server&#39;s public key. Server decrypts login information with the server&#39;s private key. If login information matches database, server sends approval of login and lobby information to client. |
|Alternate Scenarios: | Username does not match any username in database. Server tells client that login has failed and to prompt user to check their login information or create a new account.|
| |Password does not match the associated username's password in database. Server tells client that login has failed and to prompt user to check their login information or go through a password-recovery process.|

| | **Use Case: User Interface/User Experience**|
| --- | --- |
|Preconditions:|Client information is up-to-date (i.e. matches server information).|
|Main Success Scenario:|Client displays loading screen for startup. When done loading, user is prompted for login information. User enters their information, and the login is verified. Client displays lobby screen and available games. User selects a desired game to join. Client loads the in-game screen. Client prompts user to choose one of two options each turn, then displays the effects of that choice. Client displays other players&#39; moves until the user&#39;s next turn. The user continues playing until a winner is determined. Client displays the lobby again.|
|Alternate Scenarios:|Startup files failed to load. User is prompted to check that the app is updated to the current version, then to restart or re-download the app.|
| |Lobby does not display any games. User is prompted to check their internet connection, then to refresh the lobby via the on-screen 'lobby refresh' button.|
| |Game cannot process player&#39;s turn due to a problem connecting with the server. User is prompted to check their internet connection, then to resend the action via an on-screen 'retry' button.|
| |Game does not proceed due to inactivity from a user. After three days of inactivity, the inactive user is removed from the game, their cards are revealed to the other players, and game resumes as normal.|
| |Application is improperly closed. The user will be required to login again upon relaunching the application. If the user is in a game when the application closed, they are removed from that game.|

| |**Use Case: Communications Between Client and Server**|
| --- | --- |
|Preconditions:|Client has connectivity to server.|
|Main Success Scenario:|Client takes login information from user and sends it to server. Server verifies login and sends lobby information to client. Client sends user's choice of game to server; server associates that client with other clients in that game. Client performs logical functions for game in response to user inputs, then sends the resulting effects to server. Server sends the information to other connected clients in the game; clients update accordingly. Once winner is determined, associations between clients are ended.|
|Alternate Scenarios:|Server must be taken down for maintenance or other emergency and cannot be reached by client. Client halts current actions and displays that server is currently down for maintenance. Connections to current game is saved, and does not count toward the three-day inactivity grace period for users to play.|
| |Server returns a failed login. Client prompts user to re-enter login information, then client sends the new information to server for another check.|
| |Client cannot load any available games in lobby. Client will automatically retry connecting to server every 60 seconds without input, or whenever the user presses the 'lobby refresh' button. If the server is responding, but there are no available games, client encourages user to create their own lobby.|
| |Client cannot send results of a play to server. Client retries connection until connection is reestablished, or one minute has passed with no stable connectivity. If the latter, client prompts user to check their internet connectivity and will try to reconnect again for one minute after the user presses a 'retry' button.|

| |**Use Case: Login Page**|
| --- | --- |
|Preconditions:|Application has successfully initialized.|
|Main Success Scenario:|Client prompts user for login information. After user has entered the information, client sends it to the server for verification. Upon approval, the lobby screen is displayed.|
|Alternate Scenarios:|Login has failed due to invalid username. The client prompts user to check their login information or to create a new account.|
| |Login has failed due to invalid password. The client prompts user to check their login information or to go through a password-recovery process.|
| |Login has failed due to client being unable to connect with server. Client prompts user to check their internet connectivity, then try again by re-entering their login information.|


## **4.2	System Feature: Gameplay (High Priority)**


_&lt;Don&#39;t really say &quot;System Feature 1.&quot; State the feature name in just a few words.&gt;_

4.1.1        Description and Priority

_&lt;Provide a short description of the feature and indicate whether it is of High, Medium, or Low priority. You could also include specific priority component ratings, such as benefit, penalty, cost, and risk (each rated on a relative scale from a low of 1 to a high of 9).&gt;_

4.1.2        Stimulus/Response Sequences

_&lt;List the sequences of user actions and system responses that stimulate the behavior defined for this feature. These will correspond to the dialog elements associated with use cases.&gt;_

4.1.3        Functional Requirements

_&lt;Itemize the detailed functional requirements associated with this feature. These are the software capabilities that must be present in order for the user to carry out the services provided by the feature, or to execute the use case. Include how the product should respond to anticipated error conditions or invalid inputs. Requirements should be concise, complete, unambiguous, verifiable, and necessary. Use &quot;TBD&quot; as a placeholder to indicate when necessary information is not yet available.&gt;_

_&lt;Each requirement should be uniquely identified with a sequence number or a meaningful tag of some kind.&gt;_

REQ-1:

REQ-2:

# **5. Other Nonfunctional Requirements**
## **5.1 Performance Requirements**

Latency time between inputting a command and receiving a response from the server should be kept to a minimum for seamless functionality. 

## **5.2 Security Requirements**

Security will be maintained for users through the use of a hash table in which each user’s statistics will be attached to his or her account, labelled with a unique user-selected username. This account is protected by a password also chosen by the user. When microtransactions are implemented future versions of the Application, a more secure form of authentication will be utilized to protect user accounts and payment information from theft or unauthorized use. A privacy policy will be instated and enforced to ensure that all user information is handled responsibly.

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

