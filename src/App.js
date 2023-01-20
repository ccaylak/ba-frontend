import './App.css';
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";
import BaNavbar from "./components/BaNavbar";
import BaSearch from "./pages/BaSearch";
import BaSearchResult from "./pages/BaSearchResult";
import BaStepper from "./pages/BaStepper";
import BaUpdateAcknowledgement from "./pages/BaUpdateAcknowledgement";

const App = () => {
    return (
        <Layout>
            <Header>
                <BaNavbar/>
            </Header>
            <Content style={{backgroundColor: '#e1e2e1', height: 'calc(94vh - 55px)'}}>
                <Routes>
                    <Route path="/search" element={<BaSearch/>}/>
                    <Route path="/search/result" element={<BaSearchResult/>}/>

                    <Route path="/equivalence/check" element={<BaStepper mode='checkEquivalence'/>}/>
                    <Route path="/equivalence/enter" element={<BaStepper mode='enterEquivalence'/>}/>
                    <Route path="/equivalence/update" element={<BaUpdateAcknowledgement/>}/>

                </Routes>
            </Content>
            <Footer style={{textAlign: 'center'}} className={"secondary-color-light"}>
                Expertensystem 2022 Created by Cem Caylak
            </Footer>
        </Layout>
    );
}

export default App;
