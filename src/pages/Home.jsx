import Content from '../components/Content';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <div className="flex w-screen h-screen ">
            <Navbar />
            <Content />
        </div>
    );
}

export default Home;
