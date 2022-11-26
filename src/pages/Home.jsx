import Content from '../components/Content';
import Dashboard from '../components/Dashboard';

function Home() {
    return (
        <div className="flex w-screen h-screen">
            <Dashboard />
            <Content />
        </div>
    );
}

export default Home;
