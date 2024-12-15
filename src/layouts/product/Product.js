import { useState } from "react";
import { Card, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import { Box } from "@mui/material";
import { PageLayout } from "examples/LayoutContainers/PageLayout";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Icon from "@mui/material/Icon";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDSnackbar from "components/MDSnackbar";
import { useMaterialUIController } from "context";
import { makeStyles } from "@mui/styles";
import MDAlert from "components/MDAlert";
import Bill from "layouts/billing/components/Bill";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function Product() {
  const [rows, setRows] = useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ]);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const schema = z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .nonempty("Name is required"),
  });

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    getValues,
    watch,
    register,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (values) => {
    setRows((prev) => [...prev, createData(values.name, 159, 6.0, 24, 4.0)]);
    setSuccessSB(true);
    reset({ name: "" });
  };

  const onDelete = (index) => {
    setRows((prev) => prev.filter((_, i) => index != i));
  };

  const [row, setRow] = useState();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        padding="10rem 10rem"
        gap="30 rem"
      >
        <Stack gap="5rem">
          <Card>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TableContainer
                component={Paper}
                style={{ padding: 0, margin: "0 auto", width: "100%" }}
              >
                <Table
                  sx={{ minWidth: 650, margin: "auto" }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        M
                      </TableCell>
                      <TableCell align="center" colSpan={1}>
                        AD
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Plastic</TableCell>
                      <TableCell align="center">Glass</TableCell>
                      <TableCell align="center">Metals</TableCell>
                      <TableCell align="center">Metals</TableCell>
                      <TableCell align="center">Food</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                        <TableCell align="center">{row.protein}</TableCell>
                        <TableCell align="center">{row.food}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Card>
          <Stack gap={1.5}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              bgcolor="ButtonShadow"
              gap={1}
            >
              <TextField
                required
                {...register("name", { required: "name is required" })}
                key="name"
                type="text"
                id="outlined-required"
                label="Required"
                error={!!errors?.name}
                helperText={errors?.name?.message}
              />

              <Button
                variant="contained"
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
              >
                Add
              </Button>
            </Box>
          </Stack>
          <Card id="delete-account">
            <MDBox pt={3} px={2}>
              <MDTypography variant="h6" fontWeight="medium">
                Billing Information
              </MDTypography>
            </MDBox>
            <MDBox pt={1} pb={2} px={2}>
              <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                <Bill
                  name="oliver liam"
                  company="viking burrito"
                  email="oliver@burrito.com"
                  vat="FRB1235476"
                />
                <Bill
                  name="lucas harper"
                  company="stone tech zone"
                  email="lucas@stone-tech.com"
                  vat="FRB1235476"
                />
                <Bill
                  name="ethan james"
                  company="fiber notion"
                  email="ethan@fiber.com"
                  vat="FRB1235476"
                  noGutter
                />
              </MDBox>
            </MDBox>
          </Card>
        </Stack>

        {isSubmitted && (
          <MDSnackbar
            color="success"
            icon="check"
            title="Product Addition"
            content="Product Added Successfully"
            dateTime="11 mins ago"
            open={successSB}
            onClose={closeSuccessSB}
            close={closeSuccessSB}
            bgWhite
          />
        )}
      </Box>
      {row && (
        <Modal
          open={true}
          onClose={() => setRow(null)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
              <MDBox
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                bgColor={darkMode ? "transparent" : "grey-100"}
                borderRadius="lg"
                p={3}
                mt="20rem"
                mb={2}
                pt={2}
              >
                <Typography>Hello</Typography>
              </MDBox>
            </MDBox>
          </Box>
        </Modal>
      )}
    </>
  );
}
