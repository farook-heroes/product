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
/**
 * @typedef {object} Product
 * @property {string} title
 * @property {number} price
 * @property {string } description
 * @property {string } category

 */

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
            <TableCell>Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
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
