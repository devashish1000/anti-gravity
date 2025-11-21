import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Send, MoreVertical, Phone, Video } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

interface Match {
    id: number
    name: string
    image: string
    lastMessage: string
    timestamp: string
    unread: boolean
}

const MOCK_MATCHES: Match[] = [
    {
        id: 1,
        name: "Priya",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        lastMessage: "Hey! I love that chai spot too!",
        timestamp: "2m ago",
        unread: true
    },
    {
        id: 2,
        name: "Rahul",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        lastMessage: "Are you going to the concert this weekend?",
        timestamp: "1h ago",
        unread: false
    },
    {
        id: 3,
        name: "Anjali",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        lastMessage: "Your art is amazing!",
        timestamp: "1d ago",
        unread: false
    }
]

interface Message {
    id: number
    senderId: number // 0 for me
    text: string
    timestamp: string
}

const MOCK_MESSAGES: Message[] = [
    { id: 1, senderId: 1, text: "Hey! I saw you like Chai too.", timestamp: "10:00 AM" },
    { id: 2, senderId: 0, text: "Yes! Can't survive without it. What's your favorite spot?", timestamp: "10:02 AM" },
    { id: 3, senderId: 1, text: "There's this place in downtown called Chai Point. It's legit.", timestamp: "10:05 AM" },
    { id: 4, senderId: 0, text: "Oh I've heard of it! We should go sometime.", timestamp: "10:06 AM" },
]

export default function Chat() {
    const navigate = useNavigate()
    const [activeMatch, setActiveMatch] = useState<Match | null>(null)
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
    const [newMessage, setNewMessage] = useState("")

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const msg: Message = {
            id: messages.length + 1,
            senderId: 0,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages([...messages, msg])
        setNewMessage("")
    }

    if (activeMatch) {
        return (
            <div className="flex flex-col h-screen bg-background">
                {/* Chat Header */}
                <header className="flex items-center justify-between px-4 py-3 border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => setActiveMatch(null)}>
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <div className="relative">
                            <img src={activeMatch.image} alt={activeMatch.name} className="h-10 w-10 rounded-full object-cover" />
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                        </div>
                        <div>
                            <h2 className="font-semibold">{activeMatch.name}</h2>
                            <p className="text-xs text-muted-foreground">Online</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.senderId === 0 ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2 ${msg.senderId === 0
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted text-foreground rounded-tl-none"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <span className={`text-[10px] block text-right mt-1 ${msg.senderId === 0 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                    {msg.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
                    <div className="flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="rounded-full"
                        />
                        <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Matches Header */}
            <header className="flex items-center px-4 py-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => navigate("/discover")}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <h1 className="ml-2 text-2xl font-display font-bold">Matches</h1>
            </header>

            {/* New Matches Row */}
            <div className="p-4 border-b">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">New Matches</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {MOCK_MATCHES.map((match) => (
                        <div key={match.id} className="flex flex-col items-center space-y-1 min-w-[4rem] cursor-pointer" onClick={() => setActiveMatch(match)}>
                            <div className="relative">
                                <img src={match.image} alt={match.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-primary p-0.5" />
                                {match.unread && <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary border-2 border-background" />}
                            </div>
                            <span className="text-xs font-medium">{match.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-semibold text-muted-foreground px-4 py-3 uppercase tracking-wider bg-muted/20">Messages</h3>
                {MOCK_MATCHES.map((match) => (
                    <div
                        key={match.id}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setActiveMatch(match)}
                    >
                        <div className="relative">
                            <img src={match.image} alt={match.name} className="h-14 w-14 rounded-full object-cover" />
                            {match.unread && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold truncate">{match.name}</h3>
                                <span className="text-xs text-muted-foreground">{match.timestamp}</span>
                            </div>
                            <p className={`text-sm truncate ${match.unread ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                                {match.lastMessage}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
