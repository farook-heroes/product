import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

ProductForm.propTypes = {};

function ProductForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
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
  );
}

export default ProductForm;
