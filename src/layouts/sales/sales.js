import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dashboard from "layouts/dashboard";
import Footer from "examples/Footer";
import React from "react";
import MDBox from "components/MDBox";
import Projects from "layouts/dashboard/components/Projects";
import ProductSales from "./products-sales";

function Sales() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <ProductSales />
      </MDBox>
    </DashboardLayout>
  );
}

export default Sales;
