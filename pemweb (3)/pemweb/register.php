<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $email = $_POST['email'];

    try {
        $sql = "INSERT INTO users (username, password, email) VALUES (:username, :password, :email)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        echo "<script>alert('Pendaftaran berhasil!'); window.location.href='page.html';</script>";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo "<script>alert('Username atau email sudah terdaftar!'); window.location.href='daftar.html';</script>";
        } else {
            echo "Error: " . $e->getMessage();
        }
    }
}
?>