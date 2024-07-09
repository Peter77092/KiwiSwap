import { useIntegration } from "@tma.js/react-router-integration";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initClosingBehavior,
  initNavigator,
  useInitData,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@tma.js/sdk-react";
import { BrowserRouter,Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import { NextUIProvider } from "@nextui-org/system";
import Exchange from "./pages/Exchange";
import Friends from "./pages/Friends";
import Earn from "./pages/Earn";
import Boost from "./pages/Boost";
import Stats from "./pages/Stats";
import { useEffect } from "react";
import LoadingComponent from "./components/LoadingComponent";
import { useData } from "./components/Context.jsx";
import { useMemo } from "react";
import { Trophies } from "./lib/data/data.jsx";
import Trophy from "./pages/Trophy.jsx";

export default function App() {
    const miniApp = useMiniApp();
    const themeParams = useThemeParams();
    const viewport = useViewport();
    const [closingBehavior] = initClosingBehavior();

    useEffect(() => {
      closingBehavior.enableConfirmation();
    }, [closingBehavior]);

    useEffect(() => {
      return bindMiniAppCSSVars(miniApp, themeParams);
    }, [miniApp, themeParams]);

    useEffect(() => {
      return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

    useEffect(() => {
      return viewport && bindViewportCSSVars(viewport);
    }, [viewport]);

    const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
    const [location, reactNavigator] = useIntegration(navigator);

    useEffect(() => {
      navigator.attach();
      return () => navigator.detach();
    }, [navigator]);

  const {
    balanceInit,
    energyInit,
    balance,
    setLeague,
    userid,
    setUserId,
    guruLeft,
    fetched,
    setFetched,
    refillLeft,
    multiTap,
    setMultiTap,
    energy,
    energyLimit,
    setEnergyLimit,
    energySpeed,
    setEnergySpeed,
    autoBot,
    botUp,
    energyUp,
    setAutoBot,
    setFriends,
    setReferrals,
    amount,
    // setTasks,
    reward,
    setAmount,
    taskClaimed,
    setTaskClaimed,
    leagueClaimed,
    setLeagueClaimed,
    lastClick,
    refClaimed,
    setRefClaimed,
    loading,
    setLoading,
    loaded,
    setLoaded,
    initUpdateTime,
    updateTime,
  } = useData();
  const initData = useInitData();

  useEffect(() => {
    if (!fetched) {
      setFetched(true);
      const user_id = initData?.user?.id;
      setUserId(user_id);
      fetch(`https://api.tapkiwi.space/${user_id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          initUpdateTime(data.nextupdate, data.guruleft, data.refillleft);
          setMultiTap(data.multi);
          setEnergyLimit(data.limite);
          setEnergySpeed(data.speed);
          setAutoBot(data.bot);
          setReferrals(data.refs.length);
          setFriends(data.refs);
          setAmount(data.amount);
          for (let i = 0; i < Trophies.length; i++) {
            if (data.amount <= Trophies[i].threshold) {
              setLeague(i);
              break;
            }
          }
          setTaskClaimed(data.taskcl);
          setLeagueClaimed(data.leaguecl);
          setRefClaimed(data.referralcl);
          let ener_now = energyInit(
            data.energy,
            data.lastonline,
            data.limite,
            data.speed
          );
          balanceInit(
            data.balance,
            data.lastonline,
            data.bot,
            data.speed,
            ener_now,
            data.limite
          );
          setLoading(false);
        });
    }
  }, [initData]);


  useEffect(() => {
    if (energy !== -1) {
      const interv = setTimeout(energyUp, 1000);
      return () => clearTimeout(interv);
    }
  }, [energySpeed, energyLimit, energy]);

  useEffect(() => {
    if (autoBot && energy !== -1) {
      const interva = setTimeout(botUp, 1000);
      return () => clearTimeout(interva);
    }
  }, [energySpeed, autoBot, amount, energy, energyLimit, lastClick, balance]);

  const saveData = () => {
    if (
        energyLimit !== 0 &&
        energySpeed !== 0 &&
        multiTap !== 0 &&
        balance !== 0 &&
        energy !== -1
    ) {
      const userData = {
        guruLeft: guruLeft,
        refillLeft: refillLeft,
        limite: energyLimit,
        speed: energySpeed,
        multi: multiTap,
        bot: autoBot,
        referralCl: refClaimed,
        leagueCl: leagueClaimed,
        taskCl: taskClaimed,
        reward: reward,
        balance: balance,
        amount: amount,
        energy: energy,
        lastOnline: Number(Date.now()),
        nextUpdate: Math.trunc(updateTime),
      };

      fetch(`https://api.tapkiwi.space/${userid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
          .then((response) => {
            if (!response.ok) {
              console.error("Failed to save data");
            }
          })
          .catch((error) => {
            console.error("Error saving data:", error);
          });
    }
  };

  useEffect(() => {
    let intervalId;
    if (
        userid !== 0 &&
        !loaded &&
        energyLimit !== 0 &&
        energySpeed !== 0 &&
        multiTap !== 0
    ) {
      intervalId = setTimeout(saveData, 1000);
    }
    return () => clearTimeout(intervalId);
  }, [
    userid,
    loaded,
    guruLeft,
    refillLeft,
    energyLimit,
    energySpeed,
    multiTap,
    autoBot,
    refClaimed.length,
    leagueClaimed.length,
    taskClaimed.length,
    lastClick,
    reward,
  ]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoaded(false);
      }, 500);
    }
  }, [loading, userid]);

  return (
    <NextUIProvider>
      {loaded ? <LoadingComponent /> : <></>}
      <Router location={location} navigator={reactNavigator}>
        <div  style={{ display: loaded ? "none" : "" }} className="app bg-gradient-to-b from-[#64996f] via-[#9ebf6d] to-[#c8de96] pb-2">
          <main >
            <Routes>
              <Route path="/exchange" Component={Exchange} />
              <Route path="/" Component={Exchange} />
              <Route path="/friends" Component={Friends} />
              <Route path="/earn" Component={Earn} />
              <Route path="/boost" Component={Boost} />
              <Route path="/stats" Component={Stats} />
              <Route path="/trophy" Component={Trophy} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </NextUIProvider>
  );
}

// export default App;
