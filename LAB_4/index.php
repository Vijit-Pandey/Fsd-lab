<?php
// Show PHP errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'classes/user.php';

try {
  $objUser = new User();
  echo "User class instantiated successfully.";
} catch (Exception $e) {
  echo $e->getMessage();
  $objUser = null; // Ensure $objUser is set to null if instantiation fails
}

// GET for delete
if (isset($_GET['delete_id'])) {
  $id = $_GET['delete_id'];
  try {
    if ($id != null && $objUser != null) {
      if ($objUser->delete($id)) {
        $objUser->redirect('index.php?deleted');
      }
    } else {
      var_dump($id);
    }
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
}

// GET for edit
if (isset($_GET['edit_id'])) {
  $id = $_GET['edit_id'];
  try {
    if ($id != null && $objUser != null) {
      $stmt = $objUser->runQuery("SELECT * FROM crud_users WHERE id=:id");
      $stmt->execute(array(":id" => $id));
      $rowUser = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
      var_dump($id);
    }
  } catch (PDOException $e) {
    echo $e->getMessage();
  }
}

// POST for update
if (isset($_POST['btn_update'])) {
  $id = $_POST['id'];
  $name = strip_tags($_POST['name']);
  $username = strip_tags($_POST['username']);
  $phone = strip_tags($_POST['phone']);
  $zipcode = strip_tags($_POST['zipcode']);
  $password = strip_tags($_POST['password']);
  $email = strip_tags($_POST['email']);

  try {
    // Hash the password before storing it
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    if ($id != null && $objUser != null) {
      if ($objUser->update($name, $username, $phone, $zipcode, $hashedPassword, $email, $id)) {
        $objUser->redirect('index.php?updated');
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
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <!-- Header banner -->
    <?php require_once 'includes/header.php'; ?>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar menu -->
            <?php require_once 'includes/sidebar.php'; ?>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <h1 style="margin-top: 10px">DataTable</h1>
                <?php
                  if (isset($_GET['updated'])) {
                    echo '<div class="alert alert-info alert-dismissable fade show" role="alert">
                    <strong>User!</strong> Updated with success.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"> &times; </span>
                      </button>
                    </div>';
                  } else if (isset($_GET['deleted'])) {
                    echo '<div class="alert alert-info alert-dismissable fade show" role="alert">
                    <strong>User!</strong> Deleted with success.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"> &times; </span>
                      </button>
                    </div>';
                  } else if (isset($_GET['inserted'])) {
                    echo '<div class="alert alert-info alert-dismissable fade show" role="alert">
                    <strong>User!</strong> Inserted with success.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"> &times; </span>
                      </button>
                    </div>';
                  } else if (isset($_GET['error'])) {
                    echo '<div class="alert alert-info alert-dismissable fade show" role="alert">
                    <strong>DB Error!</strong> Something went wrong with your action. Try again!
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true"> &times; </span>
                      </button>
                    </div>';
                  }
                ?>
                <?php if (isset($rowUser)) { ?>
                  <h2>Edit User</h2>
                  <form method="post">
                    <input type="hidden" name="id" value="<?php echo $rowUser['id']; ?>">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" class="form-control" name="name" value="<?php echo $rowUser['name']; ?>" required>
                    </div>
                    <div class="form-group">
                      <label for="username">Username</label>
                      <input type="text" class="form-control" name="username" value="<?php echo $rowUser['username']; ?>" required>
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone</label>
                      <input type="text" class="form-control" name="phone" value="<?php echo $rowUser['phone']; ?>" required>
                    </div>
                    <div class="form-group">
                      <label for="zipcode">Zipcode</label>
                      <input type="text" class="form-control" name="zipcode" value="<?php echo $rowUser['zipcode']; ?>" required>
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" class="form-control" name="password" required>
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" class="form-control" name="email" value="<?php echo $rowUser['email']; ?>" required>
                    </div>
                    <button type="submit" class="btn btn-primary" name="btn_update">Update</button>
                  </form>
                <?php } ?>
                  <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Phone</th>
                                <th>Zipcode</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                        $stmt = $objUser->runQuery("SELECT * FROM crud_users");
                        $stmt->execute();
                        if($stmt->rowCount() > 0) {
                            while($rowUser = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        ?>
                            <tr>
                                <td><?php print($rowUser['id']); ?></td>
                                <td><?php print($rowUser['name']); ?></td>
                                <td><?php print($rowUser['username']); ?></td>
                                <td><?php print($rowUser['phone']); ?></td>
                                <td><?php print($rowUser['zipcode']); ?></td>
                                <td><?php print($rowUser['email']); ?></td>
                                <td>
                                  <a href="index.php?edit_id=<?php print($rowUser['id']); ?>" title="Edit">
                                    <i class="fas fa-edit"></i>
                                  </a>
                                  <a class="confirmation" href="index.php?delete_id=<?php print($rowUser['id']); ?>" title="Delete">
                                    <i class="fas fa-trash-alt"></i>
                                  </a>
                                </td>
                            </tr>
                        <?php } } ?>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
    <!-- Footer scripts, and functions -->
    <?php require_once 'includes/footer.php'; ?>

    <!-- Custom scripts -->
    <script>
        // JQuery confirmation
        $(document).ready(function() {
            $('.confirmation').on('click', function () {
                return confirm('Are you sure you want to delete this user?');
            });
        });
    </script>
</body>
</html>