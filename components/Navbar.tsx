import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

//importing local components
import Sidebar from "./Sidebar";
import ActiveLink from "./ActiveLink";

//importing local icons
import ExitIcon from "../components/svgs/exitIcon.svg";
import MaleIcon from "../components/svgs/maleIcon.svg";
import DashboardIcon from "../components/svgs/dashboardIcon.svg";
import DaftarMhsIcon from "../components/svgs/daftarMhsIcon.svg";
import DaftarPanitiaIcon from "../components/svgs/daftarPanitiaIcon.svg";
import HomeIcon from "../components/svgs/homeIcon.svg";
import StateIcon from "../components/svgs/stateIcon.svg";
import RadioIcon from "../components/svgs/radioIcon.svg";

//importing chakra ui components
import { Box, Flex, Text, Button, Heading, ButtonGroup, Image, Center, useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Avatar, Container, VStack } from "@chakra-ui/react";

//importing chakra ui icons
import { HamburgerIcon, SmallCloseIcon, ChevronUpIcon } from "@chakra-ui/icons";

//importing framer motion components
import { motion } from "framer-motion";

//variable declaration
const name = "William Chandra";
const job = "Backend Engineer";

const NavbarDrawerHeader = () => {
  return (
    <Box className={"sidebar-header"} my={"2em"}>
      <Center>
        <Avatar backgroundColor={"gray.400"} size={"lg"} borderRadius={"full"}></Avatar>
      </Center>
      <Center mt={"0.6em"}>
        <Text fontSize={"xl"} fontWeight={"medium"}>
          {name}
        </Text>
      </Center>
      <Center mt={"0.5em"}>
        <Text fontSize={"md"} color={"gray.500"}>
          {job}
        </Text>
      </Center>
    </Box>
  );
};

const NavbarDrawerContent = () => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  return (
    <Container className={"sidebar-content"} maxW="container.full">
      <VStack spacing={8} align={"stretch"} w={"100"}>
        <Dashboard />
        <DaftarMahasiswa />
        <DaftarPanitia />
        <HoME />
        <STATE />
      </VStack>
    </Container>
  );
};

const Dashboard = () => {
  return (
    <ActiveLink href="/dashboard">
      <Flex className={"dashboard-link"} cursor={"pointer"} userSelect={"none"}>
        <Center>
          <Text fontSize={"xl"} fontWeight={"medium"} ms={"1.5px"}>
            <DashboardIcon />
          </Text>
          <Text fontSize={"18px"} fontWeight={"medium"} ms={"0.5em"}>
            Dashboard
          </Text>
        </Center>
      </Flex>
    </ActiveLink>
  );
};

const DaftarMahasiswa = () => {
  return (
    <ActiveLink href="/daftarmahasiswa">
      <Flex className={"daftar-mahasiswa-link"} cursor={"pointer"} userSelect={"none"}>
        <Center>
          <Text fontSize={"xl"} fontWeight={"medium"}>
            <DaftarMhsIcon />
          </Text>
          <Text fontSize={"18px"} fontWeight={"medium"} ms={"0.6em"}>
            Daftar Mahasiswa
          </Text>
        </Center>
      </Flex>
    </ActiveLink>
  );
};

const DaftarPanitia = () => {
  return (
    <ActiveLink href="/daftarpanitia">
      <Flex className={"daftar-panitia-link"} cursor={"pointer"} userSelect={"none"}>
        <Center>
          <Text fontSize={"xl"} fontWeight={"medium"}>
            <DaftarPanitiaIcon />
          </Text>
          <Text fontSize={"18px"} fontWeight={"medium"} ms={"0.6em"}>
            Daftar Panitia
          </Text>
        </Center>
      </Flex>
    </ActiveLink>
  );
};

const HoME = () => {
  const [isToggled, setIsToggled] = useState(false);

  const animation = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const rotateAnimation = {
    rotateDown: { transform: "rotate(180deg)" },
    rotateUp: { transform: "rotate(180deg)" },
  };

  const HoME = [
    {
      title: "HoME",
      icon: <HomeIcon />,
      chevronUpIcon: <ChevronUpIcon />,
      HoMEContent: [
        {
          title: "Tambah Data HoME",
          link: "/home/tambahHome",
          icon: <RadioIcon />,
        },
        {
          title: "Tambah Media HoME",
          link: "/home/tambahMediaHome",
          icon: <RadioIcon />,
        },
        {
          title: "Daftar Organisator HoME",
          link: "/home/daftarOrganisator",
          icon: <RadioIcon />,
        },
      ],
    },
  ];

  return (
    <Box className={"HoME"} cursor={"pointer"} userSelect={"none"} onClick={() => setIsToggled((isToggled) => !isToggled)}>
      {HoME.map((item, key) => (
        <>
          <Flex justifyContent={"space-between"} key={key}>
            <Flex>
              <Center>
                <Text fontSize={"lg"} fontWeight={"medium"} ms={"1px"}>
                  {item.icon}
                </Text>
                <Text fontSize={"18px"} fontWeight={"medium"} ms={"0.65em"}>
                  {item.title}
                </Text>
              </Center>
            </Flex>
            <Center fontSize={"xl"}>
              <motion.div animate={isToggled ? "rotateDown" : "closed"} variants={rotateAnimation}>
                <ChevronUpIcon />
              </motion.div>
            </Center>
          </Flex>
          <motion.div animate={isToggled ? "open" : "closed"} variants={animation}>
            <Box display={isToggled ? "block" : "none"} mt={2} px={"0.15em"} w={"109%"}>
              <VStack align="stretch">
                {item.HoMEContent.map((item, key) => (
                  <ActiveLink href={item.link} key={key}>
                    <Flex className={"HoME-radio"} justifyContent={"start"}>
                      <Center>{item.icon}</Center>
                      <Text fontSize={"16px"} fontWeight={"medium"} ms={"0.65em"}>
                        {item.title}
                      </Text>
                    </Flex>
                  </ActiveLink>
                ))}
              </VStack>
            </Box>
          </motion.div>
        </>
      ))}
    </Box>
  );
};

