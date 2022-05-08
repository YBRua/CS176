import ReactModal from "react-modal";
import { Styles } from "react-modal";
import { useNavigate } from "react-router-dom";
import { GameManager } from "../gaming/gameManager";
import "../styles/Modals.css";
import { HoverGlowButton } from "./HoverGlowButton";

type PauseModalPropTypes = {
  isPaused: boolean;
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
    top: "20%",
    bottom: "20%",
    border: "2px solid #fff",
    background: "#000",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
  },
};

ReactModal.setAppElement("#root");

export function PauseModal(props: PauseModalPropTypes) {
  const navigate = useNavigate();

  function returnToMenu() {
    props.gameManager.reset();
    navigate("/");
  }

  function resumeGame() {
    props.gameManager.togglePause();
  }

  function restartGame() {
    props.gameManager.reset();
    props.gameManager.init(props.gameManager.gameLevelId);
    props.gameManager.run();
  }

  return (
    <ReactModal isOpen={props.isPaused} style={customStyles}>
      <h2 className="text-center text-5xl my-16 text-white">GAME PAUSED</h2>
      <div className=" flex flex-col gap-2 justify-center align-middle mt-16">
        <HoverGlowButton
          btnText="Resume"
          onClick={resumeGame}
          extraClassNames="text-2xl"
        ></HoverGlowButton>
        <HoverGlowButton
          btnText="Restart Game"
          onClick={restartGame}
          extraClassNames="text-2xl"
        ></HoverGlowButton>
        <HoverGlowButton
          btnText="Return To Menu"
          onClick={returnToMenu}
          extraClassNames="text-2xl"
        ></HoverGlowButton>
      </div>
    </ReactModal>
  );
}
