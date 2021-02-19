import './ExploreContainer.css';
import RedditContainer from "./Reddit/RedditContainer";
import CryptoContainer from "./Crypto/CryptoContainer";
interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
      <div>
        <CryptoContainer/>
        <RedditContainer/>
      </div>
  );
};

export default ExploreContainer;
