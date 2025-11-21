import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const navigate = useNavigate()

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
            {/* Background Gradients */}
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-saffron/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-magenta/20 blur-3xl" />

            <div className="z-10 flex flex-col items-center space-y-8 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="font-display text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-magenta via-saffron to-gold md:text-8xl">
                        Dil Mil
                    </h1>
                    <p className="text-xl text-muted-foreground md:text-2xl">
                        Where Desi hearts connect.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-magenta to-saffron text-white hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-lg shadow-magenta/25 transition-all hover:scale-105"
                        onClick={() => navigate("/onboarding")}
                    >
                        Find Your Match
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-6 rounded-full border-2 hover:bg-accent transition-all hover:scale-105"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </Button>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
    )
}
