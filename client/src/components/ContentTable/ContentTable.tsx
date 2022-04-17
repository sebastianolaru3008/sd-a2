import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import React from "react";

type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
};

const ContentTable = (props: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>{props.header}</TableHead>
        {!!props.body && <TableBody>{props.body}</TableBody>}
      </Table>
    </TableContainer>
  );
};

export default ContentTable;
