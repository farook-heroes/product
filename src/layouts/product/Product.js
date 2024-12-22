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
import Grid from "@mui/material/Grid";
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
import { purple, grey, white } from "@mui/material/colors";
import Bill from "layouts/billing/components/Bill";

function createData(name, calories, fat, carbs, protein, food) {
  return { name, calories, fat, carbs, protein, food };
}
import { createTheme, useTheme } from "@mui/material/styles";

const schema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .nonempty("Name is required"),
  calories: z.number({ invalid_type_error: "Calories must be number" }),
  carbs: z.number({ invalid_type_error: "Carbs must be Number" }),
  protein: z.number({ invalid_type_error: "Protien must be Number" }),
  fat: z.number({ invalid_type_error: "Fat must be Number" }),
  protein: z.number({ invalid_type_error: "Protien must be Number" }),
  food: z.number({ invalid_type_error: "Food must be Number" }),
});

export default function Product() {
  const [rows, setRows] = useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 0.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 0.0),
    createData("Eclair", 262, 16.0, 24, 6.0, 0.0),
    createData("Cupcake", 305, 3.7, 67, 4.3, 0.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9, 0.0),
  ]);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const theme = useTheme();

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

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    getValues,
    watch,
    setError,
    register,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      name: "",
      calories: null,
      carbs: null,
      fat: null,
      protein: null,
      food: null,
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (values) => {
    setRows((prev) => [...prev, { ...values }]);
    setSuccessSB(true);
    reset({
      name: "",
      calories: null,
      carbs: null,
      fat: null,
      protein: null,
      food: null,
    });
  };

  const onDelete = (index) => {
    setRows((prev) => prev.filter((_, i) => index != i));
  };

  /* @typdef string*/
  const [row, setRow] = useState();

  const [index, setIndex] = useState();

  React.useEffect(() => {
    if (row) reset({ ...row });
    else
      reset({
        name: "",
        calories: null,
        carbs: null,
        fat: null,
        protein: null,
        food: null,
      });
  }, [row]);

  const onSubmitEdit = (values) => {
    setRows((prev) => {
      prev[index] = values;
      return prev;
    });
    setRow(null);
  };

  const formItem = () => {
    return (
      <>
        <Grid container spacing={2} padding="2rem 2rem">
          <Grid item xl={4} md={2} xs={2}>
            <TextField
              required
              {...register("name")}
              key="name"
              type="text"
              id="standard-multiline-static"
              label="Name"
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </Grid>
          <Grid item xl={4} md={2} xs={2}>
            <TextField
              required
              {...register("calories", {
                valueAsNumber: true,
              })}
              key="calories"
              type="text"
              id="standard-multiline-static"
              label="Calories"
              error={!!errors?.calories}
              helperText={errors?.calories?.message}
            />
          </Grid>
          <Grid item xl={4} md={2} xs={2}>
            <TextField
              required
              {...register("carbs", {
                valueAsNumber: true,
              })}
              key="carbs"
              type="number"
              id="standard-multiline-static"
              label="Carbs"
              error={!!errors?.carbs}
              helperText={errors?.carbs?.message}
            />
          </Grid>
          <Grid item xl={4} md={2} xs={2}>
            <TextField
              required
              {...register("fat", {
                valueAsNumber: true,
              })}
              key="fat"
              type="number"
              id="standard-multiline-static"
              label="Fat"
              error={!!errors?.fat}
              helperText={errors?.fat?.message}
            />
          </Grid>
          <Grid item xl={4} md={2} xs={2}>
            <TextField
              required
              {...register("protein", {
                valueAsNumber: true,
              })}
              key="protein"
              type="number"
              id="standard-multiline-static"
              label="Protiein"
              error={!!errors?.protein}
              helperText={errors?.protein?.message}
            />
          </Grid>
          <Grid item xl={4} md={2} xs={2}>
            <TextField
              required
              {...register("food", {
                valueAsNumber: true,
              })}
              key="food"
              type="number"
              id="standard-multiline-static"
              label="Food"
              error={!!errors?.food}
              helperText={errors?.food?.message}
            />
          </Grid>
        </Grid>
      </>
    );
  };

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
        margin="3rem 3rem"
        gap="30rem"
      >
        <Stack gap="5rem">
          <Card>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ display: "table-header-group" }}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>MRF</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">AD</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
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
                            setRow(row);
                            setIndex(index);
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
          </Card>
          <Stack gap={1.5}>
            <Box
              component="div"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={theme.palette.background.paper}
              p={3}
              mb={2}
              pt={2}
            >
              {formItem()}
              <MDButton
                variant="contained"
                color={darkMode ? "white" : "dark"}
                onClick={() => {
                  handleSubmit(onSubmit)();
                }}
              >
                <Icon>add</Icon>&nbsp;Add
              </MDButton>
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
          onClose={() => {
            setRow(null);
          }}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box component="div" display="flex" flexDirection="column" p={0} m={0}>
              <Box
                component="div"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bgcolor={theme.palette.background.paper}
                p={3}
                mt="20rem"
                mb={2}
                pt={2}
              >
                {formItem()}
                <Box display="flex" flexDirection="row" alignContent="space-around" gap="2rem">
                  <MDButton
                    variant="contained"
                    color={darkMode ? "white" : "dark"}
                    onClick={() => {
                      handleSubmit(onSubmitEdit)();
                    }}
                  >
                    <Icon>edit</Icon>&nbsp;edit
                  </MDButton>
                  <MDButton
                    variant="contained"
                    color={"error"}
                    onClick={() => {
                      setRow(null);
                      reset();
                    }}
                  >
                    <Icon>cancel</Icon>&nbsp;Cancel
                  </MDButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}
