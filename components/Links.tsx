import Link from "next/link";

const Accor = ({ pathName }: AccorProps) => {
  const accors = [
    {
      name: "HoME",
      icon: HomeIcon,
      icon2: HomeBlueSVG,
      accor: [
        {
          name: "Tambah Data HoME",
          link: "/home/tambahHome",
        },
        {
          name: "Tambah Media HoME",
          link: "/home/tambahMediaHome",
        },
        {
          name: "Daftar Organisator HoME",
          link: "/home/daftarOrganisator",
        },
      ],
    },
    {
      name: "STATE",
      icon: StateSVG,
      icon2: StateBlueSVG,
      accor: [
        {
          name: "Tambah STATE",
          link: "/state/tambahState",
        },
        {
          name: "Daftar STATE",
          link: "/state/daftarState",
        },
        {
          name: "Daftar Akun Organisator",
          link: "/state/daftarAkunOrganisator",
        },
        {
          name: "Daftar PIC Organisator",
          link: "/state/daftarPicOrg",
        },
        {
          name: "Tambah PIC Organisator",
          link: "/state/tambahPicOrg",
        },
      ],
    },
  ];
  const [stateAccor, setStateAccor] = useState(false);
  const [homeAccor, setHomeAccor] = useState(false);
  return (
    <Accordion allowMultiple>
      {accors.map((accor, key) => (
        <AccordionItem mx={{ base: 8, lg: 4 }} mt={6} mb={4} w={{ base: "none", lg: "224px" }} border={"none"} key={key}>
          <AccordionButton
            p={0}
            _hover={{ bg: "none" }}
            _focus={{ boxShadow: "none" }}
            onClick={() => {
              accor.name === "STATE" ? (stateAccor === false ? setStateAccor(true) : setStateAccor(false)) : homeAccor === false ? setHomeAccor(true) : setHomeAccor(false);
            }}
          >
            <HStack
              w={"full"}
              textColor={accor.accor.some((acc) => acc.link === pathName) === true ? "#5e81f4" : (accor.name === "STATE" && stateAccor === true) || (accor.name === "HoME" && homeAccor === true) ? "black" : "gray.400"}
              _hover={accor.accor.some((acc) => acc.link === pathName) === true ? { textColor: "#5e81f4" } : { textColor: "black" }}
              transition={"0.5s"}
            >
              <Image src={accor.accor.some((acc) => acc.link === pathName) === true ? accor.icon2 : accor.icon} />
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
                    borderRight={pathName === acc.link ? { base: "none", lg: "solid" } : "none"}
                    textColor={pathName === acc.link ? "#5e81f4" : "gray.400"}
                    _hover={pathName === acc.link ? { textColor: "#5e81f4" } : { textColor: "black" }}
                    transition={"0.5s"}
                  >
                    <Image src={pathName === acc.link ? IconBlueSVG : IconSVG} />
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
