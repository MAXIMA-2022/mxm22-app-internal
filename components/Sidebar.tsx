import {
    Flex,
    Box,
    Text,
    Stack,
    HStack,
    useDisclosure,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    CloseButton,
    Avatar,
    IconButton,
    Drawer,
    DrawerContent,
} from "@chakra-ui/react";
import Image from "next/image";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashBoardSVG from "../public/dashboard.svg";
import DashBoardBlueSVG from "../public/dashboardBlue.svg";
import DaftarMhsSVG from "../public/daftarMhs.svg";
import DaftarMhsBlueSVG from "../public/daftarMhsBlue.svg";
import DaftarPanitSVG from "../public/daftarPanit.svg";
import DaftarPanitBlueSVG from "../public/daftarPanitBlue.svg";
import StateSVG from "../public/state.svg";
import StateBlueSVG from "../public/stateBlue.svg";
import HomeSVG from "../public/home.svg";
import HomeBlueSVG from "../public/homeBlue.svg";
import IconSVG from "../public/icon.svg";
import IconBlueSVG from "../public/iconBlue.svg";
import { useReadLocalStorage } from "usehooks-ts";
import { isExpired } from "react-jwt";
import { useUserContext } from "../useContext/UserContext";

const Title = ({ onClose }: SidebarProps) => {
    return (
        <Flex
            h={20}
            alignItems="center"
            justifyContent={{ base: "space-between", lg: "center" }}
            mx={{ base: 8, lg: 4 }}
        >
            <Text fontSize={"18"} fontWeight="bold" textColor="black">
                Dashboard Maxima 2022
            </Text>
            <CloseButton
                display={{ base: "flex", lg: "none" }}
                textColor={"black"}
                onClick={onClose}
                _focus={{ boxShadow: "none" }}
            />
        </Flex>
    );
};

const Account = () => {
    const { name, divisiName } = useUserContext();
    return (
        <Flex
            align={"center"}
            justifyContent={"center"}
            textColor={"black"}
            mx={{ base: 8, lg: "0" }}
        >
            <Stack align={"center"} justifyContent={"center"}>
                <Avatar />
                <Text>{name}</Text>
                <Text fontSize={"12px"} textColor={"gray.500"}>
                    {divisiName}
                </Text>
            </Stack>
        </Flex>
    );
};

interface LinksProps {
    pathName: string;
    role: string | undefined;
    divisiName: string | undefined;
}

const Links = ({ pathName, role, divisiName }: LinksProps) => {
    const linksData = [
        {
            name: "Dashboard",
            link: "/",
            logo: DashBoardSVG,
            logo2: DashBoardBlueSVG,
            role: ["panitia", "organisator"],
            divisi: [],
        },
        {
            name: "Toggle",
            link: "/toggle",
            logo: DaftarMhsSVG,
            logo2: DaftarMhsBlueSVG,
            role: ["panitia"],
            divisi: ["SuperAdmin", "Rocuta"],
        },
    ];
    return (
        <>
            {linksData.map((link, key) => (
                <Link href={link.link} key={key}>
                    <Flex
                        align={"center"}
                        cursor="pointer"
                        mx={{ base: 8, lg: 4 }}
                        mt={6}
                        mb={4}
                        w={{ base: "none", lg: "224px" }}
                        borderRight={
                            pathName === link.link ? { base: "none", lg: "solid" } : "none"
                        }
                        textColor={pathName === link.link ? "#5e81f4" : "gray.400"}
                        _hover={
                            pathName === link.link
                                ? { textColor: "#5e81f4" }
                                : { textColor: "black" }
                        }
                        transition={"0.5s"}
                        display={
                            link.role.includes(role as string) && link.divisi.length === 0
                                ? "flex"
                                : link.role.includes(role as string) &&
                                  link.divisi.includes(divisiName as string)
                                ? "flex"
                                : "none"
                        }
                    >
                        <HStack>
                            <Image src={pathName === link.link ? link.logo2 : link.logo} />
                            <Text>{link.name}</Text>
                        </HStack>
                    </Flex>
                </Link>
            ))}
        </>
    );
};

interface AccorProps {
    pathName: string;
    role: string | undefined;
    divisiName: string | undefined;
}

