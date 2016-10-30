/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.text.Text;
import javafx.fxml.Initializable;

public class FXMLRegisterController {
        @FXML private Text actiontarget;
  
        @FXML public void handleRegisterButtonAction(ActionEvent event) {
        actiontarget.setText("Sign in button pressed");
    }
}
