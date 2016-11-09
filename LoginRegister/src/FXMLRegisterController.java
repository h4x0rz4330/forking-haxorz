/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.Initializable;
import javafx.fxml.FXML;
import javafx.scene.control.*;
//import javafx.scene.control.Label;
//import javafx.scene.control.TextField;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;

/**
 * FXML Controller class
 *
 * @author hardikapatel
 */
public class FXMLRegisterController implements Initializable {

    @FXML 
    private TextField userEmailInput;
    
    @FXML TextField userScreenNameInput;
    
    @FXML TextField passwordInput;
    
    @FXML TextField confirmPasswordInput;
    
    @FXML
    private boolean handleButtonAction(ActionEvent event) {
        
            String errorMessage = "";
               if(userEmailInput.getText()== null || userEmailInput.getText().length()==0) {
                   errorMessage+="Enter a valid email address!";
               } 
               if(userScreenNameInput.getText()==null || userScreenNameInput.getText().length()==0){
                    errorMessage +="Enter a valid User Screen Name!" ;
               }
               if(passwordInput.getText()==null || passwordInput.getText().length()==0){
                    errorMessage+="Enter a valid password!";
               }
               if(confirmPasswordInput.getText()==null || confirmPasswordInput.getText().length()==0){
                    errorMessage+="Confirm your password!";
               }
               
               if((passwordInput.getText()!=null && confirmPasswordInput.getText()!=null) && 
                       (passwordInput.getText().length() != confirmPasswordInput.getText().length())) {
                   
                        errorMessage+="Passwords you entered do not match. \nPlease try again";
               }
               else{
                        System.out.println("you have Register for new account");
                        Alert alert = new Alert(Alert.AlertType.INFORMATION);
                        alert.setTitle("Message");
                        alert.setHeaderText(null);
                        alert.setContentText("You have Register new account.");
                        alert.showAndWait();
                        return false;
               }
                   
               
               if(errorMessage.length()==0){
                    return true;
               }
               else {
                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                        alert.setTitle("Error");
                        alert.setHeaderText("Please Correct the errors listed below");
                        alert.setContentText(errorMessage);
                        alert.showAndWait();
                        return false;
                }
               
                
    }

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    
    
}
