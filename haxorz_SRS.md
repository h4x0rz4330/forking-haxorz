# **Software Requirements Specification**

## for

# **H@x0rz**

**Version 1.0 approved**

**Prepared by &lt;author&gt;**

**&lt;organization&gt;**

**&lt;date created&gt;**

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
| 2.1        Product Perspective        |
| 2.2        Product Functions        |
| 2.3        User Classes and Characteristics        |
| 2.4        Operating Environment        |
| 2.5        Design and Implementation Constraints        |
| 2.6        User Documentation        |
| 2.7        Assumptions and Dependencies        |
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
| 5.2        Safety Requirements        |
| 5.3        Security Requirements        |
| 5.4        Software Quality Attributes        |
| 5.5        Business Rules        |
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

The purpose of this document is to describe, in detail, the requirements for Version 0.5 of the &quot;H@x0rz&quot; web application software. This will cover requirements for the entire system, composed of the server-side and the client-side of the application.

## **1.2 Document Conventions**

Every requirement stated in this document shall have its own priority level and will not inherit priorities from any higher-level requirements.

 _&lt;Describe any standards or typographical conventions that were followed when writing this SRS, such as fonts or highlighting that have special significance.&gt;_

## **1.3 Intended Audience and Reading Suggestions**

This document is intended for reading by the Application&#39;s development team (including, but not limited to, software developers, marketing teams, project managers, and testers) and any businesspersons who would be involved in the distribution or purchase of the Application.

This document contains detailed descriptions of the &quot;H@x0rz&quot; application, its implementation, requirements, and use cases.

It is recommended that all readers begin with Sections \* and \*. Those on the development team should then proceed to read Sections \*, \*, and \*. Others should proceed to read Sections \*, \*, and \*.

 _&lt;Describe what the rest of this SRS contains and how it is organized. Suggest a sequence for reading the document, beginning with the overview sections and proceeding through the sections that are most pertinent to each reader type.&gt;_

## **1.4 Product Scope**

&quot;H@x0rz&quot; is a turn-based multiplayer card game played through a web application. Users must register and sign-in through a user account in order to use the Application. The Application will be offered to users free of charge. The Application will support secure in-app purchases, though such purchases are planned for future versions of the Application and not the initial release. Any purchases made will be linked to the purchasing user&#39;s account.

Research into the current app-gaming market shows that the business model above – a free base application that offers more content through microtransactions – provides a significantly larger profit than other common forms of revenue in app games, such as advertising. It is also more appealing to potential customers than games which must be purchased to play. By using this strategy for earning revenue, &quot;H@x0rz&quot; can reach a larger portion of the market.

The goal of this application is to provide an enjoyable experience to users and, once purchasable content is introduced, to return a profit margin to the development team. Such profits will be used to further develop and maintain the Application.

## **1.5 References**

