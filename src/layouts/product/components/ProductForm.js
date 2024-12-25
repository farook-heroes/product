import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { z } from "zod";

ProductForm.propTypes = {};
/**
 * @typedef {object} Product
 * @property {string} title
 * @property {number} price
 * @property {string } description
 * @property {string } category

 */
function ProductForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const s = { ...register("price") };
  console.log(s, "head");
  return (
    <Grid container spacing={2} padding="2rem 2rem">
      <Grid item xl={6} md={2} xs={2}>
        <TextField
          required
          {...register("title")}
          key="name"
          type="text"
          id="standard-multiline-static"
          label="Title"
          rows={2}
          error={!!errors?.title}
          helperText={errors?.title?.message}
          fullWidth
        />
      </Grid>
      <Grid item xl={4} md={2} xs={2}>
        <TextField
          required
          {...register("price", {
            valueAsNumber: true,
          })}
          key="price"
          type="number"
          id="standard-multiline-static"
          label="price"
          error={!!errors?.price}
          helperText={errors?.price?.message}
          fullWidth
        />
      </Grid>
      <Grid item xl={6} md={2} xs={2}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }} size="medium">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            {...register("category")}
            key="category"
            value={watch("category")}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            error={!!errors?.category}
            helperText={errors?.category?.message}
            fullWidth
            style={{ height: 30 }}
          >
            <MenuItem value={"men's clothing"}>Men Clothing</MenuItem>
            <MenuItem value={"women's clothing"}>Women Clothing</MenuItem>
            <MenuItem value={"electronics"}>Electronics</MenuItem>
            <MenuItem value={"jewelery"}>Jewelery</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xl={12} md={12} xs={12}>
        <TextField
          required
          {...register("description")}
          key="description"
          type="string"
          id="standard-multiline-static"
          label="description"
          maxRows={4}
          rows={4}
          error={!!errors?.description}
          helperText={errors?.description?.message}
          multiline
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default ProductForm;
