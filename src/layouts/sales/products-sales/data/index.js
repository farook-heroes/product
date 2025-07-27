/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { mockProduct } from "layouts/sales/mockData";

export default function data() {
  const avatars = (members) =>
    members?.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDTypography variant="h4">{image}</MDTypography>
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const rows = mockProduct.map((product) => ({
    products: <Company image={product.image} name={product.title} />,
    members: (
      <MDBox display="flex" py={1}>
        {avatars([[product.rating.count, product.description]])}
      </MDBox>
    ),
    budget: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        ${product.price}
      </MDTypography>
    ),
    completion: (
      <MDBox width="8rem" textAlign="left">
        <MDProgress
          value={(product.rating.rate / 5) * 100}
          color="info"
          variant="gradient"
          label={false}
        />
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "products", accessor: "products", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: rows,
  };
}
