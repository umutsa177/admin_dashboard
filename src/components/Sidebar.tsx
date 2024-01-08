// components/Sidebar.js
const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 h-screen text-white">
            <h2 className="text-xl font-bold p-4">Admin Panel</h2>
            <nav>
                <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-700">Dashboard</li>
                    <li className="px-4 py-2 hover:bg-gray-700">Users</li>
                    <li className="px-4 py-2 hover:bg-gray-700">Products</li>

                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
