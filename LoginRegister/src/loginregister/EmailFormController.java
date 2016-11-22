/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package loginregister;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;

/**
 * FXML Controller class
 *
 * @author hardikapatel
 */
public class EmailFormController implements Initializable, ScreenInterface{

    /**
     * Initializes the controller class.
     */
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
}
