import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { motion } from "framer-motion"

export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Mock login delay
        setTimeout(() => {
            setLoading(false)
            navigate("/discover")
        }, 1500)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-none shadow-xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
                        <CardDescription>Enter your phone number to sign in</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    required
                                    className="text-lg py-6"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full text-lg py-6 rounded-full bg-gradient-to-r from-magenta to-saffron"
                                disabled={loading}
                            >
                                {loading ? "Sending Code..." : "Continue"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}
