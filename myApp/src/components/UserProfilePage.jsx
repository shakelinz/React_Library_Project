import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  ThemeProvider,
  createTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { db } from "../config/fireBaseConfig";
import { doc, updateDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212", // single background for app & form
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

export const UserProfilePage = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {
      username: "",
      password: "",
      email: "",
    }
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersCollection = collection(db, "users");

    if (user.password === "" || user.username === "") {
      alert("Please fill in all fields");
      setUser({ ...JSON.parse(localStorage.getItem("currentUser")) });
      return;
    }

    const userDoc = doc(usersCollection, user.email);
    await updateDoc(userDoc, user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profile updated successfully!");
  };

 const handleDeleteAccount = async () => {
  try {
    const usersCollection = collection(db, "users");

    // Find the user doc by email
    const q = query(usersCollection, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];

      // Delete all books created by this user
      const booksCollection = collection(db, "books");
      const userBooksQuery = query(booksCollection, where("createdBy", "==", user.email));
      const userBooksSnapshot = await getDocs(userBooksQuery);
      userBooksSnapshot.forEach(async (bookDoc) => {
        await deleteDoc(bookDoc.ref);
      });

      // Delete user document
      await deleteDoc(userDoc.ref);

      // Clear local storage
      localStorage.removeItem("currentUser");

      alert("Account deleted successfully!");
      window.location = "/login";
    } else {
      alert("User not found.");
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    alert("Failed to delete account.");
  }
};


  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={2}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            User Profile
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ py: 1.2, borderRadius: 2 }}
              >
                Save Changes
              </Button>
              {/* a button to delete the account and all its books */}
              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ py: 1.2, borderRadius: 2 }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
