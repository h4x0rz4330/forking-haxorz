/*
 * Name: Hardika Patel
 * File: EmailFormController.java
 * Description: Controller for EmailForm 
 *              - Button Control display Forgot Acoount web page when user presses the "ForgotPassword?" Button
 *              - also dispaly Login Page when user presses the "Back" Button. 
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
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

/**
 * FXML Controller class
 *
 * @author hardikapatel
 */
public class EmailFormController implements Initializable, ScreenInterface{

    @FXML
    private Button ForgotPassword;
    @FXML TextField UserEmailInput;
    /**
     * Initializes the controller class.
     */
    public void handleActionButton(ActionEvent e){
        if(e.getSource()== ForgotPassword)
        {
            String email = UserEmailInput.getText();

            try{
              URL forgotAccountURL = new URL("http://54.70.3.103/h4x0rzServlet/ForgotAccount");
              HttpURLConnection servletConnection = (HttpURLConnection) forgotAccountURL.openConnection();
              servletConnection.setRequestMethod("POST");
              servletConnection.setDoOutput(true);

                try (BufferedWriter out = new BufferedWriter(new OutputStreamWriter(servletConnection.getOutputStream()))) {
                    out.write("email="+email);
                    out.flush();
                }

                try (BufferedReader in = new BufferedReader(new InputStreamReader(servletConnection.getInputStream()))) {
                    String response = in.readLine();
                    System.out.println(response);
                    if (response.equals("1")){
                        System.out.println("Email sent.");
                        Alert alert = new Alert(Alert.AlertType.INFORMATION);
                        alert.setTitle("Success");
                        alert.setContentText("Information regarding access to your account has been sent to the corresponding email." );
                        alert.showAndWait();
                    }
                    else
                    {
                      Alert alert = new Alert(Alert.AlertType.INFORMATION);
                      alert.setTitle("Warning");
                      alert.setContentText("There was an error processing your request. The email you entered may not exist." );
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
        // TODO
    }    
    ScreensController myController;
    
    public void setScreenParent(ScreensController screenParent) {
        myController = screenParent;
    }
   
    @FXML
    private void gotoForgotPassword(ActionEvent event){
       myController.setScreen(MainController.screen4ID);
    }
    
    @FXML
    private void goToLogin(ActionEvent event){
       myController.setScreen(MainController.screen1ID);
    }
}
