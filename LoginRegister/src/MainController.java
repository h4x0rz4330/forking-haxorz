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
/* Chnage Log: 
/*            {Date}   {Description}                           {By who?}
/*            10/23/16  Added Background image,                 Hardika
/*                      Login button Image, and New Account 
/*                      Image to Main Controller file. 
/*
/*            10/29/16  created Register View Page using FXML    Hardika
/*  
/*            10/30/16  added code to rediect Main Menu HTML     Ryan
/*                      web page from Login Button 
/*
/*            11/1/16   change formate of Regoster Page         Hardika
/*            
/*            11/2/16   Added popup window for incorrect        Hardika  
/*                      user Email or Password
/*                      added handleButtonAction Method         Hardika
*/
/*************************************************************************/

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import javafx.application.Application;
import javafx.event.*;
import javafx.fxml.FXMLLoader;
import javafx.geometry.*;
import javafx.stage.Stage;
import javafx.stage.Screen;
import javafx.scene.*;
import javafx.scene.image.*;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;


/*
*   Main Application class    
*/

public class MainController extends Application 
{
    
    public static void main(String[] args) 
    {
        launch(args);
    }
    
    // Label Declaration
    Label lblUserName, lblPassword;
    
    // TextField Declaration
    TextField txtUserName;
    
    // PasswordField Declaration
    PasswordField txtPassword;
    
    // Buttons Declaration
    Button loginBtn, accountBtn;
  
    Stage registerStage;
    
    @Override
    public void start(Stage stage) 
    {
        // Adding Title to the Stage
        stage.setTitle( "H@x0rz" );
        
        registerStage = stage;
        
        // group instance 
        Group root = new Group();
        
        // group instance adding in Scene object
        Scene theScene = new Scene( root, Color.BLACK );
            
        // load the Image from img folder
        Image lobbyImg = new Image( "/img/lobby.png" );
        
        // displays ImageView the image as is
        ImageView imgView = new ImageView(lobbyImg);
        
        Rectangle2D primaryScreenBounds = Screen.getPrimary().getVisualBounds();

        //set Stage boundaries to visible bounds of the main screen
        imgView.setX(primaryScreenBounds.getMinX());
        imgView.setY(primaryScreenBounds.getMinY());
        imgView.setFitWidth(primaryScreenBounds.getWidth());
        imgView.setFitHeight(primaryScreenBounds.getHeight());

        // Border Pane object
        BorderPane bp = new BorderPane();
        
        // Adding Horizontal Box 
        HBox hb = new HBox();
        hb.setPadding(new Insets(20,20,20,30));
       
        // Adding logo image to the screen
        Image logoImage = new Image(getClass().getResourceAsStream("img/logo.png"));
        ImageView logoImg = new ImageView(logoImage);
        hb.getChildren().add(logoImg);
        logoImg.setFitHeight(240);
        logoImg.setFitWidth(390);
        hb.setLayoutX(400);
        hb.setLayoutY(100);
        
        //Adding GridPane
        GridPane gridPane = new GridPane();
        gridPane.setHgap(5);
        gridPane.setVgap(5);
        
        //Implementing Nodes for GridPane
        lblUserName = new Label("Email:");
        txtUserName = new TextField();
        lblPassword = new Label("Password:");
        txtPassword = new PasswordField();
        txtUserName.getStyleClass().add("validation-error");
        txtPassword.getStyleClass().add("validation-error");
        
        
        //Adding Nodes to GridPane layout
        gridPane.add(lblUserName, 0, 0);
        gridPane.add(txtUserName, 1, 0);
        gridPane.add(lblPassword, 0, 1);
        gridPane.add(txtPassword, 1, 1);
        
        // Layout the border Pane
        bp.setCenter(gridPane);
        bp.setLayoutX(450);
        bp.setLayoutY(330);
        
        
        // Horizontal box to store buttons init 
        HBox buttonHBox = new HBox();
        buttonHBox.setSpacing(40);
        buttonHBox.setLayoutX(400);
        buttonHBox.setLayoutY(500);
        buttonHBox.setStyle("-fx-background-color: transparent;");
        
        // creating Login Button and adding Login_Button image on Button
        Image loginImage = new Image(getClass().getResourceAsStream("img/Login_Button.png"));
        loginBtn = new Button(" ");
        loginBtn.setOnAction(e->handleButtonAction(e));
        ImageView imgL = new ImageView(loginImage);
        loginBtn.setGraphic(imgL);
        imgL.setFitHeight(140);
        imgL.setFitWidth(190);
        loginBtn.setStyle("-fx-background-color: transparent;");
             
        // Create New Account Button and Adding imgae to it 
        Image accountImage = new Image(getClass().getResourceAsStream("img/New_Account_Btn.png"));
        accountBtn = new Button("");
        accountBtn.setOnAction(e->handleButtonAction(e));
        accountBtn.setId("ABtn");
        ImageView imgA = new ImageView(accountImage);
        accountBtn.setGraphic(imgA);
        imgA.setFitHeight(140);
        imgA.setFitWidth(190);
        accountBtn.setStyle("-fx-background-color: transparent;");
 
      
        // Adding Login Button and New Account Button to the Button horizontal box 
        buttonHBox.getChildren().addAll(loginBtn, accountBtn);
        
        // Adding objects to the group
        root.getChildren().addAll(imgView, hb, buttonHBox, bp);
        
        //Adding ID's to Nodes
        bp.setId("bp");
        gridPane.setId("root");
        
        // Loading CSS file
        theScene.getStylesheets().add(getClass().getClassLoader().getResource("Style.css").toExternalForm());
        stage.setScene(theScene);
        stage.show();
        
    }

