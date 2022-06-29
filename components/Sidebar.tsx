import NextLink from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

//importing local components
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
import {
  Box,
  Flex,
  Heading,
  Center,
  Text,
  Avatar,
  Button,
  ButtonGroup,
  Link,
  Container,
  useDisclosure,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  HStack,
  VStack,
  Collapse,
} from "@chakra-ui/react";

//importing chakra ui icons
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

//importing framer motion components
import { motion } from "framer-motion";

//variable declaration
const name = "William Chandra";
const job = "Backend Engineer";

//local file components declaration
const SidebarHeader = () => {
  return (
    <Box className={"sidebar-header"}>
      <Center my={"2em"}>
        <Heading as="h4" size="md">
          Dashboard Maxima 2022
        </Heading>
      </Center>
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

const SidebarContent = () => {
  return (
    <VStack className={"sidebar-content"} spacing={3} align={"stretch"} w={"100%"} my={"2em"}>
      <Dashboard />
      <DaftarMahasiswa />
      <DaftarPanitia />
      <HoME />
      <STATE />
    </VStack>
  );
};

const Dashboard = () => {
  return (
    <ActiveLink href="/">
      <Flex className={"dashboard-link"} cursor={"pointer"} userSelect={"none"} p={"0.5em 1.15em"}>
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
      <Flex className={"daftar-mahasiswa-link"} cursor={"pointer"} userSelect={"none"} p={"0.5em 1.15em"}>
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
      <Flex className={"daftar-panitia-link"} cursor={"pointer"} userSelect={"none"} p={"0.5em 1.15em"}>
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
  const { isOpen, onToggle } = useDisclosure();

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

  const isCurrentPath = useRouter().pathname === HoME[0].HoMEContent[0].link || useRouter().pathname === HoME[0].HoMEContent[1].link || useRouter().pathname === HoME[0].HoMEContent[2].link;

  return (
    <Box
      className={"HoME"}
      cursor={"pointer"}
      userSelect={"none"}
      m={"0.5em 1.15em"}
      ps={"1.05em"}
      w={"101%"}
      onClick={() => {
        setIsToggled((isToggled) => !isToggled);
        onToggle();
      }}
    >
      {HoME.map((item, key) => (
        <>
          <Flex justifyContent={"space-between"} key={key} color={isCurrentPath ? "#5e81f4" : "black"} fill={isCurrentPath ? "#5e81f4" : "black"}>
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
            <Center fontSize={"xl"} mx={"0.5em"}>
              <motion.div animate={isToggled ? "rotateDown" : "closed"} variants={rotateAnimation}>
                <ChevronUpIcon />
              </motion.div>
            </Center>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <motion.div animate={isToggled ? "open" : "closed"} variants={animation}>
              <Box mt={2} px={"0.15em"}>
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
          </Collapse>
        </>
      ))}
    </Box>
  );
};

const STATE = () => {
  const [isToggled, setIsToggled] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

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
          link: "/state/daftarPicOrganisator",
          icon: <RadioIcon />,
        },
        {
          title: "Tambah PIC Organisator",
          link: "/state/tambahPicOrganisator",
          icon: <RadioIcon />,
        },
      ],
    },
  ];

  const isCurrentPath =
    useRouter().pathname === STATE[0].STATEContent[0].link ||
    useRouter().pathname === STATE[0].STATEContent[1].link ||
    useRouter().pathname === STATE[0].STATEContent[2].link ||
    useRouter().pathname === STATE[0].STATEContent[3].link ||
    useRouter().pathname === STATE[0].STATEContent[4].link;

  return (
    <Box
      className={"HoME"}
      cursor={"pointer"}
      userSelect={"none"}
      m={"0.5em 1.15em"}
      ps={"1.05em"}
      w={"101%"}
      onClick={() => {
        setIsToggled((isToggled) => !isToggled);
        onToggle();
      }}
    >
      {STATE.map((item, key) => (
        <>
          <Flex justifyContent={"space-between"} key={key} color={isCurrentPath ? "#5e81f4" : "black"} fill={isCurrentPath ? "#5e81f4" : "black"}>
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
            <Center fontSize={"xl"} mx={"0.5em"}>
              <motion.div animate={isToggled ? "rotateDown" : "closed"} variants={rotateAnimation}>
                <ChevronUpIcon />
              </motion.div>
            </Center>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <motion.div animate={isToggled ? "open" : "closed"} variants={animation}>
              <Box mt={2} px={"0.15em"}>
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
          </Collapse>
        </>
      ))}
    </Box>
  );
};

//main content
const Sidebar = () => {
  return (
    <Box className={"sidebar"} w={"17em"} position="fixed" h="full" display={{ base: "none", md: "block" }} overflowY={"auto"}>
      <SidebarHeader />
      <SidebarContent />
    </Box>
  );
};

export default Sidebar;
