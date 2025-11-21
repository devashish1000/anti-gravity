import { useState } from "react"
import { motion, useMotionValue, useTransform, useAnimation, type PanInfo } from "framer-motion"
import { X, Heart, MessageCircle, User } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { useNavigate } from "react-router-dom"

interface Profile {
    id: number
    name: string
    age: number
    bio: string
    image: string
    location: string
    tags: string[]
}

const MOCK_PROFILES: Profile[] = [
    {
        id: 1,
        name: "Priya",
        age: 24,
        bio: "Chai lover, Bollywood fanatic, and software engineer. Looking for someone to share samosas with.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        location: "San Francisco, CA",
        tags: ["Coffee", "Travel", "Music"]
    },
    {
        id: 2,
        name: "Rahul",
        age: 27,
        bio: "Doctor by day, DJ by night. Let's make some noise!",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        location: "New York, NY",
        tags: ["Fitness", "Cooking", "Photography"]
    },
    {
        id: 3,
        name: "Anjali",
        age: 25,
        bio: "Artist and dreamer. I paint the world in my own colors.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        location: "Austin, TX",
        tags: ["Art", "Yoga", "Nature"]
    },
    {
        id: 4,
        name: "Vikram",
        age: 28,
        bio: "Tech entrepreneur. Always building something new.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        location: "Seattle, WA",
        tags: ["Tech", "Startups", "Hiking"]
    }
]

export default function Discover() {
    const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES)
    const navigate = useNavigate()

    const removeCard = (id: number) => {
        setProfiles((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <div className="flex min-h-screen flex-col bg-muted/30">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b">
                <User className="h-6 w-6 text-muted-foreground cursor-pointer" onClick={() => navigate("/onboarding")} />
                <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-magenta to-saffron">
                    Dil Mil
                </h1>
                <MessageCircle className="h-6 w-6 text-muted-foreground cursor-pointer" onClick={() => navigate("/chat")} />
            </header>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
                <div className="relative w-full max-w-sm aspect-[3/4]">
                    {profiles.map((profile, index) => (
                        <SwipeCard
                            key={profile.id}
                            profile={profile}
                            onSwipe={() => removeCard(profile.id)}
                            isTop={index === profiles.length - 1}
                        />
                    ))}
                    {profiles.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold">No more profiles</h3>
                            <p className="text-muted-foreground">Check back later for more matches!</p>
                            <Button onClick={() => setProfiles(MOCK_PROFILES)} variant="outline">Reset Demo</Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Controls (Visual only, actions handled by swipe) */}
            {profiles.length > 0 && (
                <div className="pb-8 pt-4 flex justify-center gap-6">
                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors shadow-lg">
                        <X className="h-8 w-8" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors shadow-lg">
                        <Heart className="h-8 w-8" />
                    </Button>
                </div>
            )}
        </div>
    )
}

interface SwipeCardProps {
    profile: Profile
    onSwipe: () => void
    isTop: boolean
}

function SwipeCard({ profile, onSwipe, isTop }: SwipeCardProps) {
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-25, 25])
    const controls = useAnimation()

    const handleDragEnd = async (_: any, info: PanInfo) => {
        const offset = info.offset.x
        const velocity = info.velocity.x

        if (offset > 100 || velocity > 500) {
            await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } })
            onSwipe()
        } else if (offset < -100 || velocity < -500) {
            await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } })
            onSwipe()
        } else {
            controls.start({ x: 0, transition: { type: "spring", stiffness: 500, damping: 50 } })
        }
    }

    return (
        <motion.div
            style={{
                x,
                rotate,
                opacity: isTop ? 1 : 0.5,
                scale: isTop ? 1 : 0.95,
                zIndex: isTop ? 10 : 0
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            className="absolute inset-0 bg-card rounded-3xl shadow-xl overflow-hidden border cursor-grab active:cursor-grabbing"
        >
            {/* Image */}
            <div className="h-3/4 w-full relative">
                <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-full w-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-3xl font-bold font-display">{profile.name}, {profile.age}</h2>
                    <p className="text-white/90">{profile.location}</p>
                </div>
            </div>

            {/* Info */}
            <div className="h-1/4 p-4 flex flex-col justify-between bg-white dark:bg-card">
                <p className="text-muted-foreground line-clamp-2">{profile.bio}</p>
                <div className="flex gap-2 mt-2 overflow-hidden">
                    {profile.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground hover:bg-muted">{tag}</Badge>
                    ))}
                </div>
            </div>

            {/* Swipe Indicators */}
            {isTop && (
                <>
                    <motion.div
                        style={{ opacity: useTransform(x, [20, 100], [0, 1]) }}
                        className="absolute top-8 left-8 -rotate-12 border-4 border-green-500 text-green-500 rounded-lg px-4 py-2 text-4xl font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm"
                    >
                        LIKE
                    </motion.div>
                    <motion.div
                        style={{ opacity: useTransform(x, [-20, -100], [0, 1]) }}
                        className="absolute top-8 right-8 rotate-12 border-4 border-red-500 text-red-500 rounded-lg px-4 py-2 text-4xl font-bold uppercase tracking-widest bg-black/20 backdrop-blur-sm"
                    >
                        NOPE
                    </motion.div>
                </>
            )}
        </motion.div>
    )
}