const Accor = ({ pathName, role, divisiName }: AccorProps) => {
    const accors = [
        {
            name: "Accounts",
            icon: DaftarPanitSVG,
            icon2: DaftarPanitBlueSVG,
            role: ["panitia"],
            accor: [
                {
                    name: "Daftar Mahasiswa",
                    link: "/account/mahasiswa",
                    role: ["panitia"],
                    divisi: [],
                },
                {
                    name: "Daftar Panitia",
                    link: "/account/panitia",
                    role: ["panitia"],
                    divisi: [],
                },
                {
                    name: "Daftar Organisator",
                    link: "/account/organisator",
                    role: ["panitia"],
                    divisi: [],
                },
            ],
        },
        {
            name: "HoME",
            icon: HomeSVG,
            icon2: HomeBlueSVG,
            role: ["panitia"],
            accor: [
                {
                    name: "Daftar Home",
                    link: "/home/daftarHome",
                    role: ["panitia"],
                    divisi: [],
                },
                {
                    name: "Tambah Data HoME",
                    link: "/home/tambahHome",
                    role: ["panitia"],
                    divisi: ["SuperAdmin", "Rocuta", "Griffin"],
                },
                {
                    name: "Tambah Media HoME",
                    link: "/home/tambahMediaHome",
                    role: ["panitia"],
                    divisi: ["SuperAdmin", "Rocuta", "Griffin"],
                },
            ],
        },
        {
            name: "STATE",
            icon: StateSVG,
            icon2: StateBlueSVG,
            role: ["panitia", "organisator"],
            accor: [
                {
                    name: "Daftar STATE",
                    link: "/state/daftarState",
                    role: ["panitia", "organisator"],
                    divisi: [],
                },
                {
                    name: "Tambah STATE",
                    link: "/state/tambahState",
                    role: ["panitia"],
                    divisi: ["SuperAdmin", "Rocuta", "Griffin"],
                },
            ],
        },
    ];
    const [stateAccor, setStateAccor] = useState(false);
    const [homeAccor, setHomeAccor] = useState(false);
    return (
        <Accordion allowMultiple>
            {accors.map((accor, key) => (
                <AccordionItem
                    mx={{ base: 8, lg: 4 }}
                    mt={6}
                    mb={4}
                    w={{ base: "none", lg: "224px" }}
                    border={"none"}
                    key={key}
                >
                    <AccordionButton
                        display={accor.role.includes(role as string) ? "flex" : "none"}
                        p={0}
                        _hover={{ bg: "none" }}
                        _focus={{ boxShadow: "none" }}
                        onClick={() => {
                            accor.name === "STATE"
                                ? stateAccor === false
                                    ? setStateAccor(true)
                                    : setStateAccor(false)
                                : homeAccor === false
                                ? setHomeAccor(true)
                                : setHomeAccor(false);
                        }}
                    >
                        <HStack
                            w={"full"}
                            textColor={
                                accor.accor.some((acc) => acc.link === pathName) === true
                                    ? "#5e81f4"
                                    : (accor.name === "STATE" && stateAccor === true) ||
                                      (accor.name === "HoME" && homeAccor === true)
                                    ? "black"
                                    : "gray.400"
                            }
                            _hover={
                                accor.accor.some((acc) => acc.link === pathName) === true
                                    ? { textColor: "#5e81f4" }
                                    : { textColor: "black" }
                            }
                            transition={"0.5s"}
                        >
                            <Image
                                src={
                                    accor.accor.some((acc) => acc.link === pathName) === true
                                        ? accor.icon2
                                        : accor.icon
                                }
                            />
                            <Box pr={95} flex="1" textAlign="left">
                                {accor.name}
                            </Box>
                            <AccordionIcon />
                        </HStack>
                    </AccordionButton>
                    <AccordionPanel p={0} mt={2}>
                        <Stack>
                            {accor.accor.map((acc, key) => (
                                <Link href={acc.link} key={key}>
                                    <HStack
                                        cursor={"pointer"}
                                        display={
                                            acc.role.includes(role as string) &&
                                            acc.divisi.length === 0
                                                ? "flex"
                                                : acc.role.includes(role as string) &&
                                                  acc.divisi.includes(divisiName as string)
                                                ? "flex"
                                                : "none"
                                        }
                                        borderRight={
                                            pathName === acc.link
                                                ? { base: "none", lg: "solid" }
                                                : "none"
                                        }
                                        textColor={pathName === acc.link ? "#5e81f4" : "gray.400"}
                                        _hover={
                                            pathName === acc.link
                                                ? { textColor: "#5e81f4" }
                                                : { textColor: "black" }
                                        }
                                        transition={"0.5s"}
                                    >
                                        <Image
                                            src={pathName === acc.link ? IconBlueSVG : IconSVG}
                                        />
                                        <Text fontSize={"14px"}>{acc.name}</Text>
                                    </HStack>
                                </Link>
                            ))}
                        </Stack>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

interface SidebarProps {
    onClose: () => void;
}

const SideBarContent = ({ onClose }: SidebarProps) => {
    const router = useRouter();
    const jwt = useReadLocalStorage("token");
    const isMyTokenExpired = isExpired(jwt as string);
    const { role, divisiName } = useUserContext();

    useEffect(() => {
        if (!jwt || isMyTokenExpired) {
            router.push("/signIn");
        }
    });

    return (
        <Box
            bg={"white"}
            w={{ base: "full", lg: 60 }}
            pos="fixed"
            h="full"
            fontFamily="rubik"
            zIndex={2}
        >
            <Title onClose={onClose} />
            <Account />
            <Links pathName={router.pathname} role={role} divisiName={divisiName} />
            <Accor pathName={router.pathname} role={role} divisiName={divisiName} />
        </Box>
    );
};

const Sidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box display={{ base: "none", lg: "block" }}>
                <SideBarContent onClose={onClose} />
            </Box>
            <Box pt={2} pos={"fixed"} display={{ lg: "none" }} zIndex={2} ml={4}>
                <IconButton
                    textColor={"black"}
                    size={"lg"}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={"Open Menu"}
                    onClick={isOpen ? onClose : onOpen}
                    _focus={{ boxShadow: "none" }}
                />
            </Box>
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                size={"full"}
            >
                <DrawerContent>
                    <SideBarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Sidebar;
