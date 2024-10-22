<?php
// Show PHP errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'classes/user.php';

$objUser = new User();

// GET
if (isset($_GET['edit_id'])) {
    $id = $_GET['edit_id'];
    $stmt = $objUser->runQuery("SELECT * FROM crud_users WHERE id=:id");
    $stmt->execute(array(":id" => $id));
    $rowUser = $stmt->fetch(PDO::FETCH_ASSOC);
} else {
    $id = null;
    $rowUser = null;
}

// POST
if (isset($_POST['btn_save'])) {
    $name = strip_tags($_POST['name']);
    $username = strip_tags($_POST['username']);
    $phone = strip_tags($_POST['phone']);
    $zipcode = strip_tags($_POST['zipcode']);
    $password = strip_tags($_POST['password']);
    $email = strip_tags($_POST['email']);

    try {
        // Hash the password before storing it
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        if ($id != null) {
            if ($objUser->update($name, $username, $phone, $zipcode, $hashedPassword, $email, $id)) {
                $objUser->redirect('index.php?updated');
            } else {
                $objUser->redirect('index.php?error');
            }
        } else {
            if ($objUser->insert($name, $username, $phone, $zipcode, $hashedPassword, $email)) {
                $objUser->redirect('index.php?inserted');
            } else {
                $objUser->redirect('index.php?error');
            }
        }
    } catch (PDOException $e) {
        echo "DB Error: " . $e->getMessage();
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <!-- Head metas, css, and title -->
    <?php require_once 'includes/head.php'; ?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/form-validation.js"></script> <!-- Link to the external JS file -->
    <style>
        .error-message {
            color: red;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <!-- Header banner -->
    <?php require_once 'includes/header.php'; ?>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar menu -->
            <?php require_once 'includes/sidebar.php'; ?>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <h1 style="margin-top: 10px">Add / Edit Users</h1>
                <p>Required fields are in (*)</p>
                <form method="post" id="userForm">
                    <div class="form-group">
                        <label for="id">ID</label>
                        <input class="form-control" type="text" name="id" id="id" value="<?php echo isset($rowUser['id']) ? $rowUser['id'] : ''; ?>" readonly>
                    </div>
                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input class="form-control" type="text" name="name" id="name" placeholder="First Name and Last Name" value="<?php echo isset($rowUser['name']) ? $rowUser['name'] : ''; ?>" required maxlength="100">
                        <div class="error-message" id="nameError"></div>
                    </div>
                    <div class="form-group">
                        <label for="username">Username *</label>
                        <input class="form-control" type="text" name="username" id="username" placeholder="Username" value="<?php echo isset($rowUser['username']) ? $rowUser['username'] : ''; ?>" required maxlength="50">
                        <div class="error-message" id="usernameError"></div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input class="form-control" type="text" name="email" id="email" placeholder="johndoel@gmail.com" value="<?php echo isset($rowUser['email']) ? $rowUser['email'] : ''; ?>" required maxlength="100">
                        <div class="error-message" id="emailError"></div>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input class="form-control" type="text" name="phone" id="phone" placeholder="Phone Number" value="<?php echo isset($rowUser['phone']) ? $rowUser['phone'] : ''; ?>" required maxlength="10">
                        <div class="error-message" id="phoneError"></div>
                    </div>
                    <div class="form-group">
                        <label for="zipcode">Zipcode *</label>
                        <input class="form-control" type="text" name="zipcode" id="zipcode" placeholder="Zipcode" value="<?php echo isset($rowUser['zipcode']) ? $rowUser['zipcode'] : ''; ?>" required maxlength="10">
                        <div class="error-message" id="zipcodeError"></div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password *</label>
                        <input class="form-control" type="password" name="password" id="password" placeholder="Password" required>
                        <div class="error-message" id="passwordError"></div>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password *</label>
                        <input class="form-control" type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required>
                        <div class="error-message" id="confirmPasswordError"></div>
                    </div>
                    <input class="btn btn-primary mb-2" type="submit" name="btn_save" value="Save">
                </form>
            </main>
        </div>
    </div>
    <!-- Footer scripts, and functions -->
    <?php require_once 'includes/footer.php'; ?>
</body>
</html>