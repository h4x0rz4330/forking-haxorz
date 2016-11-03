# Software System Design Document

## for

# H@x0rz

**Version 1.0 Approved** 
**November 2, 2016**

**Prepared by Team 42:**

Madeline May

Ryan Ngo

Jonathan Nguyen

Hardika Patel

William Raziano

Chris Schayer







| **Table of Contents:** |
| ---------------------- |
| **1. Introduction** |
| 1.1 Purpose |
| 1.2 Scope |
| 1.3 Overview |
| 1.4 References |
| **2. Main System Architectural Overview** |
| 2.1 Logical View Diagram |
| 2.2 Physical Architectural View |
| 2.3 Main Game Loop Diagram |
| **3. Subsystems Architectural View** |
| 3.1 Backend Server |
| 3.2 Webclient Server |
| 3.3 Client |
| **4. Development Architectural View** |
| **5. Data Architectural View** |
| **6. Work-Assignment View** |
| **7. User Interface Design** |
| 7.1 LoginRegister (Main Menus) |
| 7.2 MainBoard (Game Board) |
| **8. Element Catalog** |
| 8.1 Physical View Diagram |
| 8.2 Development View Diagram |



## 1. Introduction

###**1.1 Purpose**

The purpose of this Software Design Document is to outline and describe the architecture of the “H@x0rz” application and its systems. This document shall be used as a guide and reference material for the development team during the application’s development process, as well as for other stakeholders to view and understand the system.

###**1.2 Scope**

This document is primarily intended for the technical stakeholders of the “H@x0rz” application, including, but not limited to: software developers, quality assurance testers, and project managers. Due to the technical nature of this document, it may not be pertinent to business stakeholders, but it will be made available to them to read at their discretion. 

The “H@x0rz” application offers a turn-based multiplayer card game to its users. Accounts unique to each user will be used in future versions to offer player statistics (including comparisons to other players via a leaderboard), purchasable content, and further social interaction through the application.

###**1.3 Overview**

“H@x0rz” is a game based in a web application. A Server-Client architecture will be employed to ensure the integrity of the game files and to make the client-end of the application lightweight. This document will outline the design of this project as follows:
* **Main System Architecture:** This section outlines the high-level logical and physical overviews of the systems and how they connect to each other. The main game loop is also included for clarity.
* **Subsystems Architecture:** This section outlines the three main parts of the application, including the backend Server, the WebClient Server, and the Client (user) interface. Behaviors of the three parts are outlined in these sections.
* **Development Architecture:** This section outlines the actual code base for the application, broken down by section. The programming code consists of a large amount of markup language, at least on the Client end of the application, which includes the Main Menu and Game Board user interfaces. The implementation of C++ on the business client’s backend server is a strict object-oriented architecture, employing patterns to create the game logic of the application. The web server is written in Java, using object-oriented code to communicate the game logic from the backend server to the end user’s browser UI. 
* **Data Architecture:** The web server also includes a database that will hold some basic user information. A schema diagram has been included to clarify the nature of the database in detail.
* **Work Assignment:** This section outlines a breakdown of work responsibilities for team members.
* **User Interface Design:** This section outlines the User Interface through some UI screen captures and explanation of functionality.
* **Element Catalog:** This section explains the diagrams in the document with a “Glossary” for some of those diagrams.

###**1.4 References**

