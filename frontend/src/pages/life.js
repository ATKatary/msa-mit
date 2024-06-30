import * as React from "react";
import styled from "styled-components";
import "../assets/css/utils.css";
import "../life.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import MediaCard from "../components/content/card";
import LifeCard from "../components/content/lifecard";
import PicCarousel from "../components/piccarousel";
import CardCarousel from "../components/cardcarousel";
import Nav1 from "../components/nav1";
import Header from "../components/header";
import Section from "../components/section";
import { Slideshow } from "../components/gallery";
import { NAV_GC } from "../components/content/nav";
import { Notification } from "../components/support";
import { LIFE_GC } from "../components/content/life";
import { COLORS, SECTIONS, THEME } from "../constants";
import { PrayerCard, ResourceCard } from "../components/card";
import { HEADER_GC } from "../components/content/headers/life";
import { getNextPrayer, useCustomState } from "../components/utils";
import data from "../assets/js/schedule";

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

import { Row } from "reactstrap";
import { Typography } from "@mui/material";

function Life() {
  const images = require.context("../assets/media", true);
  const [openNav, setOpenNav] = React.useState(false);
  const { verse, translation, buttons } = HEADER_GC({});
  const [prayerSet, setPrayerSet] = React.useState(false);
  const [nextPrayer, setNextPrayer] = React.useState(undefined);
  const { PRAYER_SPACES, RESOURCES, ...LIFE_REST } = LIFE_GC({
    images: images,
  });
  const { NAV_LEFT, NAV_RIGHT, ...NAV_GC_REST } = NAV_GC({
    setOpen: setOpenNav,
  });
  const [notification, setNotification] = useCustomState({
    value: null,
    notify: false,
  });
  // get license from env file
  const license = process.env.REACT_APP_SYNCFUSION_LICENSE;
  registerLicense(license);

  if (!prayerSet) {
    const { nextPrayer, nextPrayerTime, nextPrayerHour } = getNextPrayer();
    setNextPrayer(
      `Next prayer is ${
        nextPrayer.charAt(0).toUpperCase() + nextPrayer.slice(1)
      } at ${
        nextPrayerHour > 12
          ? nextPrayerHour -
            12 +
            ":" +
            (nextPrayerTime.getMinutes() >= 10
              ? nextPrayerTime.getMinutes()
              : "0" + nextPrayerTime.getMinutes()) +
            "pm"
          : nextPrayerHour + ":" + nextPrayerTime.getMinutes() + "am"
      } (${Math.round(Math.abs(new Date() - nextPrayerTime) / 60000)} min)`
    );
    setPrayerSet(true);
  }

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 800px) {
      flex-direction: row;
    }
  `;

  const Item = styled.div`
    width: 100%;
    margin-right: 0%;

    @media (min-width: 800px) {
      margin-bottom: 5%; /* Adjust margin bottom to reduce spacing */
      margin-right: 2%; /* Add a small right margin */
      width: 49%; /* Adjust width to make room for the right margin */
    }

    &:nth-child(2) {
      @media (min-width: 800px) {
        margin-top: 0; /* Remove top margin */
      }
    }
  `;

  return (
    <>
      <Nav1
        open={openNav}
        vertical={false}
        collapsed={false}
        itemsLeft={NAV_LEFT}
        setOpen={setOpenNav}
        itemsRight={NAV_RIGHT}
        nextPrayer={nextPrayer}
        setNextPrayer={setNextPrayer}
        style={{
          width: "100vw",
          zIndex: "111",
          position: "fixed",
          paddingTop: "20px",
          backgroundColor: COLORS.WHITE,
          justifyContent: "space-between",
          // boxShadow: "4px 4px 4px #00000022",
        }}
        openedStyle={{ height: `${THEME.NAV.HEIGHT}px` }}
        closedStyle={{
          width: "50px",
          color: COLORS.BLACK,
          right: "calc(0% + 50px)",
        }}
      />
      <div
        className="flex column width-100"
        style={{
          height: "max-content",
        }}
      >
        <Header
          verse={verse}
          buttons={buttons}
          translation={translation}
          style={{
            height: `calc(100vh - ${THEME.NAV.HEIGHT}px)`,
            marginTop: `${THEME.NAV.HEIGHT}px`,
          }}
        />

        <h1 className="text-lg flex justify-center h1-mobile">
          Upcoming Events
        </h1>
        {/*** Activities Calendar ***/}
        <Section className="flex justify-center" contStyle={{ width: "100%" }}>
          <ScheduleComponent
            eventSettings={{ dataSource: data }}
            currentView="Week"
            readonly={true}
            startHour="10:00"
            endHour="18:00"
          >
            <ViewsDirective>
              <ViewDirective option="Day" />
              <ViewDirective option="Week" />
              <ViewDirective option="Month" />
            </ViewsDirective>

            <Inject services={[Day, Week, Month]} />
          </ScheduleComponent>
        </Section>

        <Container>
          <Item>
            <h1 className="text-lg flex justify-center h1-mobile">
              Prayer Spaces
            </h1>
            <Section className="flex justify-center section-mobile">
              <CardCarousel data={PRAYER_SPACES.cards} />
            </Section>
          </Item>

          <Item>
            <h1 className="text-lg flex justify-center h1-mobile">
              Off Campus Resources
            </h1>
            <Section className="flex justify-center section-mobile">
              <CardCarousel data={RESOURCES.OFF_CAMPUS.cards} />
            </Section>
          </Item>
        </Container>

        {/*** Eid 2024 ***/}

        <Section className="flex justify-center" contStyle={{ width: "100%" }}>
          <h1 className="text-lg">Eid 2024</h1>
          <PicCarousel data={RESOURCES.EID_2024.slides} />
        </Section>
      </div>
      <Notification
        notification={notification}
        setNotification={setNotification}
        duration={6000}
      />
    </>
  );
}

export default Life;
