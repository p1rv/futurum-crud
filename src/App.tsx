import { Campaigns } from "./components/Campaigns";

const App = () => {
  document.title = "Futurum | CRUD";

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex justify-center">
        <Campaigns />
      </div>
    </div>
  );
};

export default App;
