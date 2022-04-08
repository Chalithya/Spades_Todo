import Footer from "../footer/footer";
import Header from "../header/header";
import Login from "./user/login";

function Layout({children}) {
    return (
        <>

            <Header />

            {children}
            
            <Login />

            <Footer />

        </>

    )
}

export default Layout