    /* 
    *    -    Action Listener for handleButtonAction method
    *    -    if user click on Login Button
    *       -    Redirecting to the HTML page MainMenu from Login button if User Email Id and Password imformation is correct
    *       -    Otherwise it promp user the warning message that User Email and password is incorrect.
    *    -    if user click on New Account Button 
    *       - it will load the FXML file, which is user to design the layout of the Registraion page. 
    *       - once user click on New Account Button, it will load the Registration Page. 
    *       - where user will able to create new account. 
    */
    private void handleButtonAction(ActionEvent e) {
        
        
        if(e.getSource()== loginBtn)
        {
            String username = txtUserName.getText();
                  String password = txtPassword.getText();
                  
                  try{
                    URL login = new URL("http://54.70.3.103/h4x0rzServlet/Login");
                    HttpURLConnection servletConnection = (HttpURLConnection) login.openConnection();
                    servletConnection.setRequestMethod("POST");
                    servletConnection.setDoOutput(true);

                      try (BufferedWriter out = new BufferedWriter(new OutputStreamWriter(servletConnection.getOutputStream()))) {
                          out.write("username="+username);
                          out.write("&");
                          out.write("password="+password);
                          out.flush();
                      }

                      try (BufferedReader in = new BufferedReader(new InputStreamReader(servletConnection.getInputStream()))) {
                          String response = in.readLine();
                          System.out.println(response);
                          if (response.equals("1")){
                              System.out.println("Logged In");
                              getHostServices().showDocument("http://54.70.3.103/h4x0rz/MainMenu.html");
                          }
                          else
                          {
                            Alert alert = new Alert(AlertType.INFORMATION);
                            alert.setTitle("Warning");
                            alert.setContentText("Incorrect Username or Password." );
                            alert.showAndWait();
                          }
                      }
                  }catch(MalformedURLException f){
                  }catch(IOException f){
                  }
        }

        else if(e.getSource()==accountBtn)
        {
                Group root1 = new Group();
             
                Scene newScene; 

                registerStage.setTitle("H@x0rz");

                // Loard FXML file
                FXMLLoader loader = new FXMLLoader(getClass().getResource("RegisterView.fxml"));
                  
                try {
                        // loaring new Scene
                        newScene = new Scene(loader.load());
                } catch (IOException ex) {
                        // TODO: handle error
                return;
                }
                
                // set same properties as Main Stage
//                registerStage.initOwner(stage);
                
                // add New Scene to the  Register Stage
                registerStage.setScene(newScene);
                
                // Display the Register Stage and stay open 
                registerStage.showAndWait();
                
                // Close the Previous Main Stage
//                stage.close();
        }
    }
}