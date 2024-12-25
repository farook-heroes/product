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
import { useForm, Controller, FormProvider } from "react-hook-form";
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
import { purple, grey, white, indigo } from "@mui/material/colors";
import Bill from "layouts/billing/components/Bill";

function createData(name, calories, fat, carbs, protein, food) {
  return { name, calories, fat, carbs, protein, food };
}
import { createTheme, useTheme } from "@mui/material/styles";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";

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

  const [message, setMessage] = useState("");

  const closeSuccessSB = () => setSuccessSB(false);

  const productFormMethods = useForm({
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

  const {
    handleSubmit,
    reset,
    formState: { isSubmitted },
  } = productFormMethods;

  const onSubmit = (values) => {
    setRows((prev) => [...prev, { ...values }]);
    setSuccessSB(true);
    setEdit(false);
    reset({
      name: "",
      calories: null,
      carbs: null,
      fat: null,
      protein: null,
      food: null,
    });
    setMessage("Product Added Successfully");
  };

  const onDelete = (index) => {
    setRows((prev) => prev.filter((_, i) => index != i));
  };

  const [row, setRow] = useState();

  const [index, setIndex] = useState();

  const [edit, setEdit] = useState(false);

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
    setMessage("Product Updated Successfully");
    setSuccessSB(true);
  };

  const formItem = () => {
    return (
      <>
        <FormProvider {...productFormMethods}>
          <ProductForm />
        </FormProvider>
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
            <ProductTable
              rows={rows}
              onDelete={(index) => {
                onDelete(index);
              }}
              onEdit={(index, row) => {
                setRow(row);
                setIndex(index);
              }}
            />
          </Card>
          <Stack gap={1.5}>
            <Box
              component="div"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={3}
              mb={2}
              pt={2}
              bgcolor={edit && !row ? theme.palette.background.paper : undefined}
            >
              {edit && !row ? (
                <>
                  {formItem()}
                  <Box display="flex" flexDirection="row" alignContent="space-around" gap="2rem">
                    <MDButton
                      variant="contained"
                      color={darkMode ? "white" : "dark"}
                      onClick={() => {
                        handleSubmit(onSubmit)();
                      }}
                    >
                      <Icon>add</Icon>&nbsp;Add
                    </MDButton>
                    <MDButton
                      variant="contained"
                      color={"error"}
                      onClick={() => {
                        setEdit(false);
                        reset();
                      }}
                    >
                      <Icon>cancel</Icon>&nbsp;Cancel
                    </MDButton>
                  </Box>
                </>
              ) : (
                <Card
                  component="div"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={theme.palette.background.default}
                  content="Add Button"
                >
                  <Box>
                    <MDButton
                      variant="contained"
                      color={darkMode ? "white" : "dark"}
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      <Icon>add</Icon>&nbsp;Add Product
                    </MDButton>
                  </Box>
                </Card>
              )}
            </Box>
          </Stack>
        </Stack>

        {isSubmitted && (
          <MDSnackbar
            color="success"
            icon="check"
            title="Product Status"
            content={message}
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
