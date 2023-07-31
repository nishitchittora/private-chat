import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { Chat } from "./components/Chat";

function App() {
	const [isInChat, setIsInChat] = useState<boolean>(false);
	const [room, setRoom] = useState<string>("");
	return (
		<Login>
			{!isInChat ? (
				<div className="room">
					<label> Type room name: </label>
					<input
						placeholder="Enter the chat room"
						onChange={(e) => setRoom(e.target.value)}
					/>
					<button
						onClick={() => {
							setIsInChat(true);
						}}
					>
						Enter Chat
					</button>
				</div>
			) : (
				<Chat room={room} />
			)}
		</Login>
	);
}

export default App;
