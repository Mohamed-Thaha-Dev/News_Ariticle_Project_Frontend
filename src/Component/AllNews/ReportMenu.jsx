import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ReportNews } from "../../AllApi/newApi";
import { toast } from "react-toastify";

const ReportMenu = ({ article }) => {
  const [anchor, setAnchor] = useState(null); // main menu
  const [reportAnchor, setReportAnchor] = useState(null); // submenu
  const [openDialog, setOpenDialog] = useState(false); // for Other
  const [otherText, setOtherText] = useState("");
const [loading, setLoading] = useState(false);

  const open = Boolean(anchor);
  const reportOpen = Boolean(reportAnchor);

  const handleReportReason = async(id,reportContent,otherText) => {
    if (reportContent === "Other") {
      setOpenDialog(true); // open textarea modal
      setReportAnchor(null); // close submenu
      return;
    }

    try{
     setLoading(true)
      const response  = await ReportNews(id,reportContent,otherText)
      console.log(response)
      toast.success(response.data,{
        position:"top-right"
      })
    }
    catch(err){
        console.log(err)
        toast.error(err.response?.data)
    }
    finally{
      setLoading(false)
      setReportAnchor(null)
    }

  
  };

  const handleSubmitOther = async () => {
    try {
      setLoading(true)
    // send the typed reason to backend
    const response = await ReportNews(article.sNo, otherText);
    toast.success(response.data, { position: "top-right" });
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data);
  } finally {
    setLoading(false)
    setOpenDialog(false); // close dialog
    setOtherText("");     // clear input
    setAnchor(null);      // close main menu
  }
  };

  return (
    <div className="absolute top-3 right-3">
      <MoreVertIcon
        className="cursor-pointer"
        onClick={(e) => setAnchor(e.currentTarget)}
      />

      {/* Main Menu */}
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={() => {
          setAnchor(null);
          if (document.activeElement) {
            document.activeElement.blur(); // force remove focus
          }
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableAutoFocus
        disableRestoreFocus // 🔥 this line
      >
        <MenuItem
          onClick={(e) => {
            setReportAnchor(e.currentTarget);
            setAnchor(null); // close parent menu immediately
          }} // submenu trigger
        >
          Report ▶
        </MenuItem>

        <MenuItem onClick={() => console.log("Details:", article.sNo)}>
          Details
        </MenuItem>
      </Menu>

      {/* Report Submenu */}
      <Menu
        anchorEl={reportAnchor}
        open={reportOpen}
        onClose={() => setReportAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        disableAutoFocusItem
        disableRestoreFocus // 🔥 this line
      >
        <Popover
          open={Boolean(reportAnchor)}
          anchorEl={reportAnchor}
          onClose={() => setReportAnchor(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={() => handleReportReason(article.sNo,"Abuse")}  style={{ cursor: loading ? "not-allowed" : "pointer" }}>Abuse</MenuItem>
          <MenuItem onClick={() => handleReportReason(article.sNo,"Span")}  style={{ cursor: loading ? "not-allowed" : "pointer" }}>Spam</MenuItem>
          <MenuItem onClick={() => handleReportReason(article.sNo,"Harassment")}  style={{ cursor: loading ? "not-allowed" : "pointer" }}>
            Harassment
          </MenuItem>
          <MenuItem onClick={() => handleReportReason(article.sNo,"Other")}>Other</MenuItem>
        </Popover>
      </Menu>

      {/* Dialog for Other */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        disableEnforceFocus
        disableRestoreFocus // 🔥 this line
        maxWidth="sm"
        BackdropProps={{
          style: { backdropFilter: "blur(5px)" }, // blur background
        }}
      >
        <DialogTitle>Report - Other Reason</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter your reason"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" type="button" onClick={handleSubmitOther} disabled = {loading}  style={{ cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportMenu;
