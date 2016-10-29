
import java.io.IOException;
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

public class MainController extends Application 
{
    String user = "JavaFX";
    String password = "password";
    String checkUser, checkPassword;
    public static void main(String[] args) 
    {
        launch(args);
    }

    @Override
    public void start(Stage stage) 
    {
        stage.setTitle( "Menu" );
                
        Group root = new Group();
        Scene theScene = new Scene( root, Color.BLACK );
            
        Image lobbyImg = new Image( "/img/lobby.png" );
        ImageView imgView = new ImageView(lobbyImg);
        
        Rectangle2D primaryScreenBounds = Screen.getPrimary().getVisualBounds();

        //set Stage boundaries to visible bounds of the main screen
//        stage.setX(primaryScreenBounds.getMinX());
//        stage.setY(primaryScreenBounds.getMinY());
//        stage.setWidth(primaryScreenBounds.getWidth());
//        stage.setHeight(primaryScreenBounds.getHeight());
        
        imgView.setX(primaryScreenBounds.getMinX());
        imgView.setY(primaryScreenBounds.getMinY());
        imgView.setFitWidth(primaryScreenBounds.getWidth());
        imgView.setFitHeight(primaryScreenBounds.getHeight());
        

        BorderPane bp = new BorderPane();
        
        HBox hb = new HBox();
        hb.setPadding(new Insets(20,20,20,30));
        
        // Adding logo to the screen
        Image logoImage = new Image(getClass().getResourceAsStream("img/logo.png"));
        ImageView logoImg = new ImageView(logoImage);
        hb.getChildren().add(logoImg);
        logoImg.setFitHeight(240);
        logoImg.setFitWidth(390);
        hb.setLayoutX(400);
        hb.setLayoutY(100);
        
        //Adding GridPane
        GridPane gridPane = new GridPane();
//        gridPane.setPadding(new Insets(20,20,20,20));
        gridPane.setHgap(5);
        gridPane.setVgap(5);
        
        Label lblUserName = new Label("Username:");
        final TextField txtUserName = new TextField();
        Label lblPassword = new Label("Password:");
        final TextField txtPassword = new TextField();
        //txtPassword.setStyle("-fx-background-color: transparent;");
        txtUserName.getStyleClass().add("validation-error");
        txtPassword.getStyleClass().add("validation-error");
        
        Label lblMessage = new Label();
        
        gridPane.add(lblUserName, 0, 0);
        gridPane.add(txtUserName, 1, 0);
        gridPane.add(lblPassword, 0, 1);
        gridPane.add(txtPassword, 1, 1);
        gridPane.add(lblMessage, 2, 1);
        
        // Layout the border Pane
        bp.setCenter(gridPane);
        bp.setLayoutX(450);
        bp.setLayoutY(330);
        
        
        // Horizontal box to store buttons init 
        HBox buttonHBox = new HBox();
//        buttonBox.setPadding(new Insets(50, 12, 15, 12));
        buttonHBox.setSpacing(40);
        buttonHBox.setLayoutX(400);
        buttonHBox.setLayoutY(500);
        buttonHBox.setStyle("-fx-background-color: transparent;");
        
        // Login Button
        Image loginImage = new Image(getClass().getResourceAsStream("img/Login_Button.png"));
        Button loginBtn = new Button(" ");
        ImageView imgL = new ImageView(loginImage);
        loginBtn.setGraphic(imgL);
        imgL.setFitHeight(140);
        imgL.setFitWidth(190);
//        loginBtn.setLayoutX(570);
//        loginBtn.setLayoutY(500);
        loginBtn.setStyle("-fx-background-color: transparent;");
             
        // Create New Account Button
        Image accountImage = new Image(getClass().getResourceAsStream("img/New_Account_Btn.png"));
        Button accountBtn = new Button("");
        accountBtn.setId("ABtn");
        ImageView imgA = new ImageView(accountImage);
        accountBtn.setGraphic(imgA);
        imgA.setFitHeight(140);
        imgA.setFitWidth(190);
        accountBtn.setStyle("-fx-background-color: transparent;");
        
        // Action Listener for Login Button
        loginBtn.setOnAction(new EventHandler<ActionEvent>() 
        {
            @Override
            public void handle(ActionEvent e) 
            {
//                stage.setScene(scene1);
//                stage.setHeight(1000);
//                stage.setWidth(1000);
                  
                  checkUser = txtUserName.getText().toString();
                  checkPassword = txtPassword.getText().toString();
                  
                  if(checkUser.equals(user) && checkPassword.equals(password))
                  {
                      lblMessage.setText("You have Loged In");
                  }
            }
        });
        
        
        // Action Listener for Creae new Account Button
        accountBtn.setOnAction(new EventHandler<ActionEvent>() 
        {
            @Override
            public void handle(ActionEvent e) 
            {
               FXMLLoader loader = new FXMLLoader(getClass().getResource("RegisterView.fxml"));
                  Group root1 = new Group();
             
                Scene newScene= new Scene(root1);
                newScene.setFill(Color.BLACK);
                try {
                        newScene = new Scene(loader.load());
                } catch (IOException ex) {
                        // TODO: handle error
                return;
                }
                   
                Stage stage1 = new Stage();
                
                //set Stage boundaries to visible bounds of the main screen
                stage1.setX(primaryScreenBounds.getMinX());
                stage1.setY(primaryScreenBounds.getMinY());
                stage1.setWidth(primaryScreenBounds.getWidth());
                stage1.setHeight(primaryScreenBounds.getHeight());
                
//                Image accountImg = new Image( "/img/lobby.png" );
//                ImageView accountImgView = new ImageView(accountImg);
//
//                Rectangle2D primaryScreenBounds = Screen.getPrimary().getVisualBounds();
//                
//                accountImgView.setX(primaryScreenBounds.getMinX());
//                accountImgView.setY(primaryScreenBounds.getMinY());
//                accountImgView.setFitWidth(primaryScreenBounds.getWidth());
//                accountImgView.setFitHeight(primaryScreenBounds.getHeight());
//                
//                root.getChildren().add(accountImgView);
                stage1.initOwner(stage);
                stage1.setScene(newScene);
                stage1.showAndWait();
                stage.close();
            }
        });
        
        
        buttonHBox.getChildren().addAll(loginBtn, accountBtn);
        root.getChildren().addAll(imgView, hb, buttonHBox, bp);
        
        
        //Add ID's to Nodes
        bp.setId("bp");
        gridPane.setId("root");
        
        theScene.getStylesheets().add(getClass().getClassLoader().getResource("Style.css").toExternalForm());
        stage.setScene(theScene);
        stage.show();
    }
}