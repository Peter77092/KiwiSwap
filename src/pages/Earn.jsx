/* eslint-disable no-unused-vars */
import Card, { Cards } from "../components/Card/Card";
import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import Tabs from "../components/Earn/Tabs";
import { Refs, TaskList, Trophies } from "../lib/data/data";
import { useEffect } from "react";
// import ModalComponent from "../components/ModalComponent";
import CardLeagRef from "../components/CardLeagRef/CardLeagRef.jsx";
import { FaUserFriends } from "react-icons/fa";
import { TONConnect } from "../components/Ton/TONConnect.jsx";
import Balance from "../components/Balance/Balance.jsx";
import { useData } from "../components/Context.jsx";

const Earn = () => {
  const [tabActive, setTabActive] = useState(true);
  const [loadingState, setLoadingState] = useState({});

  const {
    referrals,
    amount,
    league,
    leagueClaimed,
    setLeagueClaimed,
    balanceUp,
    refClaimed,
    setRefClaimed,
    userid,
  } = useData();

  const [cardInfo, setCardInfo] = useState([]);
  const {onOpen, isOpen, onOpenChange} = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = (index) => {
      setCardInfo(TaskList[index])
      onOpen()
  };

  const handleTab = (tab) => {
    setTabActive(tab);
  };

  // const handleCheck = (taskId) => {
  //     console.log("aaa", taskId);
  // };

  const handleClaimLeague = (index, reward) => {
    setLoadingState((prevState) => ({ ...prevState, [index]: true }));

    setTimeout(() => {
      setLeagueClaimed([...leagueClaimed, index]);
      balanceUp(reward);
      setLoadingState((prevState) => ({ ...prevState, [index]: false }));
    }, 1500);
  };

  const handleClaimRef = (index, reward) => {
    setLoadingState((prevState) => ({ ...prevState, [index]: true }));

    setTimeout(() => {
      setRefClaimed([...refClaimed, index]);
      balanceUp(reward);
      setLoadingState((prevState) => ({ ...prevState, [index]: false }));
    }, 1500);
  };

  useEffect(() => {
    setTabActive("Special");
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center px-5 pt-0">
        <div className="relative w-24 h-24 my-8 rounded-full [box-shadow:20px_6px_50px_44px_#FCFF40] ">
          <img className={"w-full scale3d-125"} src={"./coin.png"} alt="coin" />
        </div>

        <TONConnect />

        <div className="mt-5">
          <Balance />
        </div>

        <h1 className="text-center text-black my-5 font-bold text-3xl ">
          Earn more coins
        </h1>
        <div className="flex flex-col items-start w-full">
          <Tabs
            onClick={handleTab}
            tabActive={tabActive}
            tabList={["Special", "Leagues", "Ref Tasks"]}
          />
          {tabActive === "Special" && (
            <Cards
              obj_list={TaskList}
              callback={() => {}}
              modalCallback={() => {}}
            />
          )}

          {tabActive === "Leagues" && (
            <div className="w-full flex flex-col gap-1 mb-1">
              {Trophies.map((trophy, index) => {
                return (
                  <CardLeagRef
                    claimed={leagueClaimed.includes(index)}
                    onClick={() => handleClaimLeague(index, trophy.reward)}
                    league_img={true}
                    price={trophy.reward}
                    key={index}
                    icon={trophy.src}
                    title={trophy.title}
                    reward={trophy.reward}
                    energyNow={amount}
                    energyLimit={trophy.threshold}
                    loading={loadingState[index]}
                  />
                );
              })}
            </div>
          )}

          {tabActive === "Ref Tasks" && (
            <div className="w-full flex flex-col gap-1 mb-1">
              {Refs.map((trophy, index) => (
                <CardLeagRef
                  claimed={refClaimed.includes(index)}
                  onClick={() => handleClaimRef(index, trophy.reward)}
                  league_img={false}
                  price={trophy.reward}
                  key={index}
                  icon={<FaUserFriends color={"white"} size={32} />}
                  title={trophy.title}
                  reward={trophy.reward}
                  energyNow={amount}
                  energyLimit={trophy.threshold}
                  loading={loadingState[index]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Modal for tasks(special) */}
      {/*<ModalComponent*/}
      {/*    isOpen={isOpen}*/}
      {/*    onOpen={onOpen}*/}
      {/*    onOpenChange={onOpenChange}*/}
      {/*    cardInfo={cardInfo}*/}
      {/*    onClick={() => handleCheck(cardInfo.id)}*/}
      {/*/>*/}
    </>
  );
};

export default Earn;
