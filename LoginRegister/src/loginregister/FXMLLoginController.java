/**
 * Author: Hardika Patel
 * File: FXMLLoginController.java
 * Description: This file is control Login screen, 
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
 *
 * @author hardikapatel
 */
public class FXMLLoginController extends Application  implements Initializable, ScreenInterface {
    
    @FXML
    private Button Login;
    
    @FXML 
    private TextField UserEmailInput;
    
    @FXML 
     TextField UserPasswordInput;
    
     ScreensController myController;
     
     
    @FXML
    public void handleButtonAction(ActionEvent e) throws Exception {
            
        if(e.getSource()== Login)
        {
            String username = UserEmailInput.getText();
            String password = UserPasswordInput.getText();

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
                      Alert alert = new Alert(Alert.AlertType.INFORMATION);
                      alert.setTitle("Warning");
                      alert.setContentText("Incorrect Username or Password." );
                      alert.showAndWait();
                    }
                }
            }catch(MalformedURLException f){
            }catch(IOException f){
            }
        }
    }
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO@FXML
    }    

    @Override
    public void setScreenParent(ScreensController screenParent) {
         myController = screenParent;
    }
    
    @FXML
    private void goToRegister(ActionEvent event){
       myController.setScreen(MainController.screen2ID);
    }
    
    @FXML 
    private void gotoForgotPassword(ActionEvent event){
        myController.setScreen(MainController.screen3ID);
    }
    
    
    
    @Override
    public void start(Stage primaryStage) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
