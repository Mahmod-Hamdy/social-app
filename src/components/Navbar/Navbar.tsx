import logo from "../../assets/social-media.png";
import { Button, Dropdown, Label, Tabs } from "@heroui/react";
import { BellRing, House, List, LogOut, Settings, User } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../Contexts/Token Context/token.context";
import { UserContext, type UserContextType } from "../../components/Contexts/User Context/UserContext";
function Navbar() {
    const{setToken}=useContext(TokenContext)
    const {userDetails} : UserContextType=useContext(UserContext)
    const navigate = useNavigate()
    function logout(){
        localStorage.removeItem("userToken")
        setToken(null)
    }
    return (
        <>
        <nav className="bg-gray-300 py-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="nav-logo flex gap-3 items-center">
                    <img src={logo} width={50} className="p-2" alt="logo" />
                    <h1 className=" font-bold text-black">Route Posts</h1>
                </div>
                <div className="nav-links">
                    <Tabs className="w-full max-w-md">
                        <Tabs.ListContainer>
                            <Tabs.List aria-label="Options">
                            <Tabs.Tab id="feed" onClick={() => navigate("/main/feed")} className="flex items-center gap-2 text-gray-600 aria-selected:text-blue-700 font-bold px-5">
                                <House className="font-bold h-4 w-4"/>
                                Feed
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="Profile" onClick={() => navigate("/main/profile")} className="flex items-center gap-2 text-gray-600 aria-selected:text-blue-700 font-bold px-5">
                                <User className="font-bold h-4 w-4"/>
                                Profile
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="Notifications" onClick={() => navigate("/main/notification")} className="flex items-center gap-2 text-gray-600 aria-selected:text-blue-700 font-bold px-5">
                                <BellRing className="font-bold h-4 w-4"/>
                                Notifications
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            </Tabs.List>
                        </Tabs.ListContainer>
                    </Tabs>
                </div>
                <div className="nav-actions">
                    <Dropdown>
                    <Button aria-label="Menu" variant="secondary" className="border border-blue-300 flex items-center gap-3 justify-center font-black text-gray-700">
                        <div >
                            <img className="w-7 h-7 rounded-full" src={userDetails?.photo} alt="photo" />
                        </div>
                        {userDetails?.name}
                        <List className="font-bold h-5 w-5"/>
                    </Button>
                    <Dropdown.Popover>
                        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                        <Dropdown.Item id="new-file" textValue="New file" className="my-2 py-2 px-2">
                            <User className="font-bold h-5 w-5"/>
                            <Label className="font-bold">Profile</Label>
                        </Dropdown.Item>
                        <Dropdown.Item id="copy-link" textValue="Copy link" className="my-1 py-2 px-2">
                            <Settings className="font-bold h-5 w-5"/>
                            <Label className="font-bold">Sitting</Label>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout} id="delete-file" textValue="Delete file" variant="danger" className="flex flex-column flex-wrap hover:bg-red-100 py-2 px-2">
                            <LogOut className="font-bold h-5 w-5 text-danger"/>
                            <Label className="inline-block border-t border-transparent">Logout</Label>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                    </Dropdown>
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;
