
/************************************************/
/*
/* Filename: Client.js
/*
/* Purpose: Allows the user to login. Creates cookies on login
/*
/* Author: Ryan Ngo
/*
/* Change Log:
/* {Date}: {Description}
/* 10/24/16: add login function
/* 11/16/16: changed encryption algorithm using Encryptor class
 * 11/21/16: changed to login by email rather than username
 */
/*
/*
/************************************************/

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.ResultSet;
import com.mysql.jdbc.Statement;

/**
 * Servlet implementation class Register
 */
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	/*
		This function taks a username (email) and password from the request and checks against the database to see if any user matches. Upon success, cookies are created.
	*/
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		final PrintWriter out = response.getWriter();
		//grab parameters
		String email = request.getParameter("username");
		String password = request.getParameter("password");
		password = Encryptor.encrypt(Encryptor.key, Encryptor.initVector, password);
		
		System.out.println("logging in: "+ email);
		
		//jdbc connection init
		String JDBC = "com.mysql.jdbc.Driver";
		String DBURL = "jdbc:mysql://localhost:3306/h4x0rz";
		String user = "h4x0rz";
		String pass = "Howuknowdis?";
		Connection conn = null;
		Statement stmt = null;
		
		try{
			Class.forName(JDBC);
			System.out.println("Connecting to db...");
			conn = (Connection) DriverManager.getConnection(DBURL, user,pass);
			System.out.println("Creating Statement...");
			stmt = (Statement) conn.createStatement();
			//grabs any information regarding any user with requested email. At one most.
			String sql = "Select * from user where email = \'"+email+"\'";
			System.out.println(sql);
			ResultSet rs = (ResultSet) stmt.executeQuery(sql);
			if(!rs.next()){
				//if user doesn't exist with request email
				rs.close();
				out.print("0");
				System.out.println("login failed. user doesn't exist.");
				rs.close();
				stmt.close();
				conn.close();
			}
			else{
				//if user exists
				String name = rs.getString("username");
				String userPass = rs.getString("password");
				//verify that username and pass are not null
				if (name!=null && userPass != null){
					System.out.println(name+","+userPass);
					rs.close();
					//verify hashed passwords match
					if (password.equals(userPass)){
						//create and push cookies
						Cookie userCookie = new Cookie("Username", name);
						Cookie passCookie = new Cookie("Password", userPass);
						userCookie.setMaxAge(1800);
						passCookie.setMaxAge(1800);
						response.addCookie(userCookie);
						response.addCookie(passCookie);
						System.out.println("login success");
						//return 1 for succes
						out.print("1");
					}else{
						//return 0 if passwords don't match
						out.print("0");
						System.out.println("login failed. password incorrect.");
					}
					stmt.close();
					conn.close();
				}		
			}
		}catch (ClassNotFoundException | SQLException e){
			e.printStackTrace();
		}
		
	}

}
