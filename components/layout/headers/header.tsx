import FullHeader from "./full-header";
import HeaderWrapper from "./header-wrapper";
import { Content } from "./header-switch";
import { TransparentHeader } from "./transparent-header";

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Content value="full">
        <FullHeader />
      </Content>
      <Content value="transparent">
        <TransparentHeader />
      </Content>
    </HeaderWrapper>
  );
};

export default Header;
