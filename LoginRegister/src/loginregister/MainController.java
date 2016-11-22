/*************************************************************************/
/* Author: Hardika Patel 
/* 
/* File Name: MainController.java
/* 
/* Description: This file contains labels of User Email Address and Password, and 
/*              TextField for User input of email address and password for login.
/*              Also contain Login button and New Account Button. 
/*              If Login information matches database, server send approval of 
/*              login and lobby information which open main menu html page.
/*              If login information doesn't matches the database, it will prompt 
/*              user warnning message that User Email or Password is incorrect. 
/*              New account button allow user to create new account. 
/*
/* Change Log: 
/*            {Date}   {Description}                                            {By who?}
/*            10/23/16  Added Background image for login page,                   Hardika
/*                      Login button Image, and New Account button 
/*                      Image to Main Controller file. 
/*
/*            10/29/16  Refer to "FXMLRegisterView.fxml" 
/*                  -    created Register View Page using FXML                    Hardika
/*  
/*            10/30/16  Refer to "MainController.java"
/*                   -   added code in "handleButtonAction" method 
/*                      to redirect Main Menu HTML web page from Login Button     Ryan
/*                      
/*            11/1/16   Refer to "FXMLRegisterView.fxml"
/*                   -   change formate of Register Page                          Hardika
/*            
/*            11/2/16   Refer to "MainController.java"
/*                   -   added handleButtonAction Method                          Hardika
/*                   -   Added popup window if incorrect user Email or Password
/*                       entered for login                                        Hardika  
/*                      
/*            11/15/16  Refer to "MainController.java"
/*                   -   solved "Exception in thread "JavaFX Application Thread"  Hardika
/*                      java.lang.IllegalStateException: Cannot call this method 
/*                      on primary stage" error 
/*              
/*                   -   solved by seprating "Stage" for "Register Page"
/*
/*           11/16/16    Refer to "FXMLRegisterController.java"                   Rayan
/*                   -   Added code in Register's "handleButtonAction" class 
/*                       to redirect Main Menu HTML web page from Register Page
/*                   
*            11/16/16 to 
*            11/19/16 
*/  
/*           
/*           11/19/16 to - Had to major changes in code just because of back button  Hardika
/*           11/21/16      when back button press, it will redirect to the main Login 
*                          screen. 
*/ 
/*                         
/*
/*
*/            
/*************************************************************************/


package loginregister;

import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.stage.Stage;

/**
 *
 * @author hardikapatel
 */
public class MainController extends Application {
    
    public static String screen1ID = "main";
    public static String screen1File = "FXMLLogin.fxml";
    public static String screen2ID = "Screen2";
    public static String screen2File = "FXMLRegisterView.fxml";
    
    @Override
    public void start(Stage primaryStage) {
        // creating one controller 
        ScreensController mainContainer = new ScreensController();
        
        // loading the screen 
        mainContainer.loadScreen(MainController.screen1ID, MainController.screen1File);
        mainContainer.loadScreen(MainController.screen2ID, MainController.screen2File);
        
        // set main screen to display into controller
        mainContainer.setScreen(MainController.screen1ID);
        
        // added controller to the root/scene graph and dipaly application 
        Group root = new Group();
        root.getChildren().addAll(mainContainer);
        Scene scene = new Scene(root);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
}
