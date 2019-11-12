import React, { useState } from "react";
import styled from "styled-components";
import GithubCorner from "react-github-corner";
import useWindowSize from "react-use-window-size";

const consultants = ["doctor", "nurse", "specialist", "therapist"];
const timeslots = ["Today 12:00", "12:15", "12:30"];

const App = () => {
  const [selectedConsultant, setSelectedConsultant] = useState(false);
  const [timeslot, setTimeslot] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const clearAll = () => {
    setSelectedConsultant(false);
    setTimeslot(false);
  };
  const submit = () => {
    alert(JSON.stringify({ selectedConsultant, timeslot, symptoms }));
    clearAll();
  };
  const { width } = useWindowSize();
  console.log(width);
  if (width < 840) return "we're going to need a bigger screen";
  return (
    <div>
      <GithubCorner href="https://github.com/DomVinyard/babylon-web-test" />
      <Header>
        <img src={"/logo.png"} alt="logo" onClick={() => clearAll()} />
      </Header>
      <Main hasselected={!!selectedConsultant}>
        {consultants.map(consultant => {
          const isSelected = selectedConsultant === consultant;
          return (
            <Avatar
              key={consultant}
              src={`/${consultant}.png`}
              onClick={() => setSelectedConsultant(consultant)}
              alt={consultant}
              hastimeslot={(!!timeslot).toString()}
              isselected={isSelected.toString()}
            />
          );
        })}
        {!selectedConsultant ? (
          <SelectText>select a consultant</SelectText>
        ) : !timeslot ? (
          <Buttons>
            <Clear onClick={() => clearAll()}>X</Clear>
            {timeslots.map(slot => (
              <Button onClick={() => setTimeslot(slot)}>{slot}</Button>
            ))}
          </Buttons>
        ) : (
          <Buttons>
            <Symptoms
              onKeyUp={e => setSymptoms(e.target.value)}
              autoFocus
              placeholder="Describe your symptoms"
            ></Symptoms>
            <div>
              <Clear onClick={() => clearAll()}>X</Clear>
              <Button onClick={() => submit()}>
                Confirm {timeslot} appointment
              </Button>
            </div>
          </Buttons>
        )}
      </Main>
    </div>
  );
};

const Symptoms = styled.textarea`
  font-size: 1.6rem;
  padding: 1rem;
  width: 600px;
  margin-bottom: 2rem;
  height: 300px;
`;

const Buttons = styled.div`
  margin-top: 5rem;
`;

const Button = styled.button`
  font-size: 1.7rem;
  padding: 1rem 2rem;
  border-radius: 2rem;
  background: #fff;
  border: 1px solid #acacac;
  color: #777;
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background: rgb(0, 200, 200);
    color: white;
  }
`;

const Clear = styled(Button)`
  color: #ccc;
  &:hover {
    background: black;
    color: white;
  }
`;

const SelectText = styled.h1`
  color: rgb(0, 200, 200);
  font-family: sans-serif;
  margin-top: 3rem;
  font-size: 2.5rem;
`;

const Header = styled.header`
  img {
    width: 144px;
    cursor: pointer;
  }
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 2rem 0.75rem 2rem;
  z-index: 1;
  position: relative;
`;

const Main = styled.main`
  text-align: center;
  transition: all 0.3s;
  ${({ hasselected }) =>
    hasselected &&
    `
    margin-top: -2rem;
    transform: scale(0.7);
    img {
      transform: scale(0.8);
      margin: 0 0.5rem;
    }
  `}
`;

const Avatar = styled.img`
  height: 300px;
  cursor: pointer;
  transition: all 0.3s;
  ${({ hastimeslot, isselected }) =>
    hastimeslot === "true" &&
    isselected == "false" &&
    `
    transform: scale(0) !important;
    opacity: 0;
    height: 0;
    `};
  ${({ isselected, hastimeslot }) =>
    isselected === "false"
      ? `
    -webkit-filter: grayscale(100%);
    filter: greyscale(100%);
    `
      : hastimeslot === "true"
      ? `
      transform: scale(1.4) !important;
      margin-top: -4rem !important;
      cursor: default ;
    `
      : `
      transform: scale(1.1) !important;
    `}
  &:hover {
    filter: none;
    -webkit-filter: none;
  }
`;

export default App;
