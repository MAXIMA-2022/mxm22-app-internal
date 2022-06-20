import { withRouter } from "next/router";
import { useMediaQuery } from "@chakra-ui/react";

const ActiveLink = ({ router, href, children }) => {
  (function prefetchPages() {
    if (typeof window !== "undefined") {
      router.prefetch(router.pathname);
    }
  })();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const isCurrentPath = router.pathname === href || router.asPath === href;
  const onMobile = useMediaQuery("(max-width <= 768px)");

  const largerScreen = {
    color: isCurrentPath ? "#5e81f4 " : "#000",
    fill: isCurrentPath ? "#5e81f4 " : "#000",
    border: isCurrentPath ? "#5e81f4 solid 3px" : "none",
    borderStyle: isCurrentPath ? "none solid none none" : "none",
  };

  const smallerScreen = {
    color: isCurrentPath ? "#5e81f4 " : "#000",
    fill: isCurrentPath ? "#5e81f4 " : "#000",
    border: isCurrentPath ? "none" : "none",
    borderStyle: isCurrentPath ? "none" : "none",
  };

  return (
    <a href={href} onClick={handleClick} style={onMobile ? largerScreen : smallerScreen}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);
