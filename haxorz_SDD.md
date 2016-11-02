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
| **2. Introduction** |
| **3. Logical View Diagram** |



## 1. Introduction

###**1.1 Purpose**

The purpose of this Software Design Document is to outline and describe the architecture of the "H@x0rz" application and its systems. 
This document shall be used as a guide and reference material for the development team during the application's development process, 
as well as for other stakeholders to view and understand the system.

###**1.2 Scope**

This document is primarily intended for the technical stakeholders of the "H@x0rz" application, including, but not limited to: 
software developers, quality assurance testers, and project managers. Due to the technical nature of this document, 
it may not be pertinent to business stakeholders, but it will be made available to them to read at their discretion.

The "H@x0rz" application

###**1.3 Overview**

###**Introduction:**

"H@x0rz" is a casual game that is also a self-contained product. A Server to Client architecture will be employed to prevent corruption 
of the game files, and to make it a lightweight application on the Client system. This document will outline the design of this project; 
the higher-level Logical and Physical Views will give the design team a bird&#39;s-eye view of the overall goal of the project. 
The programming code consists of a large amount of markup language, at least on the Client end of the application, which includes 
the Main Menu and Game Board user interfaces. The implementation of C++ on the business client's backend server is a strict object-oriented 
architecture, employing patterns to create the game logic of the application. The web server is written in Java, using object-oriented code 
to communicate the game logic from the backend server to the end user's browser UI.The web server also includes a database that will hold 
some basic user information.

###**Main System Architectural Overview:**

**Logical View Diagram:**

|| **Web Application** ||
| --- | --- | --- |
| Login/Register | Main Menu | Main Game Board |
|| JavaFX, FXML | HTML5, CSS3, JavaScript, JQuery |
| **Database Server** | **Client Server** ||
| MySQL | Data Strings | Communication Sockets |
|| **Backend Server** ||


Upon inception of our project, we were presented with a functioning server by our business client, having only logical functionality 
written in C++. We have been tasked with implementing a user interface on top of the physical server in order to provide a fully functional 
application for delivery. Therefore, the general architectural design of our project is of a Server to Client Architecture. 
We have decided to use a web browser interface in order to reach a wide audience. The application will be compatible on a wide range of 
laptop or desktop computers through a web browser, such as Google Chrome. Therefore, we will need to focus on markup and scripting 
languages, such as HTML5, CSS3, JavaFX, JQuery, and Jscript. In addition, we will need to create a server to handle web application 
communications between the backend server and the clients using our product, so Java will need to be used in both Apache and Apache Tomcat 
environments. Lastly, we will be implementing a database to hold the end-user&#39;s&#39; login information, and to support any future 
additional content requiring a username to act as a unique key; this database is going to run on MySQL. The web application server and 
database server will be combined on a single Amazon EC2 instance, which will allow us to scale the application both vertically and 
horizontally, in order to meet the needs of the end users.

**Physical Architectural View:**

The physical backend server communicates with the cloud-based web server, which also houses the user database. The end-user can access 
the application via a device that can connect to the internet; (there are some constraints in the viewable resolution of the game that 
makes it significantly less than ideal for play on some smaller mobile devices.) Each game can be played by two to four players, once the 
players are all connected to the web server.

**Main Game Loop Diagram:**

