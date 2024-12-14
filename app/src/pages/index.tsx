import Content from "../components/content";
import Footer from "../components/footer";
import Header from "../components/header";

interface Props {
    children: React.ReactNode;
  }
  
  const Page: React.FC<Props> = ({ children }) => (
    <>
      <Header/>
      <Content>{children}</Content>
      <Footer/>
    </>
  );
  export default Page;