const STATE = () => {
  const [isToggled, setIsToggled] = useState(false);

  const animation = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const rotateAnimation = {
    rotateDown: { transform: "rotate(180deg)" },
    rotateUp: { transform: "rotate(180deg)" },
  };

  const STATE = [
    {
      title: "STATE",
      icon: <StateIcon />,
      chevronUpIcon: <ChevronUpIcon />,
      STATEContent: [
        {
          title: "Tambah STATE",
          link: "/state/tambahState",
          icon: <RadioIcon />,
        },
        {
          title: "Daftar STATE",
          link: "/state/daftarState",
          icon: <RadioIcon />,
        },
        {
          title: "Daftar Akun Organisator",
          link: "/state/daftarAkunOrganisator",
          icon: <RadioIcon />,
        },
        {
          title: "Daftar PIC Organisator",
          link: "/state/daftarPicOrg",
          icon: <RadioIcon />,
        },
        {
          title: "Tambah PIC Organisator",
          link: "/state/tambahPicOrg",
          icon: <RadioIcon />,
        },
      ],
    },
  ];

  return (
    <Box className={"HoME"} cursor={"pointer"} userSelect={"none"} onClick={() => setIsToggled((isToggled) => !isToggled)}>
      {STATE.map((item, key) => (
        <>
          <Flex justifyContent={"space-between"} key={key}>
            <Flex>
              <Center>
                <Text fontSize={"lg"} fontWeight={"medium"} ms={"1px"}>
                  {item.icon}
                </Text>
                <Text fontSize={"18px"} fontWeight={"medium"} ms={"0.65em"}>
                  {item.title}
                </Text>
              </Center>
            </Flex>
            <Center fontSize={"xl"}>
              <motion.div animate={isToggled ? "rotateDown" : "closed"} variants={rotateAnimation}>
                <ChevronUpIcon />
              </motion.div>
            </Center>
          </Flex>
          <motion.div animate={isToggled ? "open" : "closed"} variants={animation}>
            <Box display={isToggled ? "block" : "none"} mt={2} px={"0.15em"} w={"109%"}>
              <VStack align="stretch">
                {item.STATEContent.map((item, key) => (
                  <ActiveLink href={item.link} key={key}>
                    <Flex className={"HoME-radio"} justifyContent={"start"}>
                      <Center>{item.icon}</Center>
                      <Text fontSize={"16px"} fontWeight={"medium"} ms={"0.65em"}>
                        {item.title}
                      </Text>
                    </Flex>
                  </ActiveLink>
                ))}
              </VStack>
            </Box>
          </motion.div>
        </>
      ))}
    </Box>
  );
};

const ExitButton = () => {
  return (
    <Button borderRadius={"full"} position={"fixed"} m={"1em 1.3em"} right={"0"}>
      <Center>
        <Text>Keluar</Text>
        <Box ms={"0.7em"}>
          <ExitIcon className={"exit-logo"} />
        </Box>
      </Center>
    </Button>
  );
};

//main content
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex className={"navbar"}>
      <Box position={"fixed"} m={"1em 1.3em"} left={"0"} display={["block", "block", "none"]}>
        <Box onClick={onOpen}>
          <HamburgerIcon fontSize={"xl"} />
        </Box>
        <Box display={["block", "block", "none"]}>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"full"}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody>
                <Flex justifyContent={"space-between"} my={"0.5em"}>
                  <Heading as="h4" size="md">
                    Dashboard Maxima 2022
                  </Heading>
                  <Box onClick={onClose}>
                    <SmallCloseIcon fontSize={"xl"} />
                  </Box>
                </Flex>
                <NavbarDrawerHeader />
                <NavbarDrawerContent />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
      <ExitButton />
    </Flex>
  );
};

export default Navbar;
