import './App.css';
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Route, Routes} from "react-router-dom";
import BaNavbar from "./components/BaNavbar";
import BaSearch from "./pages/BaSearch";
import BaSearchResult from "./pages/BaSearchResult";
import BaCheckEquivalence from "./pages/BaCheckEquivalence";
import BaPausedRequests from "./pages/BaPausedRequests";
import BaEnterEquivalence from "./pages/BaEnterEquivalence";
import BaEditCourse from "./pages/BaEditCourse";
import BaEditList from "./components/BaEditList";

function App() {
    return (
        <Layout>
            <Header>
                <BaNavbar/>
            </Header>
            <Content style={{backgroundColor: '#e1e2e1', height: 'calc(94vh - 55px)'}}>
                <Routes>
                    <Route path="/search" element={<BaSearch/>}/>
                    <Route path="/search/result" element={<BaSearchResult/>}/>
                    <Route path="/equivalence/check" element={<BaCheckEquivalence/>}/>
                    <Route path="/acknowledgment/resume" element={<BaPausedRequests/>}></Route>
                    <Route path="/equivalence/enter" element={<BaEnterEquivalence/>}/>
                    <Route path="/search/data" element={<BaSearchResult/>}></Route>
                    <Route path="/edit/course" element={<BaEditCourse/>}/>
                    <Route path="/edit/module" element={<BaEditList/>}/>
                </Routes>
            </Content>
            <Footer style={{textAlign: 'center'}} className={"secondary-color-light"}>
                Expertensystem 2022 Created by Cem Caylak
            </Footer>
        </Layout>
    );
}

export default App;