Please refer to: [https://github.com/h4x0rz4330/forking-haxorz/blob/master/haxorz_SRS.md](https://github.com/h4x0rz4330/forking-haxorz/blob/master/haxorz_SRS.md)

## 2. Main System Architectural Overview

###**2.1 Logical View Diagram:**

![Logical View](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/logicalArchCap.PNG)

The entirety of the “H@x0rz” application is divided into three main systems. The first system is a web application (client) which displays the user interface, takes user inputs to send to the client-server, and receives commands from the client server to update the user interface accordingly. The second system is a client server, which acts as a midway communicator between clients and the backend server, as well as a database for storing and accessing user account information. The third system is the backend server, which was provided to us by our partnering business stakeholder at the start of the project. It contains code for processing the logic of the game itself, based on inputs from the clients (through the client server). It then sends the resulting effects as commands to the clients (again, through the client server) so that each user may receive the resulting game update.

Therefore, the general architectural design of our project is of a Server-Client architecture. We will be using a web interface for the client-end of our application, granting compatibility on a wide range of laptop or desktop computers by allowing the application to run through the web browser. Because of this, we will focus on markup and scripting languages, such as HTML5, CSS3, JavaFX, JQuery, and Javascript. In addition, we will be using a client-server to handle communications between the backend server and the clients, so Java will need to be used in both the Apache and Apache Tomcat environments for this. Lastly, we will be implementing a database to hold the user account information and to support any future additional content that will be linked to a unique account, such as purchasable content. This database will run on MySQL. Additionally, the client server and database server will be combined on a single Amazon EC2 instance, which will allow us to scale the application both vertically and horizontally, in order to meet the needs of the end users.

###**2.2 Physical Architectural View:**

![Physical Architecture](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/Physical%20Architecture.png)

The physical backend server communicates with the cloud-based web server, which also houses the user database. Each user can access the application via a desktop or laptop computer that has Internet access. Each game can be played by two to four players, who will be connected through the web application server.

###**2.3 Main Game Loop Diagram:**

![Main Game Loop](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/MainGameLoop1.png)

This is the loop of events that occurs during a game session in the application, until the game reaches a conclusion. Only one currently active player can select a card and target. This loop occurs during each player’s turn as long as the player has not been eliminated. In the case that a player is eliminated but the game is not concluded, they may observe the game i.e. continue in this loop but only receive outputs. The output is seen by all players, unless the action is a special action limited to selected players; in this case, the selected players will see the full details of the action while all others will only be notified that the special action has occurred.

##**3. Subsystems Architectural View:** 
###**3.1 Backend Server:**

Because the backend server was delivered with the business client’s desired functionality already implemented, we will not be making any notable changes to it. Any changes that we make in the backend server will only be for maintenance purposes. The more significant changes involving server interaction will instead occur in the client server layer of the application.

###**3.2 Webclient Server:**

The webclient server (i.e. client server) will act as an intermediate point of contact between clients and the backend server. It will use Java servlets to handle all requests made through it.

The “Register” servlet will handle requests from the client for creating a new user account. Each request will contain an email address, a username, and a password. Once received, the servlet will check if the username or email address is already linked to an account in the server database. If so, the servlet will send a response to the client notifying the user of this. If not, the servlet will process to store the new user account information into the database server, then send a response to the client that the account creation succeeded and to login on that account.

The “Login” servlet will handle requests from the client for logging into a user account. Each request will contain a username and a password. Once received, the servlet will check these against the respective login data in the database server, using hash tables for securely handling passwords. The servlet will then send a response to the client, either confirming a successful login or notifying the user of incorrect credentials.

The “ClientComm” servlet will handle all requests while a user is logged into an account, such as in-game actions. Each request will contain a label specifying the type of request, followed by corresponding parameters specific to each type. Once received, the servlet may perform one of many actions, including, but not limited to: editing or retrieving data from the database server, sending and receiving messages to the backend server regarding in-game actions, and sending update information to the client.


###**3.3 Client:**

The client will primarily act as a user interface (UI), displaying all relevant information to the user based on a combination of user inputs and responses to these inputs from the client-server. As the application is run from a web browser, the client will be implemented using HTML, CSS, and JavaFX. The client will also be able to send and receive requests/responses between itself and the client server, as well as being able to process received responses into corresponding UI displays.

As a UI, the client has access to CSS and image files for rendering images, all handled by the MainController Java class. It will also have access to three primary screens (though others may be added in the future for additional content): the Login screen, the Main Menu screen, and the Game screen. 

The Login screen will provide text boxes for the user to input their login credentials. The “Login” button will be used to send a login request to the client server using the given credentials. The “New Account” button will be used to send an account creation request to the client server with the given credentials.

The Main Menu screen will provide buttons for the following actions: entering a tutorial game, requesting to join a game with other players, and specifying the number of players in the game-to-be-requested. The “Tutorial” button will load to the Game screen of a preset demo of the game. The “Join Game” button will send a request to the client server, asking for the current account to be linked with an appropriate game session. Future versions may add buttons as necessary for additional features.

The Game screen is loaded when the “Tutorial” is loaded or the “Join Game” request is answered with a successful response. On this screen, all displays are based on updates received from the client server, which are in turn based on user inputs. The screen will display the user’s own cards in detail (i.e. which type of card it is), while other players’ cards are only shown to either exist or not. Cards that have been played will be displayed in full detail for all players to see. A central “deck” will also be shown to signify how many card have yet to be used or drawn by players. Players will only be able to select cards as an input, and only so when it is determined to be their turn. Otherwise, the user will only receive updates on other players’ actions as UI displays.



##**4. Development Architectural View:**
**Development View Diagram:**

![Development View](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/DevelopmentView.png)

The development architecture layout is provided above. Our development will be broken into 3 different sectors: Client, Client Server, and Backend Server. Hardika and Chris will mainly develop the LoginRegister application that will launch a browser page to the actual game hosted by the Client Server. This includes the images and animations that fire off during the game. Jonathan and Ryan will be working on the Client Server that will manage the login and registration as well as communicating with the backend server that will actually run the game. The Client Server will act as a medium between the Client and the Backend server. The business client and Ryan will be working on the Backend Server that will  handle the actual game logic and communicate with the Client Server that will tell the client the necessary information.

##**5. Data Architectural View:**
**Database Schema Diagram**

![DB Schema](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/CSC4330%20DB%20Schema%20Updated%201.PNG)

The server database will house the following user account information: email address, username, and encrypted password. The primary key of the user table will be auto-generated upon registration of the user. When a new user account is registered, the application will generate a unique identifier integer and insert it into the database along with the corresponding user information. A login table will have a login identifier that is generated when the user logs in. We will store the user ID (UID) of the user, the time at which they logged in, and the IP address of the user. The UID stored will be a foreign key that references the user table for its value. With this database schema, we will be able to register, log, and delete users upon request. 

##**6. Work-Assignment View:**

Our team’s responsibilities have been broken down as follows:
*	User Interface Design & Gameplay Design: Chris Schayer and Hardika Patel
*	Web Application Server and Communications: Ryan Ngo and Jonathan Nguyen
*	Project Management, Quality Analysis Testing, and Documentation: William Raziano, Madeline May, and Jonathan Nguyen

The User interface is comprised of two parts, the Main Menu, and Game Board. Hardika is implementing the Main Menu UI. She is also working with Ryan to connect the Main Menu directly with an Apache Tomcat Servlet, which is pointed to the database, and allows new users to create a username and password. Chris is implementing the Game Board, including animations. His implementation will work in a browser webpage, which also communicates with another Tomcat Servlet. 

Ryan is administering the database, which is primarily utilized as a means to secure the user’s login information via hashing. Ryan is also creating the Apache Web Server and Tomcat Servlets in an Amazon EC2 instance to get the game application client communicating with the backend server. Jonathan is working with Ryan to implement the needed communications sockets for communicate between the backend server and the web server.

Will is handling the business aspects of the project, consulting with the client, organizing the team, and delegating tasks as they come up, according to the strengths and weaknesses of the team members. Will is also working with Jonathan and Madeline in creating and assisting in the creation of needed documents for delivery to the client and team. Jonathan is heading up the editing, technical writing, and amending of documentation as needed. Madeline is the lead QA Tester for the project once the testing phase is implemented, until then, she is working with Jonathan and Will on documenting the project.     

##**7. User Interface Design:**
**LoginRegister (Main Menus):**

![LoginRegister1](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/LoginRegister1.png)

This page has three main functionalities: First, the user can write email and password in text field for login and to create a new account. Second, when user clicks on the login button, if the login information matches the database, the server sends an approval of login and lobby information. If the user account doesn’t exist, then it will prompt user with a warning message stating that the email or password does not exist. Finally, if the user doesn’t not have an account, then the user will be able to create account by clicking the “New Account” button, which will direct the user to the Registration Page.

*(Please note that at this time, we do not have the “Login Accepted” screen for this application)*

![LoginRegister2](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/LoginRegister2.png)

The popup message appears if a user account does not exist. It will prompt the user to check his or her login information, or create a new account. Upon clicking the “OK” button, he or she can then click the “New Account” button to register for a new account. If the user has entered the correct login information, he or she will be shown the Main Menu screen (not shown), which will allow the user to view a gameplay tutorial, select the number of players in his or her game, and/or join an open game not already underway. 

![LoginRegister3](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/LoginRegister3.png)

The registration page appears to the user after the user clicks on the “New Account” button from the Login Page. This page will allow the user to enter their email address, create a screen name, create a password and then confirm the password. This information is stored in the database (hashed) for future logins.

**MainBoard (Game Board):**

![MainBoard1](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/MainBoard1.png)

This is the Game board after the initial deal has been completed to all users. This is how the layout will appear to each individual player in a four player game, when the user is not the active player. If the player hovers his or her mouse over the card in hand, it will pop forward, allowing the user to see the text in the card, to determine how to use the card when he or she becomes the active player. The rules of the game will be included in a pop up that has not yet been implemented, as well as the different cards and the effects of those cards.  

![MainBoard2](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/Main%20Board2.png)

This is the view of the active player’s hand. The active player in this screen capture has received his or her second card, and has hovered the mouse over one of the cards in hand. The card that is popped out can be selected by the user, and then a target can be selected based upon the card selected. Cards out of play will be shown face up in front of each player, to allow players the ability to see what has already been played. 

##**8. Element Catalog:**
###**8.1 Physical View Diagram:**

![Element Catalog](https://github.com/h4x0rz4330/forking-haxorz/blob/master/SDD/ElementCatalogCap.PNG)

###**8.2 Development View Diagram:**

|**Symbol**|**Description**|
|---|---|
|**Yellow Folder**|Package|
|**Arrow**|Contains|
|**Text**|Class (Object)|
