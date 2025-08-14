import { Loader } from "lucide-react";  // ShadCN loader icon

export default function CircleLoader() {
    return (
        // <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        //     <div className="flex flex-col items-center">
        //         <Loader className="animate-[spin_2s_linear_infinite] w-32 h-32" style={{ color: "var(--loader-color)" }} />
        //         <p className="mt-2 text-gray-600 text-lg">Loading...</p>
        //     </div>
        // </div>
        <div className="absolute inset-0 bg-black/10 z-40 flex items-center justify-center">
            <Loader className="animate-[spin_2s_linear_infinite] w-32 h-32" style={{ color: "var(--loader-color)" }} />
        </div>
    );
};

