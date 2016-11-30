
/************************************************/
/*
/* Filename: Register.java
/*
/* Purpose: Helper class for encryption
/*
/* Author: Ryan Ngo
/*
/* Change Log:
/* {Date}: {Description}
/* 11/16/16: added encryption method for logging in and registering
/*
/*
/* 
/*
/*
/************************************************/

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

//This class acts as a helper class that encrypts and decrypts data using a 128 bit key and 16 bit initialization vector
public class Encryptor {
	//initilization keys
	public static String key = "Bar12345Bar12345"; // 128 bit key
   public static String initVector = "RandomInitVector"; // 16 bytes IV
	
	//This function takes the key, initilization vector and value and encrypts the value and returns the encrypted string
   public static String encrypt(String key, String initVector, String value) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

            byte[] encrypted = cipher.doFinal(value.getBytes());

            return Base64.encodeBase64String(encrypted);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return value;
    }

	 
	//This function takes the key, initilization vector and value and decrypts the value and returns the decrypted string
    public static String decrypt(String key, String initVector, String encrypted) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

            byte[] original = cipher.doFinal(Base64.decodeBase64(encrypted));

            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return encrypted;
    }
}