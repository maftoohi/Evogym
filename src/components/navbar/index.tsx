import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import Link from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { motion, useCycle } from "framer-motion";

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Navbar = ({ selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreen = useMediaQuery("(min-width: 1060px)");
  const navbarBg = isTopOfPage ? "" : "bg-primary-100 drop-shadow";
  // const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <nav>
      <div className={`${navbarBg} ${flexBetween} fixed top-0 z-30 w-full py-6`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/*Left side*/}
            <img src={Logo} alt="logo" />

            {/*Right side*/}
            {isAboveMediumScreen ? (
              <div className={`${flexBetween} w-full`}>
                {/*Inner left side*/}
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                  <Link page="Benefits" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                  <Link page="Our Classes" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                  <Link page="Contact Us" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                </div>

                {/*Inner right side*/}
                <div className={`${flexBetween} gap-8`}>
                  <p>Sign In</p>
                  <ActionButton setSelectedPage={setSelectedPage}>Beacome A Member</ActionButton>
                </div>
              </div>
            ) : (
              <button className=" rounded-full bg-secondary-500 p-2" onClick={() => toggleOpen()}>
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/*Mobile menu modal*/}
      {!isAboveMediumScreen && (
        <motion.div
          className="fixed bottom-0 right-0 z-40  h-full w-[300px] bg-primary-100 drop-shadow-xl"
          animate={isOpen ? "open" : "closed"}
          initial="closed"
          transition={{ duration: 0.5 }}
          variants={{
            open: { opacity: 1, x: 0 },
            closed: { opacity: 0, x: "100%" },
          }}
        >
          {/* Close icon*/}
          <div className="flex justify-end p-12">
            <button onClick={() => toggleOpen()}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/*Menu icons*/}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <Link page="Benefits" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <Link page="Our Classes" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <Link page="Contact Us" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
