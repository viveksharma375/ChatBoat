import "./MainLayout.scss";
import "../../Pages/ChatComponents/Header/Header";
import { Header } from '../../Pages/ChatComponents/Header/Header';
import { Sidebar } from '../../Pages/ChatComponents/Sidebar/Sidebar';
import ChatBox from "../../Pages/ChatComponents/ChatBox/ChatBox";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [selectedId, setSelectedId] = useState<any>(null);

  const handleIdChange = (newId: any) => {
    setSelectedId(newId);
  };

  useEffect(() => {
  }, [selectedId])

  return (
    <>
      <div><Header /></div>
      <div className='Inner_wrapper'>
        <div><Sidebar id={selectedId} onIdChange={handleIdChange} /></div>
        <div><ChatBox selectedId={selectedId} /></div>
      </div>
    </>
  )
}
export default MainLayout;