This is the main game loop for the application. Only the current active player can select a card and target. This loop occurs during each 
player’s turn as long as the player has not been eliminated. The output is seen by all players, unless the action is a secret action 
(e.g. Cards such as #3 “Cybersecurity Officer”), then only the targeted player and the current active player will see the resultant output.

###**Subsystems Architectural View:** 
**Communications Overview:**

###**Development Architectural View:**
**Development View Diagram:**

The development architecture layout is provided above. Our development will be broken into 3 different sectors: Client, Client Server, 
and Backend Server. Hardika and Chris will mainly develop the LoginRegister application that will launch a browser page to the actual 
game hosted by the Client Server. This includes the images and animations that fire off during the game. Jonathan and Ryan will be working 
on the Client Server that will manage the login and registration as well as communicating with the backend server that will actually run 
the game. The Client Server will act as a medium between the Client and the Backend server. The business client and Ryan will be working on 
the Backend Server that will  handle the actual game logic and communicate with the Client Server that will tell the client the necessary 
information.

###**Data Architectural View:**
**Database Schema Diagram**

The database H4x0rz will house the user and login data. The primary key of the user table will be auto-generated upon registration of the 
user. We will store the username and encrypted passwords. Every time a new user registers the application will insert the username and 
encrypted password and generate a unique identifier integer. The login table will have a login identifier that is generated when the user 
logs in. We will store the UID of the user, the time at which they logged in, as well as the IP address of the user. The UID stored will be 
a foreign key that references the user table for its value. With this database schema, we will be able to register, log, and delete users 
at request.

###**Work-Assignment View:**

Our team’s responsibilities have been broken down as follows:
*	User Interface Design & Gameplay Design: Chris Schayer and Hardika Patel
*	Web Application Server and Communications: Ryan Ngo and Jonathan Nguyen
*	Project Management, Quality Analysis Testing, and Documentation: William Raziano, Madeline May, and Jonathan Nguyen

The User interface is comprised of two parts, the Main Menu, and Game Board. Hardika is implementing the Main Menu UI. 
She is also working with Ryan to connect the Main Menu directly with an Apache Tomcat Servlet, which is pointed to the database, and allows 
new users to create a username and password. Chris is implementing the Game Board, including animations. His implementation will work in a 
browser webpage, which also communicates with another Tomcat Servlet. Ryan is administering the database, which is primarily utilized as a 
means to secure the user’s login information via hashing. Ryan is also creating the Apache Web Server and Tomcat Servlets in an Amazon EC2 
instance to get the game application client communicating with the backend server. Jonathan is working with Ryan to implement the needed 
communications sockets for communicate between the backend server and the web server. Will is handling the business aspects of the project, 
consulting with the client, organizing the team, and delegating tasks as they come up, according to the strengths and weaknesses of the 
team members. Will is also working with Jonathan and Madeline in creating and assisting in the creation of needed documents for delivery to 
the client and team. Jonathan is heading up the editing, technical writing, and amending of documentation as needed. Madeline is the lead 
QA Tester for the project once the testing phase is implemented, until then, she is working with Jonathan and Will on documenting the 
project.    

###**User Interface Design:**
**LoginRegister (Main Menus):**

This page has three main functionalities: First, the user can write email and password in text field for login and to create a new account. 
Second, when user clicks on the login button, if the login information matches the database, the server sends an approval of login and lobby 
information. If the user account doesn’t exist, then it will prompt user with a warning message stating that the email or password does not 
exist. Finally, if the user doesn’t not have an account, then the user will be able to create account by clicking the “New Account” button, 
which will direct the user to the Registration Page.

*(Please note that at this time, we do not have the “Login Accepted” screen for this application)*

The popup message appears if a user account does not exist. It will prompt the user to check his or her login information, or create a new 
account. Upon clicking the “OK” button, he or she can then click the “New Account” button to register for a new account.

The registration page appears to the user after the user clicks on the “New Account” button from the Login Page. This page will allow the 
user to enter their email address, create a password and then confirm the password.

**MainBoard (Game Board):**

This is the Game board after the initial deal has been completed to all users. This is how the layout will appear to each individual player 
in a four player game, when the user is not the active player. 

This is the view of the active player’s hand. The active player in this screen capture has not yet received his or her second card, 
but has hovered over the card in hand. 

| **Symbol** | **Description** |
| --- | --- |
|| User's Device (Varies by User) |
|| Client Server (Cloud-based Amazon EC2) |
|| Database Server (Cloud-based Amazon EC2) |
|| Physical Backend Server |
