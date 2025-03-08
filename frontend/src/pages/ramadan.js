// TODO: Mozilla view messed up, need to fix

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Snackbar,
  Typography,
  Container,
} from "@mui/material";
import { submitSignUp, getSpecificDay } from "../components/api/ramadan";

import "../assets/css/utils.css";

import Nav1 from "../components/nav1";
import { NAV_GC } from "../components/content/nav";
import { COLORS, THEME } from "../constants";
import { getNextPrayer } from "../components/utils";

const millisecondsInDay = 24 * 60 * 60 * 1000;
const getNextSevenDays = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const today = new Date();
    const date = new Date(today.getTime() + millisecondsInDay * i);
    const dateString = date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
    dates.push(dateString);
  }
  return dates;
};

const getMondayToSundayForWeek = () => {
  const dates = [];
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday.

  // Calculate days until previous Monday. Sunday is special case since need to go back 6 days
  // If current day is Monday, this equals 0 (stay at current monday)
  let daysUntilMonday = dayOfWeek === 0 ? -6 : -(dayOfWeek - 1);

  // Convert UTC time to Eastern time and shift to Monday
  const startDay = new Date(
    today.getTime() - offsetInMilliseconds + millisecondsInDay * daysUntilMonday
  );

  // Add dates from Monday to Sunday
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDay.getTime() + millisecondsInDay * i);
    const dateString = date.toISOString().split("T")[0];
    dates.push(dateString);
  }

  return dates;
};

const manuallySetSlots = {
  // maps dates to available slots
  "2024-04-10": 0,
  "2024-04-11": 0,
  "2024-04-12": 0,
  "2024-04-13": 0,
  "2024-04-14": 0,
};

