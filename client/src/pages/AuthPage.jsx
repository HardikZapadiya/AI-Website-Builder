import LeftLogin from "../components/AuthPage_Component/LeftLogin";
import RightAuth from "../components/AuthPage_Component/RightAuth";

const AuthPage = ({ mode }) => {
  return (
    <div className="min-h-screen bg-white flex text-zinc-900 font-sans">
      {/* left panel-Branding */}
      <LeftLogin />
      {/* Right panel-Branding */}
      <RightAuth mode={mode} />
    </div>
  );
};

export default AuthPage;
