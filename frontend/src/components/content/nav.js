import logo from "../../assets/media/alchemist_final.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import { Link, Menu, MenuItem } from "@mui/material";
import { SECTIONS, THEME } from "../../constants";
import { useState } from "react";

/*** Global Constants ***/
const DEFAULT = SECTIONS.HOME.TITLE;

export const NAV_GC = (props) => {
  const right = [];
  const sections = [
    {
      name: SECTIONS.DONATE.TITLE,
      href: "https://giving.mit.edu/form/#/",
    },
    {
      name: SECTIONS.LIFE.TITLE,
    },
    {
      name: SECTIONS.CONTACT.TITLE,
    },
    {
      name: SECTIONS.TEAM.TITLE,
    },
    {
      name: SECTIONS.RESOURCES.TITLE,
    },
    {
      name: SECTIONS.CAREER.TITLE,
      dropdown: true,
      subSections: SECTIONS.CAREER.SUB_SECTIONS,
    },
    {
      name: SECTIONS.SIGN_IN.TITLE,
    },
    // {
    //   name: SECTIONS.RAMADAN.TITLE,
    // },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  for (const section of sections) {
    right.push({
      meta: {
        className: `public-sans`,
      },
      content: {
        title: section.dropdown ? (
          <div>
            <Link
              onClick={(e) => setAnchorEl(e.currentTarget)}
              id={`nav-${section.name}`}
              style={{
                ...THEME.NAV.STYLE.BTN,
                color: THEME.SECONDARY,
                borderRadius: "5px",
                margin: "0 20px 0 20px",
                cursor: "pointer",
              }}
              className={"select-section mobile-margin"}
            >
              {section.name.toUpperCase().replace("-", " ")}
            </Link>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                autoFocusItem: false,
                "aria-labelledby": `nav-${section.name}`,
              }}
            >
              {section.subSections.map((subsection, index) => (
                <MenuItem
                  key={index}
                  onClick={(e) => setAnchorEl(null)}
                  component="a"
                  href={
                    subsection.href
                      ? subsection.href
                      : `/${section.name}/${subsection.title}`
                  }
                  style={{
                    ...THEME.NAV.STYLE.BTN,
                    width: "auto",
                    color: THEME.SECONDARY,
                    borderRadius: "5px",
                    margin: "0 20px 0 20px",
                    cursor: "pointer",
                  }}
                >
                  {subsection.title
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </MenuItem>
              ))}
            </Menu>
          </div>
        ) : (
          <Link
            href={
              section.href
                ? section.href
                : `/${section.inPage ? "#" : ""}${section.name}`
            }
            id={`nav-${section.name}`}
            style={{
              ...THEME.NAV.STYLE.BTN,
              color: THEME.SECONDARY,
              borderRadius: "5px",
              margin: "0 20px 0 20px",
            }}
            className={"select-section mobile-margin"}
          >
            {section.icon ? (
              <section.icon style={{ margin: "0 10px 0 0" }} />
            ) : (
              <></>
            )}{" "}
            {section.name.toUpperCase().replace("-", " ")}
          </Link>
        ),
      },
    });
  }

  const select = (section) => {
    for (const section of sections) {
      const sectionBtn = document.getElementById(`nav-${section.name}`);
      if (sectionBtn) sectionBtn.classList.remove("select-section");
    }

    const sectionBtn = document.getElementById(section.id);
    if (sectionBtn) {
      props.setOpen(false);
      props.setSelected(section.name);
      sectionBtn.classList.add("select-section");
    }
  };
  return {
    NAV_LEFT: [
      {
        meta: {
          href: "/",
          id: `nav-${SECTIONS.HOME.TITLE}`,
          style: {
            margin: "0 0 10px 0",
            display: "flex",
            flexDirection: "column",
          },
        },
        content: {
          title: (
            <img
              src={logo}
              height="100px"
              className="pointer align-self-center logo-mobile"
            />
          ),
        },
      },
    ],

    NAV_RIGHT: [
      ...right,
      {
        meta: {
          isIcon: true,
          style: { margin: "0 3px 0 0px", height: "20px" },
          iconProps: {
            fontSize: "18px",
          },
          href: "https://www.instagram.com/mitmsa/",
          target: "_blank",
        },
        content: {
          icon: InstagramIcon,
        },
      },

      {
        meta: {
          isIcon: true,
          style: { margin: "0 0 0 0px", height: "20px" },
          iconProps: {
            fontSize: "18px",
          },
          href: "https://www.facebook.com/mitmsa",
          target: "_blank",
        },
        content: {
          icon: FacebookIcon,
        },
      },
    ],
  };
};
