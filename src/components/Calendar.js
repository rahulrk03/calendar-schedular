import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TimePicker from "@mui/lab/TimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


require("react-big-calendar/lib/css/react-big-calendar.css");

const localizer = momentLocalizer(moment);

function Schedule() {

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [desc, setDesc] = useState("");
  const [openSlot, setOpenSlot] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({});

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
    console.log(events)
  };

  const handleSlotSelected = (slotInfo) => {
    console.log("selected");
    setTitle("");
    setDesc("");
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setOpenSlot(true);
  };

  const handleEventSelected = (event) => {
    console.log("event selected");
    setOpenEvent(true);
    setClickedEvent(event);
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc);
  };

  const setNewAppointment = () => {
    console.log("Appointment set");
    console.log(title, desc, start, end);
    let appointment = { title, start, end, desc };
    let newArr = [...events];
    newArr.push(appointment);
    setEvents(newArr);
    handleClose();
  };

  const deleteEvent = () => {
    let updatedEvents = events.filter(
      event => event["start"] !== start
    );
    setEvents(updatedEvents);
    handleClose();
  }

  const updateEvent = () => {
    const index = events.findIndex(event => event === clickedEvent);
    const updatedEvent = [...events];
    updatedEvent[index].title = title;
    updatedEvent[index].desc = desc;
    updatedEvent[index].start = start;
    updatedEvent[index].end = end;
    setEvents(updatedEvent);
    handleClose();
  }

  return (
    <div id="Calendar">
      {/* react-big-calendar library utilized to render calendar*/}
      <Calendar
        events={events}
        localizer={localizer}
        views={[ "day", "week", "month", "agenda"]}
        timeslots={2}
        defaultView="month"
        defaultDate={new Date()}
        selectable={true}
        onSelectEvent={(event) => handleEventSelected(event)}
        onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
      />

      {/* Material-ui Modal for booking new meeting */}
      <Dialog modal={false} open={openSlot} onRequestClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">
          {`Book an appointment on ${moment(start).format("MMMM Do YYYY")}`}
        </DialogTitle>
        <br />
        <DialogContent>
          <TextField
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            label="Description"
            multiLine
            maxRows={4}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <br />
            <br />
            <TimePicker
              label="End Time"
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            label="Cancel"
            variant="contained"
            color="warning"
            primary={false}
            keyboardFocused={true}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            label="Submit"
            variant="contained"
            color="success"
            primary={true}
            keyboardFocused={true}
            onClick={setNewAppointment}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog modal={false} open={openEvent} onRequestClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">
          {`Edit/View an appointment on ${moment(start).format("MMMM Do YYYY")}`}
        </DialogTitle>
        <br />
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            label="Description"
            multiLine
            rows={4}
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <br />
            <br />
            <TimePicker
              label="End Time"
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            label="Cancel"
            variant="contained"
            color="warning"
            primary={false}
            keyboardFocused={true}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            label="Delete"
            variant="contained"
            color="error"
            keyboardFocused={true}
            onClick={deleteEvent}
          >
            Delete
          </Button>
          <Button
            autoFocus
            label="Submit"
            variant="contained"
            color="success"
            primary={true}
            keyboardFocused={true}
            onClick={updateEvent}
          >
            Confirm Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Schedule;
