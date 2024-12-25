import React from "react";
import PropTypes, { object } from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Icon from "@mui/material/Icon";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";

ProductTable.propTypes = {
  rows: object,
  onDelete: (_index) => {},
  onEdit: (_index, _row) => {},
};

function ProductTable({ rows, onDelete, onEdit }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
            <TableCell>Paper</TableCell>
            <TableCell align="right">Plastic</TableCell>
            <TableCell align="right">Glass</TableCell>
            <TableCell align="right">Metals</TableCell>
            <TableCell align="right">Metals</TableCell>
            <TableCell align="right">Food</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="center">{row.food}</TableCell>
              <TableCell align="center">
                <MDButton
                  variant="text"
                  color={darkMode ? "white" : "dark"}
                  onClick={() => {
                    onEdit(index, row);
                  }}
                >
                  <Icon>edit</Icon>&nbsp;edit
                </MDButton>
              </TableCell>
              <TableCell>
                <MDButton variant="text" color="error" onClick={() => onDelete(index)}>
                  <Icon>delete</Icon>&nbsp;delete
                </MDButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
