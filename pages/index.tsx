import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Box, Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Flex
                minH="100vh"
                bg={"#dee1e6"}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                ml={{ base: 0, lg: "240px" }}
                px={5}
            >
                <Box
                    w={"full"}
                    h={600}
                    bgColor={"white"}
                    borderRadius={20}
                    overflow={"auto"}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "10px",
                            borderRadius: "12px",
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            borderRadius: "12px",
                            bg: "#FF9F45",
                        },
                    }}
                ></Box>
            </Flex>
        </>
    );
};

export default Home;
