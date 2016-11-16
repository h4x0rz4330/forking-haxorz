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
    
       Stage loginstage;
    
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
        
//        registerStage = stage;
        this.loginstage = stage;
        
         // Adding Title to the Stage
        stage.setTitle( "H@x0rz" );
        
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
        lblUserName = new Label("Username:");
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

        
        // creating Login Button and adding Login_Button image on Button
        Image loginImage = new Image(getClass().getResourceAsStream("img/Login_Button.png"));
        loginBtn = new Button(" ");
        loginBtn.setOnAction(e->{
            handleButtonAction(e);
        });
        ImageView imgLogin = new ImageView(loginImage);
        loginBtn.setGraphic(imgLogin);
        imgLogin.setFitHeight(160);
        imgLogin.setFitWidth(200);
             
        // Create New Account Button and Add imgae to it 
        Image accountImage = new Image(getClass().getResourceAsStream("img/New_Account_Btn.png"));
        accountBtn = new Button("");
        accountBtn.setOnAction(e-> new RegisterStage());
//        accountBtn.setOnAction(e->{
//            handleButtonAction(e);
//        });
//            handleRButtonAction(e);
                
 
        accountBtn.setId("ABtn");
        ImageView imgAccount = new ImageView(accountImage);
        accountBtn.setGraphic(imgAccount);
        imgAccount.setFitHeight(160);
        imgAccount.setFitWidth(200);
      
        // Adding Login Button and New Account Button to the Button horizontal box 
        buttonHBox.getChildren().addAll(loginBtn, accountBtn);
        
        // Adding objects to the group
        root.getChildren().addAll(imgView, hb, buttonHBox, bp);
        
        //Adding ID's to Nodes
        bp.setId("bp");
        gridPane.setId("root");
        
        // Loading CSS file
        theScene.getStylesheets().add(getClass().getClassLoader().getResource("Style.css").toExternalForm());
        loginstage.setScene(theScene);
        loginstage.show();
//        stage.setScene(theScene);
//        stage.show();

 
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
    private void handleButtonAction(ActionEvent e){
        
        
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
        
//        if(e.getSource()==accountBtn)
//        {
//            try {
//                    FXMLLoader loader = new FXMLLoader(getClass().getResource("FXMLRegisterView.fxml"));
//                        // loaring new Scene
//                       
//                        Parent root1 = (Parent) loader.load();
//                        registerStage.setTitle("H@x0rz");
//                        registerStage.setScene(new Scene(root1));
//                        registerStage.showAndWait();
//                        
//
//                } catch (IOException ex) {
//                        // TODO: handle error
//        }
//        }

    }


class RegisterStage 
{

    RegisterStage() {
            
        Stage registerStage = new Stage();
            
         try {
                    FXMLLoader loader = new FXMLLoader(getClass().getResource("FXMLRegisterView.fxml"));
                        // loaring new Scene
                       
                        Parent root1 = (Parent) loader.load();
                        registerStage.setTitle("H@x0rz");
                        registerStage.setScene(new Scene(root1));
                        loginstage.close();
                        registerStage.showAndWait();
                        

                } catch (IOException ex) {
                        // TODO: handle error
        }
        
    }
 
}

}