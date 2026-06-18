
const Layout = () => {
    return (
        <div className="flex h-screen bg-linear-to-br from-slate-50
                       via-sky-50 to-indigo-50">
            <p>Sidebar</p>
            <main className="flex-1 overflow-y-auto">
                <div className="9-4 pt-16 sm:p-6 sm:pt-6 lg:p-8 
                                max-w-400 mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout