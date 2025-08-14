import { Link } from "react-router-dom";

export default function GuestNavbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-orange-500">DNS</h1>
                <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </div>
        </nav>
    );
}