All current and previous versions of the application and its documentation can be found at [https://github.com/h4x0rz4330/forking-haxorz](https://github.com/h4x0rz4330/forking-haxorz)

# **2. Overall Description**

H@x0rz is a new and self-contained product. It is composed of two major systems: a web-based client and a web server. The web application is an interface for users to play the game, interact with other players, and make purchases for in-game items. The web server handles connection between players and processes game commands and logic.See Appendix B for an entity-relationship diagram describing this system.

_&lt;Summarize the major functions the product must perform or must let the user perform. Details will be provided in Section 3, so only a high level summary (such as a bullet list) is needed here. Organize the functions to make them understandable to any reader of the SRS. A picture of the major groups of related requirements and how they relate, such as a top level data flow diagram or object class diagram, is often effective.&gt;_

_&lt;Identify the various user classes that you anticipate will use this product. User classes may be differentiated based on frequency of use, subset of product functions used, technical expertise, security or privilege levels, educational level, or experience. Describe the pertinent characteristics of each user class. Certain requirements may pertain only to certain user classes. Distinguish the most important user classes for this product from those who are less important to satisfy.&gt;_

The client-side of the Application will operate as a web application that is compatible with any commonly used web browser including, but not limited to, Internet Explorer, Mozilla Firefox, Google Chrome, and Safari.

The server-side of the Application will operate from a privately-owned server.

Design constraints will be minimal; the application is designed to function through a web browser. Therefore, any computer or laptop capable of displaying a webpage, and equipped with a browser will be capable of displaying the implemented application. It should be noted that internet connectivity will be a necessity for the end-users or admins to access the game.

_&lt;Describe any items or issues that will limit the options available to the developers. These might include: corporate or regulatory policies; hardware limitations (timing requirements, memory requirements); interfaces to other applications; specific technologies, tools, and databases to be used; parallel operations; language requirements; communications protocols; security considerations; design conventions or programming standards (for example, if the customer&#39;s organization will be responsible for maintaining the delivered software).&gt;_

Documents that will be provided for users will include a manual describing the requirements for playing the game and all functions that are available to the user, a tutorial explaining how to play the game, and a quick-reference guide during gameplay. All of these will be provided inside the Application. The manual and tutorial will be available through a &quot;Tutorial&quot; tab from the main menu. The quick-reference guide will be available while a player is in a game.

It is assumed that the device on which the user is running the Application is able to connect to the Internet with a stable connection and that the hardware is capable of displaying and processing the Application. It is also assumed that the operating systems and web browsers that support the Application will continue to support the application without conflicts.

_&lt;List any assumed factors (as opposed to known facts) that could affect the requirements stated in the SRS. These could include third-party or commercial components that you plan to use, issues around the development or operating environment, or constraints. The project could be affected if these assumptions are incorrect, are not shared, or change. Also identify any dependencies the project has on external factors, such as software components that you intend to reuse from another project, unless they are already documented elsewhere (for example, in the vision and scope document or the project plan).&gt;_

# **3. External Interface Requirements**
## **3.1 User Interfaces**

The main user interface will be introduced via a web page implementation, and the application will run inside of a browser window. The GUI will contain all of the needed documentation for gameplay, including a manual. The user will interface with his or her cards in hand, and choose the target of the card played. The more common screen sizes will support the play area, with 1920 x 1080 resolution delivering optimal results for game play..

_&lt;Describe the logical characteristics of each interface between the software product and the users. This may include sample screen images, any GUI standards or product family style guides that are to be followed, screen layout constraints, standard buttons and functions (e.g., help) that will appear on every screen, keyboard shortcuts, error message display standards, and so on. Define the software components for which a user interface is needed. Details of the user interface design should be documented in a separate user interface specification.&gt;_

## **3.2 Hardware Interfaces**

The application will be accessible for any user that has access to the internet and a browser on a computer. A future patch would need to be implemented to make the application playable on smaller devices, such as smartphones and tablets.

_&lt;Describe the logical and physical characteristics of each interface between the software product and the hardware components of the system. This may include the supported device types, the nature of the data and control interactions between the software and the hardware, and communication protocols to be used.&gt;_

## **3.3 Software Interfaces**

The application will employ a client-server system to prevent any corruptions of stored user data, and to lessen the processing load on the user&#39;s machine. A database will be used to store each user&#39;s registration, ID, and gameplay statistics. The backend server will handle processing of all gameplay once communication has been established with the user&#39;s machine via the application web server. The web application server will handle the user&#39;s login. The application web server and Database will be deployed on an Amazon EC2 instance.

_&lt;Describe the connections between this product and other specific software components (name and version), including databases, operating systems, tools, libraries, and integrated commercial components. Identify the data items or messages coming into the system and going out and describe the purpose of each. Describe the services needed and the nature of communications. Refer to documents that describe detailed application programming interface protocols. Identify data that will be shared across software components. If the data sharing mechanism must be implemented in a specific way (for example, use of a global data area in a multitasking operating system), specify this as an implementation constraint.&gt;_

## **3.4 Communications Interfaces**

The application client will communicate with the server via HTTP inside of a web browser. The client will need to have a registered user log into the GUI in order for the server socket to connect to the client socket.

_&lt;Describe the requirements associated with any communications functions required by this product, including e-mail, web browser, network server communications protocols, electronic forms, and so on. Define any pertinent message formatting. Identify any communication standards that will be used, such as FTP or HTTP. Specify any communication security or encryption issues, data transfer rates, and synchronization mechanisms.&gt;_

# **4. System Features**

_&lt;This template illustrates organizing the functional requirements for the product by system features, the major services provided by the product. You may prefer to organize this section by use case, mode of operation, user class, object class, functional hierarchy, or combinations of these, whatever makes the most logical sense for your product.&gt;_

## **4.1 System Feature 1**

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

_&lt;If there are performance requirements for the product under various circumstances, state them here and explain their rationale, to help the developers understand the intent and make suitable design choices. Specify the timing relationships for real time systems. Make such requirements as specific as possible. You may need to state performance requirements for individual functional requirements or features.&gt;_

## **5.2 Security Requirements**

Security will be maintained for users through the use of a hash table in which each user&#39;s statistics will be attached to his or her username. This username will be password protected. When microtransactions are implemented in a later patch of the original system, a more secure form of authentication will be utilized to protect user accounts and payment information from theft or unauthorized use.

_&lt;Specify any requirements regarding security or privacy issues surrounding use of the product or protection of the data used or created by the product. Define any user identity authentication requirements. Refer to any external policies or regulations containing security issues that affect the product. Define any security or privacy certifications that must be satisfied.&gt;_

## **5.3 Software Quality Attributes**

The quality of the software will ...

_&lt;Specify any additional quality characteristics for the product that will be important to either the customers or the developers. Some to consider are: adaptability, availability, correctness, flexibility, interoperability, maintainability, portability, reliability, reusability, robustness, testability, and usability. Write these to be specific, quantitative, and verifiable when possible. At the least, clarify the relative preferences for various attributes, such as ease of use over ease of learning.&gt;_

## **5.4 Business Rules**

The end users will have no access to the servers, and will only be able to interact with the application via the client GUI. Administrators will have access to the client and server code, in order to perform maintenance and patching of the system. A micro-transaction implementation will be introduced in a later patch of the application after it has been fully released. The application will be free-to-play with full functionality upon the initial release. The patch will introduce visual themes to the game, allowing players to customize their experiences, and to show their support for the application with visually differentiated cards. These additional visual themes will come at a price point, which will be predetermined based upon statistical analysis of similar applications using micro-transactions. The implementation of an in-game currency will be likely method of delivery for visual themes, and a billing system will need to be introduced in order to achieve that end. It should be noted that the visual themes will not alter the gameplay mechanics in any way, other than to show a different set of cards and/or card backs to all players. Licensing rights may need to be acquired in order to implement some themes; this will likely require a higher price point if monetary compensation is required in order to utilize those themes.

_&lt;List any operating principles about the product, such as which individuals or roles can perform which functions under specific circumstances. These are not functional requirements in themselves, but they may imply certain functional requirements to enforce the rules.&gt;_

# **6. Other Requirements**

_&lt;Define any other requirements not covered elsewhere in the SRS. This might include database requirements, internationalization requirements, legal requirements, reuse objectives for the project, and so on. Add any new sections that are pertinent to the project.&gt;_

#**Appendix A: Glossary**

| **Term** | **Definition** |
| --- | --- |
| Application | The software in its entirety, including but not limited to the host server and any instances of the application. |
| Client | An instance of the &quot;H@x0rz&quot; user-level software, run from a user&#39;s machine. Communicates with the server to send and receive data. |
| Device | The machine on which the client is run. |
| In-app | Available through the application. |
| Server | The &quot;H@x0rz&quot; back-end software, run on a web server owned by the developers of this application. Communicates with clients to send and receive data. |
| User | Any person who uses the &quot;H@x0rz&quot; application, particularly the client-end. |
|   |   |
|   |   |
|   |   |
|   |   |
|   |   |



_&lt;Define all the terms necessary to properly interpret the SRS, including acronyms and abbreviations. You may wish to build a separate glossary that spans multiple projects or the entire organization, and just include terms specific to a single project in each SRS.&gt;_

#**Appendix B: Analysis Models**

**Entity-Relationship Model of Functionality Overview:**

#**Appendix C: To Be Determined List**

_&lt;Collect a numbered list of the TBD (to be determined) references that remain in the SRS so they can be tracked to closure.&gt;_
