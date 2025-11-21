import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Upload } from "lucide-react"

export default function Onboarding() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        bio: "",
    })

    const nextStep = () => setStep(step + 1)
    const prevStep = () => setStep(step - 1)

    const handleComplete = () => {
        navigate("/discover")
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
        }),
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-8">
            <div className="w-full max-w-md">
                <div className="mb-8 flex justify-center">
                    <div className="flex space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`h-2 w-16 rounded-full transition-colors ${step >= i ? "bg-primary" : "bg-muted-foreground/20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait" custom={step}>
                    <motion.div
                        key={step}
                        custom={step}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <Card className="border-none shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">
                                    {step === 1 && "About You"}
                                    {step === 2 && "Your Vibe"}
                                    {step === 3 && "Show Yourself"}
                                </CardTitle>
                                <CardDescription className="text-center">
                                    {step === 1 && "Let's start with the basics"}
                                    {step === 2 && "Tell us a bit about yourself"}
                                    {step === 3 && "Add your best photos"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 min-h-[300px]">
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your name"
                                                className="text-lg py-6"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Age</label>
                                            <Input
                                                type="number"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                placeholder="25"
                                                className="text-lg py-6"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Gender</label>
                                            <div className="flex gap-2">
                                                {["Male", "Female", "Non-binary"].map((g) => (
                                                    <Button
                                                        key={g}
                                                        type="button"
                                                        variant={formData.gender === g ? "default" : "outline"}
                                                        onClick={() => setFormData({ ...formData, gender: g })}
                                                        className="flex-1"
                                                    >
                                                        {g}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Bio</label>
                                            <textarea
                                                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="I love chai, bollywood movies, and..."
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="aspect-[3/4] rounded-xl border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 cursor-pointer transition-colors"
                                            >
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                                <span className="text-xs text-muted-foreground">Add Photo</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                >
                                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                                </Button>

                                {step < 3 ? (
                                    <Button onClick={nextStep} className="bg-gradient-to-r from-magenta to-saffron">
                                        Next <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button onClick={handleComplete} className="bg-gradient-to-r from-magenta to-saffron">
                                        Complete Setup
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
