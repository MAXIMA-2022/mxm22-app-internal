//importing local components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

//importing chakra ui components
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex minH={"100vh"} backgroundColor={"#ebecf4 "}>
      <Sidebar />
      <Navbar />
      {children}
    </Flex>
  );
};

export default Layout;
