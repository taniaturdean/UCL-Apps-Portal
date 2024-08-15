import React, { useState, useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import "./ListingSkeleton.css"



const ListingSkeleton = () => {
  
    return (
        <div className="Listing" style={{ marginTop: "50px", marginLeft: "62px" }} >
        <Stack spacing={5}>
        <Skeleton sx={{ bgcolor: "#F0F4F4" }} variant="rounded" width={1154} height={400} />
        <Skeleton sx={{ bgcolor: "#F0F4F4" }} variant="rounded" width={1154} height={400} />
        <Skeleton sx={{ bgcolor: "#F0F4F4" }} variant="rounded" width={1154} height={400} />
        </Stack>
        </div>

        );
}
  
export default ListingSkeleton;