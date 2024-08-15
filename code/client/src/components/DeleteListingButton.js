import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const DeleteListingButton = (props) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const listingID = props.listingID;
    axios
      .delete(`/admin/listings/delete/${listingID}`)
      .then((response) => {
        if (response.data.auth === false) {
            navigate('/expired');
        } else if (response.data.result === "success") {
            console.log(`listingID ${listingID} successfully deleted`)
            navigate('/admin')
        } else {
            navigate('/error');
        }
      })
      .catch((err) => {});
  };

  return (
    <Button variant="contained" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeleteListingButton;
