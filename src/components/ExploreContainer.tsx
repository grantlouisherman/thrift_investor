import './ExploreContainer.css';
import RedditContainer from "./Reddit/RedditContainer";
import CryptoContainer from "./Crypto/CryptoContainer";
import TwitterContainer from "./Twitter/TwitterContainer";

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
      <div>
          <h2>Crypto</h2>
          <CryptoContainer/>
        <div/>
          <h2>Reddit</h2>
          <RedditContainer/>
          <div />
          <TwitterContainer/>
      </div>
  );
};

export default ExploreContainer;
