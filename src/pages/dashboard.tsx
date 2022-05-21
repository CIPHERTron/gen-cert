// import { useRouter } from "next/router";
// import { useContext } from "react";

import Dashboard from "components/screens/dashboard";
// import Home from "components/screens/home";
// import { AuthContext } from "lib/auth";

const DashboardPage = () => {
  // const { user } = useContext(AuthContext);

  return <Dashboard />;
};

export { getStaticProps } from "components/screens/home/loader";

export default DashboardPage;
