import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OtpModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (otp: string, values?: unknown) => void;
    onResend: () => void;
    phoneOrEmail?: string;
}

export const OtpModal: React.FC<OtpModalProps> = ({
    open,
    onClose,
    onSubmit,
    onResend,
    phoneOrEmail,
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (open && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setCanResend(true);
        }
    }, [open, timer]);

    useEffect(() => {
        if (open) {
            setOtp(new Array(6).fill(""));
            setTimer(30);
            setCanResend(false);
            setTimeout(() => inputRefs.current[0]?.focus(), 100);
        }
    }, [open]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const otpCode = otp.join("");
        if (otpCode.length === 6) {
            onSubmit(otpCode);
        } else {
            alert("Please enter full 6-digit OTP");
        }
    };

    const handleResend = () => {
        if (canResend) {
            onResend();
            setTimer(30);
            setCanResend(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm z-50 bg-white rounded-lg shadow-lg"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center">Enter OTP</DialogTitle>
                </DialogHeader>

                {phoneOrEmail && (
                    <p className="text-sm text-muted-foreground text-center mb-2">
                        OTP sent to <strong>{phoneOrEmail}</strong>
                    </p>
                )}

                {/* 🔧 OTP Input styled like ShadCN InputOTPSlot */}
                <div className="flex justify-center gap-2 mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-10 h-12 rounded-md border border-input bg-background text-center text-lg font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    ))}
                </div>

                <div className="text-center text-sm text-muted-foreground mb-4">
                    {canResend ? (
                        <button onClick={handleResend} className="text-blue-600 hover:underline">Resend OTP</button>
                    ) : (
                        <span>Resend available in {timer}s</span>
                    )}
                </div>

                <div className="flex justify-between gap-4">
                    <Button type="button" variant="outline" className="w-full" onClick={handleSubmit}>Submit</Button>
                    <Button type="button" variant="outline" className="w-full" onClick={onClose}>Cancel</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
