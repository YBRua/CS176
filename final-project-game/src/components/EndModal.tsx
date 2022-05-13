import ReactModal from "react-modal";
import { Styles } from "react-modal";
import { useNavigate } from "react-router-dom";
import { GameManager } from "../gaming/gameManager";
import "../styles/Modals.css";
import { HoverGlowButton } from "./HoverGlowButton";

type EndModalPropTypes = {
  isEnded: boolean;
  score: number;
  gameManager: GameManager;
};

const customStyles: Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  content: {
    position: "absolute",
    left: "30%",
    right: "30%",
    top: "12%",
    bottom: "12%",
    border: "2px solid #fff",
    background: "#000",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
};

ReactModal.setAppElement("#root");

export function EndModal(props: EndModalPropTypes) {
  const navigate = useNavigate();
  const highScore = JSON.parse(
    localStorage.getItem("simple-air-combat-highscore") || "0"
  );

  function returnToMenu() {
    props.gameManager.reset();
    navigate("/");
  }

  function restartGame() {
    props.gameManager.reset();
    props.gameManager.init(props.gameManager.gameLevelId);
    props.gameManager.run();
  }

  if (props.score >= highScore) {
    localStorage.setItem("simple-air-combat-highscore", JSON.stringify(props.score));
  }

  return (
    <ReactModal isOpen={props.isEnded} style={customStyles}>
      <h2 className="text-center text-5xl my-8 text-white">GAME OVER</h2>
      <h3 className="text-center text-xl my-4 text-white">
        Your Score: {props.score} | High Score: {highScore}
      </h3>
      {props.score >= highScore ? (
        <h3 className="text-center text-xl my-4 text-white">NEW HIGH SCORE!</h3>
      ) : null}
      <div className=" flex flex-col gap-2 justify-center align-middle mt-8">
        <HoverGlowButton
          btnText="Restart"
          onClick={restartGame}
          extraClassNames="text-2xl"
        ></HoverGlowButton>
        <HoverGlowButton
          btnText="Return to Menu"
          onClick={returnToMenu}
          extraClassNames="text-2xl"
        ></HoverGlowButton>
      </div>
    </ReactModal>
  );
}
