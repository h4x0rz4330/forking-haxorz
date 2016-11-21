/*
 * Author: Hardika Patel
 * File: ScreenController.java
 * Discription: Load the two screens and presented first one 
 */
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
