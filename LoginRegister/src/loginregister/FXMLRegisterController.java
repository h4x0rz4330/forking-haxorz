/*
 * Author: Hardika
 * File: LoginRegisterController.java
 * Description: Controller for register screen. 
 */
package loginregister;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

/**
 * FXML Controller class
 *
 * @author hardikapatel
 */
public class FXMLRegisterController extends Application implements Initializable, ScreenInterface {

     ScreensController myController;
     
     @FXML private Button Register;
    
    @FXML private Button Back;
    
    @FXML 
    private TextField userEmailInput;
    
    @FXML TextField userScreenNameInput;
    
    @FXML TextField passwordInput;
    
    @FXML TextField confirmPasswordInput;
    
    @FXML
    public void handleButtonAction(ActionEvent event) throws Exception{
        
                
        if(event.getSource()==Register){
        
               String errorMessage = "";
               if(userEmailInput.getText()== null || userEmailInput.getText().length()==0) {
                   errorMessage+="Enter a valid email address!\n";
               } 
               if(userScreenNameInput.getText()==null || userScreenNameInput.getText().length()==0){
                    errorMessage +="Enter a valid User Screen Name!\n" ;
               }
               if(passwordInput.getText()==null || passwordInput.getText().length()==0){
                    errorMessage+="Enter a valid password!\n";
               }
               if(confirmPasswordInput.getText()==null || confirmPasswordInput.getText().length()==0){
                    errorMessage+="Confirm your password!\n";
               }
               if((passwordInput.getText()!=null && confirmPasswordInput.getText()!=null) && 
                       (passwordInput.getText().length() != confirmPasswordInput.getText().length())) {
                   
                        errorMessage+="Passwords you entered do not match. \nPlease try again";
               }
               if(errorMessage.equals("")){
                    
                   String email = userEmailInput.getText();
                   String username = userScreenNameInput.getText();
                   String password = passwordInput.getText();
                    try{
                    URL login = new URL("http://54.70.3.103/h4x0rzServlet/Register");
                    HttpURLConnection servletConnection = (HttpURLConnection) login.openConnection();
                    servletConnection.setRequestMethod("POST");
                    servletConnection.setDoOutput(true);

                      try (BufferedWriter out = new BufferedWriter(new OutputStreamWriter(servletConnection.getOutputStream()))) {
                          out.write("email="+email);
                          out.write("&");
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
                            Alert alert = new Alert(Alert.AlertType.INFORMATION);
                            alert.setTitle("Warning");
                            alert.setContentText("Incorrect Username or Password.");
                            alert.showAndWait();
                          }
                      }
                  }catch(MalformedURLException f){
                  }catch(IOException f){
                  }
                System.out.println("you have Register for new account");
                Alert alert = new Alert(Alert.AlertType.INFORMATION);
                alert.setTitle("Message");
                alert.setHeaderText(null);
                alert.setContentText("You have Register new account.");
                alert.showAndWait();
//                return true;
               }               
               else {
                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                    alert.setTitle("Error");
                    alert.setHeaderText("Please Correct the errors listed below");
                    alert.setContentText(errorMessage);
                    alert.showAndWait();
//                    return false;
                }
        }
        
        
        if(event.getSource()==Back){
            System.out.print("you have clicked back button");
            
            
        }
                
    }
     
    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    

    @Override
    public void setScreenParent(ScreensController screenParent) {
        myController = screenParent;
    }
    
    @FXML
    private void goToLogin(ActionEvent event){
       myController.setScreen(MainController.screen1ID);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