const Ramadan = () => {
  const [days, setDays] = useState(getMondayToSundayForWeek());
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [userEmail, setUserEmail] = useState(""); // If want to use email
  const [guestName, setGuestName] = useState(""); // If want to use guest Name
  const [mitID, setMitID] = useState(""); // If want to use ID
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [mitIDError, setMitIDError] = useState("");
  const [guestNameError, setGuestNameError] = useState("");

  const [openNav, setOpenNav] = React.useState(false);
  const [prayerSet, setPrayerSet] = React.useState(false);
  const [nextPrayer, setNextPrayer] = React.useState(undefined);
  const { NAV_LEFT, NAV_RIGHT } = NAV_GC({ setOpen: setOpenNav });

  if (!prayerSet) {
    const { nextPrayer, nextPrayerTime, nextPrayerHour } = getNextPrayer();
    const timeDifference = Math.abs(new Date() - nextPrayerTime); // Difference in milliseconds
    const hours = Math.floor(timeDifference / 3600000); // milliseconds to hours
    const minutes = Math.round((timeDifference % 3600000) / 60000); // milliseconds to minutes

    // Format the next prayer time
    const nextPrayerFormattedTime = `${
      nextPrayerHour > 12
        ? nextPrayerHour -
          12 +
          ":" +
          (nextPrayerTime.getMinutes() >= 10
            ? nextPrayerTime.getMinutes()
            : "0" + nextPrayerTime.getMinutes()) +
          "pm"
        : nextPrayerHour +
          ":" +
          (nextPrayerTime.getMinutes() >= 10
            ? nextPrayerTime.getMinutes()
            : "0" + nextPrayerTime.getMinutes()) +
          "am"
    }`;

    // Format the time difference message to include both hours and minutes
    const timeDifferenceMessage = `${
      hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") + " and " : ""
    }${minutes} min`;

    // Set the next prayer message with the updated time difference format
    setNextPrayer(
      `Next prayer is ${
        nextPrayer.charAt(0).toUpperCase() + nextPrayer.slice(1)
      } at ${nextPrayerFormattedTime} (${timeDifferenceMessage})`
    );
    setPrayerSet(true);
  }

  const fetchDaysData = async () => {
    const dates = getMondayToSundayForWeek();
    const daysDataPromises = dates.map(async (date) => {
      try {
        let availableSlots;
        const response = await getSpecificDay(date);
        // const manuallySetSlot = manuallySetSlots[date];
        const signUpCount = response[date] ? response[date].length : 0;
        // if (manuallySetSlot !== undefined) {
        //   availableSlots = manuallySetSlot - signUpCount;
        // } else {
        // }
        if (date === "2025-03-12" || date === "2025-03-15") {
          availableSlots = 20 - signUpCount;
        }
        availableSlots = 35 - signUpCount;
        return { date, signUpCount, availableSlots };
      } catch (error) {
        console.error("Failed to fetch sign-ups for day:", date, error);
        return { date, signUpCount: "Error", availableSlots: "Error" };
      }
    });

    const daysData = await Promise.all(daysDataPromises);
    setDays(daysData);
  };

  useEffect(() => {
    fetchDaysData();
  }, []);

  const handleSignUpClick = (date) => {
    setSelectedDate(date);
    setOpen(true); // Open the modal
  };

  const submitForm = async () => {
    // Validate all fields again before submitting
    const isUserNameValid = validateUserName(userName);
    const isGuestNameValid = validateGuestName(guestName);
    const isEmailValid = validateEmail(userEmail);
    const isMitIDValid = validateMitID(mitID);

    if (
      !isUserNameValid ||
      !isGuestNameValid ||
      !isEmailValid ||
      !isMitIDValid
    ) {
      console.error("Validation failed");
      return; // Prevent form submission
    }

    try {
      await submitSignUp(selectedDate, userName, userEmail, mitID, guestName);
      console.log("Sign-up successful");
      setOpen(false);
      setUserName("");
      setUserEmail("");
      setMitID("");
      setGuestName("");
      await fetchDaysData();
      setOpenSnackbar(true);
      showConfirmationDialog();
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  const showConfirmationDialog = () => {
    setConfirmationOpen(true);
  };

  const validateUserName = (name) => {
    if (!name.trim()) {
      // Checks if the name is empty or just whitespace
      setUserNameError("Name is required");
      return false;
    }
    setUserNameError(""); // Clear error message
    return true;
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    if (!email || !re.test(String(email).toLowerCase())) {
      setUserEmailError("Invalid email address");
      return false;
    }
    setUserEmailError("");
    return true;
  };

  const validateMitID = (id) => {
    if (!/^\d{9}$/.test(id)) {
      setMitIDError("MIT ID must be 9 digits");
      return false;
    }
    setMitIDError("");
    return true;
  };

  const validateGuestName = (name) => {
    if (!name.trim()) {
      setGuestNameError("Guest name is required");
      return false;
    }
    setGuestNameError("");
    return true;
  };

  return (
    <>
      <Nav1
        open={openNav}
        vertical={false}
        collapsed={false}
        itemsLeft={NAV_LEFT}
        setOpen={setOpenNav}
        itemsRight={NAV_RIGHT}
        nextPrayer={nextPrayer}
        setNextPrayer={setNextPrayer}
        style={{
          width: "100vw",
          zIndex: "111",
          position: "fixed",
          paddingTop: "20px",
          backgroundColor: COLORS.WHITE,
          justifyContent: "space-between",
          // boxShadow: "4px 4px 4px #00000022",
        }}
        openedStyle={{ height: `${THEME.NAV.HEIGHT}px` }}
        closedStyle={{
          width: "50px",
          color: COLORS.BLACK,
          right: "calc(0% + 50px)",
        }}
      />
      <div
        className="flex column width-100 justify-content-center align-items-center"
        style={{
          height: "max-content",
          marginTop: "200px",
        }}
      >
        <Container maxWidth="md">
          {" "}
          {/* You can adjust 'sm', 'md', 'lg', 'xl' based on your needs */}
          <Typography variant="h3" gutterBottom>
            Iftar Guest Sign-up
          </Typography>
          <Typography variant="body1" gutterBottom>
            Celebrate Iftar with us!
          </Typography>
          <Typography variant="body2">
            While this year's iftars are exclusive to the MIT community and
            affilates, members may also sign up guests based on availability.
            Reserve a spot and share the experience. For more information or
            questions, please refer to the{" "}
            <a
              href="
                    https://docs.google.com/document/d/163IR8WsVyjBzNLdPmIViYGJ5y4mOkVGs0lGbKWGG460/edit?tab=t.0#heading=h.7bxjmf73y33f"
            >
              FAQ
            </a>{" "}
            .
          </Typography>
          <Typography variant="body2" gutterBottom>
            {/* new line */}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Weekly Sign-Up Schedule:</strong> Our sign-up form resets
            every Monday at 12:00 AM Eastern Time. Upon reset, it will allow
            sign-ups for the upcoming Monday through Sunday.
          </Typography>
        </Container>
        <TableContainer
          component={Paper}
          style={{ width: "80%", maxWidth: "800px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {/* <TableCell align="right">Available Slots</TableCell> */}
                <TableCell align="right">Sign Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {day.date}
                  </TableCell>
                  <TableCell align="right">
                    {day.availableSlots !== "Error"
                      ? Math.max(day.availableSlots, 0)
                      : "Error fetching slots"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={day.availableSlots <= 0}
                      onClick={() => handleSignUpClick(day.date)}
                    >
                      Sign Up
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To sign up a guest, please fill out below:
              </DialogContentText>
              <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={userName}
                onChange={(event) => {
                  const { value } = event.target;
                  setUserName(value); // Update the state
                  validateUserName(value); // Validate in real-time
                }}
                error={!!userNameError} // Apply error styling if there's an error message
                helperText={userNameError} // Show the error message
              />
              <TextField
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={userEmail}
                onChange={(event) => {
                  setUserEmail(event.target.value);
                  validateEmail(event.target.value); // Validate email in real-time
                }}
                error={!!userEmailError} // Show error state
                helperText={userEmailError} // Show error message
              />
              <TextField
                margin="dense"
                id="mit-id"
                label="MIT ID"
                type="text"
                fullWidth
                variant="standard"
                value={mitID}
                onChange={(event) => {
                  const { value } = event.target;
                  setMitID(value); // Update the state
                  validateMitID(value); // Validate in real-time
                }}
                error={!!mitIDError} // Apply error styling if there's an error message
                helperText={mitIDError} // Show the error message
              />
              <TextField
                margin="dense"
                id="guest-name"
                label="Guest Name"
                type="text"
                fullWidth
                variant="standard"
                value={guestName}
                onChange={(event) => {
                  const { value } = event.target;
                  setGuestName(value); // Update the state
                  validateGuestName(value); // Validate in real-time
                }}
                error={!!guestNameError} // Apply error styling if there's an error message
                helperText={guestNameError} // Show the error message
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={submitForm}>Sign Up</Button>
            </DialogActions>
          </Dialog>

          {/* <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={`Successfully signed up for ${selectedDate}!`}
                    action={
                        <Button
                            color="secondary"
                            size="small"
                            onClick={() => setOpenSnackbar(false)}
                        >
                            Close
                        </Button>
                    }
                /> */}
          <Dialog
            open={confirmationOpen}
            onClose={() => setConfirmationOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Sign Up Successful"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your guest has been successfully signed up. Thank you for
                joining us!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setConfirmationOpen(false)}
                color="primary"
                autoFocus
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </div>
    </>
  );
};

export default Ramadan;
