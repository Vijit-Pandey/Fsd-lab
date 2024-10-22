<?php
require_once 'database.php';

class User {
    private $conn;

    // Constructor
    public function __construct(){
        $database = new Database();
        $db = $database->dbConnection();
        if ($db) {
            $this->conn = $db;
        } else {
            throw new Exception("Failed to connect to the database.");
        }
    }

    // Execute queries SQL
    public function runQuery($sql){
        if ($this->conn === null) {
            throw new Exception("Database connection is not established.");
        }
        $stmt = $this->conn->prepare($sql);
        return $stmt;
    }

    // Insert
    public function insert($name, $username, $phone, $zipcode, $password, $email){
        try{
            $stmt = $this->conn->prepare("INSERT INTO crud_users (name, username, phone, zipcode, password, email) VALUES(:name, :username, :phone, :zipcode, :password, :email)");
            $stmt->bindparam(":name", $name);
            $stmt->bindparam(":username", $username);
            $stmt->bindparam(":phone", $phone);
            $stmt->bindparam(":zipcode", $zipcode);
            $stmt->bindparam(":password", $password);
            $stmt->bindparam(":email", $email);
            return $stmt->execute(); // Return boolean value
        }catch(PDOException $e){
            echo "DB Error: " . $e->getMessage();
            return false;
        }
    }

    // Update
    public function update($name, $username, $phone, $zipcode, $password, $email, $id) {
        try {
            $stmt = $this->conn->prepare("UPDATE crud_users SET name=:name, username=:username, phone=:phone, zipcode=:zipcode, password=:password, email=:email WHERE id=:id");
            $stmt->bindparam(":name", $name);
            $stmt->bindparam(":username", $username);
            $stmt->bindparam(":phone", $phone);
            $stmt->bindparam(":zipcode", $zipcode);
            $stmt->bindparam(":password", $password);
            $stmt->bindparam(":email", $email);
            $stmt->bindparam(":id", $id);
            return $stmt->execute(); // Return boolean value
        } catch (PDOException $e) {
            echo "DB Error: " . $e->getMessage();
            return false;
        }
    }

    // Delete
    public function delete($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM crud_users WHERE id=:id");
            $stmt->bindparam(":id", $id);
            return $stmt->execute(); // Return boolean value
        } catch (PDOException $e) {
            echo "DB Error: " . $e->getMessage();
            return false;
        }
    }

    // Redirect method
    public function redirect($url) {
        header("Location: $url");
        exit;
    }
}
?>