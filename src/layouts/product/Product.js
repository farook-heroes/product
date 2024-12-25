import { useState } from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import MDButton from "components/MDButton";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { mockProduct } from "./mockData";
import { useTheme } from "@mui/material";

import Icon from "@mui/material/Icon";
import MDSnackbar from "components/MDSnackbar";
import { useMaterialUIController } from "context";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ModalWrapper from "examples/ModalWrapper";

/**
 * @typedef {object} Product
 * @property {string} title
 * @property {number} price
 * @property {string } description
 * @property {string } category

 */

const schema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .nonempty("Title is required"),
  price: z.number({ required_error: "Price is Required", invalid_type_error: "Price is Required" }),
  description: z.string().nonempty("description is required"),
  category: z.string().nonempty("category is required"),
});

export default function Product() {
  const [rows, setRows] = useState(mockProduct);

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const theme = useTheme();

  const [successSB, setSuccessSB] = useState(false);

  const [message, setMessage] = useState("");

  const closeSuccessSB = () => setSuccessSB(false);

  const productFormMethods = useForm({
    defaultValues: {
      title: "",
      price: null,
      description: "",
      category: "",
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
      title: "",
      price: null,
      description: "",
      category: "",
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
        title: "",
        price: null,
        description: "",
        category: "",
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
    <DashboardLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
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
                >
                  <MDButton
                    variant="contained"
                    color={darkMode ? "white" : "dark"}
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <Icon>add</Icon>&nbsp;Add Product
                  </MDButton>
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
          <ModalWrapper>
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
                }}
              >
                <Icon>cancel</Icon>&nbsp;Cancel
              </MDButton>
            </Box>
          </ModalWrapper>
        </Modal>
      )}
    </DashboardLayout>
  );
}
