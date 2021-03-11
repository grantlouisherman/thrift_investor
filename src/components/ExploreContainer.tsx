import "./ExploreContainer.css";
import RedditContainer from "./Reddit/RedditContainer";
import CryptoContainer from "./Crypto/CryptoContainer";
import TwitterContainer from "./Twitter/TwitterContainer";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div>
      <h2>Crypto</h2>
      <CryptoContainer />
      <hr />
      <h2>Reddit</h2>
      <RedditContainer />
      <hr />
      <h2>Twitter</h2>
      <TwitterContainer />
    </div>
  );
};

export default ExploreContainer;
